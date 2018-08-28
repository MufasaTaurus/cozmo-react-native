import React from 'react';
import { mount } from 'enzyme';
import { PropertiesList, mapDispatchToProps } from 'components/Properties/PropertiesList';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import PaginationModel from 'models/Pagination';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

let actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        properties: {
            searchQuery: '',
            properties: [],
            propertiesPagination: new PaginationModel({}),
            fetchPropertiesLoading: true,
            import: false
        },
        templates: {
            templates: []
        }
    }),
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <MuiThemeProvider>
            <PropertiesList { ...props } />
        </MuiThemeProvider>
    </Provider>
);

describe('<PropertiesList />', () => {
    it('should render loader', () => {
        // const renderedComponent = renderComponent({
        //     id: null,
        //     section: null,
        //     properties: fromJS([]),
        //     loading: true,
        //     fetchProperties: () => {}
        // });
        // expect(renderedComponent.find('CircularProgress').length).toEqual(1);
        // expect(renderedComponent.find('List').length).toEqual(0);
        // expect(renderedComponent.find('PropertiesEmptyState').length).toEqual(0);
    });

    // it('should fetch properties', () => {
    //     const fetchSpy = jest.fn();
    //     renderComponent({
    //         id: null,
    //         section: null,
    //         properties: fromJS([]),
    //         loading: false,
    //         fetchProperties: fetchSpy
    //     });
    //
    //     expect(fetchSpy).toHaveBeenCalled();
    // });
    //
    // it('should render empty state', () => {
    //     const renderedComponent = renderComponent({
    //         id: null,
    //         section: null,
    //         properties: fromJS([]),
    //         loading: false,
    //         fetchProperties: () => {}
    //     });
    //
    //     expect(renderedComponent.find('CircularProgress').length).toEqual(0);
    //     expect(renderedComponent.find('List').length).toEqual(0);
    //     expect(renderedComponent.find('PropertiesEmptyState').length).toEqual(1);
    // });
    //
    // it('should render properties', () => {
    //     const renderedComponent = renderComponent({
    //         id: null,
    //         section: null,
    //         properties: fromJS([{ id: 1 }]),
    //         loading: false,
    //         fetchProperties: () => {}
    //     });
    //
    //     expect(renderedComponent.find('CircularProgress').length).toEqual(0);
    //     //expect(renderedComponent.find('List').length).toEqual(1);
    //     expect(renderedComponent.find('PropertiesEmptyState').length).toEqual(0);
    // });
    //
    // it('should render import tool', () => {
    //     const renderedComponent = renderComponent({
    //         id: null,
    //         section: null,
    //         properties: fromJS([]),
    //         loading: false,
    //         import: true,
    //         fetchProperties: () => {}
    //     });
    //
    //     expect(renderedComponent.find('ImportDialog').length).toEqual(1);
    // });
});
