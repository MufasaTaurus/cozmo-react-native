import {
    ADD_TEMPLATE,
    DELETE_TEMPLATE,
    EDIT_TEMPLATE,
    ADD_NEW_TAG,
    ADD_NEW_TAG_SUCCESS,
    FETCH_TAGS,
    FETCH_TAGS_SUCCESS,
    FETCH_LETTERS,
    FETCH_LETTERS_SUCCESS,
    FETCH_LETTERS_ERROR,
    ADD_TEMPLATE_SUCCESS,
    ADD_TEMPLATE_ERROR,
    FETCH_TEMPLATE,
    FETCH_TEMPLATE_SUCCESS
} from './constants';

export function addTemplate(data) {
    return {
        type: ADD_TEMPLATE,
        data
    };
}

export function addTemplateSuccess(data) {
    return {
        type: ADD_TEMPLATE_SUCCESS,
        data
    };
}

export function addTemplateError(data) {
    return {
        type: ADD_TEMPLATE_ERROR,
        data
    };
}

export function deleteTemplate(data) {
    return {
        type: DELETE_TEMPLATE,
        data
    };
}

export function editTemplate(data) {
    return {
        type: EDIT_TEMPLATE,
        data
    };
}

export function addNewTag(data) {
    return {
        type: ADD_NEW_TAG,
        data
    };
}

export function addNewTagSuccess(data) {
    return {
        type: ADD_NEW_TAG_SUCCESS,
        data
    };
}

export function fetchTags(data) {
    return {
        type: FETCH_TAGS,
        data
    };
}

export function fetchTagsSuccess(data) {
    return {
        type: FETCH_TAGS_SUCCESS,
        data
    };
}

export function fetchLetters(data) {
    return {
        type: FETCH_LETTERS,
        data
    };
}

export function fetchLettersSuccess(data) {
    return {
        type: FETCH_LETTERS_SUCCESS,
        data
    };
}

export function fetchLettersError(data) {
    return {
        type: FETCH_LETTERS_ERROR,
        data
    };
}

export function fetchTemplate(data) {
    return {
        type: FETCH_TEMPLATE,
        data
    };
}

export function fetchTemplateSuccess(data) {
    return {
        type: FETCH_TEMPLATE_SUCCESS,
        data
    };
}
