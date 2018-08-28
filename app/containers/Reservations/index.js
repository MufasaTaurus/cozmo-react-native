import React from 'react';
import Helmet from 'react-helmet';
import { browserHistory } from 'react-router';
import ReservationsComponent from 'components/Reservations';

class Reservations extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Reservations"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
                <ReservationsComponent
                    isCalendar={ (/calendars/).test(browserHistory.getCurrentLocation().pathname) }
                    id={ this.props.params.id } />
            </article>
        );
    }
}

export default Reservations;
