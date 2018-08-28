import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Link } from 'react-router';
import ButtonNew from 'components/ButtonNew';
import CreatePassword from 'components/Signup/CreatePassword';
import BoxWithLogo from 'components/BoxWithLogo';
import { REGEXP_PASSWORD } from 'utils/const';
import { resetPassword, setKeys } from 'containers/ResetPassword/actions';
import { makeSelectLoading, makeSelectResetPasswordSuccess, makeSelectResetPasswordError } from 'containers/ResetPassword/selectors';
import './resetPassword.less';

export class ResetPasswordComponent extends React.PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            password: '',
            confirmPassword: '',
            showErrors: false,
        };
    }

    componentWillMount() {
        this.props.onLoad();
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    onSubmit() {
        if (REGEXP_PASSWORD.test(this.state.password)) {
            this.props.onSubmit({ password: this.state.password });
            this.setState({ showErrors: false });
        } else {
            this.setState({ showErrors: true });
        }
    }

    render() {
        const showErrors = this.state.showErrors;
        const content =
            this.props.success ?
                <BoxWithLogo
                    title="Success"
                    subtitle="You successfully changed your password."
                    content={
                        <div className="form">
                            <Link className="button-new" to="/" style={{ width: '100%' }}>Log in</Link>
                        </div>
                    }/>
                :
                <BoxWithLogo
                    title="Reset password"
                    content={
                        <form className="form" onSubmit={ (evt) => evt.preventDefault() }>
                            <div>
                                <CreatePassword
                                    password={ this.state.password }
                                    confirmPassword={ this.state.confirmPassword }
                                    handleChange={ (field, value) => this.handleChange(field, value) }
                                    showErrors={ showErrors }
                                />
                                <ButtonNew
                                    label={ 'Reset' }
                                    onClick={ () => this.onSubmit() }
                                    fullWidth={ true }
                                    type="submit"
                                    disabled={ !this.state.password }
                                />
                                { this.props.error && <div className="token-error">Your link expired. Please reset the password again.</div> }
                            </div>
                        </form>
                    }/>
        ;
        return (
            <div className="reset-password">
                { content }
            </div>
        );
    }
}


export function mapDispatchToProps(dispatch, ownProps) {
    return {
        onSubmit: (data) => dispatch(resetPassword(data)),
        onLoad: () => dispatch(setKeys({ token: ownProps.location.query.token, uid: ownProps.location.query.uid }))
    };
}

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
    success: makeSelectResetPasswordSuccess(),
    error: makeSelectResetPasswordError(),
});

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordComponent);
