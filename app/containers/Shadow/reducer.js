import { fromJS } from 'immutable';
import {
    CHECK_SECRET,
    CHECK_SECRET_SUCCESS,
    CHECK_SECRET_ERROR,
} from './constants';

const initialState = fromJS({
    secretValid: 'checking',
    loading: false,
});

function templatesReducer(state = initialState, action) {
    switch (action.type) {
        case CHECK_SECRET:
            return state
                .set('secretValid', 'checking')
                .set('loading', true);
        case CHECK_SECRET_SUCCESS:
            return state
                .set('secretValid', 'ok')
                .set('loading', false);
        case CHECK_SECRET_ERROR:
            return state
                .set('secretValid', 'error')
                .set('loading', false);
        default:
            return state;
    }
}

export default templatesReducer;
