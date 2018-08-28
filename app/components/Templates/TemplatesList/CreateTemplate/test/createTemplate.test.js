import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { CreateTemplate, mapDispatchToProps } from 'components/Templates/TemplatesList/CreateTemplate';
import { fromJS } from 'immutable';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';

injectTapEventPlugin();

const sampleData = [
    {
        id: 1,
        name: 'ccc',
        description: 'zzz',
        content: '<p>hhh</p>',
        subject: 'subject',
        tags: [
            { name: 't', id: 1 },
            { name: 'y', id: 2 },
            { name: 'u', id: 3 }
        ]
    }
];

const defaultStore = {
    subscribe: () => {},
    dispatch: () => {},
    getState: () => fromJS({
        global: {
            variables: [],
            properties: [{ name: 'a', id: 1 }],
        },
        templates: {
            tags: [{ name: 'x', id: 5 }],
        }
    }),
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <MuiThemeProvider>
        <Provider store={ store }>
            <CreateTemplate { ...props } />
        </Provider>
    </MuiThemeProvider>
);

describe('<CreateTemplate />', () => {
    it('should render Breadcrumbs', () => {
        const renderedComponent = renderComponent({
            templates: fromJS(sampleData),
            id: '1'
        });

        expect(renderedComponent.find('Breadcrumbs').length).toEqual(1);
    });

    it('should render all the inputs', () => {
        const renderedComponent = renderComponent({
            templates: fromJS(sampleData),
            id: '1'
        });

        expect(renderedComponent.find('TextField').length).toEqual(4);
        expect(renderedComponent.find('TextEditor').length).toEqual(1);
        expect(renderedComponent.find('Select').length).toEqual(1);
        expect(renderedComponent.find('PropertyPickerSmall').length).toEqual(1);
        expect(renderedComponent.find('TagTextField').length).toEqual(1);
        expect(renderedComponent.find('SmartLabel').length).toEqual(1);
    });

    it('should render empty fields', () => {
        const renderedComponent = renderComponent({});

        expect(renderedComponent.find('input').at(0).text()).toEqual('');
        expect(renderedComponent.find('input').at(1).text()).toEqual('');
        expect(renderedComponent.find('input').at(2).text()).toEqual('');
        expect(renderedComponent.find('input').at(3).text()).toEqual('');
    });

    it('should populate form', () => {
        const renderedComponent = renderComponent({
            templates: fromJS(sampleData),
            id: '1'
        });

        expect(renderedComponent.find('#name').props().defaultValue).toEqual('ccc');
        expect(renderedComponent.find('#desc').props().defaultValue).toEqual('zzz');
        expect(renderedComponent.find('.tags-and-input .tag').length).toEqual(3);
        expect(renderedComponent.find('#subject').props().defaultValue).toEqual('subject');
    });

    it('should submit button be enabled (Edit)', () => {
        const renderedComponent = renderComponent({
            templates: fromJS(sampleData),
            id: '1'
        });

        expect(renderedComponent.find('ButtonNew').at(1).props().disabled).toEqual(false);
    });

    it('should submit button be enabled (Create)', () => {
        const renderedComponent = renderComponent({
            templates: fromJS([])
        });

        expect(renderedComponent.find('ButtonNew').at(1).props().disabled).toEqual(true);
        renderedComponent.find('TextField input').at(0).simulate('change', { target: { value: 'x' } });
        renderedComponent.find('TextField input').at(1).simulate('change', { target: { value: 'x' } });
        renderedComponent.find('TagTextField input').simulate('change', { target: { value: 'x' } });
        renderedComponent.find('Tags .tags-popup .tag').simulate('click');
        renderedComponent.find('TextField input').at(2).simulate('change', { target: { value: 'x' } });
        renderedComponent.find('.public-DraftEditor-content').simulate('keyDown', { keyCode: 13 });
        expect(renderedComponent.find('ButtonNew').at(1).props().disabled).toEqual(false);
    });

    it('should submit button be disabled (Edit)', () => {
        const renderedComponent = renderComponent({
            templates: fromJS(sampleData),
            id: '1'
        });

        renderedComponent.find('TextField input').first().simulate('change', { target: { value: '' } });
        expect(renderedComponent.find('ButtonNew').at(1).props().disabled).toEqual(true);
    });

    it('should submit button be disabled (Create)', () => {
        const renderedComponent = renderComponent({});

        expect(renderedComponent.find('ButtonNew').at(1).props().disabled).toEqual(true);
    });

    it('should edit Template', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            templates: fromJS(sampleData),
            id: '1',
            editTemplate: spy
        });

        renderedComponent.find('ButtonNew').at(1).simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it('should cancel editing', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            templates: fromJS(sampleData),
            id: '1',
            cancel: spy
        });

        renderedComponent.find('ButtonNew').at(0).simulate('click');
        expect(spy).toHaveBeenCalled();
    });

    it('should add Template', () => {
        const spy = jest.fn();
        const renderedComponent = renderComponent({
            templates: fromJS([]),
            addTemplate: spy
        });

        renderedComponent.find('TextField input').at(0).simulate('change', { target: { value: 'x' } });
        renderedComponent.find('TextField input').at(1).simulate('change', { target: { value: 'x' } });
        renderedComponent.find('TagTextField input').simulate('change', { target: { value: 'x' } });
        renderedComponent.find('Tags .tags-popup .tag').simulate('click');
        renderedComponent.find('TextField input').at(2).simulate('change', { target: { value: 'x' } });
        renderedComponent.find('.public-DraftEditor-content').simulate('keyDown', { keyCode: 13 });
        renderedComponent.find('ButtonNew').at(1).simulate('click');
        expect(spy).toHaveBeenCalled();
    });
});
