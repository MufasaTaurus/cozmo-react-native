import React from 'react';
import { mount } from 'enzyme';
import SmartLabel from 'components/SmartLabel';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

let actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        global: {
            variables: {
                reservations: [
                    {
                        display: 'Id',
                        name: 'reservation_id',
                        value: ''
                    },
                    {
                        display: 'Price',
                        name: 'reservation_price',
                        value: ''
                    },
                ],
                users: {
                    guest: [
                        {
                            display: 'Name',
                            name: 'guest_name',
                            value: ''
                        },
                        {
                            display: 'E-mail',
                            name: 'quest_email',
                            value: ''
                        },
                    ],
                    agent: [
                        {
                            display: 'Name',
                            name: 'agent_name',
                            value: ''
                        },
                    ],
                },
                property: [
                    {
                        display: 'Address',
                        name: 'property_address',
                        value: ''
                    },
                ],
                listing: [
                    {
                        display: 'Url',
                        name: 'listing_url',
                        value: ''
                    },
                ],
            },
            fetchVariablesLoading: true,
            import: false
        }
    }),
};

const sampleProps = {
    handleClick: () => {},

};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
      <SmartLabel { ...props }/>
    </Provider>
);

describe('<SmartLabel />', () => {
    it('Smart Label should render', () => {
        const renderedComponent = renderComponent({
            sampleProps,
        });

        expect(renderedComponent.find('.smart-label').length).toEqual(1);
        expect(renderedComponent.find('.section-label').length).toEqual(4);
    });

    it('Sections should expand and hide when clicked', () => {
        const renderedComponent = renderComponent({
            sampleProps
        });

        const sections = renderedComponent.find('.section-label');
        sections.first().simulate('click');
        expect(renderedComponent.find('.list-variable').length).toEqual(2);
        sections.first().simulate('click');
        expect(renderedComponent.find('.list-variable').length).toEqual(0);

        sections.at(1).simulate('click');
        expect(renderedComponent.find('.list-variable').length).toEqual(3);

        sections.at(2).simulate('click');
        expect(renderedComponent.find('.list-variable').length).toEqual(1);
    });

    it('Import function should fire when clicked', () => {
        const importSpy = jest.fn();
        const renderedComponent = renderComponent({
            onClick: importSpy
        });

        const sections = renderedComponent.find('.section-label');
        const clickedVariableSubsection = {
            display: 'Address',
            name: 'property_address',
            value: ''
        };
        sections.at(2).simulate('click');
        renderedComponent.find('.button-new').props().onClick();
        expect(importSpy).toHaveBeenCalledWith(clickedVariableSubsection);

        sections.at(3).simulate('click');
        renderedComponent.find('.button-new').at(0).props().onClick();
        expect(importSpy).toHaveBeenCalledWith(clickedVariableSubsection);
    });

    it('Smart Label should filter results', () => {
        const renderedComponent = renderComponent({
            sampleProps
        });

        const searchBox = renderedComponent.find('SearchBox input');
        const sections = renderedComponent.find('.section-label');
        sections.at(0).simulate('click');
        searchBox.simulate('change', { target: { value: 'a' } });
        expect(renderedComponent.find('.list-variable').length).toEqual(0);

        searchBox.simulate('change', { target: { value: 'reserv' } });
        expect(renderedComponent.find('.list-variable').length).toEqual(0);
    });
});
