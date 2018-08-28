import React from 'react';
import Button from 'components/Button';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectUsername} from 'containers/App/selectors';

export class Welcome extends React.Component {

    render() {
        return (
            <div>
                <h1>Welcome { this.props.username }!</h1>
                <p>In order to get you set up with right experience, we'd like to ask you a few questions!</p>
                <Button label={ 'Okay' } onClick={ this.props.nextStep }/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    username: makeSelectUsername()
});


export default connect(mapStateToProps, null)(Welcome);
