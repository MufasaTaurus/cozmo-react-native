import React from 'react';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';
import Integrations from 'components/Settings/SettingsSection/Integrations';
import IntegrationsList from 'components/Settings/SettingsSection/Integrations/IntegrationsList';
import IntegrationDetails from 'components/Settings/SettingsSection/Integrations/IntegrationDetails';
import IntegrationModel from 'models/Integration';
import {fromJS} from 'immutable';

const integrations = [
    new IntegrationModel(fromJS({
        id: 1,
        tags: ['Productivity'],
        name: 'Slack',
        image: '',
        description: '',
        install_url: '',
        installed: false,
        url: ''
    })),
    new IntegrationModel(fromJS({
        id: 2,
        tags: ['Marketing'],
        name: 'MailChimp',
        image: '',
        description: '',
        install_url: '',
        installed: false,
        url: ''
    }))
];

const defaultStore = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => fromJS({
        settings: {
            integrations: integrations,
            integrationsDisplay: 'All',
            fetchingInstallUrl: false,
            loading: false
        }
    }),
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <Integrations { ...props } />
    </Provider>
);

const renderList = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <IntegrationsList { ...props } />
    </Provider>
);

const renderDetails = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <IntegrationDetails { ...props } />
    </Provider>
);

describe('<Integrations />', () => {
    it('should render integrations list', () => {
        const renderedComponent = renderComponent({
            subsection: undefined,
            query: {}
        });

        expect(renderedComponent.find('IntegrationsList').length).toEqual(1);
        expect(renderedComponent.find('IntegrationDetails').length).toEqual(0);
    });

    it('should render integration details', () => {
        const renderedComponent = renderComponent({
            subsection: '1',
            query: {}
        });

        expect(renderedComponent.find('IntegrationDetails').length).toEqual(1);
        expect(renderedComponent.find('IntegrationsList').length).toEqual(0);
    });
});

describe('<IntegrationsList />', () => {
    it('should render properly', () => {
        const renderedComponent = renderList({
            query: {}
        });

        expect(renderedComponent.find('SearchBox').length).toEqual(1);
        expect(renderedComponent.find('.header').length).toEqual(1);
        expect(renderedComponent.find('.integration-type-menu .integration-type').length).toEqual(5);
        expect(renderedComponent.find('.integrations-grid').length).toEqual(1);
        expect(renderedComponent.find('IntegrationName').length).toEqual(2);
        expect(renderedComponent.find('.install-alert').length).toEqual(0);
    });

    it('should filter integrations (1)', () => {
        const store = {
            subscribe: () => {},
            dispatch: () => {},
            getState: () => fromJS({
                settings: {
                    integrations: integrations,
                    integrationsDisplay: 'Productivity'
                }
            }),
        };
        const renderedComponent = renderList({ query: {} }, store);
        expect(renderedComponent.find('IntegrationName').length).toEqual(1);
    });

    it('should filter integrations (2)', () => {
        const renderedComponent = renderList({ query: {} });

        renderedComponent.find('SearchBox input').simulate('change', { target: { value: 'slack' }} );
        expect(renderedComponent.find('IntegrationName').length).toEqual(1);
    });

    it('should display Error', () => {
        const renderedComponent = renderList({
            query: { success: '0' }
        });

        expect(renderedComponent.find('.install-alert.error').length).toEqual(1);
    });

    it('should display Success', () => {
        const renderedComponent = renderList({
            query: { success: '1' }
        });

        expect(renderedComponent.find('.install-alert.success').length).toEqual(1);
    });
});

describe('<IntegrationDetails />', () => {
    it('should integrations details', () => {
        const renderedComponent = renderDetails({
            subsection: '1',
        });

        expect(renderedComponent.find('.info').length).toEqual(1);
        expect(renderedComponent.find('.info .name').text()).toEqual('Slack');
        expect(renderedComponent.find('.info .type').text()).toEqual('Productivity');
        expect(renderedComponent.find('.description').length).toEqual(1);
    });
});
