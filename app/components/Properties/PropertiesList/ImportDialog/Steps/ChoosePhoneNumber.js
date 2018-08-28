import React from 'react';
import Spinner from 'components/Spinner';
import ButtonNew from 'components/ButtonNew';
import Radio from 'components/Radio';
import ImportHeader from '../ImportHeader';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectPhones, makeSelectSelectedPhoneNumber, makeSelectLoading, makeSelectTool } from 'containers/Properties/selectors';
import { selectPhoneNumber, submitPhoneNumber } from 'containers/Properties/actions';
import ImportTool from 'models/ImportTool';
import image from 'assets/images/bg-import-login.jpg';

export class ChoosePhoneNumber extends React.Component {

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
                    <div>Please choose phone number to send the verification code to.</div>
                    <div className="methods">
                        { this.props.phones.toArray().map((phone) => {
                            return method({
                                title: phone.get('obfuscated_number'),
                                icon: 'phone',
                                id: phone.get('id').toString(),
                                isActive: phone.get('id') === this.props.selectedPhoneNumber,
                                onClick: () => this.props.selectPhoneNumber(phone.get('id'))
                            });
                        }) }
                    </div>
                    <ButtonNew
                        className="big"
                        label="Choose number"
                        disabled={ !this.props.selectedPhoneNumber || this.props.loading }
                        onClick={ this.props.submitPhoneNumber } />
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
    phones: makeSelectPhones(),
    selectedPhoneNumber: makeSelectSelectedPhoneNumber(),
    loading: makeSelectLoading(),
    tool: makeSelectTool()
});


export function mapDispatchToProps(dispatch) {
    return {
        selectPhoneNumber: (id) => dispatch(selectPhoneNumber(id)),
        submitPhoneNumber: () => dispatch(submitPhoneNumber())
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChoosePhoneNumber);
