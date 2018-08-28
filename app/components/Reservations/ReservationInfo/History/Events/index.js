import React from 'react';
import SVG from 'components/SVG';
import Spinner from 'components/Spinner';
//import VendorName from 'components/VendorName';
//import moment from 'moment';

export class Events extends React.Component {

    render() {
        return (
            <div className="reservation-details-history-events">
                { this.props.loading ?
                    <Spinner/>
                    :
                    this.props.reservation.getEvents().map((evt, index) => {
                        return (
                            event({
                                key: index,
                                date: evt.getDate(),
                                icon: evt.getIcon(),
                                title: evt.getType()
                            })
                        );
                    })
                }

                {/*{ event({ key:'5', date: moment(), icon: 'email', title: 'Email Sent',*/}
                    {/*message: <div><VendorName fullName="Aga Kru" email={ 'aga@voyajoy.com' }/><img height={200} src="https://cdn.voyajoy.com/images/preview.jpg"/></div>*/}
                {/*}) }*/}
                {/*{ event({ key:'6', date: moment(), icon: 'conversation', title: 'Message Received',*/}
                    {/*message: <div style={{ display: 'flex', alignItems: 'center'}}><VendorName fullName="Claudia Escobar" email={ 'claudia@yahoo.com' }/><div style={{ fontSize: 12, marginLeft: 20, fontWeight: 500}}>"Hi, can we change our reservation please. We would like to add another person"</div></div>*/}
                {/*}) }*/}
                {/*{ event({ key:'8', date: moment(), icon: 'money', title: 'Payment Received' }) }*/}
            </div>
        );
    }
}

const event = ({ title, icon, date, message, key }) => {
    return (
        <div key={ key } className="event">
            <div className="date">{ date.format('MMM D, YYYY hh:mmA') }</div>
            <div className="icon"><SVG icon={ icon }/></div>
            <div className="line"/>
            <div className="event-content">
                <div className="event-title">{ title }</div>
                <div className="event-message">{ message }</div>
            </div>
        </div>
    );
};

export default Events;
