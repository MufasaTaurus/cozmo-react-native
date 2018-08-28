import React, { PropTypes } from 'react';
import onClickOutside from 'react-onclickoutside';
import StatusLabel from 'components/StatusLabel';
import './blackStatusSelect.less';

export class BlackStatusSelect extends React.Component {

    constructor(props) {
        super(props);
        this.options = [
            { name: this.getStatusLabel('Open'), value: 'Open' },
            { name: this.getStatusLabel('Pending'), value: 'Pending' },
            { name: this.getStatusLabel('Solved'), value: 'Solved' },
        ];
        this.state = {
            open: false,
            selectedValue: props.defaultValue !== undefined ?
                this.options.filter(o => o.value === props.defaultValue)[0]
                :
                { name: '', value: '' }
        };
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
        if (this.props.onChange) {
            this.props.onChange(option.value);
        }
    }

    getStatusLabel(label) {
        return <StatusLabel label={ label }/>;
    }

    render() {
        const submit = this.props.insideLabel ? 'Submit as ' : '';

        return (
            <div className="black-status-select">
                { this.props.label && <span className="select-label">{ this.props.label }</span> }
                <div className="select">
                    <div className="dropdown-selected-value" onClick={ () => this.toggleOpen() }>
                        <span>{ submit }{ this.state.selectedValue.value }</span>
                        <div className="arrow-button">
                            <span className="arrow-down">&#9662;</span>
                        </div>
                    </div>
                    { this.state.open &&
                        <div className="dropdown-options" style={{ zIndex: 4 }}>
                            { this.options.map((option, index) => {
                                return (
                                    <div
                                        key={ index }
                                        className="dropdown-option"
                                        onClick={ () => this.selectValue(option) }>
                                        { option.value }
                                        { option.name }
                                    </div>
                                ); })
                            }
                        </div>
                    }
                </div>
            </div>
        );
    }
}

BlackStatusSelect.defaultProps = {
    insideLabel: true,
};

BlackStatusSelect.propTypes = {
    onChange: PropTypes.func,
    label: PropTypes.string,
    insideLabel:PropTypes.bool,
};

export default onClickOutside(BlackStatusSelect);
