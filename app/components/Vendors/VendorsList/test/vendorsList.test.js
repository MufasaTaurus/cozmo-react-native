import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { VendorsList, mapDispatchToProps } from 'components/Vendors/VendorsList';
import { fromJS } from 'immutable';

const sampleData = [
    { id: 1, account_type: 'Cleaner', assignments: 1, email: 'aa@aa.aa', first_name: 'xx', last_name: '11', phone: '1234567', is_active: true },
    { id: 2, account_type: 'Maintainer', assignments: 2, email: 'bb@bb.bb', first_name: 'yy', last_name: '22', phone: '1234567', is_active: true },
    { id: 3, account_type: 'Cleaner', assignments: 0, email: 'cc@cc.cc', first_name: 'zz', last_name: '33', phone: '1234567', is_active: false }
];

const defaultStore = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => fromJS({
        vendors: {
            vendors: sampleData,
            loading: true,
            jobs: {},
            loadingJobs: true,
            assignedProperties: {},
            loadingAssignedProperties: true,
            vendorsListQuery: ''
        },
        global: {
            cleaners: []
        }
    }),
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <VendorsList { ...props } />
    </Provider>
);

describe('<VendorsList />', () => {
    it('should render', () => {
        const renderedComponent = renderComponent({
            vendors: fromJS([]),
            loading: true,
            query: ''
        });

        expect(renderedComponent.find('Tabs').length).toEqual(1);
        expect(renderedComponent.find('Invite').length).toEqual(1);
    });

    // it('should render Active Vendors', () => {
    //     const renderedComponent = renderComponent({
    //         vendors: fromJS(sampleData),
    //         loading: false,
    //         query: ''
    //     });
    //
    //     expect(renderedComponent.find('Table').length).toEqual(1);
    //     expect(renderedComponent.find('tr.vendor').length).toEqual(2);
    // });

    it('should render Disable Vendors', () => {
        const renderedComponent = renderComponent({
            vendors: fromJS(sampleData),
            loading: false,
            query: ''
        });

        renderedComponent.find('.vj-tabs-tab').at(1).simulate('click');
        expect(renderedComponent.find('Table').length).toEqual(2);
        //expect(renderedComponent.find('tr.vendor').length).toEqual(1);
    });

    // it('should filter results', () => {
    //     const spy = jest.fn();
    //     const renderedComponent = renderComponent({
    //         vendors: fromJS(sampleData),
    //         loading: false,
    //         query: 'aa',
    //         changeQuery: spy
    //     });
    //
    //     expect(renderedComponent.find('tr.vendor').length).toEqual(1);
    //
    //     renderedComponent.find('input').simulate('change', { target: { value: 'aaa' } });
    //     expect(spy).toHaveBeenCalled();
    // });
});


