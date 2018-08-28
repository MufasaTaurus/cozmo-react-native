import React from 'react';


export class Days extends React.Component {

    render() {
        return (
            <div className="days">
                { this.props.days.map((d, index) => {
                    return (
                        <div className="day" key={ index }>
                            <div className="month-number">{ d.format('MMM') }</div>
                            <div className="day-number">{ d.format('DD') }</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default Days;


