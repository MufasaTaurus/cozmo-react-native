import { fromJS } from 'immutable';
import {
    NEXT_STEP,
    SELECT_PLAN,
    CHANGE_TEAM,
    CHANGE_PROPERTIES,
    FINISH_ONBOARDING_SUCCESS,
    FINISH_ONBOARDING_ERROR,
    SUBMIT_FIRST_STEP,
    SUBMIT_FIRST_STEP_ERROR,
    SUBMIT_FIRST_STEP_SUCCESS
} from './constants';
import { LOGOUT_SUCCESS } from 'containers/App/constants';

// The initial state of the App
const initialState = fromJS({
    currentStep: 0,
    plan: '',
    team: 1,
    properties: 1,
    finished: false,
    phoneTaken: 'checking'
});

function onboardingReducer(state = initialState, action) {
    switch (action.type) {
        case NEXT_STEP:
            return state
                .set('currentStep', state.get('currentStep') + 1);
        case SELECT_PLAN:
            return state
                .set('plan', action.data);
        case CHANGE_TEAM:
            return state
                .set('team', action.data);
        case CHANGE_PROPERTIES:
            return state
                .set('properties', action.data);
        case SUBMIT_FIRST_STEP:
            return state
                .set('phoneTaken', 'checking');
        case SUBMIT_FIRST_STEP_ERROR:
            return state
                .set('phoneTaken', true);
        case SUBMIT_FIRST_STEP_SUCCESS:
            return state
                .set('phoneTaken', false);
        case FINISH_ONBOARDING_SUCCESS:
        case FINISH_ONBOARDING_ERROR:
            return state
                .set('phoneTaken', 'checking')
                .set('finished', true);
        case LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

export default onboardingReducer;
