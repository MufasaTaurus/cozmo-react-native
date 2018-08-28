import { createSelector } from 'reselect';

const selectOwnersState = (state) => state.get('owners');

const selectOwners = () => createSelector(
    selectOwnersState,
    (state) => state.get('owners')
);

const selectLoading = () => createSelector(
    selectOwnersState,
    (state) => state.get('loading')
);

const selectAddingOwner = () => createSelector(
    selectOwnersState,
    (state) => state.get('addingOwner')
);

export {
    selectOwners,
    selectLoading,
    selectAddingOwner
};
