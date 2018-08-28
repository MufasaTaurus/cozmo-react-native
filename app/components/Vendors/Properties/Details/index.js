import React from 'react';
import { fromJS } from 'immutable';
import Cleaners from './Cleaners';
import Jobs from './Jobs';
import BasicInfo from './BasicInfo';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectVendorsProperties, makeSelectJobs, makeSelectJobsLoading } from 'containers/Vendors/selectors';
import { fetchVendorsProperties, updateVendorsProperty, fetchJobs, addNewJob } from 'containers/Vendors/actions';
import './details.less';

export class Details extends React.Component {

    constructor(props) {
        super(props);
        this.property = props.properties.filter(p => p.getId() + '' === props.id).first();
        if (this.property) {
            this.jobKey = 'prop' + this.property.getId();
            this.fetchJobs(this.jobKey, this.property.getId());
        }
    }

    componentWillReceiveProps() {
        if (this.property) {
            this.fetchJobs(this.jobKey, this.property.getId());
        }
    }

    fetchJobs(key, id) {
        if (!this.props.jobs.size) {
            this.props.fetchJobs({ key: key, prop: id });
        }
    }

    render() {
        const jobs = this.props.jobs.get(this.jobKey, fromJS([]));
        return (
            <div className="vendors-properties-details">
                <div className="content">
                    <BasicInfo property={ this.property } onChange={ this.props.updateVendorsProperty }/>
                    <div className="right-side">
                        <Cleaners cleaners={ this.property.getVendors() } id={ this.property.getId() }/>
                        <Jobs jobs={ jobs } loading={ this.props.loading } id={ this.property.getId() } createJob={ this.props.createJob }/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    properties: selectVendorsProperties(),
    jobs: makeSelectJobs(),
    loading: makeSelectJobsLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchVendorsProperties: () => dispatch(fetchVendorsProperties()),
        updateVendorsProperty: (data) => dispatch(updateVendorsProperty(data)),
        fetchJobs: (data) => dispatch(fetchJobs(data)),
        createJob: (data) => dispatch(addNewJob(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Details);
