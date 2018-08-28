import React from 'react';
import { shallow, mount } from 'enzyme';
import { ImportDialog, mapDispatchToProps } from 'components/Properties/PropertiesList/ImportDialog';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';

let actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        properties: {
            searchQuery: '',
            import: true,
            currentStep: 0,
            username: '',
            password: '',
            selectedTool: '',
            phones: []
        }
    })
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <ImportDialog { ...props } />
    </Provider>
);

describe('<ImportDialog />', () => {
    it('should render first step', () => {
        const renderedComponent = renderComponent({
            currentStep: 0
        });

        expect(renderedComponent.find('ChooseTool').length).toEqual(1);
        expect(renderedComponent.find('Login').length).toEqual(0);
        expect(renderedComponent.find('.import-dialog').props().className).toEqual('import-dialog step-0');
    });

    it('should render second step', () => {
        const renderedComponent = renderComponent({
            currentStep: 1
        });

        expect(renderedComponent.find('ChooseTool').length).toEqual(0);
        expect(renderedComponent.find('Login').length).toEqual(1);
        expect(renderedComponent.find('.import-dialog').props().className).toEqual('import-dialog step-1');
    });

    it('should stop import', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            currentStep: 3,
            onClose: spy,
        });

        renderedComponent.find('ChoosePhoneNumber').find('.close').simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it('should go back', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            currentStep: 3,
            onBack: spy,
        });

        renderedComponent.find('ChoosePhoneNumber').find('.back').simulate('click');
        expect(spy).toHaveBeenCalled();
    });
});
