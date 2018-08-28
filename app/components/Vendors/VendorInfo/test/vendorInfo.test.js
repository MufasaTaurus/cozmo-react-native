import React from 'react';
import { mount } from 'enzyme';
import { VendorInfo, mapDispatchToProps } from 'components/Vendors/VendorInfo';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

const sampleData = [
    { id: '1', first_name: 'Aa', last_name: 'Bb', phone: '12345', email: 'aa@aa.aa' }
];

let actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        vendors: {
            vendors: sampleData,
            loading: true,
            jobs: {},
            loadingJobs: true,
            assignedProperties: {},
            loadingAssignedProperties: true,
            vendorsListQuery: ''
        }
    }),
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <VendorInfo { ...props } />
    </Provider>
);

describe('<VendorInfo />', () => {
    it('should render 3 sections', () => {
        const renderedComponent = renderComponent({
            id: '1',
            vendors: fromJS(sampleData),
            loading: false
        });

        expect(renderedComponent.find('AssignedProperties').length).toEqual(1);
        expect(renderedComponent.find('Jobs').length).toEqual(1);
        expect(renderedComponent.find('.cleaner-info').length).toEqual(1);
    });

    it('should render change state', () => {
        const renderedComponent = renderComponent({
            id: '1',
            vendors: fromJS(sampleData),
            loading: false,
        });

        const profileSection = renderedComponent.find('.cleaner-info');
        expect(profileSection.find('.content').length).toEqual(1);

        profileSection.find('.edit').simulate('click');
        expect(profileSection.find('TextField').length).toEqual(4);
        expect(profileSection.find('TextField').first().props().value).toEqual('Aa');
        expect(profileSection.find('TextField').at(1).props().value).toEqual('Bb');
        expect(profileSection.find('TextField').at(2).props().value).toEqual('aa@aa.aa');
        expect(profileSection.find('TextField').at(3).props().value).toEqual('12345');
    });

    it('should update Vendor', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            id: '1',
            vendors: fromJS(sampleData),
            loading: false,
            updateVendor: spy
        });

        const profileSection = renderedComponent.find('.cleaner-info');
        profileSection.find('.edit').simulate('click');
        profileSection.find('button').simulate('click');
        expect(spy).toHaveBeenCalled();
    });

});
