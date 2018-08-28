import React from 'react';
import moment from 'moment';
import TextField from 'components/TextField';
import ButtonNew from 'components/ButtonNew';
import Select from 'components/Select';
import SVG from 'components/SVG';
import Spinner from 'components/Spinner';
import './rates.less';

export class Rates extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            loading: true,
            error: false,
            type: 'custom',
            rate: this.getRateValue(props.rate),
            minStay: '2',
            label: ''
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

    getRateValue(rates) {
        let value = '';
        rates.map(rate => {
            if (rate) {
                if (value && value !== parseInt(rate.get('nightly'), 10)) {
                    value = 'multiple';
                    return;
                } else {
                    value = parseInt(rate.get('nightly'), 10);
                }
            }
        });

        return value;
    }

    submit() {
        const from = this.state.type === 'custom' ? this.props.dates.from.format('YYYY-MM-DD') : null;
        const to = this.state.type === 'custom' ? this.props.dates.to.format('YYYY-MM-DD') : null;
        this.props.onSubmit({
            time_frame: {
                lower: from,
                upper: to
            },
            label: this.state.label,
            min_stay: this.state.minStay,
            nightly: this.state.rate,
            id: this.props.id,
            prop: this.props.id
        });
    }

    canSubmit() {
        return (
            parseInt(this.state.rate) > 0 && parseInt(this.state.rate) < 9999 &&
            parseInt(this.state.minStay) > 0 && parseInt(this.state.minStay) < 999
        );
    }

    render() {
        const disabled = !this.canSubmit();
        const seasonal = this.props.seasonal;
        const from = this.props.dates.from || moment();
        const to = this.props.dates.to || moment();
        return (
            <div className="calendars-create-new-event-rates">
                <div className="create-event-header">
                    <div className="create-event-icon"><SVG icon="money"/></div>
                    <div className="create-event-title">{ seasonal ? 'Seasonal ' : '' }Rates & Availability Details</div>
                </div>
                { this.props.loading &&
                    <div className="loader"><div className="vj-spinner-wrapper"><Spinner/></div></div>
                }
                <div className="event-rates-content">
                    <div className="section">
                        <div className="vj-subsection-header">Selected Dates</div>
                        <div className="dates">
                        <span className="date">
                            { from.format('YYYY-MM-DD') }
                        </span>
                            <span className="separator">-</span>
                            <span className="date">
                            { to.format('YYYY-MM-DD') }
                        </span>
                        </div>
                    </div>
                    <div className="section">
                        <div className="vj-subsection-header price">Price Details</div>
                        { !this.props.seasonal &&
                            <Select
                                id="type"
                                label="Type"
                                defaultValue={ this.state.type }
                                onChange={ (val) => this.setState({ type: val }) }
                                options={[
                                    { name: 'Base Price', value: 'base' },
                                    { name: 'Custom', value: 'custom' },
                                ]}
                            />
                        }
                        <div className="side-by-side">
                            <div className="small">
                                <TextField
                                    id="nrate"
                                    label="Nightly Rate"
                                    addonLeft="$"
                                    //type="number"
                                    value={ this.state.rate }
                                    onChange={ (evt) => this.setState({ rate: evt.target.value }) }
                                />
                            </div>
                            <div className="small">
                                <TextField
                                    id="minstay"
                                    label="Minimum Stay"
                                    addonRight="Nights"
                                    type="number"
                                    value={ this.state.minStay }
                                    onChange={ (evt) => this.setState({ minStay: evt.target.value }) }
                                />
                            </div>
                        </div>
                        { (this.state.type === 'custom' || this.props.seasonal) &&
                        <TextField
                            id="label"
                            label="Label"
                            value={ this.state.label }
                            onChange={ (evt) => this.setState({ label: evt.target.value }) }
                        />
                        }
                    </div>
                </div>
                <div className="actions">
                    <ButtonNew label="Cancel" onClick={ this.props.onCancel } className="ghost"/>
                    <ButtonNew label="Save" onClick={ () => this.submit() } disabled={ disabled }/>
                </div>
            </div>
        );
    }
}

export default Rates;
