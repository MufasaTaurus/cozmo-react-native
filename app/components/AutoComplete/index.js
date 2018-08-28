import React from 'react';
import TextField from 'components/TextField';
import onClickOutside from 'react-onclickoutside';
import './autoComplete.less';

export class AutoComplete extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.defaultValue,
            open: false
        };
    }

    handleChange(value) {
        this.props.onChange(value);
        this.setState({
            value: value,
            open: true
        });
    }

    onSelect(item, index) {
        this.props.onSelect(index);
        this.setState({
            value: item,
            open: false
        });
    }

    handleClickOutside() {
        this.setState({ open: false });
    }

    render() {
        return (
            <div className="auto-complete">
                <TextField
                    id="a-c"
                    value={ this.state.value }
                    placeholder={ this.props.placeholder }
                    onChange={ (evt) => this.handleChange(evt.target.value) }
                />
                <div className="auto-complete-items">
                    { this.state.value && this.state.open && this.props.data.map((d, index) => {
                        return (
                            <div className="auto-complete-item" key={ index } onClick={ () => this.onSelect(d, index) }>
                                { d }
                            </div>
                        );
                    }) }
                </div>
            </div>
        );
    }
}

export default onClickOutside(AutoComplete);
