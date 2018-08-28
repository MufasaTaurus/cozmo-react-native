import React from 'react';
import SVG from 'components/SVG';
import Events from './Events';
import Messages from './Messages';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {fetchReservationMessages, fetchReservationEvents} from 'containers/Reservations/actions';
import {makeSelectFetchingMessages, makeSelectFetchingEvents} from 'containers/Reservations/selectors';
import './history.less';

export class History extends React.Component {

    constructor(props) {
        super(props);
        this.state = { display: 'events' };
        if (!this.props.reservation.getEvents().size) {
            this.props.fetchEvents(this.props.reservation.getId());
        }
        if (!this.props.reservation.getMessages().size) {
            this.props.fetchMessages(this.props.reservation.getId());
        }
    }

    changeDisplay(display) {
        this.setState({ display });
    }

    renderSection() {
        switch (this.state.display) {
            case 'events':
            default:
                return <Events loading={ this.props.loadingEvents } reservation={ this.props.reservation }/>;
            case 'conversation':
                return <Messages loading={ this.props.loadingMessages } reservation={ this.props.reservation }/>;
        }
    }

    render() {
        return (
            <div className="reservation-details-history">
                <div className="switcher">
                    <div
                        className={ 'option' + (this.state.display === 'events' ? ' active' : '') }
                        onClick={ () => this.changeDisplay('events') }>
                        <SVG icon="conversation" className="icon"/> Events
                    </div>
                    <div
                        className={ 'option' + (this.state.display === 'conversation' ? ' active' : '') }
                        onClick={ () => this.changeDisplay('conversation') }>
                        <SVG icon="conversation" className="icon"/> Conversation
                    </div>
                </div>
                { this.renderSection() }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loadingMessages: makeSelectFetchingMessages(),
    loadingEvents: makeSelectFetchingEvents(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchMessages: (id) => dispatch(fetchReservationMessages(id)),
        fetchEvents: (id) => dispatch(fetchReservationEvents(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(History);
