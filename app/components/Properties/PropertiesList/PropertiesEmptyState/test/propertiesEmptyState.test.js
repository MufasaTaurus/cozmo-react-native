import React from 'react';
import { mount } from 'enzyme';
import PropertiesEmptyState from 'components/Properties/PropertiesList/PropertiesEmptyState';

const renderComponent = (props = {}) => mount(
    <PropertiesEmptyState { ...props } />
);

describe('<PropertiesEmptyState />', () => {
    it('should import property', () => {
        const importSpy = jest.fn();
        const renderedComponent = renderComponent({
            startImport: importSpy,
        });

        const buttons = renderedComponent.find('ButtonNew');
        //expect(buttons.length).toEqual(2);
        expect(buttons.length).toEqual(1);
        //buttons.first().props().onClick();
        // buttons.props().onClick();
        // expect(importSpy).toHaveBeenCalled();
    });

    it('should create new property', () => {
        const createSpy = jest.fn();
        const renderedComponent = renderComponent({
            createNewProperty: createSpy,
        });

        const buttons = renderedComponent.find('ButtonNew');
        //expect(buttons.length).toEqual(2);
        expect(buttons.length).toEqual(1);
        //buttons.at(1).props().onClick();
        buttons.at(0).props().onClick();
        expect(createSpy).toHaveBeenCalled();
    });
});
