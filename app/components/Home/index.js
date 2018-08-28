import React from 'react';
//import GettingStarted from './GettingStarted';
//import Breadcrumbs from 'components/Breadcrumbs';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectUser } from 'containers/App/selectors';
import { push } from 'react-router-redux';

export class HomeComponent extends React.Component {

    componentWillMount() {
        if (!this.props.user.get('account_type')) {
            this.props.showOnboarding();
        } else {
            this.props.goToProperties();
        }
    }

    render() {
        return (
            <div className="home">
                {/*<Breadcrumbs section={ 'Getting Started' } subsection={[{ title: 'Home' }]} />*/}
                {/*<GettingStarted/>*/}
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    user: makeSelectUser()
});

export function mapDispatchToProps(dispatch) {
    return {
        showOnboarding: () => dispatch(push('/onboarding')),
        goToProperties: () => dispatch(push('/properties')),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomeComponent);
