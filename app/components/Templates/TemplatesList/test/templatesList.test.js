import React from 'react';
import { mount } from 'enzyme';
import { TemplatesList, mapDispatchToProps } from 'components/Templates/TemplatesList';
import PaginationModel from 'models/Pagination';
import { fromJS } from 'immutable';
import { Provider } from 'react-redux';

const defaultStore = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => fromJS({
        templates: {
            templates: sampleData,
            letters: [],
            lettersPagination: new PaginationModel({ currentPage: 1 }),
            templatesPagination: new PaginationModel({ currentPage: 1 }),
        }
    }),
};

const sampleData = [
    { id: 1, name: 'aaa', description: 'ddd', content: '<p>qqq</p>', tags: [{ name: 't', id: 1 }] },
    { id: 2, name: 'aaa', description: 'ddd', content: '<p>vvv</p>', tags: [{ name: 't', id: 1 }, { name: 'y', id: 2 }] },
    { id: 3, name: 'ccc', description: 'zzz', content: '<p>hhh</p>', tags: [{ name: 't', id: 1 }, { name: 'y', id: 2 }, { name: 'u', id: 3 }] }
];

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <TemplatesList { ...props } />
    </Provider>
);

describe('<TemplatesList />', () => {
    // it('should render 1 section', () => {
    //     const renderedComponent = renderComponent({
    //         templates: fromJS([]),
    //         loading: true,
    //         pagination: new PaginationModel({ currentPage: 1 })
    //     });
    //
    //     expect(renderedComponent.find('InfoSection').length).toEqual(1);
    // });

    it('should render List', () => {
        const renderedComponent = renderComponent({
            templates: fromJS(sampleData),
            loading: false,
        });

        expect(renderedComponent.find('.templates-list-table').length).toEqual(2);
    });

    it('should render proper number of rows', () => {
        const renderedComponent = renderComponent({
            templates: fromJS(sampleData),
            loading: false,
        });

        expect(renderedComponent.find('table tbody tr').length).toEqual(3);
        expect(renderedComponent.find('.empty-state').length).toEqual(0);
    });

    // it('should render Empty state', () => {
    //     const renderedComponent = renderComponent({
    //         templates: fromJS([]),
    //         loading: false,
    //         pagination: new PaginationModel({ currentPage: 1 })
    //     });
    //
    //     expect(renderedComponent.find('Table').length).toEqual(0);
    //     expect(renderedComponent.find('.empty-state').length).toEqual(1);
    // });

    it('should filter results', () => {
        const renderedComponent = renderComponent({
            templates: fromJS(sampleData),
            loading: false,
        });

        const searchBox = renderedComponent.find('SearchBox input').first();
        searchBox.simulate('change', { target: { value: 'u' } });
        expect(renderedComponent.find('table tbody tr').length).toEqual(1);

        searchBox.simulate('change', { target: { value: 't' } });
        expect(renderedComponent.find('table tbody tr').length).toEqual(3);

        searchBox.simulate('change', { target: { value: 'ddd' } });
        expect(renderedComponent.find('table tbody tr').length).toEqual(0);

        searchBox.simulate('change', { target: { value: 'aaa' } });
        expect(renderedComponent.find('table tbody tr').length).toEqual(2);

        searchBox.simulate('change', { target: { value: '' } });
        expect(renderedComponent.find('table tbody tr').length).toEqual(3);
    });
});
