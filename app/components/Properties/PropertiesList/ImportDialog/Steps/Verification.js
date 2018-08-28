import React from 'react';
import Spinner from 'components/Spinner';
import ButtonNew from 'components/ButtonNew';
import ImportHeader from '../ImportHeader';
import Radio from 'components/Radio';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectMethod, makeSelectLoading, makeSelectTool } from 'containers/Properties/selectors';
import { setMethod, submitPhoneNumber } from 'containers/Properties/actions';
import ImportTool from 'models/ImportTool';
import image from 'assets/images/bg-import-login.jpg';

export class Verification extends React.Component {

    onFormSubmit() {
        if (this.props.method === 'email') {
            this.props.submitMethod();
        } else {
            this.props.nextStep();
        }
    }

    render() {
        const importTool = new ImportTool(this.props.tool);
        const top = {
            icon: <div className="logo-wrapper"><img src={ importTool.getLogo() } height="100%"/></div>,
            title: importTool.getName() + ' Import Tool: Verification',
        };
        const bottom = {
            image: image,
        };

        return (
            <div className="import-dialog-step">
                <ImportHeader
                    top={ top }
                    bottom={ bottom }
                    onClose={ this.props.onClose }
                    onBack={ this.props.onBack }
                />
                <div className="body">
                    { this.props.loading && <div className="disabler"><Spinner/></div> }
                    <div className="login-logo"><img src={ importTool.getLogo() } height="100%"/></div>
                    <div>{ importTool.getName() } is requesting verification. Please choose your verification method.</div>
                    <div className="methods">
                        { method({
                            title: 'SMS',
                            id: '0',
                            isActive: this.props.method === 'text',
                            onClick: () => this.props.selectMethod('text') })
                        }
                        { method({
                            title: 'Phone',
                            id: '1',
                            isActive: this.props.method === 'phone',
                            onClick: () => this.props.selectMethod('phone') })
                        }
                        { method({
                            title: 'Email',
                            id: '2',
                            isActive: this.props.method === 'email',
                            onClick: () => this.props.selectMethod('email') })
                        }
                    </div>
                    <ButtonNew
                        className="big"
                        label="Submit"
                        icon="security"
                        disabled={ !this.props.method || this.props.loading }
                        onClick={ () => this.onFormSubmit() } />
                </div>
            </div>
        );
    }
}

const method = ({ title, isActive, onClick, id }) => {
    return (
        <Radio label={ title } id={ id } checked={ isActive } onChange={ onClick }/>
    );
};

const mapStateToProps = createStructuredSelector({
    method: makeSelectMethod(),
    loading: makeSelectLoading(),
    tool: makeSelectTool()
});


export function mapDispatchToProps(dispatch) {
    return {
        selectMethod: (id) => dispatch(setMethod(id)),
        submitMethod: () => dispatch(submitPhoneNumber())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Verification);
