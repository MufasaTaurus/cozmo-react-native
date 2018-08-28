import React from 'react';
import JobsDetails from './JobsDetails';
import WeeklyCalendar from './WeeklyCalendar';
import MonthlyCalendar from './MonthlyCalendar';
import CreateJob from './CreateJob';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectVendors, makeSelectLoading, makeSelectVendorsListQuery, selectCalendarDisplay } from 'containers/Vendors/selectors';
import { fetchCalendar, addNewJob, changeCalendarDisplay } from 'containers/Vendors/actions';
import './dashboard.less';

export class Dashboard extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            createOpen: false,
            selectedDay: null,
            status: 'Not Started',
            date: null,
            propertyId: null
        };

    }

    changeView(display) {
        if (display !== this.state.display) {
            this.props.changeDisplay(display);
        }
    }

    openCreateJob(day, propertyId) {
        this.setState({
            createOpen: true,
            date: day,
            propertyId: propertyId
        });
    }

    render() {
        return (
            <div className="vendors-dashboard">
                <div className="content">
                    { this.props.display === 'week' ?
                        <WeeklyCalendar
                            changeView={ (view) => this.changeView(view) }
                            openJobCreation={ (day, prop) => this.openCreateJob(day, prop) }/>
                        :
                        <div className="side-by-side">
                            <MonthlyCalendar
                                changeView={ (view) => this.changeView(view) }
                                onDaySelected={ (day) => this.setState({ selectedDay: day }) }
                                selected={{ day: this.state.selectedDay, status: this.state.status }}
                                openJobCreation={ (day) => this.openCreateJob(day) }/>
                            <JobsDetails day={ this.state.selectedDay } status={ this.state.status }/>
                        </div>
                    }
                    { this.state.createOpen &&
                        <CreateJob
                            onClose={ () => this.setState({ createOpen: false }) }
                            date={ this.state.date }
                            onSubmit={ this.props.createJob }
                            property={ this.state.propertyId }
                            open={ this.state.createOpen }/>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    vendors: makeSelectVendors(),
    loading: makeSelectLoading(),
    query: makeSelectVendorsListQuery(),
    display: selectCalendarDisplay()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchCalendar: (data) => dispatch(fetchCalendar(data)),
        createJob: (data) => dispatch(addNewJob(data)),
        changeDisplay: (data) => dispatch(changeCalendarDisplay(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
