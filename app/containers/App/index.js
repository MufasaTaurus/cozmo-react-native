import React from 'react';
import Helmet from 'react-helmet';
import Alerts from 'components/Alerts';
import withProgressBar from 'components/ProgressBar';
import Dashboard from 'components/Dashboard';
import { createStructuredSelector } from 'reselect';
import { browserHistory } from 'react-router';
import LoginBox from 'components/LoginBox';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { makeSelectUser } from 'containers/App/selectors';
import { updateWindowSize } from 'containers/App/actions';
import './app.less';

export class App extends React.Component {

    constructor(props) {
        super(props);
        window.addEventListener('resize', (evt) => {
            this.props.updateWindowSize(evt.target.innerWidth);
        });
    }

    render() {
        // @fixme
        if (
            (/signup/).test(browserHistory.getCurrentLocation().pathname) ||
            (/reset-password/).test(browserHistory.getCurrentLocation().pathname) ||
            (/onboarding/).test(browserHistory.getCurrentLocation().pathname) ||
            (/forgot/).test(browserHistory.getCurrentLocation().pathname) ||
            (/shadow/).test(browserHistory.getCurrentLocation().pathname)
        ) {
            return this.props.children;
        }
        if (this.props.user.size) {
            // @fixme
            if (!this.props.user.get('account_type')) {
                this.content = null;
                this.props.showOnboarding();
            } else {
                this.content = <Dashboard content={ React.Children.toArray(this.props.children) }/>;
            }
        } else {
            this.content = <LoginBox />;
            if (browserHistory.getCurrentLocation().pathname !== '/') {
                this.props.goToLogin();
            }
        }

        return (
            <div className="app">
                <Alerts/>
                <Helmet
                    titleTemplate="%s - Voyajoy"
                    defaultTitle="Voyajoy"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
                { this.content }
            </div>
        );
    }
}

App.propTypes = {
    children: React.PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser()
});

export function mapDispatchToProps(dispatch) {
    return {
        showOnboarding: () => dispatch(push('/onboarding')),
        goToLogin: () => dispatch(push('/')),
        updateWindowSize: (data) => dispatch(updateWindowSize(data)),
    };
}

export default withProgressBar(connect(mapStateToProps, mapDispatchToProps)(App));
