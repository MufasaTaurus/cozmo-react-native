import React from 'react';
import debounce from 'lodash/debounce';
import TitleHeader from 'components/TitleHeader';
import TextField from 'components/TextField';
import Select from 'components/Select';
import Section from '../Section/index';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateProperty, updateNewProperty } from 'containers/Properties/actions';
import { makeSelectSelectedProperty, makeSelectNewProperty } from 'containers/Properties/selectors';
import { fromJS } from 'immutable';
import './availability.less';

export class Availability extends React.Component {

    constructor(props) {
        super(props);
        const prop = props.create ? props.newProperty : props.property;
        this.state = {
            min_stay: prop.getIn(['availability', 0, 'min_stay']) || '',
            max_stay: prop.getIn(['availability', 0, 'max_stay']) || '',
            min_age: prop.getIn(['availability', 0, 'min_age']) || 13,
            check_in_from: prop.getIn(['check_in_out', 'check_in_from']) || null,
            check_in_to: prop.getIn(['check_in_out', 'check_in_to']) || null,
            check_out_until: prop.getIn(['check_in_out', 'check_out_until']) || null,
            advance_notice: prop.getIn(['availability', 0, 'advance_notice']) || 1,
            preparation: 0,
            window: prop.getIn(['availability', 0, 'window']) || 180,
            stayError: false
        };
        this.bookingWindow = [
            { name: 'Dates unavailable by default', value: 0 },
            { name: '3 months into the future', value: 90 },
            { name: '6 months into the future', value: 180 },
            { name: '9 months into the future', value: 270 },
            { name: '12 months into the future', value: 360 },
            { name: 'All future dates', value: 3600 },
        ];
        this.preparationTime = [
            { name: 'None', value: 0 },
            { name: '1 night before and after each reservation', value: 1 },
            { name: '2 nights before and after each reservation', value: 2 },
        ];
        this.notice = [
            { name: 'Same day (customizable cutoff hour)', value: 0 },
            { name: 'At least 1 day\'s notice', value: 1 },
            { name: 'At least 2 day\'s notice', value: 2 },
        ];
        this.checkInStartTime = [
            { name: 'Flexible', value: '' },
            { name: '08AM', value: '08:00' },
            { name: '09AM', value: '09:00' },
            { name: '10AM', value: '10:00' },
            { name: '11AM', value: '11:00' },
            { name: '12PM (noon)', value: '12:00' },
            { name: '01PM', value: '13:00' },
            { name: '02PM', value: '14:00' },
            { name: '03PM', value: '15:00' },
            { name: '04PM', value: '16:00' },
            { name: '05PM', value: '17:00' },
            { name: '06PM', value: '18:00' },
            { name: '07PM', value: '19:00' },
            { name: '08PM', value: '20:00' },
            { name: '09PM', value: '21:00' },
            { name: '10PM', value: '22:00' },
            { name: '11PM', value: '23:00' },
            { name: '12AM (midnight)', value: '00:00' },
            { name: '01AM (next day)', value: '01:00' },
        ];
        this.checkInEndTime = [
            { name: 'Flexible', value: '' },
            { name: '09AM', value: '09:00' },
            { name: '10AM', value: '10:00' },
            { name: '11AM', value: '11:00' },
            { name: '12PM (noon)', value: '12:00' },
            { name: '01PM', value: '13:00' },
            { name: '02PM', value: '14:00' },
            { name: '03PM', value: '15:00' },
            { name: '04PM', value: '16:00' },
            { name: '05PM', value: '17:00' },
            { name: '06PM', value: '18:00' },
            { name: '07PM', value: '19:00' },
            { name: '08PM', value: '20:00' },
            { name: '09PM', value: '21:00' },
            { name: '10PM', value: '22:00' },
            { name: '11PM', value: '23:00' },
            { name: '12AM (midnight)', value: '00:00' },
            { name: '01AM (next day)', value: '01:00' },
            { name: '02AM (next day)', value: '02:00' },
        ];
        this.checkOutTime = [
            { name: '12AM (midnight)', value: '' },
            { name: '01AM', value: '01:00' },
            { name: '02AM', value: '02:00' },
            { name: '03AM', value: '03:00' },
            { name: '04AM', value: '04:00' },
            { name: '05AM', value: '05:00' },
            { name: '06AM', value: '06:00' },
            { name: '07AM', value: '07:00' },
            { name: '08AM', value: '08:00' },
            { name: '09AM', value: '09:00' },
            { name: '10AM', value: '10:00' },
            { name: '11AM', value: '11:00' },
            { name: '12PM (noon)', value: '12:00' },
            { name: '01PM', value: '13:00' },
            { name: '02PM', value: '14:00' },
            { name: '03PM', value: '15:00' },
            { name: '04PM', value: '16:00' },
            { name: '05PM', value: '17:00' },
            { name: '06PM', value: '18:00' },
            { name: '07PM', value: '19:00' },
            { name: '08PM', value: '20:00' },
            { name: '09PM', value: '21:00' },
            { name: '10PM', value: '22:00' },
            { name: '11PM', value: '23:00' },
        ];
        this.saveChanges = debounce(this.saveChanges.bind(this), 1000);
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
        this.saveChanges(field, value);
    }

    saveChanges(section, val) {
        if (this.props.create) {
            let prop = this.props.newProperty.set('availability', fromJS([{
                min_stay: this.state.min_stay,
                max_stay: this.state.max_stay,
                min_age: this.state.min_age,
                advance_notice: this.state.advance_notice,
                window: this.state.window,
                time_frame: {}
            }]));
            prop = prop.set('check_in_out', fromJS({
                check_in_from: this.state.check_in_from,
                check_in_to: this.state.check_in_to,
                check_out_until: this.state.check_out_until,
            }));
            this.props.updateNewProperty(prop);
        } else {
            this.props.updateProperty({
                id: this.props.property.get('id'),
                section: 'availability',
                val: this.state
            });
            this.props.updateProperty({
                id: this.props.property.get('id'),
                section: 'check_in_out',
                val: this.state
            });
        }
    }

    checkStayDuration() {
        if (this.state.minStay > this.state.maxStay) {
            this.setState({ stayError: true });
        }
    }

    getTripLengthSection() {
        return (
            <div>
                <div className="column">
                    <TextField
                        id="min-stay"
                        onChange={ (evt) => this.handleChange('min_stay', parseInt(evt.target.value)) }
                        label="Minimum Stay"
                        type="number"
                        placeholder="-"
                        addonRight="Nights"
                        value={ this.state.min_stay }
                    />
                </div>
                <div className="column second-field">
                    <TextField
                        id="max-stay"
                        onChange={ (evt) => this.handleChange('max_stay', parseInt(evt.target.value)) }
                        label="Maximum Stay"
                        type="number"
                        placeholder="-"
                        addonRight="Nights"
                        value={ this.state.max_stay }
                    />
                </div>
            </div>
        );
    }

    getAgeRestrictionSection() {
        return (
            <div className="column">
                <TextField
                    id="min-age"
                    onChange={ (evt) => this.handleChange('min_age', parseInt(evt.target.value)) }
                    label="Minimum Age"
                    type="number"
                    placeholder="-"
                    addonRight="Years old"
                    value={ this.state.min_age }
                />
            </div>
        );
    }

    getCheckInSection() {
        return (
            <div>
                <div className="column">
                    <div className="side-by-side">
                        <Select
                            className="sel"
                            onChange={ (val) => this.handleChange('check_in_from', val) }
                            id="ch-in-s"
                            label="Check-In Start Time"
                            placeholder="-"
                            options={ this.checkInStartTime }
                            defaultValue={ this.state.check_in_from }
                        />
                        <Select
                            className="sel"
                            onChange={ (val) => this.handleChange('check_in_to', val) }
                            id="ch-in-e"
                            label="Check-In End Time"
                            placeholder="-"
                            options={ this.checkInEndTime }
                            defaultValue={ this.state.check_in_to }
                        />
                    </div>
                </div>
                <div className="column second-field">
                    <div className="side-by-side">
                        <Select
                            className="sel"
                            onChange={ (val) => this.handleChange('check_out_until', val) }
                            id="ch-out"
                            label="Check-Out Time"
                            placeholder="-"
                            options={ this.checkOutTime }
                            defaultValue={ this.state.check_out_until }
                        />
                    </div>
                </div>
            </div>
        );
    }

    getReservationInfoSection() {
        return (
            <div className="column">
                <Select
                    id="adv"
                    label="Advance Notice"
                    onChange={ (val) => this.handleChange('advance_notice', val) }
                    options={ this.notice }
                    value={ this.state.advance_notice }
                    defaultValue={ this.state.advance_notice }
                />
                <Select
                    id="prep"
                    label="Preparation Time"
                    onChange={ (val) => this.handleChange('preparation', val) }
                    options={ this.preparationTime }
                    value={ this.state.preparation }
                    defaultValue={ this.state.preparation }
                />
                <Select
                    id="book"
                    label="Booking Window"
                    onChange={ (val) => this.handleChange('window', val) }
                    options={ this.bookingWindow }
                    value={ this.state.window }
                    defaultValue={ this.state.window }
                />
            </div>
        );
    }

    render() {
        return (
            <section className="availability step">
                <TitleHeader title="Availability" icon="alarm" iconSize={ 21 }/>
                <Section
                    title={ 'Trip Length' }
                    customContent={ this.getTripLengthSection() }
                />
                <Section
                    title={ 'Age Restriction' }
                    customContent={ this.getAgeRestrictionSection() }
                />
                <Section
                    title={ 'Check In/Out Times' }
                    customContent={ this.getCheckInSection() }
                />
                <Section
                    title={ 'Reservation Preferences' }
                    customContent={ this.getReservationInfoSection() }
                />
                {/*<Section*/}
                    {/*title={ 'Calendars Syncing' }*/}
                    {/*customContent={ <Calendars create={ this.props.create }/> }*/}
                {/*/>*/}
            </section>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    property: makeSelectSelectedProperty(),
    newProperty: makeSelectNewProperty()
});

export function mapDispatchToProps(dispatch) {
    return {
        updateProperty: (data) => dispatch(updateProperty(data)),
        updateNewProperty: (data) => dispatch(updateNewProperty(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Availability);
