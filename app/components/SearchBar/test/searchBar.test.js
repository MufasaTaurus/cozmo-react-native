import React from 'react';
import { shallow, mount } from 'enzyme';
import SearchBar from 'components/SearchBar';

const renderComponent = (props = {}) => mount(
    <SearchBar { ...props } />
);

describe('<SearchBar />', () => {
    it('should pass props to search input', () => {
        const changeSearch = jest.fn();
        const renderedComponent = renderComponent({
            searchBox: {
                className: 'small',
                placeholder: 'test',
                value: '5',
                onChange: changeSearch,
            },
        });
        const input = renderedComponent.find('input');
        expect(input.length).toEqual(1);
        expect(input.props().value).toEqual('5');
        expect(input.props().placeholder).toEqual('test');
        input.simulate('change');
        expect(changeSearch).toHaveBeenCalled();
    });

    it('should pass props to button', () => {
        const handleClick = jest.fn();
        const renderedComponent = renderComponent({
            searchBox: {},
            button: {
                className: 'small',
                onClick: handleClick,
                label: 'small',
            },
        });
        const button = renderedComponent.find('ButtonNew');
        expect(button.length).toEqual(1);
        expect(button.props().className).toEqual('small');
        button.props().onClick();
        expect(handleClick).toHaveBeenCalled();
    });

    it('should render without borders when needed', () => {
        const renderedComponent = renderComponent({
            borderTop: false,
            borderBottom: false,
            searchBox: {},
            button: {
                label: 'small',
            },
        });
        expect(renderedComponent.find('.wrapper').props().className).toEqual('wrapper no-border-top no-border-bottom');
    });
});
