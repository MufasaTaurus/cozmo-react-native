import React from 'react';
import TextField from 'components/TextField';
import ButtonNew from 'components/ButtonNew';
import Spinner from 'components/Spinner';
import SVG from 'components/SVG';
import './quote.less';

export class Quote extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.loading === 'fetching') {
            if (nextProps.loading === 'ok') {
                this.setState({ loading: false });
            } else {
                this.setState({ loading: false, error: true });
            }
        }
    }

    render() {
        const quote = this.props.quote;
        const disabled = this.state.error || !(quote && quote.isAvailable());
        return (
            <div className="calendars-create-new-event-quote">
                <div className="create-event-header">
                    <div className="create-event-icon clickable" onClick={ this.props.goBack }><SVG icon="backArrow"/></div>
                    <div className="create-event-title">Create New { this.props.isInquiry ? 'Inquiry' : 'Reservation' }</div>
                </div>
                <div className="event-quote-content">
                    { this.state.loading ? <div className="vj-spinner-wrapper"><Spinner/></div> :
                        this.state.error ?
                            <div className="error">
                                Can't fetch a Quote because Property does not have Rates set.
                            </div>
                            :
                            quote.isAvailable() ?
                                <section className="section">
                                    <div className="vj-subsection-header">Quote</div>
                                    <div className="payments">
                                        <div className="payments-header">Rental Rates</div>
                                        <div className="row">
                                            <div>
                                                <div>{ quote.getNights() }</div>
                                                <div className="dates">{ quote.getDates() }</div>
                                            </div>
                                            <div className="fee">
                                                <TextField
                                                    id="fname"
                                                    addonLeft="$"
                                                    defaultValue={ quote.getBasePrice() }
                                                />
                                            </div>
                                        </div>
                                        <div className="payments-header">Fees</div>
                                        { quote.getFees().map((fee, index) => {
                                            return (
                                                <div className="row" key={ index }>
                                                    <div>{ fee.getType() }</div>
                                                    <div className="fee">
                                                        <TextField
                                                            id="fname"
                                                            addonLeft="$"
                                                            value={ fee.getValue() }
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        }) }
                                        <div className="total">Total: { quote.getTotalPrice() }</div>
                                    </div>
                                </section>
                                :
                                <div className="error">
                                    This Property is unavailable for selected period.
                                </div>
                    }
                </div>
                <div className="actions">
                    <ButtonNew label="Go Back" onClick={ this.props.goBack } className="ghost"/>
                    <ButtonNew label="Create" onClick={ this.props.showConfirmation } disabled={ disabled }/>
                </div>
            </div>
        );
    }
}

export default Quote;
