import {fromJS} from 'immutable';
import {LOGOUT_SUCCESS} from 'containers/App/constants';
import {
    FETCH_REPORTS,
    SET_SELECTED_PROPERTY
} from './constants';

// The initial state of the App
const initialState = fromJS({
    reports: [],
    selectedProperty: {}
});

function analyticsReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_REPORTS:
            return state
                .setIn(['signupForm', 'first_name'], action.data.firstName);
        case SET_SELECTED_PROPERTY:
            return state
                .set('selectedProperty', action.data);
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default analyticsReducer;
