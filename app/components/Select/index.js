import React, { PropTypes } from 'react';
import SearchBox from 'components/SearchBox';
import onClickOutside from 'react-onclickoutside';
import './select.less';

export class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedValue: this.getSelectedValue(props),
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.defaultValue !== this.props.defaultValue) {
            const options = nextProps.options ? nextProps.options : this.flatSections();
            this.setState({
                selectedValue: options.filter(o => o.value === nextProps.defaultValue)[0]
            });
        }
    }

    getSelectedValue(props) {
        const options = props.options ? props.options : this.flatSections();
        return (
            (props.defaultValue !== undefined ? options.filter(o => o.value === props.defaultValue)[0] : undefined) ||
            (props.placeholder ? { name: props.placeholder, value: '' } : undefined) ||
            (options.length ? options[0] : undefined) ||
            { name: '', value: '' }
        );
    }

    flatSections() {
        const flat = [];
        this.props.optionsWithSections.map(s => s.value.map(o => flat.push(o)));
        return flat;
    }

    toggleOpen() {
        if (this.props.disabled) {
            return false;
        }
        const isOpen = this.state.open;
        this.setState({ open: !isOpen });
        if (isOpen) {
            this.props.disableOnClickOutside();
        } else {
            this.props.enableOnClickOutside();
        }
    }

    handleClickOutside() {
        this.setState({ open: false });
        this.props.disableOnClickOutside();
    }

    selectValue(option) {
        this.setState({
            selectedValue: option,
            open: false
        });
        this.props.onChange(option.value);
    }

    renderOptions() {
        const optionComponent = ({ index, option }) =>
            <div key={ index }
                 className="dropdown-option"
                 onClick={ () => this.selectValue(option) }>
            { option.name }
        </div>;

        if (this.props.options) {
            return this.props.options.map((option, index) => optionComponent({ index, option }));
        } else {
            return this.props.optionsWithSections.map((section, index) => {
                return (
                    <div className="section" key={ index }>
                        <div className="section-name">{ section.name }</div>
                        { section.value.map((option, index) => optionComponent({ index, option })) }
                    </div>
                );
            });
        }
    }

    render() {
        return (
            <div className={ 'select-group' + (this.props.className ? ' ' + this.props.className : '') } id={ this.props.id }>
                { this.props.label && <span className="select-label">{ this.props.label }</span> }
                <div
                    className={
                        'select' +
                        (this.state.open ? ' active' : '') +
                        (this.props.disabled ? ' disabled' : '') +
                        (this.props.small ? ' small' : '')
                    }>
                    <div className="dropdown-selected-value" onClick={ () => this.toggleOpen() }>
                        { this.props.addonLeft && <span className="select-addon-left">{ this.props.addonLeft }</span> }
                        <span className="value">{ this.state.selectedValue.name }</span>
                        { this.props.addonRight && <span className="select-addon-right">{ this.props.addonRight }</span> }
                        <span className="arrow-down">&#9662;</span>
                    </div>
                    { this.state.open &&
                        <div className="dropdown-options">
                            { this.props.withSearch &&
                                <div className="search">
                                    <SearchBox
                                        onChange={ (evt) => this.props.onSearchChange(evt.target.value) }
                                        value={ this.props.query }
                                    />
                                </div>
                            }
                            { this.renderOptions() }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

Select.propTypes = {
    options: PropTypes.array,
    optionsWithSections: PropTypes.array,
    small: PropTypes.bool,
    defaultValue: PropTypes.any,
    placeholder: PropTypes.string,
    disabled: PropTypes.bool,
    withSearch: PropTypes.bool,
    onSearchChange: PropTypes.func,
    className: PropTypes.string,
    addonLeft: PropTypes.string,
    addonRight: PropTypes.string,
    id: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
};

Select.defaultProps = {
    onChange: () => {}
};

export default onClickOutside(Select);
