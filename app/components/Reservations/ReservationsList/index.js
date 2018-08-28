import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import { browserHistory } from 'react-router';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import InfoSection from '../../Properties/PropertiesList/List/PropertyInfo/InfoSection';
import SearchBox from 'components/SearchBox';
import Pagination from 'components/Pagination';
import Multicalendar from 'components/Multicalendar';
import MultiPropertyCalendar from 'components/Calendars/MultiPropertyCalendarNew';
import PropertyName from 'components/PropertyName';
import CreateReservation from './CreateReservation';
import Table from 'components/Table';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectReservations, makeSelectLoading, makeSelectCalendarView, makeSelectAddReservationStatus, selectPagination } from 'containers/Reservations/selectors';
import { changeDisplay, addReservation, fetchReservations } from 'containers/Reservations/actions';
import ReservationModel from 'models/Reservation';
import './reservationsList.less';

export class ReservationsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            addReservationOpen: false
        };
        this.tableHeader = [
            { name: 'Guest' },
            { name: 'Property' },
            { name: 'Date' },
            { name: 'Details' },
            { name: 'Payment' },
        ];
    }

    handleSearchQueryChange(value) {
        this.setState({ query: value });
    }

    toggleCalendarView() {
        this.props.changeDisplay(!this.props.calendarView);
    }

    closeAddReservationModal() {
        this.setState({ addReservationOpen: false });
    }

    submitNewReservation(data) {
        this.props.addReservation(data);
    }

    getReservations() {
        return this.props.reservations
            .filter((r) => new ReservationModel(r).filterReservations(this.state.query))
            .sortBy((r) => r.get('start_date'))
            .map((reservation) => {
                const reservationModel = new ReservationModel(reservation);
                const guest =
                    <PropertyName
                        name={ reservationModel.getGuestFullName() }
                        image={ reservationModel.getGuestAvatar() }/>;
                const property =
                    <PropertyName
                        name={ reservationModel.getPropertyName() }
                        address={ reservationModel.getPropertyAddress() }
                        image={ reservationModel.getPropertyAvatar() }/>;
                const dates =
                    <div>
                        <div className="date">{ reservationModel.getFromTo() }</div>
                        <div className="duration">{ reservationModel.getDuration() }</div>
                    </div>;
                const paid =
                    <div>
                        <div>{ reservationModel.getPaid() + ' /'}</div><div>{ reservationModel.getPrice() }</div>
                    </div>;
                return {
                    className: 'reservation',
                    key: reservationModel.getId(),
                    onClick: () => this.props.selectReservation(reservationModel.getId()),
                    values: [guest, property, dates, reservationModel.getNumberOfGuests(), paid]
                };
            })
            .toArray();
    }

    render() {
        // const list =
        //     <div>
        //         <div className="search-box-wrapper">
        //             <SearchBox
        //                 onChange={ (evt) => this.handleSearchQueryChange(evt.target.value) }
        //                 value={ this.state.query }/>
        //         </div>
        //         <Table head={ this.tableHeader } body={ this.getReservations() }/>
        //         <div className="vj-pagination-wrapper">
        //             <Pagination pagination={ this.props.pagination } onChange={ this.props.fetchReservations }/>
        //         </div>
        //     </div>;

        const isCalendars = this.props.isCalendar;
        return (
            <div className="reservations-list">
                <Breadcrumbs section={ isCalendars ? 'Calendars' : 'Reservations' } subsection={[{ title: isCalendars ? 'Availability Calendar' : 'Reservations List' }]} />
                <div className="reservations-list-content">
                    <div className="multicalendar-wrapper">
                        <MultiPropertyCalendar/>
                    </div>
                    {/*<div className="add-button-wrapper">*/}
                        {/*<FloatingActionButton className="add-button" onClick={ () => this.setState({ addReservationOpen: true }) }>*/}
                            {/*<ContentAdd />*/}
                        {/*</FloatingActionButton>*/}
                    {/*</div>*/}
                    {/*<CreateReservation*/}
                        {/*open={ this.state.addReservationOpen }*/}
                        {/*onClose={ () => this.closeAddReservationModal() }*/}
                        {/*onSubmit={ (data) => this.submitNewReservation(data) }*/}
                        {/*status={ this.props.addReservationStatus }*/}
                    {/*/>*/}
                    {/*{ this.props.calendarView ?*/}
                        {/*<InfoSection*/}
                            {/*title={ 'Multicalendar' }*/}
                            {/*subtitle={ <div className="toggle" onClick={ this.toggleCalendarView.bind(this) }>List View</div> }*/}
                            {/*customContent={*/}
                                {/*<Multicalendar />*/}
                            {/*}*/}
                        {/*/>*/}
                        {/*:*/}
                        {/*<InfoSection*/}
                            {/*title={ 'Reservations' }*/}
                            {/*subtitle={ <div className="toggle" onClick={ this.toggleCalendarView.bind(this) }>Multicalendar View</div> }*/}
                            {/*customContent={ this.props.reservations.size ? list :*/}
                                {/*<div className="empty-state">You do not have any reservations at this moment.</div> }/>*/}
                    {/*}*/}
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    reservations: makeSelectReservations(),
    calendarView: makeSelectCalendarView(),
    loading: makeSelectLoading(),
    pagination: selectPagination(),
    addReservationStatus: makeSelectAddReservationStatus()
});

export function mapDispatchToProps(dispatch) {
    return {
        selectReservation: (id) => dispatch(push('/reservations/' + id)),
        changeDisplay: (isCalendarView) => dispatch(changeDisplay(isCalendarView)),
        addReservation: (data) => dispatch(addReservation(data)),
        fetchReservations: () => dispatch(fetchReservations()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ReservationsList);

