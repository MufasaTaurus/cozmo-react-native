import React from 'react';
import { mount } from 'enzyme';
import { PropertiesList, mapDispatchToProps } from 'components/Properties/PropertiesList/List';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import PaginationModel from 'models/Pagination';

let actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        properties: {
            properties: [],
            propertiesPagination: new PaginationModel({}),
            selectedProperty: fromJS({ id: 1, name: 'name', images: [{ url: '' }] }),
        },
        templates: {
            templates: []
        },
        reservations: {
            propertyCalendars: {},
            addingRate: 'ok',
            quoteFetching: 'ok',
            quote: null,
            loading: false
        }
    }),
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <PropertiesList { ...props } />
    </Provider>
);

describe('<PropertiesList />', () => {
    it('should render a list with 1 row', () => {
        const renderedComponent = renderComponent({
            id: null,
            section: null,
            pagination: new PaginationModel({}),
            properties: fromJS([
                {
                    name: 'Name',
                    id: 1,
                    description: 'Description',
                    status: 'Active',
                    images: [
                        {
                            url: ''
                        }
                    ]
                }
            ]),
        });

        //expect(renderedComponent.find('.vj-list-table').length).toEqual(1);
        expect(renderedComponent.find('tr.property').length).toEqual(1);
    });

    it('should render a list with 2 rows', () => {
        const renderedComponent = renderComponent({
            id: null,
            section: null,
            pagination: new PaginationModel({}),
            display: 'active',
            properties: fromJS([
                {
                    name: 'Name',
                    id: 1,
                    description: 'Description',
                    status: 'Active',
                    images: [
                        {
                            url: ''
                        }
                    ]
                },
                {
                    name: 'Name',
                    id: 2,
                    description: 'Description',
                    status: 'Active',
                    images: [
                        {
                            url: ''
                        }
                    ]
                }
            ]),
        });

        //expect(renderedComponent.find('.vj-list-table').length).toEqual(1);
        expect(renderedComponent.find('tr.property').length).toEqual(2);
    });

    it('should render only disabled properties', () => {
        const renderedComponent = renderComponent({
            id: null,
            section: null,
            pagination: new PaginationModel({}),
            properties: fromJS([
                {
                    name: 'Name',
                    id: 1,
                    description: 'Description',
                    status: 'Active',
                    images: [
                        {
                            url: ''
                        }
                    ]
                },
                {
                    name: 'Name',
                    id: 2,
                    description: 'Description',
                    status: 'Archived',
                    images: [
                        {
                            url: ''
                        }
                    ]
                }
            ]),
        });

        const disTab = renderedComponent.find('.vj-tabs-tab').at(1);
        disTab.simulate('click');

        //expect(renderedComponent.find('tr.property').length).toEqual(1);
        expect(disTab.props().className).toEqual('vj-tabs-tab active');
    });

    it('should render only drafts', () => {
        const renderedComponent = renderComponent({
            id: null,
            section: null,
            pagination: new PaginationModel({}),
            properties: fromJS([
                {
                    name: 'Name',
                    id: 1,
                    description: 'Description',
                    status: 'Active',
                    images: [
                        {
                            url: ''
                        }
                    ]
                },
                {
                    name: 'Name',
                    id: 2,
                    description: 'Description',
                    status: 'Archived',
                    images: [
                        {
                            url: ''
                        }
                    ]
                },
                {
                    name: 'Name',
                    id: 3,
                    description: 'Description',
                    status: 'Draft',
                    images: [
                        {
                            url: ''
                        }
                    ]
                }
            ]),
        });

        const draftTab = renderedComponent.find('.vj-tabs-tab').at(1);
        draftTab.simulate('click');

        //expect(renderedComponent.find('tr.property').length).toEqual(1);
        expect(draftTab.props().className).toEqual('vj-tabs-tab active');
    });

    // it('should render single property info', () => {
    //     const selectSpy = jest.fn();
    //     const renderedComponent = renderComponent({
    //         id: 1,
    //         section: null,
    //         pagination: new PaginationModel({}),
    //         display: 'active',
    //         selectProperty: selectSpy,
    //         selectedProperty: fromJS({ id: 1, name: 'name', images: [{ url: '' }] }),
    //         properties: fromJS([
    //             {
    //                 name: 'Name',
    //                 id: 1,
    //                 description: 'Description',
    //                 status: 'Active',
    //                 images: [
    //                     {
    //                         url: ''
    //                     }
    //                 ]
    //             }
    //         ]),
    //     });
    //
    //     expect(selectSpy).toHaveBeenCalled();
    //     expect(renderedComponent.find('PropertyInfo').length).toEqual(1);
    // });
});
