import {createSelector} from 'reselect';

const selectInbox = (state) => state.get('inbox');

const selectTickets = () => createSelector(
    selectInbox,
    (state) => state.get('tickets')
);

const selectLoading = () => createSelector(
    selectInbox,
    (state) => state.get('loading')
);

const selectDisplay = () => createSelector(
    selectInbox,
    (state) => state.get('display')
);

const selectFilters = () => createSelector(
    selectInbox,
    (state) => state.get('filters')
);

const selectModalVisible = () => createSelector(
    selectInbox,
    (state) => state.get('modalVisible')
);

const selectPagination = () => createSelector(
    selectInbox,
    (state) => state.get('pagination')
);

const selectSearchedTickets = () => createSelector(
    selectInbox,
    (state) => state.get('searchedTickets')
);

const selectSearchingTickets = () => createSelector(
    selectInbox,
    (state) => state.get('searchingTickets')
);

const selectRecentTickets = () => createSelector(
    selectInbox,
    (state) => state.get('recentTickets')
);

const selectGuest = () => createSelector(
    selectInbox,
    (state) => state.get('guest')
);

export {
    selectTickets,
    selectLoading,
    selectDisplay,
    selectFilters,
    selectModalVisible,
    selectPagination,
    selectSearchedTickets,
    selectSearchingTickets,
    selectRecentTickets,
    selectGuest
};
