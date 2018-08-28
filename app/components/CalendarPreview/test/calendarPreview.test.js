import React from 'react';
import { shallow, mount } from 'enzyme';
import {CalendarPreview} from 'components/CalendarPreview';
import moment from 'moment';
import {fromJS} from 'immutable';

const renderComponent = (props = {}) => mount(
    <CalendarPreview { ...props } />
);

describe('<CalendarPreview />', () => {
    it('should set current month view', () => {
        const renderedComponent = renderComponent({
            events: []
        });

        expect(renderedComponent.find('.month').length).toEqual(1);
        expect(renderedComponent.find('.month').text()).toEqual(moment().format('MMMM YYYY'));
    });

    it('should go to previous month', () => {
        const renderedComponent = renderComponent({
            events: []
        });

        const prevArrow = renderedComponent.find('.arrow.prev');
        expect(prevArrow.length).toEqual(1);

        const currentDate = moment(renderedComponent.instance().state.currentDate);
        prevArrow.simulate('click');
        expect(renderedComponent.find('.month').text()).toEqual(currentDate.subtract(1, 'M').format('MMMM YYYY'));
    });

    it('should go to next month', () => {
        const renderedComponent = renderComponent({
            events: []
        });

        const nextArrow = renderedComponent.find('.arrow.next');
        expect(nextArrow.length).toEqual(1);

        const currentDate = moment(renderedComponent.instance().state.currentDate);
        nextArrow.simulate('click');
        expect(renderedComponent.find('.month').text()).toEqual(currentDate.add(1, 'M').format('MMMM YYYY'));
    });

    it('should not go to previous month', () => {
        const renderedComponent = renderComponent({
            events: []
        });

        const prevArrow = renderedComponent.find('.arrow.prev');
        prevArrow.simulate('click');
        prevArrow.simulate('click');
        prevArrow.simulate('click');
        expect(renderedComponent.find('.arrow.prev').length).toEqual(0);
    });

    it('should render events', () => {
        const renderedComponent = renderComponent({
            events: fromJS([
                {
                    start: moment().date(10).format('YYYY-MM-DD'),
                    end: moment().date(15).format('YYYY-MM-DD')
                },
                {
                    start: moment().date(20).format('YYYY-MM-DD'),
                    end: moment().date(20).format('YYYY-MM-DD')
                }
            ])
        });

        expect(renderedComponent.find('.has-event').length).toEqual(7);
        expect(renderedComponent.find('.start').length).toEqual(2);
        expect(renderedComponent.find('.end').length).toEqual(2);
    });

});
