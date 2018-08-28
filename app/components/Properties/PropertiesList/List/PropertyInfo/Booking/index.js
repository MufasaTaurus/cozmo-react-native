import React from 'react';
import CalSync from './CalSync';

export class Booking extends React.Component {

    renderSection() {
        switch (this.props.section) {
            case 'ical-sync':
                return <CalSync />;
        }
    }

    render() {
        return (
            <div className="booking">
                { this.renderSection() }
            </div>
        );
    }
}

export default Booking;
