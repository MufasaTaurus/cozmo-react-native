import React from 'react';
import Spinner from 'components/Spinner';
import ButtonNew from 'components/ButtonNew';
import ImportHeader from '../ImportHeader';
import SVG from 'components/SVG';
import TextField from 'components/TextField';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectPin, makeSelectLoading, makeSelectTool } from 'containers/Properties/selectors';
import { setPin, verifyPin } from 'containers/Properties/actions';
import ImportTool from 'models/ImportTool';
import image from 'assets/images/bg-import-large.jpg';

export class EnterPin extends React.Component {

    render() {
        const importTool = new ImportTool(this.props.tool);
        const bottom = {
            image: image,
            content:
                <div className="header-content">
                    <div className="logo-wrapper"><img src={ importTool.getLogo() } height="100%"/></div>
                    <div className="title">
                        <SVG icon="import" size="64"/>
                        <div className="title-text">
                            { importTool.getName() } Import Tool
                            <div className="subtitle">
                                Verification
                            </div>
                        </div>
                    </div>
                </div>
        };

        return (
            <div className="import-dialog-step">
                <ImportHeader
                    bottom={ bottom }
                    onClose={ this.props.onClose }
                    onBack={ this.props.onBack }
                />
                <div className="body">
                    { this.props.loading && <div className="disabler"><Spinner/></div> }
                    <div className="desc">A verification code has been sent to you by the method you specified. Please enter it below.</div>
                    <form onSubmit={ (evt) => evt.preventDefault() }>
                        <TextField
                            id="0"
                            placeholder={ 'Enter PIN' }
                            onChange={ this.props.setPin }/>
                        <ButtonNew
                            className="big"
                            label="Verify"
                            disabled={ !this.props.pin || this.props.loading }
                            onClick={ this.props.verifyPin } />
                        <div className="send-again">
                            Didn’t receive one? <a className="send-again-link">Send again</a>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    pin: makeSelectPin(),
    loading: makeSelectLoading(),
    tool: makeSelectTool()
});


export function mapDispatchToProps(dispatch) {
    return {
        setPin: (evt) => dispatch(setPin(evt.target.value)),
        verifyPin: () => dispatch(verifyPin())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnterPin);
