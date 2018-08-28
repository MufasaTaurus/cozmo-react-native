import { fromJS } from 'immutable';
import {
    ADD_NEW_TAG_SUCCESS,
    FETCH_TAGS_SUCCESS,
    FETCH_LETTERS,
    FETCH_LETTERS_SUCCESS,
    ADD_TEMPLATE,
    ADD_TEMPLATE_SUCCESS,
    ADD_TEMPLATE_ERROR,
    FETCH_TEMPLATE,
    FETCH_TEMPLATE_SUCCESS
} from './constants';
import {
    LOGOUT_SUCCESS,
    FETCH_TEMPLATES,
    FETCH_TEMPLATES_SUCCESS,
    FETCH_TEMPLATES_ERROR
} from 'containers/App/constants';
import PaginationModel from 'models/Pagination';
import WelcomeLetterModel from 'models/WelcomeLetter';

// The initial state of the App
const initialState = fromJS({
    templates: [],
    templatesPagination: new PaginationModel({}),
    letters: [],
    lettersPagination: new PaginationModel({}),
    loading: true,
    loadingTemplate: false,
    addingTemplate: '',
    tags: []
});

function templatesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TEMPLATES:
        case FETCH_LETTERS:
            return state
                .set('loading', true);
        case FETCH_TEMPLATE:
            return state
                .set('loadingTemplate', true);
        case FETCH_TEMPLATES_SUCCESS:
            return state
                .set('templates', fromJS(action.data.results))
                .set('templatesPagination', state.get('templatesPagination').setCount(action.data.count))
                .set('loading', false);
        case FETCH_LETTERS_SUCCESS:
            return state
                .set('letters', action.data.results.map(l => new WelcomeLetterModel(l)))
                .set('lettersPagination', state.get('lettersPagination').setCount(action.data.count))
                .set('loading', false);
        case FETCH_TEMPLATE_SUCCESS:
            return state
                .set('templates', state.get('templates').push(fromJS(action.data)))
                .set('loadingTemplate', false);
        case FETCH_TEMPLATES_ERROR:
            return state
                .set('loading', false);
        case ADD_TEMPLATE:
            return state
                .set('addingTemplate', 'adding');
        case ADD_TEMPLATE_SUCCESS:
            return state
                .set('addingTemplate', '');
        case ADD_TEMPLATE_ERROR:
            return state
                .set('addingTemplate', 'error');
        case ADD_NEW_TAG_SUCCESS:
            return state
                .set('tags', state.get('tags').push(fromJS(action.data)));
        case FETCH_TAGS_SUCCESS:
            return state.
                set('tags', fromJS(action.data));
        case LOGOUT_SUCCESS:
            return initialState
                .set('templatesPagination', new PaginationModel({}))
                .set('lettersPagination', new PaginationModel({}));
        default:
            return state;
    }
}

export default templatesReducer;
