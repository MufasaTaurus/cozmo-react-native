import { createSelector } from 'reselect';

const selectTemplates = (state) => state.get('templates');

const makeSelectTemplates = () => createSelector(
    selectTemplates,
    (state) => state.get('templates')
);

const makeSelectLoading = () => createSelector(
    selectTemplates,
    (state) => state.get('loading')
);

const makeSelectTags = () => createSelector(
    selectTemplates,
    (state) => state.get('tags')
);

const selectTemplatesPagination = () => createSelector(
    selectTemplates,
    (state) => state.get('templatesPagination')
);

const selectLetters = () => createSelector(
    selectTemplates,
    (state) => state.get('letters')
);

const selectLettersPagination = () => createSelector(
    selectTemplates,
    (state) => state.get('lettersPagination')
);

const selectAddingTemplate = () => createSelector(
    selectTemplates,
    (state) => state.get('addingTemplate')
);

const selectLoadingTemplate = () => createSelector(
    selectTemplates,
    (state) => state.get('loadingTemplate')
);

export {
    makeSelectTemplates,
    makeSelectLoading,
    makeSelectTags,
    selectTemplatesPagination,
    selectLetters,
    selectLettersPagination,
    selectAddingTemplate,
    selectLoadingTemplate
};
