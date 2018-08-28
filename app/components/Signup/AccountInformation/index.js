import React from 'react';
import BoxWithLogo from 'components/BoxWithLogo';
import ButtonNew from 'components/ButtonNew';
import TextField from 'components/TextField';
import Spinner from 'components/Spinner';
import Stepper from './Stepper';
import ErrorMsgBox from 'components/Signup/ErrorMsgBox';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectPhoneTaken } from 'containers/Onboarding/selectors';
import { REGEXP_PHONE } from 'utils/const';
import { finishOnboarding, submitFirstStep } from 'containers/Onboarding/actions';
import './accountInformation.less';

export class AccountInformation extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            phone: '',
            type: '',
            showPhoneErrors: false,
            step: 1,
            loading: false
        };

        this.types = [
            { type: 'Small Owner', title: 'Homeowner', desc: 'Having less than 10 properties.', icon: homeownerIcon },
            { type: 'Accountant', title: 'Business', desc: 'Having complex such as hotels.', icon: businessIcon },
            { type: 'House Broker', title: 'Property manager', desc: 'Managing other\'s properties.', icon: managerIcon },
        ];
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.phoneTaken === 'checking') {
            if (!nextProps.phoneTaken) {
                this.setState({ step: 2 });
            }

            this.setState({ loading: false });
        }
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    disableButton() {
        if (this.state.step === 1) {
            return !(this.state.firstName && this.state.lastName && this.state.phone);
        } else {
            return !this.state.type;
        }
    }

    submitForm() {
        if (this.state.step === 1) {
            if (REGEXP_PHONE.test(this.state.phone)) {
                this.setState({ showPhoneErrors: false, loading: true });
                this.props.submitFirstStep({
                    first_name: this.state.firstName,
                    last_name: this.state.lastName,
                    phone: this.state.phone
                });
            } else {
                this.setState({ showPhoneErrors: true });
            }
        } else {
            this.props.finishOnboarding({
                account_type: this.state.type
            });
            this.setState({ loading: true });
        }
    }

    renderForm() {
        const typeSection = (
            <div>
                <div className="user-type">What type of user are you?</div>
                <div className="types">
                    { this.types.map(type => Type({ ...type, active: type.type === this.state.type, onClick: (t) => this.setState({ type: t }) })) }
                </div>
            </div>
        );
        const disable = this.disableButton() || this.state.loading;
        return (
            <div className="form">
                <Stepper step={ this.state.step } onStepClick={ () => this.setState({ step: 1 }) }/>
                { this.state.step === 1 ?
                    <div>
                        <TextField
                            big
                            id="first-name"
                            placeholder="First name"
                            onChange={ evt => this.handleChange('firstName', evt.target.value) }
                            value={ this.state.firstName }
                        />
                        <TextField
                            big
                            id="last-name"
                            placeholder="Last name"
                            onChange={ evt => this.handleChange('lastName', evt.target.value) }
                            value={ this.state.lastName }
                        />
                        { this.state.showPhoneErrors &&
                            <ErrorMsgBox text="Please enter a valid phone number"/>
                        }
                        { this.props.phoneTaken === true &&
                            <ErrorMsgBox text="User with this phone number already exists"/>
                        }
                        <TextField
                            big
                            id="phone"
                            placeholder="Phone"
                            onChange={ evt => this.handleChange('phone', evt.target.value) }
                            value={ this.state.phone }
                            hasError={ this.state.showPhoneErrors || this.props.phoneTaken === true}
                        />
                    </div>
                    :
                    typeSection
                }
                <ButtonNew
                    label={ this.state.step === 1 ? 'Almost done' : 'Done' }
                    fullWidth
                    onClick={ () => this.submitForm() }
                    disabled={ disable }
                />
                { this.state.loading && <Spinner size={ 30 }/> }
            </div>
        );
    }

    render() {
        return (
            <div className="signup-box-account-information">
                <BoxWithLogo
                    title="Tell us more about you"
                    content={ this.renderForm() }
                />
            </div>
        );
    }
}

const Type = ({ type, title, desc, icon, onClick, active }) => {
    return (
        <div className={ 'type' + (active ? ' active' : '') } key={ type } onClick={ () => onClick(type) }>
            <div className="type-icon">
                { icon }
            </div>
            <div className="type-info">
                <div className="type-title">{ title }</div>
                <div className="type-subtitle">{ desc }</div>
            </div>
        </div>
    );
};

const homeownerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
        <g fill="none" fillRule="evenodd" opacity=".764">
            <path fill="#FFF" d="M29.629 21.297c-4.408 0-8.298-2.096-10.639-5.297-1.473 3.122-4.766 5.297-8.595 5.297a9.801 9.801 0 0 1-3.379-.604c-.008.2-.016.402-.016.604C7 29.97 14.387 37 23.5 37S40 29.97 40 21.297c0-1.465-.216-2.882-.61-4.228-2.375 2.59-5.866 4.228-9.761 4.228"/>
            <path fill="#000" fillRule="nonzero" d="M29.001 21.271a11.84 11.84 0 0 0 8.924-4.035l1.027-1.17.42 1.495c.414 1.479.628 3.003.628 4.548C40 31.437 32.389 39 23 39S6 31.437 6 22.109c0-.187.004-.332.016-.65l.045-1.17 1.1.42a8.386 8.386 0 0 0 10.654-4.359l.61-1.35.85 1.215a11.845 11.845 0 0 0 9.726 5.056zm0 1.675c-4.023 0-7.749-1.76-10.288-4.717a10.076 10.076 0 0 1-11.018 4.406c.279 8.16 7.025 14.69 15.305 14.69 8.458 0 15.314-6.813 15.314-15.216 0-.89-.079-1.774-.233-2.643a13.527 13.527 0 0 1-9.08 3.48z"/>
            <path fill="#10BDA5" d="M18.206 17.265C20.591 20.73 24.558 23 29.051 23c3.97 0 7.528-1.774 9.949-4.578C37.022 11.258 30.522 6 22.803 6 13.73 6 6.34 13.26 6 22.346A9.474 9.474 0 0 0 9.444 23c3.903 0 7.26-2.355 8.762-5.735"/>
            <path fill="#000" fillRule="nonzero" d="M9.327 24c-1.3 0-2.572-.248-3.784-.723L5 22.44C5.362 12.72 13.226 5 22.821 5 30.876 5 37.866 10.477 40 18.254l-.178.799C37.143 22.173 33.282 24 29.132 24c-4.237 0-8.16-1.906-10.823-5.103C16.419 22.018 13.051 24 9.327 24zm0-1.724c3.52 0 6.66-2.11 8.077-5.32l1.47-.139c2.322 3.394 6.119 5.459 10.259 5.459 3.498 0 6.76-1.473 9.103-4.01C36.163 11.47 29.953 6.724 22.82 6.724c-8.473 0-15.454 6.653-16.09 15.148a8.608 8.608 0 0 0 2.596.404z"/>
            <path fill="#000" d="M20 27a2 2 0 1 1-4 0 2 2 0 0 1 4 0M31 27a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
        </g>
    </svg>
);

const businessIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
        <g fill="none" fillRule="evenodd">
            <path fill="#FFF" d="M17 38h19V6H17z"/>
            <path fill="#000" fillRule="nonzero" d="M16.716 38a.717.717 0 0 1-.716-.717V5.717c0-.396.32-.717.716-.717h19.568c.395 0 .716.321.716.717v31.566c0 .396-.32.717-.716.717H16.716zm.716-1.435h18.136V6.435H17.432v30.13z"/>
            <path fill="#FFF" d="M7 38h12V11H7z"/>
            <path fill="#000" fillRule="nonzero" d="M6.696 38A.71.71 0 0 1 6 37.276V10.724c0-.4.312-.724.696-.724h11.608a.71.71 0 0 1 .696.724v26.552a.71.71 0 0 1-.696.724H6.696zm.697-1.448h10.214V11.448H7.393v25.104z"/>
            <path fill="#FFF" d="M12 37h20V21H12z"/>
            <path fill="#000" fillRule="nonzero" d="M12.717 38a.713.713 0 0 1-.717-.708V21.708c0-.39.321-.708.717-.708h20.566c.396 0 .717.317.717.708v15.584a.713.713 0 0 1-.717.708H12.717zm.718-1.417h19.13V22.417h-19.13v14.166z"/>
            <path fill="#FFCF06" d="M28 13h4v-3h-4z"/>
            <path fill="#000" fillRule="nonzero" d="M27.643 13L27 12.4V9.6l.643-.6h4.714l.643.6v2.8l-.643.6h-4.714zm.643-1.2h3.428v-1.6h-3.428v1.6z"/>
            <path fill="#FFCF06" d="M21 13h4v-3h-4z"/>
            <path fill="#000" fillRule="nonzero" d="M20.643 13L20 12.4V9.6l.643-.6h4.714l.643.6v2.8l-.643.6h-4.714zm.643-1.2h3.428v-1.6h-3.428v1.6z"/>
            <path fill="#FFCF06" d="M28 19h4v-3h-4z"/>
            <path fill="#000" fillRule="nonzero" d="M27.643 19L27 18.4v-2.8l.643-.6h4.714l.643.6v2.8l-.643.6h-4.714zm.643-1.2h3.428v-1.6h-3.428v1.6z"/>
            <path fill="#FFCF06" d="M21 19h4v-3h-4z"/>
            <path fill="#000" fillRule="nonzero" d="M20.643 19L20 18.4v-2.8l.643-.6h4.714l.643.6v2.8l-.643.6h-4.714zm.643-1.2h3.428v-1.6h-3.428v1.6z"/>
            <path fill="#FFCF06" d="M17 28h4v-4h-4z"/>
            <path fill="#000" fillRule="nonzero" d="M16.649 29L16 28.345v-3.69l.649-.655h4.702l.649.655v3.69l-.649.655H16.65zm4.054-1.31v-2.38h-3.406v2.38h3.406z"/>
            <path fill="#FFCF06" d="M25 29h4v-4h-4z"/>
            <path fill="#000" fillRule="nonzero" d="M24.649 29L24 28.345v-3.69l.649-.655h4.702l.649.655v3.69l-.649.655H24.65zm4.054-1.31v-2.38h-3.406v2.38h3.406zM9 16v-1h7v1zM9 19v-1h7v1z"/>
        </g>
    </svg>
);

const managerIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 44 44">
        <g fill="none" fillRule="evenodd">
            <path fill="#FFF" d="M27.572 22.045A11.771 11.771 0 0 1 17.9 17a8.564 8.564 0 0 1-7.814 5.045 8.55 8.55 0 0 1-3.071-.575c-.008.19-.015.382-.015.575C7 30.305 13.715 37 22 37c8.284 0 15-5.309 15-14.955 0-1.395-.196-2.745-.555-4.027a11.76 11.76 0 0 1-8.873 4.027"/>
            <path fill="#000" fillRule="nonzero" d="M27.625 22.026c3.228 0 6.228-1.405 8.312-3.81l1.044-1.206.427 1.54c.391 1.41.592 2.864.592 4.339C38 32.726 31.342 39 22 39c-8.837 0-16-7.213-16-16.111 0-.185.005-.362.016-.623l.049-1.202 1.115.433a7.7 7.7 0 0 0 2.793.529 7.784 7.784 0 0 0 7.106-4.635L17.7 16l.866 1.252c2.051 2.969 5.403 4.774 9.06 4.774zm0 1.726a12.68 12.68 0 0 1-9.634-4.435 9.481 9.481 0 0 1-8.018 4.435 9.301 9.301 0 0 1-2.247-.276c.306 7.673 6.58 13.798 14.274 13.798 8.42 0 14.286-5.528 14.286-14.385 0-.801-.067-1.596-.197-2.379a12.647 12.647 0 0 1-8.464 3.242z"/>
            <path fill="#64B5F6" d="M17.811 17.868c2.327 3.38 6.196 5.595 10.58 5.595 3.873 0 7.345-1.73 9.707-4.466-1.93-6.99-8.271-12.119-15.803-12.119-8.85 0-16.06 7.083-16.393 15.947a9.243 9.243 0 0 0 3.36.638c3.809 0 7.084-2.297 8.549-5.595"/>
            <path fill="#000" fillRule="nonzero" d="M9.148 24.439a10.1 10.1 0 0 1-3.692-.705l-.53-.817c.354-9.484 8.026-17.015 17.387-17.015 7.859 0 14.678 5.344 16.76 12.931l-.173.78c-2.614 3.044-6.38 4.826-10.43 4.826-4.134 0-7.96-1.86-10.559-4.979-1.844 3.046-5.13 4.979-8.763 4.979zm0-1.682c3.434 0 6.497-2.058 7.88-5.19l1.434-.135c2.266 3.31 5.97 5.325 10.009 5.325 3.413 0 6.595-1.437 8.88-3.912-2.021-6.63-8.08-11.26-15.038-11.26-8.266 0-15.077 6.49-15.698 14.778.822.26 1.671.394 2.533.394z"/>
            <path fill="#000" d="M18 26.976a2 2 0 1 1-4 0 2 2 0 0 1 4 0M30 26.976a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
            <path fill="#000" fillRule="nonzero" d="M38.933 20l-2.251-.153c.025-.373.037-.694.037-1 0-8.05-6.38-14.571-14.243-14.571-7.864 0-14.244 6.52-14.244 14.572 0 .305.013.626.038 1L6.018 20c-.028-.42-.042-.791-.042-1.152C5.976 9.546 13.359 2 22.476 2c9.116 0 16.5 7.546 16.5 16.848 0 .361-.015.731-.043 1.152z"/>
            <path fill="#FFCF06" d="M6.846 18C4.731 18 3 19.421 3 21.158v5.684C3 28.579 4.73 30 6.846 30H8V18H6.846z"/>
            <path fill="#000" fillRule="nonzero" d="M6.925 17h1.221l.854.857v12.286L8.146 31H6.925C4.252 31 2 29.211 2 26.91v-5.82C2 18.79 4.252 17 6.925 17zm0 1.714c-1.806 0-3.217 1.121-3.217 2.376v5.82c0 1.255 1.411 2.376 3.217 2.376h.367V18.714h-.367z"/>
            <path fill="#FFCF06" d="M41 26.842v-5.685C41 19.421 39.27 18 37.154 18H36v12h1.154C39.269 30 41 28.579 41 26.842"/>
            <path fill="#000" fillRule="nonzero" d="M42 26.91C42 29.21 39.748 31 37.075 31h-1.221L35 30.143V17.857l.854-.857h1.221C39.748 17 42 18.789 42 21.09v5.82zm-4.925 2.376c1.806 0 3.217-1.121 3.217-2.376v-5.82c0-1.255-1.411-2.376-3.217-2.376h-.367v10.572h.367zM6 29h1.68v5.581c0 2.608 2.144 4.745 4.76 4.745H13V41h-.56C8.896 41 6 38.114 6 34.581V29z"/>
            <path fill="#000" fillRule="nonzero" d="M15.333 40.5a.833.833 0 1 0-1.666 0 .833.833 0 0 0 1.666 0zm1.667 0a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
        </g>
    </svg>
);

const mapStateToProps = createStructuredSelector({
    phoneTaken: selectPhoneTaken()
});

export function mapDispatchToProps(dispatch) {
    return {
        submitFirstStep: (data) => dispatch(submitFirstStep(data)),
        finishOnboarding: (data) => dispatch(finishOnboarding(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccountInformation);
