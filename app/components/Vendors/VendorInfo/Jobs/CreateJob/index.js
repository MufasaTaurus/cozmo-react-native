import React from 'react';
import moment from 'moment';
import PropertyPicker from 'components/PropertyPicker';
import MenuItem from 'material-ui/MenuItem';
import Dialog from 'material-ui/Dialog';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import SelectField from 'material-ui/SelectField';
import TextField from 'material-ui/TextField';
import Washer from 'material-ui/svg-icons/maps/local-laundry-service';
import Car from 'material-ui/svg-icons/maps/directions-car';
import Wrench from 'material-ui/svg-icons/action/build';
import Check from 'material-ui/svg-icons/notification/event-available';
import Greet from 'material-ui/svg-icons/communication/chat';
import Slider from 'rc-slider';
import {connect} from 'react-redux';
import {addNewJob} from 'containers/Vendors/actions';
import './createJob.less';
import 'rc-slider/assets/index.css';
const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

export class CreateJob extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            type: 'Clean',
            payment: '',
            date: '',
            property: '',
            hours: [8, 16]
        };
    }

    handleFormChange(field, value) {
        this.setState({ [field]: value });
    }

    getTime(hour) {
        let time = 'am';
        if(hour > 12) {
            time = 'pm';
            hour -= 12;
        }
        return hour + time;
    }

    onSubmit() {
        const date = moment(this.state.date);
        const from = moment(date).hours(this.state.hours[0]);
        const to = moment(date).hours(this.state.hours[1]);
        const data = {
            job_type: this.state.type,
            cost: this.state.payment,
            prop: this.state.property,
            assignee: this.props.id,
            time_frame: {
                lower: from.format('YYYY-MM-DDTHH:mm:00Z'),
                upper: to.format('YYYY-MM-DDTHH:mm:00Z'),
            }
        };
        this.props.addNewJob(data);
        this.props.onClose();
    }

    canAddJob() {
        return (
            this.state.payment &&
            this.state.date
        );
    }

    render() {
        const disabledSubmit = !this.canAddJob();
        return (
            <Dialog className="create-job-modal"
                    paperClassName="create-job-modal-card"
                    actions={[
                        <FlatButton
                            label="Cancel"
                            primary={ true }
                            onClick={ this.props.onClose }
                        />,
                        <FlatButton
                            label="Create Job"
                            primary={ true }
                            disabled={ disabledSubmit }
                            onClick={ () => this.onSubmit() }
                        />
                    ]}
                    open={ this.props.open }
                    modal={ true }
            >
                <p className="title">Add Job</p>
                <p className="subtitle">Invite a new Vendor to work with your properties</p>
                <form>
                    <div className="property-picker-wrapper">
                        <div className="picker-title">Property</div>
                        <PropertyPicker onSelect={ (property) => this.handleFormChange('property', property.get('id')) }/>
                    </div>
                    <div className="payment">
                        <TextField
                            floatingLabelText="Payment ($)"
                            fullWidth={ true }
                            type="number"
                            min="0"
                            defaultValue={ this.state.payment }
                            onChange={ (evt) => this.handleFormChange('payment', evt.target.value) }
                        />
                    </div>
                    <div className="date">
                        <DatePicker
                            hintText="Date"
                            container="inline"
                            fullWidth={ true }
                            onChange={ (evt, date) => this.handleFormChange('date', date) }
                            autoOk={ true } />
                    </div>
                    <div className="hours">
                        <div className="displayed-hours">

                            { this.getTime(this.state.hours[0]) } - { this.getTime(this.state.hours[1]) }
                            </div>
                        <Range
                            min={ 0 }
                            max={ 24 }
                            marks={{ 4: '4am', 6: '6am', 8: '8am', 10: '10am', 12: '12am', 14: '14pm', 16: '4pm', 18: '6pm', 20: '8pm' }}
                            defaultValue={ this.state.hours }
                            step={ 1 }
                            onAfterChange={ (value) => this.handleFormChange('hours', value) }
                        />
                    </div>
                    <div className="short">
                        <SelectField
                            fullWidth={ true }
                            floatingLabelText="Job Type"
                            value={ this.state.type }
                            onChange={ (evt, index, val) => this.handleFormChange('type', val) }
                        >
                            <MenuItem value={ 'Clean' } primaryText="Clean" leftIcon={<Washer />}/>
                            <MenuItem value={ 'Repair' } primaryText="Repair" leftIcon={<Wrench />}/>
                            <MenuItem value={ 'Greet' } primaryText="Greet" leftIcon={<Greet />}/>
                            <MenuItem value={ 'Delivery' } primaryText="Delivery" leftIcon={<Car />}/>
                            <MenuItem value={ 'Checkup' } primaryText="Checkup" leftIcon={<Check />}/>
                        </SelectField>
                    </div>
                </form>
            </Dialog>
        );
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        addNewJob: (data) => dispatch(addNewJob(data)),
    };
}

export default connect(null, mapDispatchToProps)(CreateJob);
