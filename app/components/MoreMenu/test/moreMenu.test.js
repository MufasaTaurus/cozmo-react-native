import React from 'react';
import { mount } from 'enzyme';
import MoreMenu from 'components/MoreMenu';

const renderComponent = (props = {}) => mount(
    <MoreMenu { ...props } />
);

describe('<MoreMenu />', () => {
    it('menu should render when icon is clicked', () => {
        const renderedComponent = renderComponent({
            buttons: [
                { label: 'Button1', click: () => {} },
                { label: 'Button2', click: () => {} },
            ],
        });
        expect(renderedComponent.find('.popup-menu').length).toEqual(0);
        renderedComponent.find('.icon').props().onClick();
        expect(renderedComponent.find('.popup-menu').length).toEqual(1);
    });

    it('all button should fire their onClicks', () => {
        const button1Spy = jest.fn();
        const renderedComponent = renderComponent({
            buttons: [
                { label: 'Button1', click: button1Spy },
                { label: 'Button2', click: () => {} },
            ],
        });
        renderedComponent.find('.icon').props().onClick();
        expect(renderedComponent.find('.popup-menu').length).toEqual(1);
        const buttons = renderedComponent.find('.popup-option');
        buttons.first().props().onClick();
        expect(button1Spy).toHaveBeenCalled();
    });
});
