import React from 'react';
import ButtonNew from 'components/ButtonNew';
import AddCalendar from './AddCalendar';
import ActionButton from 'components/ActionButton';
import Spinner from 'components/Spinner';
import TitleHeader from 'components/TitleHeader';
import ClipboardButton from 'react-clipboard.js';
import { CALENDAR_URL_BASE } from 'utils/const';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { deleteCalendar, syncCalendar } from 'containers/Properties/actions';
import { addAlert } from 'containers/App/actions';
import { makeSelectSelectedProperty, makeSelectLoading, makeSelectNewProperty, selectSyncingCalendar } from 'containers/Properties/selectors';
import CalendarModel from 'models/Calendar';
import PropertyModel from 'models/Property';
import MoreMenu from 'components/MoreMenu';
import './calendars.less';

export class Calendars extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            editingCalendar: null
        };
        this.property = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.syncingCalendar === 'checking') {
            if (nextProps.syncingCalendar === 'ok') {
                this.addAlert('Calendar synced successfully');
            } else if (nextProps.syncingCalendar === 'error') {
                this.addAlert('Unable to sync Calendar');
            }
        }
        if (this.state.editingCalendar) {
            const updatedCal = (new PropertyModel(nextProps.create ? nextProps.newProperty : nextProps.property))
                .getICals()
                .map(c => new CalendarModel(c))
                .filter(c => c.getId() === this.state.editingCalendar.getId())
                .first();
            this.setState({ editingCalendar: updatedCal });
        }
        this.setState({
            actionLoading: false
        });
    }

    addAlert(message) {
        this.props.addAlert({ message: message });
    }

    closeDialog() {
        this.setState({
            dialogOpen: false,
            editingCalendar: null
        });
    }

    deleteCalendar(id) {
        this.props.deleteCalendar({
            id: this.property.getCalendarId(),
            calId: id,
            propertyId: this.property.getId(),
            create: this.props.create
        });
    }

    editCalendar(cal) {
        this.setState({
            editingCalendar: cal,
            dialogOpen: true,
        });
    }

    render() {
        const property = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
        const calendarURL = CALENDAR_URL_BASE + property.getCalendarId() + '/ical';
        const externalCals = property.getICals().map(c => new CalendarModel(c));
        const calendarsTable =
            <div className="calendars-table">
                { this.props.loading && <div className="disabler"><Spinner/></div> }
                <div className="add-button-wrapper">
                    <div className="section-title">Calendars Syncing</div>
                    <ButtonNew
                        label="Add"
                        className="small"
                        onClick={ () => this.setState({ dialogOpen: true }) }
                    />
                </div>
                <table>
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td className="events">Events</td>
                        <td className="status">Status</td>
                        <td className="date">Date Synced</td>
                        <td className="action">Sync Now</td>
                        <td className="action">Export Link</td>
                        <td />
                    </tr>
                    </thead>
                    <tbody>
                    { externalCals.map(cal => {
                        return (
                            <tr className="ical-row" key={ cal.getId() } onClick={ () => this.editCalendar(cal) }>
                                <td className="name"><span className="dot" style={ { background: cal.getColor() } }/>{ cal.getName() }</td>
                                <td className="events">{ cal.getEvents() }</td>
                                <td className="status">
                                    <div className={ 'label ' + (cal.getStatus().toLowerCase()) }>
                                        { cal.getStatus() }
                                    </div>
                                </td>
                                <td>
                                    <div>{ cal.getDateUpdated() }</div>
                                    <div>{ cal.getTimeUpdated() }</div>
                                </td>
                                <td onClick={ (e) => e.stopPropagation() }>
                                    <ActionButton
                                        icon="sync"
                                        onClick={ () => this.props.syncCalendar({
                                            calId: cal.getId(),
                                            id: this.property.getCalendarId(),
                                            propId: this.property.getId()
                                        }) }
                                    />
                                </td>
                                <td onClick={ (e) => e.stopPropagation() }>
                                    <ClipboardButton
                                        className="clipboard-button"
                                        data-clipboard-text={ calendarURL }
                                        onSuccess={ () => this.addAlert('Copied to clipboard!') }
                                    >
                                        <ActionButton icon="import"/>
                                    </ClipboardButton>
                                </td>
                                <td onClick={ (e) => e.stopPropagation() }>
                                    <MoreMenu buttons={ [
                                        { label: 'Edit', click: () => this.editCalendar(cal) },
                                        { label: 'Delete', click: () => this.deleteCalendar(cal.getId()) }
                                    ] }/>
                                </td>
                            </tr>
                        );
                    }) }
                    </tbody>
                </table>
            </div>;
        return (
            <div className="availability-calendars step">
                <TitleHeader title="iCal Sync" icon="sync"/>
                <div className="content-section">
                    { calendarsTable }
                </div>
                { this.state.dialogOpen &&
                <AddCalendar
                    onClose={ () => this.closeDialog() }
                    create={ this.props.create }
                    calendar={ this.state.editingCalendar }
                    calendarRootId={ this.property.getCalendarId() }
                    propId={ this.property.getId() }
                />
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    property: makeSelectSelectedProperty(),
    newProperty: makeSelectNewProperty(),
    loading: makeSelectLoading(),
    syncingCalendar: selectSyncingCalendar(),
});

export function mapDispatchToProps(dispatch) {
    return {
        addAlert: (alert) => dispatch(addAlert(alert)),
        deleteCalendar: (data) => dispatch(deleteCalendar(data)),
        syncCalendar: (data) => dispatch(syncCalendar(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendars);
