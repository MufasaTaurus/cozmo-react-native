import React from 'react';
import { REGEXP_PHONE, REGEXP_EMAIL } from 'utils/const';
import ButtonNew from 'components/ButtonNew';
import TextField from 'components/TextField';
import SVG from 'components/SVG';
import './ownerContact.less';

export class OwnerContact extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            phone: props.owner.getPhone(),
            first_name: props.owner.getFirstName(),
            last_name: props.owner.getLastName(),
            email: props.owner.getEmail(),
            id: props.owner.getId()
        };
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    canSubmit() {
        return this.state.first_name &&
            this.state.last_name &&
            REGEXP_PHONE.test(this.state.phone) &&
            REGEXP_EMAIL.test(this.state.email);
    }

    submitForm() {
        this.setState({ editMode: false });
        //this.props.updateOwner(this.state);
    }

    render() {
        return (
            <div className="owner-details-contact">
                <div className="step-header">
                    <SVG className="step-header-icon" icon="contact"/>
                    <span>Owner Information</span>
                    { !this.state.editMode &&
                        <SVG className="step-header-icon edit" icon="edit" onClick={ () => this.setState({ editMode: true })}/>
                    }
                </div>
                <div className="owner-info">
                    { this.state.editMode ?
                        <div className="owner-info-form">
                            <TextField id="fname" label="First Name" value={ this.state.first_name }
                                       onChange={ (evt) => this.handleChange('first_name', evt.target.value) }/>
                            <TextField id="lname" label="Last Name" value={ this.state.last_name }
                                       onChange={ (evt) => this.handleChange('last_name', evt.target.value) }/>
                            <TextField id="email" label="Email" value={ this.state.email }
                                       onChange={ (evt) => this.handleChange('email', evt.target.value) }/>
                            <TextField id="phone" label="Phone Number" value={ this.state.phone }
                                       onChange={ (evt) => this.handleChange('phone', evt.target.value) }/>
                            <div className="submit">
                                <ButtonNew
                                    label="Save"
                                    className="green small"
                                    disabled={ !this.canSubmit() }
                                    onClick={ () => this.submitForm() }/>
                            </div>
                        </div>
                        :
                        <div className="owner-content-info">
                            <div>
                                <img className="image" src={ this.props.owner.getAvatar() }/>
                            </div>
                            <div className="info">
                                <div className="name">{ this.props.owner.getFullName() }</div>
                                <div className="email">{ this.state.email }</div>
                                <div className="phone">{ this.state.phone }</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default OwnerContact;

