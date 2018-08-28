import React from 'react';
import Filter from '.././Filter';
import Select from 'components/Select';
import './capacity.less';

export class CapacityFilter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            capacity: props.value ? props.value : 1
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
        this.props.onChange(this.state.capacity);
    }

    render() {
        const content =
            <div className="form">
                <Select
                    id="capacity"
                    label="Guests"
                    addonRight="People"
                    options={ this.options }
                    defaultValue={ this.state.capacity }
                    onChange={ (val) => this.setState({ capacity: val }) }
                />
            </div>;
        return (
            <div className="capacity-filter">
                <Filter
                    name={ this.props.value ? 'Up to ' + this.props.value : 'Capacity' }
                    isApplied={ !!this.props.value }
                    icon="guests"
                    content={ content }
                    onApply={ () => this.onApply() }
                    { ...this.props }
                />
            </div>
        );
    }
}

export default CapacityFilter;
