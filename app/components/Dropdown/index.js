import React, {PropTypes} from 'react';
import onClickOutside from 'react-onclickoutside';
import './dropdown.less';

export class Dropdown extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
            selectedValue: props.defaultValue || (props.options.length ? props.options[0] : undefined) || { name: '', value: '' }
        };
    }

    toggleOpen() {
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
    }

    render() {
        return (
            <div className="dropdown">
                <div className="dropdown-selected-value" onClick={ () => this.toggleOpen() }>
                    <span className="value">{ this.state.selectedValue.name }</span>
                    <span className="arrow-down">&#9662;</span>
                </div>
                { this.state.open ?
                    <div className="dropdown-options">
                        { this.props.options.map((option, index) => {
                            return (
                                <div
                                    key={ index }
                                    className="dropdown-option"
                                    onClick={ () => this.selectValue(option) }>
                                    { option.name }
                                    </div>
                            );
                        }) }
                    </div>
                    : '' }
            </div>
        );
    }
}

Dropdown.propTypes = {
    options: PropTypes.array.isRequired,
    defaultValue: PropTypes.string
};

export default onClickOutside(Dropdown);
