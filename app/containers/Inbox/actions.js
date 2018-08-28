import {
    FETCH_TICKETS,
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_ERROR,
    FETCH_TICKET,
    FETCH_TICKET_SUCCESS,
    FETCH_TICKET_ERROR,
    SET_TICKETS_DISPLAY,
    SET_TICKETS_FILTERS,
    ADD_RECENT_TICKET,
    CREATE_NEW_TICKET,
    CREATE_NEW_TICKET_SUCCESS,
    CREATE_NEW_TICKET_ERROR,
    SET_MODAL_VISIBLE,
    EDIT_TICKETS,
    EDIT_TICKETS_SUCCESS,
    EDIT_TICKETS_ERROR,
    ARCHIVE_TICKETS,
    ARCHIVE_TICKETS_SUCCESS,
    ARCHIVE_TICKETS_ERROR,
    SEARCH_TICKETS,
    SEARCH_TICKETS_SUCCESS,
    SEARCH_TICKETS_ERROR,
    MERGE_TICKETS,
    MERGE_TICKETS_ERROR,
    MERGE_TICKETS_SUCCESS,
    FETCH_GUEST,
    FETCH_GUEST_SUCCESS,
    FETCH_GUEST_ERROR,
    UPDATE_GUEST,
    UPDATE_GUEST_SUCCESS,
    UPDATE_GUEST_ERROR,
    FETCH_GUEST_TICKETS,
    FETCH_GUEST_TICKETS_SUCCESS,
    FETCH_GUEST_TICKETS_ERROR,
    FETCH_GUEST_RESERVATIONS,
    FETCH_GUEST_RESERVATIONS_SUCCESS,
    FETCH_GUEST_RESERVATIONS_ERROR,
} from './constants';

export function fetchTickets(data) {
    return {
        type: FETCH_TICKETS,
        data
    };
}

export function fetchTicketsSuccess(data) {
    return {
        type: FETCH_TICKETS_SUCCESS,
        data
    };
}

export function fetchTicketsError(data) {
    return {
        type: FETCH_TICKETS_ERROR,
        data
    };
}

export function fetchTicket(data) {
    return {
        type: FETCH_TICKET,
        data
    };
}

export function fetchTicketSuccess(data) {
    return {
        type: FETCH_TICKET_SUCCESS,
        data
    };
}

export function fetchTicketError(data) {
    return {
        type: FETCH_TICKET_ERROR,
        data
    };
}

export function setTicketsDisplay(data) {
    return {
        type: SET_TICKETS_DISPLAY,
        data
    };
}

export function setTicketsFilters(data) {
    return {
        type: SET_TICKETS_FILTERS,
        data
    };
}

export function createNewTicket(data) {
    return {
        type: CREATE_NEW_TICKET,
        data
    };
}

export function createNewTicketSuccess(data) {
    return {
        type: CREATE_NEW_TICKET_SUCCESS,
        data
    };
}

export function createNewTicketError(data) {
    return {
        type: CREATE_NEW_TICKET_ERROR,
        data
    };
}

export function setModalVisible(data) {
    return {
        type: SET_MODAL_VISIBLE,
        data
    };
}

export function editTickets(data) {
    return {
        type: EDIT_TICKETS,
        data
    };
}

export function editTicketsSuccess(data) {
    return {
        type: EDIT_TICKETS_SUCCESS,
        data
    };
}

export function editTicketsError(data) {
    return {
        type: EDIT_TICKETS_ERROR,
        data
    };
}

export function archiveTickets(data) {
    return {
        type: ARCHIVE_TICKETS,
        data
    };
}

export function archiveTicketsSuccess(data) {
    return {
        type: ARCHIVE_TICKETS_SUCCESS,
        data
    };
}

export function archiveTicketsError(data) {
    return {
        type: ARCHIVE_TICKETS_ERROR,
        data
    };
}

export function searchTickets(data) {
    return {
        type: SEARCH_TICKETS,
        data
    };
}

export function searchTicketsSuccess(data) {
    return {
        type: SEARCH_TICKETS_SUCCESS,
        data
    };
}

export function searchTicketsError(data) {
    return {
        type: SEARCH_TICKETS_ERROR,
        data
    };
}

export function mergeTickets(data) {
    return {
        type: MERGE_TICKETS,
        data
    };
}

export function mergeTicketsSuccess(data) {
    return {
        type: MERGE_TICKETS_SUCCESS,
        data
    };
}

export function mergeTicketsError(data) {
    return {
        type: MERGE_TICKETS_ERROR,
        data
    };
}

export function addRecentTicket(data) {
    return {
        type: ADD_RECENT_TICKET,
        data
    };
}

export function fetchGuest(data) {
    return {
        type: FETCH_GUEST,
        data
    };
}

export function fetchGuestSuccess(data) {
    return {
        type: FETCH_GUEST_SUCCESS,
        data
    };
}

export function fetchGuestError(data) {
    return {
        type: FETCH_GUEST_ERROR,
        data
    };
}

export function updateGuest(data) {
    return {
        type: UPDATE_GUEST,
        data
    };
}

export function updateGuestSuccess(data) {
    return {
        type: UPDATE_GUEST_SUCCESS,
        data
    };
}

export function updateGuestError(data) {
    return {
        type: UPDATE_GUEST_ERROR,
        data
    };
}

export function fetchGuestTickets(data) {
    return {
        type: FETCH_GUEST_TICKETS,
        data
    };
}

export function fetchGuestTicketsSuccess(data) {
    return {
        type: FETCH_GUEST_TICKETS_SUCCESS,
        data
    };
}

export function fetchGuestTicketsError(data) {
    return {
        type: FETCH_GUEST_TICKETS_ERROR,
        data
    };
}

export function fetchGuestReservations(data) {
    return {
        type: FETCH_GUEST_RESERVATIONS,
        data
    };
}

export function fetchGuestReservationsSuccess(data) {
    return {
        type: FETCH_GUEST_RESERVATIONS_SUCCESS,
        data
    };
}

export function fetchGuestReservationsError(data) {
    return {
        type: FETCH_GUEST_RESERVATIONS_ERROR,
        data
    };
}
