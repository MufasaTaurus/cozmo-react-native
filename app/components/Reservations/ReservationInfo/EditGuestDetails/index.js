import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import {REGEXP_EMAIL} from 'utils/const';
import './editGuestDetails.less';


export class EditGuestDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            first_name: props.reservation.getGuestFirstName(),
            last_name: props.reservation.getGuestLastName(),
            email: props.reservation.getGuestEmail(),
            phone: props.reservation.getGuestPhone()
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
                        disabled={ !(
                            this.state.first_name &&
                            this.state.last_name &&
                            REGEXP_EMAIL.test(this.state.email) &&
                            (this.state.phone ? this.state.phone.length > 4 : true)
                        ) }
                        onTouchTap={ () => this.props.onSubmit(this.state) }
                    />
                ]}
                modal={ false }
                title="Edit Guest Details"
                overlayClassName="guest-details-card-modal"
                paperClassName="guest-details-card-modal-content"
                onRequestClose={ this.props.onClose }
                open={ this.props.open }
            >
                <div className="guest-details-card-input-wrapper first">
                    <TextField
                        floatingLabelText="First Name"
                        fullWidth={ true }
                        defaultValue={ this.state.first_name }
                        onChange={ (evt) => this.handleFormChange('first_name', evt.target.value) }
                    />
                </div>
                <div className="guest-details-card-input-wrapper second">
                    <TextField
                        floatingLabelText="Last Name"
                        fullWidth={ true }
                        defaultValue={ this.state.last_name }
                        onChange={ (evt) => this.handleFormChange('last_name', evt.target.value) }
                    />
                </div>
                <div className="guest-details-card-input-wrapper first">
                    <TextField
                        floatingLabelText="Email"
                        fullWidth={ true }
                        defaultValue={ this.state.email }
                        onChange={ (evt) => this.handleFormChange('email', evt.target.value) }
                    />
                </div>
                <div className="guest-details-card-input-wrapper second">
                    <TextField
                        floatingLabelText="Phone"
                        fullWidth={ true }
                        defaultValue={ this.state.phone }
                        onChange={ (evt) => this.handleFormChange('phone', evt.target.value) }
                    />
                </div>
            </Dialog>
        );
    }
}

export default EditGuestDetails;
