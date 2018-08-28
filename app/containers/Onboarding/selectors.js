
import {createSelector} from 'reselect';

const selectOnboarding = (state) => state.get('onboarding');

const makeSelectCurrentStep = () => createSelector(
    selectOnboarding,
    (state) => state.get('currentStep')
);

const makeSelectPlan = () => createSelector(
    selectOnboarding,
    (state) => state.get('plan')
);

const makeSelectTeam = () => createSelector(
    selectOnboarding,
    (state) => state.get('team')
);

const makeSelectProperties = () => createSelector(
    selectOnboarding,
    (state) => state.get('properties')
);

const makeSelectFinished = () => createSelector(
    selectOnboarding,
    (state) => state.get('finished')
);

const selectPhoneTaken = () => createSelector(
    selectOnboarding,
    (state) => state.get('phoneTaken')
);

const makeSelectAllData = () => createSelector(
    selectOnboarding,
    (state) => { return { plan: state.get('plan'), team: state.get('team'), properties: state.get('properties') }; }
);

export {
    makeSelectCurrentStep,
    makeSelectPlan,
    makeSelectTeam,
    makeSelectProperties,
    makeSelectFinished,
    makeSelectAllData,
    selectPhoneTaken
};
