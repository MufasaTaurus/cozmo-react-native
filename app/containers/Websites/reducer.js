import { fromJS } from 'immutable';
import {
    FETCH_WEBSITES,
    FETCH_WEBSITES_SUCCESS,
    FETCH_WEBSITES_ERROR,
} from './constants';
import { LOGOUT_SUCCESS } from 'containers/App/constants';

const initialState = fromJS({
    websites: [],
    loading: true,
});

function templatesReducer(state = initialState, action) {
    switch (action.type) {
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default templatesReducer;
