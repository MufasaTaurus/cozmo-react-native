import { fromJS } from 'immutable';
import OwnerModel from 'models/Owner';
import {
    FETCH_OWNERS,
    FETCH_OWNERS_SUCCESS,
    FETCH_OWNERS_ERROR,
    ADD_OWNER,
    ADD_OWNER_SUCCESS,
    ADD_OWNER_ERROR
} from './constants';
import { LOGOUT_SUCCESS } from 'containers/App/constants';

const initialState = fromJS({
    owners: [new OwnerModel({ id: 1 }), new OwnerModel({ id: 2 }), new OwnerModel({ id: 3 })],
    loading: true,
    addingOwner: ''
});

function templatesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_OWNERS:
            return state
                .set('loading', true);
        case FETCH_OWNERS_SUCCESS:
            return state
                .set('owners', action.data.map(o => new OwnerModel(o)))
                .set('loading', false);
        case FETCH_OWNERS_ERROR:
            return state
                .set('loading', false);
        case ADD_OWNER:
            return state
                .set('addingOwner', 'adding');
        case ADD_OWNER_SUCCESS:
            return state
                .set('addingOwner', '');
        case ADD_OWNER_ERROR:
            return state
                .set('addingOwner', action.data.data);
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default templatesReducer;
