import React from 'react';
import { Provider } from 'react-redux';
import {fromJS} from 'immutable';
import { shallow, mount } from 'enzyme';
import TextEditor from 'components/TextEditor';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const defaultStore = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => fromJS({
        global: {
            variables: [],
            templates: [{ name: 'a', tags: ['a', 'b'], content: '<p>abc</p>'}]
        }
    }),
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <MuiThemeProvider>
            <TextEditor { ...props } />
        </MuiThemeProvider>
    </Provider>
);

describe('<TextEditor />', () => {
    it('should render editor and controls', () => {
        const renderedComponent = renderComponent({
            onSubmit: () => {}
        });

        expect(renderedComponent.find('DraftEditor').length).toEqual(1);
        expect(renderedComponent.find('Controls').length).toEqual(1);
    });

    it('should placeholder not be visible after change', () => {
        const renderedComponent = renderComponent({
            onSubmit: () => {}
        });

        expect(renderedComponent.find('.public-DraftEditorPlaceholder-root').length).toEqual(1);
        renderedComponent.find('.public-DraftEditor-content').simulate('keyDown', { keyCode: 13 });
        expect(renderedComponent.find('.public-DraftEditorPlaceholder-root').length).toEqual(0);
    });

    it('should render letters', () => {
        const renderedComponent = renderComponent({
            onSubmit: () => {}
        });

        renderedComponent.find('.public-DraftEditor-content').simulate('keyDown', { keyCode: 13 });
        expect(renderedComponent.find('DraftEditor span').last().text()).toEqual('');
    });

    it('should dispatch submit', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            onSubmit: spy
        });

        renderedComponent.find('Controls button').simulate('click');
        expect(spy).not.toHaveBeenCalled();

        renderedComponent.find('.public-DraftEditor-content').simulate('keyDown', { keyCode: 13 });
        renderedComponent.find('Controls button').simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it('should go to full screen mode', () => {
        const renderedComponent = renderComponent({
            onSubmit: () => {}
        });

        expect(renderedComponent.find('DraftEditor').length).toEqual(1);
        renderedComponent.find('Controls .right-side .option').at(1).simulate('click');
        expect(renderedComponent.find('DraftEditor').length).toEqual(0);
    });
});


