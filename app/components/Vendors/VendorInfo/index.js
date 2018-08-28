import React from 'react';
import { REGEXP_PHONE, REGEXP_EMAIL } from 'utils/const';
import Breadcrumbs from 'components/Breadcrumbs';
import TextField from 'components/TextField';
import ButtonNew from 'components/ButtonNew';
import SVG from 'components/SVG';
import Jobs from './Jobs';
import AssignedProperties from './AssignedProperties';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateVendor } from 'containers/Vendors/actions';
import { addAlert } from 'containers/App/actions';
import { makeSelectVendors, makeSelectLoading } from 'containers/Vendors/selectors';
import VendorModel from 'models/Vendor';
import './vendorInfo.less';

export class VendorInfo extends React.Component {

    constructor(props) {
        super(props);
        this.vendor = new VendorModel(this.props.vendors.filter((r) => r.get('id') + '' === this.props.id).first());
        this.state = {
            phone: this.vendor.getPhone(),
            first_name: this.vendor.getFirstName(),
            last_name: this.vendor.getLastName(),
            email: this.vendor.getEmail(),
            type: this.vendor.getType(),
            editMode: false
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
        this.props.updateVendor({
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            phone: this.state.phone,
            email: this.state.email,
            id: this.props.id,
        });
    }

    render() {
        const name = this.vendor.getFullName();
        return (
            <div className="vendor-info">
                <Breadcrumbs section={ 'Cleaner Details: ' + name } subsection={[{ title: 'Cleaners' }]} />
                <div className="content">
                    <div className="combined-sections">
                        <div className="assigned-properties">
                            <AssignedProperties id={ this.props.id }/>
                        </div>
                        <div className="cleaner-info">
                            <div className="section-header">
                                <SVG className="section-header-icon" icon="contact"/>
                                <span>Cleaner Information</span>
                                { !this.state.editMode &&
                                    <SVG className="section-header-icon edit" icon="edit" onClick={ () => this.setState({ editMode: true })}/>
                                }
                            </div>
                            { this.state.editMode ?
                                <div className="cleaner-info-form">
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
                                <div className="content">
                                    <div>
                                        <img className="image" src={ this.vendor.getAvatar() }/>
                                    </div>
                                    <div className="info">
                                        <div className="name">{ name }</div>
                                        <div className="email">{ this.state.email }</div>
                                        <div className="phone">{ this.state.phone }</div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                    <div className="jobs">
                        <Jobs id={ this.props.id } name={ this.state.first_name } />
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    vendors: makeSelectVendors(),
    loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        updateVendor: (data) => dispatch(updateVendor(data)),
        addAlert: (data) => dispatch(addAlert(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorInfo);

