import React from 'react';
import Filter from '.././Filter';
import Select from 'components/Select';
import './bathrooms.less';

export class BathroomsFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            bathrooms: props.value ? props.value : 1
        };
        this.options = [
            { name: '1', value: 1 },
            { name: '2', value: 2 },
            { name: '3', value: 3 },
            { name: '4', value: 4 },
            { name: '5', value: 5 },
            { name: '6', value: 6 },
            { name: '7', value: 7 },
            { name: '8', value: 8 },
            { name: '9', value: 9 },
            { name: '10', value: 10 },
        ];
    }

    onApply() {
        this.props.onChange(this.state.bathrooms);
    }

    render() {
        const content =
            <div className="form">
                <Select
                    id="bedrooms"
                    addonRight="Bathrooms"
                    options={ this.options }
                    defaultValue={ this.state.bathrooms }
                    onChange={ (val) => this.setState({ bathrooms: val }) }
                />
            </div>;
        return (
            <div className="bathrooms-filter">
                <Filter
                    name={ this.props.value ? this.props.value + ' btr' : 'Bathrooms' }
                    isApplied={ !!this.props.value }
                    icon="hottub"
                    content={ content }
                    onApply={ () => this.onApply() }
                    { ...this.props }
                />
            </div>
        );
    }
}

export default BathroomsFilter;
