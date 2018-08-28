import React from 'react';
import SVG from 'components/SVG';
import RaisedButton from 'material-ui/RaisedButton';
import './creditCard.less';

export class CreditCard extends React.Component {

    render() {
        return (
            <div className="billing-credit-card">
                <div className="icon"><SVG icon="creditCard"/></div>
                <div className="cardholder">Ivan Thai</div>
                <div className="expiration-date">04/2020</div>
                <div className="card-number">**** **** **** 7285</div>
                <div><RaisedButton label="Edit" primary={ true }/></div>
            </div>
        );
    }
}

export default CreditCard;
