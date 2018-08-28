import React from 'react';
import BoxWithLogo from 'components/BoxWithLogo';
import Spinner from 'components/Spinner';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectLoading, selectSecretValid } from 'containers/Shadow/selectors';
import { checkSecret } from 'containers/Shadow/actions';

export class ShadowComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = { hasSecret: true };
    }

    componentWillMount() {
        const secret = browserHistory.getCurrentLocation().query.secret;

        if (secret) {
            this.props.checkSecret({ secret: secret });
        } else {
            this.setState({ hasSecret: false });
        }
    }

    render() {
        const content = (
            <div>
                { !this.state.hasSecret && <p>Please provide a Secret.</p> }
                { this.props.loading && <Spinner/> }
                { this.props.secretValid === 'error' && <p>Secret not valid. Please try again.</p> }
            </div>
        );

        return (
            <BoxWithLogo
                title="Shadow login"
                content={ content }/>

        );
    }
}

const mapStateToProps = createStructuredSelector({
    loading: selectLoading(),
    secretValid: selectSecretValid(),
});

export function mapDispatchToProps(dispatch) {
    return {
        checkSecret: (data) => dispatch(checkSecret(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ShadowComponent);
