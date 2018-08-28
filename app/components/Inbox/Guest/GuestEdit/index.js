import React from 'react';
import Modal from 'components/Modal';
import TextField from 'components/TextField';
import SVG from 'components/SVG';
import { REGEXP_EMAIL } from 'utils/const';
import './guestEdit.less';

class GuestEdit extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: this.props.guest.getEmail(),
            phone: this.props.guest.getPhone(),
            secondaryPhone: this.props.guest.getSecondaryPhone(),
            secondaryPhoneShown: !!this.props.guest.getSecondaryPhone(),
            note: this.props.guest.getNote(),
        };
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    handleSubmit() {
        this.props.onSubmit({
            email: this.state.email,
            phone: this.state.phone,
            secondary_phone: this.state.secondaryPhoneShown ? this.state.secondaryPhone : '',
            note: this.state.note,
        });
        this.props.onClose();
    }

    canSubmit() {
        return (
            REGEXP_EMAIL.test(this.state.email) &&
            (this.state.phone && this.state.phone.length > 4) &&
            (this.state.secondaryPhoneShown && this.state.secondaryPhone && this.state.secondaryPhone.length > 4)
        );
    }

    render() {
        const content =
            <div className="guest-modal">
                Costumer Information
                <div className="inputs">
                    <div>
                        <div className="short">
                            <TextField
                                id="name"
                                label="Name"
                                value={ this.props.guest.getName() }
                                onChange={ evt => this.handleChange('name', evt.target.value) }
                                disabled={ true }/>
                        </div>
                        <div className="short">
                            <TextField
                                id="email"
                                label="Email"
                                value={ this.state.email }
                                onChange={ evt => this.handleChange('email', evt.target.value) }/>
                        </div>
                        <div className="short">
                            <TextField
                                id="primary phone"
                                label="Primary Phone"
                                value={ this.state.phone }
                                onChange={ evt => this.handleChange('phone', evt.target.value) }/>
                        </div>
                        { this.state.secondaryPhoneShown ?
                            <div>
                                <div className="short">
                                    <TextField
                                        id="secondary phone"
                                        label="Secondary Phone"
                                        value={ this.state.secondaryPhone }
                                        onChange={ evt => this.handleChange('secondaryPhone', evt.target.value) }/>
                                </div>
                                <div className="secondary-phone-button" onClick={ () => this.handleChange('secondaryPhoneShown', false) }>
                                    <SVG icon="deleteCircle" size="20"/>
                                </div>
                            </div>
                            :
                            <div className="secondary-phone-button" onClick={ () => this.handleChange('secondaryPhoneShown', true) }>
                                <SVG icon="addCircle" size="20"/>
                            </div>
                        }
                    </div>
                    <div className="note-wrapper">
                        <TextField
                            multiLine
                            id="note"
                            label="Note"
                            rows={ 22 }
                            value={ this.state.note }
                            onChange={ evt => this.handleChange('note', evt.target.value) }/>
                    </div>
                </div>
            </div>;

        return (
            <div className="guest-edit">
                <Modal
                    hideCancel
                    title="Edit Profile"
                    icon="edit"
                    submitDisabled={ !this.canSubmit() }
                    onClose={ this.props.onClose }
                    onSubmit={ () => this.handleSubmit() }
                    content={ content }
                />
            </div>
        );
    }
}

export default GuestEdit;
