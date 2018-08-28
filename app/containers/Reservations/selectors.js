import { createSelector } from 'reselect';

const selectReservations = (state) => state.get('reservations');

const makeSelectReservations = () => createSelector(
    selectReservations,
    (state) => state.get('reservations')
);

const makeSelectReservationsCalendar = () => createSelector(
    selectReservations,
    (state) => state.get('reservationsCalendar')
);

const makeSelectLoading = () => createSelector(
    selectReservations,
    (state) => state.get('loading')
);

const makeSelectFetchingCalendar = () => createSelector(
    selectReservations,
    (state) => state.get('fetchingCalendar')
);

const makeSelectMessageStatus = () => createSelector(
    selectReservations,
    (state) => state.get('messageStatus')
);

const makeSelectCalendarView = () => createSelector(
    selectReservations,
    (state) => state.get('calendarView')
);

const makeSelectAddReservationStatus = () => createSelector(
    selectReservations,
    (state) => state.get('addReservationStatus')
);

const makeSelectFetchingMessages = () => createSelector(
    selectReservations,
    (state) => state.get('fetchingMessages')
);

const makeSelectFetchingEvents = () => createSelector(
    selectReservations,
    (state) => state.get('fetchingEvents')
);

const selectPagination = () => createSelector(
    selectReservations,
    (state) => state.get('pagination')
);

const selectCalendarPagination = () => createSelector(
    selectReservations,
    (state) => state.get('calendarPagination')
);

const selectQuote = () => createSelector(
    selectReservations,
    (state) => state.get('quote')
);

const selectQuoteFetching = () => createSelector(
    selectReservations,
    (state) => state.get('quoteFetching')
);

const selectPropertyCalendars = () => createSelector(
    selectReservations,
    (state) => state.get('propertyCalendars')
);

const selectAddingRate = () => createSelector(
    selectReservations,
    (state) => state.get('addingRate')
);

const selectCalendarCurrentDate = () => createSelector(
    selectReservations,
    (state) => state.get('calendarCurrentDate')
);

const selectCalendarFetchedDates = () => createSelector(
    selectReservations,
    (state) => state.get('fetchedDates')
);

export {
    makeSelectReservations,
    makeSelectReservationsCalendar,
    makeSelectLoading,
    makeSelectFetchingCalendar,
    makeSelectMessageStatus,
    makeSelectCalendarView,
    makeSelectAddReservationStatus,
    makeSelectFetchingMessages,
    makeSelectFetchingEvents,
    selectPagination,
    selectCalendarPagination,
    selectQuote,
    selectQuoteFetching,
    selectPropertyCalendars,
    selectAddingRate,
    selectCalendarCurrentDate,
    selectCalendarFetchedDates
};
