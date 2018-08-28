import React from 'react';
import SVG from 'components/SVG';


export class Toolbar extends React.Component {

    getDateRange() {
        const range = [];
        const format = 'MMMM DD, YYYY';
        range.push(this.props.days[0].format(format));
        range.push(this.props.days[this.props.days.length - 1].format(format));

        return range.join(' - ');
    }

    render() {
        return (
            <div className="toolbar">
                <div className="left-side">
                    <span className="dates">{ this.getDateRange() }</span>
                    <span className="navigation">
                        <span className="arrow prev" onClick={ this.props.prev }>&#9668;</span>
                        <span className="arrow next" onClick={ this.props.next }>&#9658;</span>
                    </span>
                </div>
                <div className="right-side">
                    <div className="switcher">
                        <div
                            className={ 'option' + (this.props.numberOfDays === 7 ? ' active' : '') }
                            onClick={ () => this.props.changeNumberOfDays(7) }>7 Days</div>
                        <div
                            className={ 'option' + (this.props.numberOfDays === 14 ? ' active' : '') }
                            onClick={ () => this.props.changeNumberOfDays(14) }>14 Days</div>
                        <div
                            className={ 'option' + (this.props.numberOfDays === 21 ? ' active' : '') }
                            onClick={ () => this.props.changeNumberOfDays(21) }>21 Days</div>
                    </div>
                    <span
                        className={ 'toggle-rates' + (this.props.ratesHidden ? ' inactive' : '') }
                        onClick={ this.props.toggleRate }><SVG icon="money" size="20"/></span>
                </div>
            </div>
        );
    }
}

export default Toolbar;


