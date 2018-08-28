import { createSelector } from 'reselect';

const selectShadowsState = (state) => state.get('shadow');

const selectLoading = () => createSelector(
    selectShadowsState,
    (state) => state.get('loading')
);

const selectSecretValid = () => createSelector(
    selectShadowsState,
    (state) => state.get('secretValid')
);

export {
    selectLoading,
    selectSecretValid
};
