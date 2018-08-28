import React from 'react';
import Table from 'components/Table';
import PropertyName from 'components/PropertyNameNew';
import StatusLabel from 'components/StatusLabel';
import SVG from 'components/SVG';
import Spinner from 'components/Spinner';
import SearchBox from 'components/SearchBox';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchJobs, deleteJob } from 'containers/Vendors/actions';
import { makeSelectJobs, makeSelectJobsLoading } from 'containers/Vendors/selectors';
import JobModel from 'models/Job';
import MoreMenu from 'components/MoreMenu';
import './jobs.less';

export class Jobs extends React.Component {

    constructor(props) {
        super(props);
        if (!this.props.jobs.has(this.props.id)) {
            this.props.fetchJobs({ id: this.props.id });
        }
        this.state = {
            query: '',
            dialogOpen: false
        };
        this.tableHeader = [
            { name: 'Cleaning Day' },
            { name: 'Property' },
            { name: 'Payment' },
            { name: 'Job Status' },
            { name: 'Date Updated' },
            { name: '', type: 'menu' },
        ];
    }

    handleSearchQueryChange(value) {
        this.setState({ query: value });
    }

    getJobs() {
        return this.props.jobs
            .get(this.props.id)
            .filter(job => job.filterJob(this.state.query))
            .map((jobModel) => {
                const property = <PropertyName
                    name={ jobModel.getPropertyName() }
                    address={ jobModel.getPropertyAddress() }
                    image={ jobModel.getPropertyImage() }/>;
                const date =
                    <div className="job-dates">
                        <div className="job-date-day">{ jobModel.getDate() }</div>
                        <div className="job-date-hour">{ jobModel.getTimeFrame() }</div>
                    </div>;
                const dateAdded = (
                    <div className="date-updated">
                        <div>{ jobModel.getDateAdded().format('MMMM DD, YYYY') }</div>
                        <div>{ jobModel.getDateAdded().format('h:mmA') }</div>
                    </div>
                );
                const menu =
                    <MoreMenu buttons={[
                        { label: 'Delete', click: () => this.props.deleteJob(this.props.id, jobModel.getId()) },
                    ]}/>;
                return {
                    className: 'job',
                    key: jobModel.getId(),
                    values: [
                        date,
                        property,
                        <span className="payment">{ jobModel.getCost() }</span>,
                        <StatusLabel label={ jobModel.getStatus() }/>,
                        dateAdded,
                        menu
                    ]
                };
            })
            .toArray();
    }

    render() {
        return (
            <div className="jobs-list">
                <div className="section-header">
                    <SVG className="section-header-icon" icon="paint"/>
                    <span>{ this.props.name }'s Jobs</span>
                </div>
                { this.props.loading ? <Spinner/>
                    :
                    <div>
                        <div className="search">
                            <div className="search-box-wrapper">
                                <SearchBox
                                    onChange={ (evt) => this.handleSearchQueryChange(evt.target.value) }
                                    value={ this.state.query } />
                            </div>
                        </div>
                        <Table head={ this.tableHeader } body={ this.getJobs() }/>
                        { !this.props.jobs.get(this.props.id).size &&
                            <div className="empty-state">There are no Jobs for the moment</div>
                        }
                        {/*<CreateJob*/}
                        {/*open={ this.state.dialogOpen }*/}
                        {/*onClose={ () => this.setState({ dialogOpen: false }) }*/}
                        {/*id={ this.props.id }/>*/}
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    jobs: makeSelectJobs(),
    loading: makeSelectJobsLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchJobs: (data) => dispatch(fetchJobs(data)),
        deleteJob: (vendor, id) => dispatch(deleteJob({ vendor: vendor, id: id })),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Jobs);
