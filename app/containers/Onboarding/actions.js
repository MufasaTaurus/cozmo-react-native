import {
    NEXT_STEP,
    SELECT_PLAN,
    CHANGE_TEAM,
    CHANGE_PROPERTIES,
    SUBMIT_FIRST_STEP,
    SUBMIT_FIRST_STEP_SUCCESS,
    SUBMIT_FIRST_STEP_ERROR,
    FINISH_ONBOARDING,
    FINISH_ONBOARDING_SUCCESS,
    FINISH_ONBOARDING_ERROR
} from './constants';

export function nextStep(data) {
    return {
        type: NEXT_STEP,
        data
    };
}

export function selectPlan(data) {
    return {
        type: SELECT_PLAN,
        data
    };
}

export function changeTeam(data) {
    return {
        type: CHANGE_TEAM,
        data
    };
}

export function changeProperties(data) {
    return {
        type: CHANGE_PROPERTIES,
        data
    };
}

export function submitFirstStep(data) {
    return {
        type: SUBMIT_FIRST_STEP,
        data
    };
}

export function submitFirstStepSuccess(data) {
    return {
        type: SUBMIT_FIRST_STEP_SUCCESS,
        data
    };
}

export function submitFirstStepError(data) {
    return {
        type: SUBMIT_FIRST_STEP_ERROR,
        data
    };
}

export function finishOnboarding(data) {
    return {
        type: FINISH_ONBOARDING,
        data
    };
}

export function finishOnboardingSuccess(data) {
    return {
        type: FINISH_ONBOARDING_SUCCESS,
        data
    };
}

export function finishOnboardingError(data) {
    return {
        type: FINISH_ONBOARDING_ERROR,
        data
    };
}
