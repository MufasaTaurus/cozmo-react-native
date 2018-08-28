import {
    FETCH_RESERVATIONS,
    FETCH_RESERVATIONS_SUCCESS,
    FETCH_RESERVATIONS_ERROR,
    FETCH_RESERVATIONS_CALENDAR,
    FETCH_RESERVATIONS_CALENDAR_SUCCESS,
    FETCH_RESERVATIONS_CALENDAR_ERROR,
    POPULATE_RESERVATION_CALENDAR_FROM_CACHE,
    FETCH_RESERVATIONS_CALENDAR_PROPERTY,
    FETCH_RESERVATIONS_CALENDAR_PROPERTY_SUCCESS,
    FETCH_RESERVATIONS_CALENDAR_PROPERTY_ERROR,
    SEND_MESSAGE,
    SEND_MESSAGE_SUCCESS,
    SEND_MESSAGE_ERROR,
    CHANGE_DISPLAY,
    DELETE_RESERVATION,
    DELETE_RESERVATION_SUCCESS,
    DELETE_RESERVATION_ERROR,
    EDIT_RESERVATION,
    EDIT_RESERVATION_SUCCESS,
    EDIT_RESERVATION_ERROR,
    EDIT_GUEST,
    EDIT_GUEST_SUCCESS,
    EDIT_GUEST_ERROR,
    ADD_RESERVATION,
    ADD_RESERVATION_SUCCESS,
    ADD_RESERVATION_ERROR,
    FETCH_RESERVATION_MESSAGES,
    FETCH_RESERVATION_MESSAGES_SUCCESS,
    FETCH_RESERVATION_MESSAGES_ERROR,
    FETCH_RESERVATION_EVENTS,
    FETCH_RESERVATION_EVENTS_SUCCESS,
    FETCH_RESERVATION_EVENTS_ERROR,
    FETCH_RESERVATION,
    FETCH_RESERVATION_SUCCESS,
    FETCH_RESERVATION_ERROR,
    FETCH_QUOTE,
    FETCH_QUOTE_SUCCESS,
    FETCH_QUOTE_ERROR,
    CREATE_BLOCKING,
    CREATE_BLOCKING_SUCCESS,
    CREATE_BLOCKING_ERROR,
    DELETE_BLOCKING,
    DELETE_BLOCKING_SUCCESS,
    DELETE_BLOCKING_ERROR,
    CREATE_SEASONAL_RATING,
    CREATE_SEASONAL_RATING_SUCCESS,
    CREATE_SEASONAL_RATING_ERROR,
    CREATE_CUSTOM_RATING,
    CREATE_CUSTOM_RATING_SUCCESS,
    CREATE_CUSTOM_RATING_ERROR,
    SET_CALENDAR_VIEW,
    SET_CALENDAR_CURRENT_DATE,
    OPEN_ICAL_EVENT,
    OPEN_ICAL_EVENT_SUCCESS
} from './constants';

export function fetchReservations(data) {
    return {
        type: FETCH_RESERVATIONS,
        data
    };
}

export function fetchReservationsSuccess(data) {
    return {
        type: FETCH_RESERVATIONS_SUCCESS,
        data
    };
}

export function fetchReservationsError(data) {
    return {
        type: FETCH_RESERVATIONS_ERROR,
        data
    };
}

export function fetchReservationsCalendar(data) {
    return {
        type: FETCH_RESERVATIONS_CALENDAR,
        data
    };
}

export function fetchReservationsCalendarSuccess(data) {
    return {
        type: FETCH_RESERVATIONS_CALENDAR_SUCCESS,
        data
    };
}

export function fetchReservationsCalendarError(data) {
    return {
        type: FETCH_RESERVATIONS_CALENDAR_ERROR,
        data
    };
}

export function fetchReservationsCalendarProperty(data) {
    return {
        type: FETCH_RESERVATIONS_CALENDAR_PROPERTY,
        data
    };
}

export function fetchReservationsCalendarPropertySuccess(data) {
    return {
        type: FETCH_RESERVATIONS_CALENDAR_PROPERTY_SUCCESS,
        data
    };
}

export function fetchReservationsCalendarPropertyError(data) {
    return {
        type: FETCH_RESERVATIONS_CALENDAR_PROPERTY_ERROR,
        data
    };
}

export function sendMessage(data) {
    return {
        type: SEND_MESSAGE,
        data
    };
}

export function sendMessageSuccess(data) {
    return {
        type: SEND_MESSAGE_SUCCESS,
        data
    };
}

export function sendMessageError(data) {
    return {
        type: SEND_MESSAGE_ERROR,
        data
    };
}

export function populateCalendarFromCache(data) {
    return {
        type: POPULATE_RESERVATION_CALENDAR_FROM_CACHE,
        data
    };
}

export function changeDisplay(data) {
    return {
        type: CHANGE_DISPLAY,
        data
    };
}

export function deleteReservation(data) {
    return {
        type: DELETE_RESERVATION,
        data
    };
}

export function deleteReservationSuccess(data) {
    return {
        type: DELETE_RESERVATION_SUCCESS,
        data
    };
}

export function deleteReservationError(data) {
    return {
        type: DELETE_RESERVATION_ERROR,
        data
    };
}

export function editReservation(data) {
    return {
        type: EDIT_RESERVATION,
        data
    };
}

export function editReservationSuccess(data) {
    return {
        type: EDIT_RESERVATION_SUCCESS,
        data
    };
}

export function editReservationError(data) {
    return {
        type: EDIT_RESERVATION_ERROR,
        data
    };
}

export function editGuest(data) {
    return {
        type: EDIT_GUEST,
        data
    };
}

export function editGuestSuccess(data) {
    return {
        type: EDIT_GUEST_SUCCESS,
        data
    };
}

export function editGuestError(data) {
    return {
        type: EDIT_GUEST_ERROR,
        data
    };
}

export function addReservation(data) {
    return {
        type: ADD_RESERVATION,
        data
    };
}

export function addReservationSuccess(data) {
    return {
        type: ADD_RESERVATION_SUCCESS,
        data
    };
}

export function addReservationError(data) {
    return {
        type: ADD_RESERVATION_ERROR,
        data
    };
}

export function fetchReservationMessages(data) {
    return {
        type: FETCH_RESERVATION_MESSAGES,
        data
    };
}

export function fetchReservationMessagesSuccess(data) {
    return {
        type: FETCH_RESERVATION_MESSAGES_SUCCESS,
        data
    };
}

export function fetchReservationMessagesError(data) {
    return {
        type: FETCH_RESERVATION_MESSAGES_ERROR,
        data
    };
}

export function fetchReservationEvents(data) {
    return {
        type: FETCH_RESERVATION_EVENTS,
        data
    };
}

export function fetchReservationEventsSuccess(data) {
    return {
        type: FETCH_RESERVATION_EVENTS_SUCCESS,
        data
    };
}

export function fetchReservationEventsError(data) {
    return {
        type: FETCH_RESERVATION_EVENTS_ERROR,
        data
    };
}

export function fetchReservation(data) {
    return {
        type: FETCH_RESERVATION,
        data
    };
}

export function fetchReservationSuccess(data) {
    return {
        type: FETCH_RESERVATION_SUCCESS,
        data
    };
}

export function fetchReservationError(data) {
    return {
        type: FETCH_RESERVATION_ERROR,
        data
    };
}

export function fetchQuote(data) {
    return {
        type: FETCH_QUOTE,
        data
    };
}

export function fetchQuoteSuccess(data) {
    return {
        type: FETCH_QUOTE_SUCCESS,
        data
    };
}

export function fetchQuoteError(data) {
    return {
        type: FETCH_QUOTE_ERROR,
        data
    };
}

export function createBlocking(data) {
    return {
        type: CREATE_BLOCKING,
        data
    };
}

export function createBlockingSuccess(data) {
    return {
        type: CREATE_BLOCKING_SUCCESS,
        data
    };
}

export function createBlockingError(data) {
    return {
        type: CREATE_BLOCKING_ERROR,
        data
    };
}

export function deleteBlocking(data) {
    return {
        type: DELETE_BLOCKING,
        data
    };
}

export function deleteBlockingSuccess(data) {
    return {
        type: DELETE_BLOCKING_SUCCESS,
        data
    };
}

export function deleteBlockingError(data) {
    return {
        type: DELETE_BLOCKING_ERROR,
        data
    };
}

export function createSeasonalRating(data) {
    return {
        type: CREATE_SEASONAL_RATING,
        data
    };
}

export function createSeasonalRatingSuccess(data) {
    return {
        type: CREATE_SEASONAL_RATING_SUCCESS,
        data
    };
}

export function createSeasonalRatingError(data) {
    return {
        type: CREATE_SEASONAL_RATING_ERROR,
        data
    };
}

export function createCustomRating(data) {
    return {
        type: CREATE_CUSTOM_RATING,
        data
    };
}

export function createCustomRatingSuccess(data) {
    return {
        type: CREATE_CUSTOM_RATING_SUCCESS,
        data
    };
}

export function createCustomRatingError(data) {
    return {
        type: CREATE_CUSTOM_RATING_ERROR,
        data
    };
}

export function setCalendarView(data) {
    return {
        type: SET_CALENDAR_VIEW,
        data
    };
}

export function setCalendarCurrentDate(data) {
    return {
        type: SET_CALENDAR_CURRENT_DATE,
        data
    };
}

export function openIcalEvent(data) {
    return {
        type: OPEN_ICAL_EVENT,
        data
    };
}

export function openIcalEventSuccess(data) {
    return {
        type: OPEN_ICAL_EVENT_SUCCESS,
        data
    };
}
