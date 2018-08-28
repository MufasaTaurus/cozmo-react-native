import React from 'react';
import Filter from '.././Filter';
import TextField from 'components/TextField';
import SVG from 'components/SVG';
import './price.less';

export class PriceFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            min: props.value.min,
            max: props.value.max
        };
    }

    onApply() {
        this.props.onChange(this.state);
    }

    render() {
        const content =
            <div className="form">
                <TextField
                    id="min"
                    label="Minimum Price"
                    type="number"
                    min="0"
                    max="9999"
                    addonLeft="$"
                    value={ this.state.min }
                    onChange={ (evt) => this.setState({ min: evt.target.value }) }
                />
                <div className="space">
                    <TextField
                        id="max"
                        label="MaximumPrice"
                        type="number"
                        min="0"
                        max="9999"
                        addonLeft="$"
                        value={ this.state.max }
                        onChange={ (evt) => this.setState({ max: evt.target.value }) }
                    />
                </div>
            </div>;
        const disabled =
            <div className="form">
                <div className="disabled">
                    <div className="disabled-icon">
                        <SVG icon="info"/>
                    </div>
                    Set dates first to see recent price range.
                </div>
            </div>;
        const name = () => {
            const min = this.props.value.min;
            const max = this.props.value.max;
            if (min && max) {
                return '$' + min + '-$' + max;
            } else if (min && !max) {
                return 'Min $' + min;
            } else if (!min && max) {
                return 'Max $' + max;
            } else {
                return 'Price Range';
            }
        };
        return (
            <div className={' price-filter' + (this.props.disabled ? ' disabled' : '') }>
                <Filter
                    name={ name() }
                    isApplied={ this.props.value.min || this.props.value.max }
                    icon="money"
                    content={ this.props.disabled ? disabled : content }
                    onApply={ () => this.onApply() }
                    { ...this.props }
                />
            </div>
        );
    }
}

export default PriceFilter;
