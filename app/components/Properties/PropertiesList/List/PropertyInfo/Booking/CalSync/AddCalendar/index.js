import React from 'react';
import { REGEXP_URL } from 'utils/const';
import debounce from 'lodash/debounce';
import Spinner from 'components/Spinner';
import TextField from 'components/TextField';
import CalendarPreview from 'components/CalendarPreview';
import ActionButton from 'components/ActionButton';
import StatusLabel from 'components/StatusLabel';
import ColorPicker from './ColorPicker';
import Modal from 'components/Modal';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { checkCalendarUrl, addCalendar, updateCalendar, resetUrlError, syncCalendar, resetCalendarEvents } from 'containers/Properties/actions';
import { addAlert } from 'containers/App/actions';
import { makeSelectCalendarURLError, makeSelectCalendarEvents, selectCalendarChecking, makeSelectSelectedProperty, makeSelectNewProperty } from 'containers/Properties/selectors';
import PropertyModel from 'models/Property';
import './addCalendar.less';

export class AddCalendar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            form: {
                name: props.calendar ? props.calendar.getName() : '',
                url: props.calendar ? props.calendar.getUrl() : '',
                description: props.calendar ? props.calendar.getDescription() : '',
                enabled: props.calendar ? props.calendar.getEnabled() : true,
            },
            color: { name: props.calendar ? props.calendar.getColorName() : 'grey', id: props.calendar ? props.calendar.getColorId() : null },
            events: props.calendar ? props.calendar.getEvents() : 0,
            id: props.calendar ? props.calendar.getId() : '',
            originalURL: props.calendar ? props.calendar.getUrl() : ''
        };
        this.checkCalendarURL = debounce(this.checkCalendarURL.bind(this), 1300);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ events: nextProps.events.size });
        // if (nextProps.calendar) {
        //     //this.props.checkCalendarUrl(nextProps.calendar.getUrl());
        //     this.handleFormChange('url', nextProps.calendar.getUrl());
        // }
    }

    componentWillMount() {
        if (this.props.calendar) {
            this.props.checkCalendarUrl(this.props.calendar.getUrl());
        }
    }

    componentWillUnmount() {
        this.props.resetCalendarEvents();
    }

    handleFormChange(field, val) {
        const change = { [field]: val };
        this.setState({
            form: Object.assign(this.state.form, change)
        });

        if (field === 'url') {
            this.checkCalendarURL();
        }
    }

    checkCalendarURL() {
        const url = this.state.form.url;
        if (this.state.originalURL && this.state.originalURL === url) {
            return;
        }
        if (REGEXP_URL.test(url)) {
            this.props.checkCalendarUrl(url);
        }
    }

    onClose() {
        this.props.resetUrlError();
        this.props.onClose();
    }

    submitForm() {
        const property = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
        const cal = {
            id: property.getCalendarId(),
            calId: this.state.id,
            propertyId: property.getId(),
            url: this.state.form.url,
            name: this.state.form.name,
            description: this.state.form.description,
            enabled: this.state.form.enabled,
            events_count: this.state.events,
            create: this.props.create,
            color: this.state.color.id
        };

        if (this.state.id) {
            this.updateCalendar(cal);
        } else {
            this.addCalendar(cal);
        }
    }

    addCalendar(cal) {
        this.props.addCalendar(cal);
        this.props.onClose();
    }

    updateCalendar(cal) {
        this.props.updateCalendar(cal);
        this.props.onClose();
    }

    getErrorText() {
        if (this.props.urlError.indexOf('[error]') === 0) {
            const base = 'Unable to import iCal - ';
            const originalError = this.props.urlError.replace('[error]', '');
            let modifiedError = originalError;
            if (originalError === 'This field must be unique.') {
                modifiedError = 'This calendar already exists.';
            }

            return base + modifiedError;
        } else {
            return '';
        }
    }

    canSaveCalendar() {
        return (
            (this.state.form.name &&
            this.props.urlError === 'ok' &&
            this.state.originalURL === '') ||
            (this.state.originalURL === this.state.form.url &&
            this.state.form.name) ||
            (this.state.originalURL !== this.state.form.url &&
            this.props.urlError === 'ok' &&
            this.state.form.name)
        );
    }

    onEventColorChange(color) {
        this.setState({ color: color });
    }

    getSyncHistory() {
        const logs = this.props.calendar.getLogs();
        return (
            <div className="table-wrapper">
                <div className="table-title">
                    Sync History
                </div>
                <table className="sync-table">
                    <thead>
                        <tr>
                            <th>Last Sync</th>
                            <th>Events Found</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    { logs.map((log, index) => {
                        return (
                            <tr key={ index }>
                                <td>{ log.getDate() }</td>
                                <td>{ log.getEvents() }</td>
                                <td>
                                    <div className="label">
                                        <StatusLabel label={ log.getStatus() }/>
                                    </div>
                                </td>
                            </tr>
                        );
                    }) }
                    </tbody>
                </table>
                <ActionButton
                    className="action-button"
                    icon="sync"
                    onClick={ () => this.props.syncCalendar({
                        calId: this.state.id,
                        id: this.props.calendarRootId,
                        propId: this.props.propId
                    }) }
                />
            </div>
        );
    }

    render() {
        const canSubmitForm = this.canSaveCalendar();
        const errorText = this.getErrorText();
        const modalContent =
            <div>
                <div className="modal-section">
                    <TextField
                        id="url"
                        label="URL"
                        value={ this.state.form.url }
                        hasError={ errorText }
                        onChange={ (evt) => this.handleFormChange('url', evt.target.value) }
                    />
                    <TextField
                        id="name"
                        label="Name"
                        maxLength={ 100 }
                        value={ this.state.form.name }
                        onChange={ (evt) => this.handleFormChange('name', evt.target.value) }
                    />
                    <TextField
                        id="desc"
                        label="Description"
                        maxLength={ 200 }
                        value={ this.state.form.description }
                        onChange={ (evt) => this.handleFormChange('description', evt.target.value) }
                    />
                </div>
                <div className="events-preview">
                    { this.props.loading && <div className="disabler"><Spinner/></div> }
                    <CalendarPreview events={ this.props.events } color={ this.state.color.name }/>
                    <ColorPicker onSelect={ (color) => this.onEventColorChange(color) } active={ this.state.color.name }/>
                    {/*<div className="events-count">*/}
                        {/*{ this.props.events.size > 0 &&*/}
                        {/*<span>*/}
                            {/*<span>&#9679;&nbsp;</span>*/}
                            {/*<span>*/}
                                {/*{ this.props.events.size + ' Event' + (this.props.events.size > 1 ? 's' : '') + ' found' }*/}
                            {/*</span>*/}
                        {/*</span>*/}
                        {/*}*/}
                    {/*</div>*/}
                </div>
                { this.state.id && this.getSyncHistory() }
            </div>;

        return (
            <div className="availability-calendars-add-calendar-modal">
                <Modal className="add-calendar"
                       title={ this.state.id ? 'Edit Calendar' : 'Create Calendar' }
                       icon="addBox"
                       onClose={ () => this.onClose() }
                       onSubmit={ () => this.submitForm() }
                       submitDisabled={ !canSubmitForm }
                       content={ modalContent }
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    property: makeSelectSelectedProperty(),
    newProperty: makeSelectNewProperty(),
    loading: selectCalendarChecking(),
    urlError: makeSelectCalendarURLError(),
    events: makeSelectCalendarEvents()
});

export function mapDispatchToProps(dispatch) {
    return {
        addAlert: (alert) => dispatch(addAlert(alert)),
        checkCalendarUrl: (url) => dispatch(checkCalendarUrl(url)),
        addCalendar: (data) => dispatch(addCalendar(data)),
        updateCalendar: (data) => dispatch(updateCalendar(data)),
        syncCalendar: (data) => dispatch(syncCalendar(data)),
        resetUrlError: () => dispatch(resetUrlError()),
        resetCalendarEvents: () => dispatch(resetCalendarEvents())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCalendar);
