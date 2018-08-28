import {fromJS} from 'immutable';
import clone from 'lodash/cloneDeep';
import { LOCAL_STORAGE_RECENT_TICKETS } from 'utils/const';
import TicketModel from 'models/Ticket';
import ReservationModel from 'models/Reservation';
import PaginationModel from 'models/Pagination';
import GuestModel from 'models/Guest';
import {
    FETCH_TICKETS,
    FETCH_TICKETS_SUCCESS,
    FETCH_TICKETS_ERROR,
    FETCH_TICKET,
    FETCH_TICKET_SUCCESS,
    FETCH_TICKET_ERROR,
    SET_TICKETS_DISPLAY,
    SET_TICKETS_FILTERS,
    SET_MODAL_VISIBLE,
    CREATE_NEW_TICKET_SUCCESS,
    EDIT_TICKETS,
    EDIT_TICKETS_SUCCESS,
    EDIT_TICKETS_ERROR,
    SEARCH_TICKETS,
    SEARCH_TICKETS_SUCCESS,
    SEARCH_TICKETS_ERROR,
    ADD_RECENT_TICKET,
    FETCH_GUEST,
    FETCH_GUEST_SUCCESS,
    FETCH_GUEST_ERROR,
    FETCH_GUEST_TICKETS_SUCCESS,
    FETCH_GUEST_RESERVATIONS_SUCCESS,
} from './constants';
import {LOGOUT_SUCCESS} from 'containers/App/constants';

// The initial state of the App
const recentTickets = JSON.parse(localStorage.getItem(LOCAL_STORAGE_RECENT_TICKETS));
const initialState = fromJS({
    tickets: [],
    pagination: new PaginationModel({ currentPage: 1 }),
    loading: true,
    display: 'active',
    filters: {
        status: '',
        priority: '',
        type: '',
        assignee: ''
    },
    modalVisible: false,
    searchedTickets: [],
    searchingTickets: false,
    recentTickets: recentTickets ? recentTickets.map(t => new TicketModel(fromJS(t))) : [], // max 10
    guest: new GuestModel({})
});

function reducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TICKETS:
        case FETCH_TICKET:
        case EDIT_TICKETS:
        case FETCH_GUEST:
            return state
                .set('loading', true);
        case FETCH_TICKETS_SUCCESS:
            return state
                .set('tickets', fromJS(action.data.results).map(t => new TicketModel(t)))
                .set('pagination', state.get('pagination').setCount(action.data.count))
                .set('loading', false);
        case FETCH_TICKETS_ERROR:
        case FETCH_TICKET_ERROR:
        case EDIT_TICKETS_ERROR:
        case FETCH_GUEST_ERROR:
            return state
                .set('loading', false);
        case FETCH_TICKET_SUCCESS:
            return state
                .set('tickets', state.get('tickets').push(new TicketModel(fromJS(action.data))))
                .set('loading', false);
        case SET_TICKETS_DISPLAY:
            return state
                .set('pagination', state.get('pagination').setPage(1))
                .set('display', action.data)
                .set('loading', true);
        case SET_TICKETS_FILTERS:
            return state
                .setIn(['filters', action.data.filter], action.data.value);
        case SET_MODAL_VISIBLE:
            return state
                .set('modalVisible', action.data);
        case CREATE_NEW_TICKET_SUCCESS:
            return state
                .set('tickets', state.get('tickets').push(new TicketModel(fromJS(action.data))))
                .set('modalVisible', false);
        case EDIT_TICKETS_SUCCESS:
            let o = fromJS({});
            const updatedTickets = action.data.map(t => new TicketModel(fromJS(t)));
            action.data.map(t => o = o.set(t.id, new TicketModel(fromJS(t))));
            return state
                .set('tickets', state.get('tickets').filter(t => !o.get(t.getId())).concat(updatedTickets))
                .set('loading', false);
        case SEARCH_TICKETS:
            return state
                .set('searchingTickets', true);
        case SEARCH_TICKETS_SUCCESS:
            return state
                .set('searchedTickets', fromJS(action.data.results).map(t => new TicketModel(t)))
                .set('searchingTickets', false);
        case SEARCH_TICKETS_ERROR:
            return state
                .set('searchingTickets', false);
        case ADD_RECENT_TICKET:
            const tickets = state.get('recentTickets')
                .filter(t => t.getId() !== action.data.getId())
                .unshift(action.data)
                .take(10);
            localStorage.setItem(LOCAL_STORAGE_RECENT_TICKETS, JSON.stringify(tickets));
            return state
                .set('recentTickets', tickets);
        case FETCH_GUEST_SUCCESS:
            return state
                .set('guest', new GuestModel(action.data))
                .set('loading', false);
        case FETCH_GUEST_TICKETS_SUCCESS:
            const guest = clone(state.get('guest'))
                .setTicketsCount(action.data.count)
                .setTickets(fromJS(action.data.results).map(t => new TicketModel(t)));
            return state
                .set('guest', guest);
        case FETCH_GUEST_RESERVATIONS_SUCCESS:
            const guestR = clone(state.get('guest'))
                .setReservations(fromJS(action.data.results).map(r => new ReservationModel(fromJS(r))));
            return state
                .set('guest', guestR);
        case LOGOUT_SUCCESS:
            localStorage.removeItem(LOCAL_STORAGE_RECENT_TICKETS);
            return initialState;
        default:
            return state;
    }
}

export default reducer;
