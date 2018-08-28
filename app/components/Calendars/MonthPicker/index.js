import React, { PropTypes } from 'react';
import moment from 'moment';
import onClickOutside from 'react-onclickoutside';
import SVG from 'components/SVG';
import './monthPicker.less';

class MonthPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.currentDate = props.day;
        this.list =
            <div className="month-picker-list">
                { moment.months().map((m, index) => {
                    return <div key={ index }
                                className="month-picker-list-item"
                                onClick={ () => this.handleChange(index) }>
                        { m + ' ' + this.currentDate.format('YYYY') }
                    </div>;
                }) }
            </div>;
    }

    handleChange(month) {
        this.setState({
            open: false,
        });
        this.props.onChange(this.currentDate.month(month));
    }

    handleClickOutside() {
        this.setState({ open: false });
        this.props.disableOnClickOutside();
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

    render() {
        const day = this.props.day;
        return (
            <div className="month-picker">
                <div className="month-picker-box">
                    <div className="label">
                        <span className="label-month">{ day.format('MMMM') }</span>
                        <span className="label-year">{ day.format('YYYY') }</span>
                    </div>
                    <div className="month-picker-button" onClick={ () => this.toggleOpen() }>
                        <div className="icon">
                            <SVG icon="triangle" size="14"/>
                        </div>
                    </div>
                </div>
                { this.state.open && this.list }
            </div>
        );
    }
}

MonthPicker.propTypes = {
    day: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default onClickOutside(MonthPicker);
