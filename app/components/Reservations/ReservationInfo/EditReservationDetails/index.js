import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';
import moment from 'moment';
import './editReservationDetails.less';


export class EditReservationDetails extends React.Component {

    constructor(props) {
        super(props);
        this.format = 'YYYY-MM-DD';
        this.state = {
            start_date: props.reservation.getStartDate(this.format),
            end_date: props.reservation.getEndDate(this.format),
        };
    }

    handleFormChange(field, value) {
        this.setState({ [field]: value });
    }

    render() {
        return (
            <Dialog
                actions={[
                    <FlatButton
                        label={ 'Save' }
                        primary={ true }
                        disabled={ !(this.state.start_date && this.state.end_date) }
                        onTouchTap={ () => this.props.onSubmit(this.state) }
                    />
                ]}
                modal={ false }
                title="Edit Reservation Details"
                overlayClassName="reservation-details-card-modal"
                paperClassName="reservation-details-card-modal-content"
                onRequestClose={ this.props.onClose }
                open={ this.props.open }
            >
                <div className="reservation-details-card-input-wrapper first">
                    <DatePicker
                        floatingLabelText="Check-In date"
                        autoOk={ true }
                        fullWidth={ true }
                        defaultDate={ new Date(this.state.start_date) }
                        onChange={ (evt, date) => this.handleFormChange('start_date', moment(date).format(this.format)) }
                        maxDate={ new Date(this.state.end_date) }
                    />
                </div>
                <div className="reservation-details-card-input-wrapper second">
                    <DatePicker
                        floatingLabelText="Check-Out date"
                        autoOk={ true }
                        fullWidth={ true }
                        defaultDate={ new Date(this.state.end_date) }
                        onChange={ (evt, date) => this.handleFormChange('end_date', moment(date).format(this.format)) }
                        minDate={ new Date(this.state.start_date) }
                    />
                </div>
            </Dialog>
        );
    }
}

export default EditReservationDetails;
