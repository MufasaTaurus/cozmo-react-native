import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import SVG from 'components/SVG';
import TextField from 'components/TextField';
import './dropdownInput.less';

class DropdownInput extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            activeOption:
                (props.defaultOption !== undefined ? props.options.filter(o => o.value === props.defaultOption)[0] : undefined) ||
                (props.options.length ? props.options[0] : undefined) ||
                { name: '', value: '' }
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultOption !== this.props.defaultOption) {
            this.setState({ activeOption: nextProps.options.filter(o => o.value === nextProps.defaultOption)[0] });
        }
    }

    toggleOpen() {
        if (this.props.disabled) { return false; }
        const open = this.state.open;
        this.setState({ open: !open });
        open ?
            this.props.disableOnClickOutside()
            :
            this.props.enableOnClickOutside();
    }

    selectOption(option) {
        this.setState({
            open: false,
            activeOption: option,
        });
        this.props.disableOnClickOutside();
        this.props.onOptionChange(option.value);
    }

    handleClickOutside() {
        this.setState({ open: false });
        this.props.disableOnClickOutside();
    }

    getMenu() {
        return (
            <div className={ 'dropdown-menu ' + this.props.className }>
                { this.getMenuOptions() }
            </div>
        );
    }

    getMenuOptions() {
        return (
            this.props.options.map((option, index) => {
                return (
                    <div className="dropdown-menu-option"
                        key={ index }
                        onClick={ () => this.selectOption(option) }>
                        { option.name }
                    </div>
                );
            })
        );
    }

    getButton() {
        return (
            <div className={ 'dropdown-button ' + this.props.className }
                 onClick={ () => this.toggleOpen() }>
                { this.state.activeOption.name }
                <SVG className="arrow" icon="triangle" size={ 12 }/>
            </div>
        );
    }

    render() {
        return (
            <div className="dropdown-input">
                { this.props.label && <div className="label">{ this.props.label }</div> }
                <div className={ 'dropdown-input-inside ' + this.props.className }>
                    { this.getButton() }
                    <TextField
                        className="dropdown-field"
                        value={ this.props.value }
                        type={ this.props.type }
                        id={ this.props.id }
                        hasError={ this.props.hasError }
                        min={ this.props.min }
                        max={ this.props.max }
                        placeholder={ this.props.placeholder }
                        disabled={ this.props.disabled }
                        onChange={ this.props.onChange } />
                    { this.state.open && this.getMenu() }
                </div>
            </div>
        );
    }
}

DropdownInput.defaultProps = {
    onChange: () => {},
    onOptionChange: () => {},
};

DropdownInput.propTypes = {
    options: PropTypes.array.isRequired,
    className: PropTypes.string, // small, big, right
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    defaultOption: PropTypes.string,
    hasError: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    min: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    max: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    onChange: PropTypes.func,
    onOptionChange: PropTypes.func,
    label: PropTypes.string,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    type: PropTypes.string,
    id: PropTypes.string.isRequired,
};

export default onClickOutside(DropdownInput);
