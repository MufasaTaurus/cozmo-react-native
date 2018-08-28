import React from 'react';
import { shallow, mount } from 'enzyme';
import {OnboardingContent, mapDispatchToProps} from 'components/Onboarding/OnboardingContent';
import { Provider } from 'react-redux';
import {fromJS} from 'immutable';

let actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        global: {
            user: {
                first_name: 'Jane',
                username: 'John'
            }
        },
        onboarding: {
            plan: '',
            team: 1,
            properties: 1,
            finished: false
        }
    }),
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <OnboardingContent { ...props } />
    </Provider>
);

describe('<OnboardingContent />', () => {
    it('should render first step', () => {
        const renderedComponent = renderComponent({
            currentStep: 0
        });
        expect(renderedComponent.find('Welcome').length).toEqual(1);
        expect(renderedComponent.find('Thanks').length).toEqual(0);
        expect(renderedComponent.find('h1').text()).toEqual('Welcome Jane!');
    });

    it('should render last step', () => {
        const renderedComponent = renderComponent({
            currentStep: 5
        });
        expect(renderedComponent.find('Welcome').length).toEqual(0);
        expect(renderedComponent.find('Thanks').length).toEqual(1);
    });

    it('should NOT go to the next step', () => {
        const onFinishSpy = jest.fn();
        const onNextSpy = jest.fn();
        const renderedComponent = renderComponent({
            currentStep: 5,
            finished: false,
            finishOnboarding: onFinishSpy,
            nextStep: onNextSpy
        });
        renderedComponent.find('Button').simulate('click');
        expect(onFinishSpy).toHaveBeenCalled();
        expect(onNextSpy).not.toHaveBeenCalled();
    });

    it('should go to the next step', () => {
        const onNextSpy = jest.fn();
        const renderedComponent = renderComponent({
            currentStep: 2,
            finished: false,
            nextStep: onNextSpy
        });
        renderedComponent.find('Button').simulate('click');
        expect(onNextSpy).toHaveBeenCalled();
    });

    it('should have disabled button when there is no plan selected', () => {
        const renderedComponent = renderComponent({
            currentStep: 1
        });
        expect(renderedComponent.find('Button').first().props().disabled).toBe(true);
    });

    it('should have enabled button when there is no plan selected', () => {
        const store = {
            subscribe: () => {},
            dispatch: () => {},
            getState: () => fromJS({
                onboarding: {
                    plan: 'city',
                    team: 1,
                    properties: 1,
                    finished: false
                }
            }),
        };
        const renderedComponent = renderComponent({
            currentStep: 1
        }, store);
        expect(renderedComponent.find('Button').first().props().disabled).toBe(false);
    });

});
