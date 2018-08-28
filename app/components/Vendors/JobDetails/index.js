import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import TextField from 'components/TextField';
import StatusLabel from 'components/StatusLabel';
import ButtonNew from 'components/ButtonNew';
import Reassign from './Reassign';
import GoBack from './GoBack';
import Delete from './Delete';
import Payments from './Payments';
import SVG from 'components/SVG';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { updateVendor, fetchJob, deleteJob } from 'containers/Vendors/actions';
import { selectSelectedJob, makeSelectLoading } from 'containers/Vendors/selectors';
import { selectCleaners } from 'containers/App/selectors';
import { StateMonitor } from 'utils/helpers';
import './jobDetails.less';

export class JobDetails extends React.Component {

    constructor(props) {
        super(props);
        let job = props.job;
        if (!job) {
            this.props.fetchJob(this.props.id);
        }
        this.state = {
            cleaner: job ? props.cleaners.filter(c => c.getId() === job.getAssignee()).first() : null,
            payments: { cost: '', costs: [] },
            reassignOpen: false,
            goBackOpen: false,
            deleteOpen: false
        };
        this.stateMonitor = new StateMonitor(this.state);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.job) {
            this.setState({
                cleaner: nextProps.cleaners.filter(c => c.getId() === nextProps.job.getAssignee()).first(),
            });
        }
    }

    onChange(field, value) {
        this.setState({ [field]: value });
        this.stateMonitor.changeState(this.state);
    }

    reassign() {
        this.setState({ reassignOpen: true });
    }

    goBack() {
        if (this.stateMonitor.isChanged()) {
            this.setState({ goBackOpen: true });
        }
    }

    deleteJob() {
        this.props.deleteJob({ id: this.props.id });
        this.props.goBack();

    }

    submitForm() {
        this.setState({ editMode: false });
        this.props.updateVendor({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            email: this.state.email,
            id: this.props.id,
        });
    }

    render() {
        const { job } = this.props;
        const est = job ? job.getEstimate() : '';
        return (
            <div className="vendors-job-details">
                { job &&
                    <div className="sections">
                        <div className="vendors-job-details-breadcrumbs">
                            <Breadcrumbs section={ 'Job Details '} subsection={[{ title: 'Cleaners', link: 'vendors/team' }]} />
                        </div>
                        <div className="content">
                            <div className="combined-sections">
                                <div className="job-details">
                                    <div className="section-header">
                                        <SVG className="section-header-icon" icon="paint"/>
                                        <span>Job Details</span>
                                    </div>
                                    <div className="job-info">
                                        <div className="section">
                                            <div className="section-title">Exit Clean</div>
                                            <div className="property">
                                                <div className="image" style={{ backgroundImage: `url(${job.getPropertyImage()})` }}/>
                                                <div className="text">
                                                    <div className="name">{ job.getPropertyName() }</div>
                                                    <div className="address">{ job.getPropertyAddress() }</div>
                                                </div>
                                            </div>
                                            <div className="side-by-side">
                                                <div className="small space">
                                                    <TextField
                                                        id="est"
                                                        label="Estimated Cleaning Time"
                                                        value={ est + (est > 1 ? ' Hours' : ' Hour') }
                                                        disabled
                                                    />
                                                </div>
                                                <div className="small space">
                                                    <TextField
                                                        id="w"
                                                        label="Working Window"
                                                        value={ job.getHourFrame() }
                                                        disabled
                                                    />
                                                </div>
                                                <div className="narrow">
                                                    <TextField
                                                        id="date"
                                                        label="Date"
                                                        value={ job.getDate() }
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="section">
                                            <div className="section-title">Payment</div>
                                            <Payments onChange={ (payments) => this.onChange('payments', payments) } />
                                        </div>
                                        <div className="section">
                                            <div className="section-title">Notifications</div>
                                            <div className="notifications-wrapper">
                                                <div className="status">
                                                    <div className="job-status">Job status:</div>
                                                    <StatusLabel label={ job.getStatus() }/>
                                                </div>
                                                <div className="notifications">
                                                    { job.getNotifications().map((notification, index) => {
                                                        return (
                                                            <div className="notification" key={ index }>
                                                                <div className="notification-content">{ notification.getContent() }</div>
                                                                <div className="notification-date">{ notification.getCreated() }</div>
                                                            </div>
                                                        );
                                                    }) }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                { this.state.cleaner ?
                                    <div className="cleaner-info">
                                        <div className="section-header">
                                            <SVG className="section-header-icon" icon="contact"/>
                                            <span>Cleaner Information</span>
                                        </div>
                                        <div className="cleaner-content">
                                            <div className="cleaner-content-info">
                                                <div>
                                                    <img className="image" src={ this.state.cleaner.getAvatar() }/>
                                                </div>
                                                <div className="info">
                                                    <div className="name">{ this.state.cleaner.getFullName() }</div>
                                                    <div className="email">{ this.state.cleaner.getEmail() }</div>
                                                    <div className="phone">{ this.state.cleaner.getPhone() }</div>
                                                </div>
                                            </div>
                                            <div>
                                                <ButtonNew label="Reassign" className="green"
                                                           onClick={ () => this.reassign() }/>
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    <div className="no-cleaner-info">
                                        <div className="no-cleaner-content">
                                            <div className="no-cleaner-title">No Cleaner</div>
                                            <div className="no-cleaner-text">Assign a cleaner for the next guest!</div>
                                        </div>
                                        <ButtonNew label="Reassign" className="red"
                                                   onClick={ () => this.reassign() }/>
                                    </div>
                                }
                            </div>
                        </div>
                        <Reassign
                            id={ job.getId() }
                            open={ this.state.reassignOpen }
                            assignee={ job.getAssignee() }
                            cost={ job.getCost() }
                            property={ job.getPropertyId() }
                            onClose={ () => this.setState({ reassignOpen: false })}/>
                        <GoBack
                            open={ this.state.goBackOpen }
                            onSubmit={ this.props.goBack }
                            onClose={ () => this.setState({ goBackOpen: false })}/>
                        <Delete
                            open={ this.state.deleteOpen }
                            receiver={ this.state.cleaner.getFullName() }
                            onSubmit={ () => this.deleteJob() }
                            onClose={ () => this.setState({ deleteOpen: false })}/>
                        <div className="footer">
                            <ButtonNew label="Cancel Job" className="red ghost" onClick={ () => this.setState({ deleteOpen: true }) }/>
                            <div>
                                <ButtonNew label="Go Back" className="ghost back-button" onClick={ () => this.goBack() }/>
                                <ButtonNew label="Save & Send" icon="paperPlane" className="big" disabled={ !this.stateMonitor.isChanged() }/>
                            </div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    job: selectSelectedJob(),
    loading: makeSelectLoading(),
    cleaners: selectCleaners(),
});

export function mapDispatchToProps(dispatch) {
    return {
        updateVendor: (data) => dispatch(updateVendor(data)),
        fetchJob: (data) => dispatch(fetchJob(data)),
        deleteJob: (data) => dispatch(deleteJob(data)),
        goBack: () => dispatch(push('/vendors/dashboard')),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(JobDetails);
