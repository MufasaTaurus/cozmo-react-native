import React from 'react';
import { mount } from 'enzyme';
import Tabs from 'components/Tabs';

const renderComponent = (props = {}) => mount(
    <Tabs { ...props } />
);

describe('<Tabs />', () => {
    it('correct number of tabs should render', () => {
        const renderedComponent = renderComponent({
            tabs: [
                { title: 'Tab 1', content: 'Content of tab 1' },
                { title: 'Tab 2', content: 'Content of tab 2' },
                { title: 'Tab 3', content: 'Content of tab 3' },
                { title: 'Tab 4', content: 'Content of tab 4' },
                { title: 'Tab 5', content: 'Content of tab 5' },
            ],
        });
        const tabs = renderedComponent.find('.vj-tabs-tab');
        expect(tabs.length).toEqual(5);
    });

    it('left, right and default active tab should render correctly', () => {
        const renderedComponent = renderComponent({
            tabs: [
                { title: 'Tab 1', content: 'Content of tab 1' },
                { title: 'Tab 2', content: 'Content of tab 2' },
                { title: 'Tab 3', content: 'Content of tab 3' },
                { title: 'Tab 4', content: 'Content of tab 4' },
                { title: 'Tab 5', content: 'Content of tab 5' },
            ],
            defaultActive: 3,
        });
        const tabs = renderedComponent.find('.vj-tabs-tab');
        expect(tabs.find('.left').length).toEqual(3);
        expect(tabs.find('.right').length).toEqual(1);
        expect(tabs.at(3).hasClass('active')).toEqual(true);
    });

    it('clicked tab should become active', () => {
        const renderedComponent = renderComponent({
            tabs: [
                { title: 'Tab 1', content: 'Content of tab 1' },
                { title: 'Tab 2', content: 'Content of tab 2' },
            ],
        });
        const tabs = renderedComponent.find('.vj-tabs-tab');
        expect(tabs.at(0).hasClass('active')).toEqual(true);
        expect(tabs.at(1).hasClass('active')).toEqual(false);
        tabs.at(1).props().onClick();
        expect(tabs.at(0).hasClass('active')).toEqual(false);
        expect(tabs.at(1).hasClass('active')).toEqual(true);
    });
});
