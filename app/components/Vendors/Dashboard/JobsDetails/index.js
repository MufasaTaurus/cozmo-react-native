import React from 'react';
import SearchBox from 'components/SearchBox';
import StatusLabel from 'components/StatusLabel';
import CleanerName from 'components/CleanerName';
import Spinner from 'components/Spinner';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectJobs, makeSelectJobsLoading } from 'containers/Vendors/selectors';
import { fetchJobs, setSelectedJob } from 'containers/Vendors/actions';
import './jobsDetails.less';

export class JobsDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            key: null,
            query: ''
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.day && !nextProps.day.isSame(this.props.day, 'd')) {
            const date = nextProps.day.format('YYYY-MM-DD');
            this.fetchData(date);
            this.setState({ key: date });
        }
    }

    fetchData(date) {
        if (!this.props.jobs.has(date)) {
            this.props.fetchJobs({ date: date, key: date });
        }
    }

    getJobsCount() {
        return this.props.jobs.get(this.state.key, []).size || 0;
    }

    render() {
        const { status, day, jobs, loading } = this.props;
        return (
            <div className="monthly-calendar-job-details">
                { day &&
                    <div>
                        <div className="header">
                            <div className="title">
                                <div className="status">
                                    <span className={ 'status-badge ' + status.toLowerCase().replace(' ', '-') }/>
                                    { status + ' (' + this.getJobsCount() + ')' }
                                </div>
                                <div className="date">{ day.format('dddd D') }</div>
                            </div>
                            <SearchBox
                                value={ this.state.query }
                                onChange={ (evt) => this.setState({ query: evt.target.value }) }
                                placeholder="Search"/>
                        </div>
                        <div className="jobs">
                            { loading ?
                                <div className="spinner-wrapper">
                                    <Spinner/>
                                </div>
                                :
                                jobs.get(this.state.key, [])
                                    .filter(job => job.filterJob(this.state.query))
                                    .map(job => {
                                        return (
                                            <div className="job" key={ job.getId() } onClick={ () => this.props.setSelectedJob(job) }>
                                                <div className="job-info">
                                                    <div className="image" style={{ backgroundImage: `url(${job.getPropertyImage()})` }}/>
                                                    <div className="text">
                                                        <div className="address">{ job.getPropertyAddress() }</div>
                                                        <div className="time">{ job.getHourFrame() }</div>
                                                        <div className="job-type">
                                                            <div>{ job.getType() }</div>
                                                            <div><StatusLabel label={ status }/></div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="footer">
                                                    <CleanerName fullName="Claudia"/>
                                                </div>
                                            </div>
                                        );
                                    })
                            }
                        </div>
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
        setSelectedJob: (job) => { dispatch(setSelectedJob(job)); dispatch(push('/vendors/job/' + job.getId())); }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobsDetails);
