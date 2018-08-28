import React from 'react';
import Button from 'components/Button';

export class Thanks extends React.Component {

    render() {
        return (
            <div>
                <h1>Thanks</h1>
                <p>
                    That's it! You can change your account data anytime.
                </p>
                <Button label={ 'Go to dashboard' } onClick={ this.props.nextStep }/>
            </div>
        );
    }
}

export default Thanks;
