import React from 'react';
import { shallow, mount } from 'enzyme';
import { Cancellation, mapDispatchToProps } from 'components/Properties/PropertiesList/List/PropertyInfo/Listings/Cancellation';
import { fromJS } from 'immutable';

const renderComponent = (props = {}) => mount(
    <Cancellation { ...props } />
);

describe('<Cancellation />', () => {
    it('should render 1 card', () => {
        const renderedComponent = renderComponent({
            property: fromJS({
                id: 1,
                cancellation_policy: 'Unknown'
            })
        });

        expect(renderedComponent.find('Section').length).toEqual(1);
    });

    it('should render 6 policies', () => {
        const renderedComponent = renderComponent({
            property: fromJS({
                id: 1,
                cancellation_policy: 'Unknown'
            })
        });

        expect(renderedComponent.find('.policies .policy').length).toEqual(6);
    });

    it('should not render checkmark', () => {
        const renderedComponent = renderComponent({
            property: fromJS({
                id: 1,
                cancellation_policy: 'Unknown'
            })
        });

        expect(renderedComponent.find('.policies .checkmark').length).toEqual(0);
    });

    it('should render checkmark', () => {
        const renderedComponent = renderComponent({
            property: fromJS({
                id: 1,
                cancellation_policy: 'Rigid'
            })
        });

        expect(renderedComponent.find('.policies .checkmark').length).toEqual(1);
    });

    it('should update property', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            updateProperty: spy,
            property: fromJS({
                id: 1,
                cancellation_policy: 'Rigid'
            })
        });

        renderedComponent.find('.policy').first().simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it('should not update property', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            updateProperty: spy,
            property: fromJS({
                id: 1,
                cancellation_policy: 'Easy'
            })
        });

        renderedComponent.find('.policy').first().simulate('click');
        expect(spy).not.toHaveBeenCalled();
    });

});

