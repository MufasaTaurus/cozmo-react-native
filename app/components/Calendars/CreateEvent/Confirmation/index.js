import React from 'react';
import Modal from 'components/Modal';
import SVG from 'components/SVG';
import './confirmation.less';

export class Confirmation extends React.Component {

    render() {
        const from = this.props.data.dates.from, to = this.props.data.dates.to;
        const image = this.props.data.prop.image;
        const name = this.props.data.prop.name;
        const address = this.props.data.prop.address;
        const res = this.props.info;
        const quote = this.props.quote;
        const content =
            <div>
                <div className="prompt">Are you sure to create this { this.props.isInquiry ? 'inquiry' : 'reservation' }?</div>
                <div className="info-wrapper">
                    <div className="property">
                        <div className="image" style={{ backgroundImage: `url(${image})` }}/>
                        <div className="text">
                            <div className="name">{ name }</div>
                            <div className="address">{ address }</div>
                        </div>
                    </div>
                    <div className="guest">
                        <div className="name">{ res.first_name + ' ' + res.last_name }</div>
                        <div className="source">{ res.source }</div>
                    </div>
                    <div className="reservation">
                        <div className="check-in-out">
                            <div>
                                <div className="check">Check-in</div>
                                <div className="date">{ from.format('YYYY-MM-DD') }</div>
                            </div>
                            <div className="arrow"><SVG icon="backArrow" /></div>
                            <div>
                                <div className="check">Check-out</div>
                                <div className="date">{ to.format('YYYY-MM-DD') }</div>
                            </div>
                        </div>
                        <div>
                            <div className="info-row">
                                <div className="name"><SVG icon="moonFilled" size="16"/> nights</div>
                                <div className="value">{ quote.getNights() }</div>
                            </div>
                            <div className="info-row">
                                <div className="name"><SVG icon="guests" size="16"/> guests</div>
                                <div className="value">{ quote.getGuests() }</div>
                            </div>
                            <div className="info-row">
                                <div className="name"><SVG icon="money" size="16"/> payment</div>
                                <div className="value">{ quote.getTotalPrice() }</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>;
        return (
            <div className="calendars-create-new-event-confirmation">
                <Modal
                    title="Confirmation"
                    icon="check"
                    content={ content }
                    submitLabel="Yes"
                    loading={ this.props.loading }
                    small
                    onCancel={ this.props.onCancel }
                    onSubmit={ this.props.onSubmit }
                />
            </div>
        );
    }
}

export default Confirmation;
