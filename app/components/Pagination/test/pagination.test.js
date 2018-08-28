import React from 'react';
import { mount } from 'enzyme';
import PaginationModel from 'models/Pagination';
import Pagination from 'components/Pagination';

const renderComponent = (props = {}) => mount(
    <Pagination { ...props } />
);

describe('<Pagination/>', () => {
    it('should not render with 1 or less pages', () => {
        const pagination = new PaginationModel({ currentPage: 1 }).setCount(10);
        const renderedComponent = renderComponent({
            pagination: pagination,
        });

        expect(renderedComponent.find('.vj-pagination').length).toEqual(1);
        expect(renderedComponent.find('.vj-pagination-content').length).toEqual(0);
    });

    it('should render proper description', () => {
        const pagination = new PaginationModel({ currentPage: 2 }).setCount(47);
        const renderedComponent = renderComponent({
            pagination: pagination,
        });

        const summary = renderedComponent.find('.summary');
        expect(summary.length).toEqual(1);
        expect(summary.find('.value').at(0).text()).toEqual('21-40');
        expect(summary.find('.value').at(1).text()).toEqual('47');
    });

    it('should render arrows, disabled if needed', () => {
        const changeSpy = jest.fn();
        const pagination = new PaginationModel({ currentPage: 3 }).setCount(47);
        const renderedComponent = renderComponent({
            onChange: changeSpy,
            pagination: pagination,
        });

        const arrows = renderedComponent.find('.arrow');
        expect(arrows.length).toEqual(2);
        expect(arrows.at(0).props().className).toEqual('arrow prev');
        expect(arrows.at(1).props().className).toEqual('arrow next disabled');

        arrows.at(1).props().onClick();
        expect(changeSpy).not.toHaveBeenCalled();
        arrows.at(0).props().onClick();
        expect(changeSpy).toHaveBeenCalled();
    });

    it('should render 5 icons with 5 pages', () => {
        const pagination = new PaginationModel({ currentPage: 1 }).setCount(95);
        const renderedComponent = renderComponent({
            pagination: pagination,
        });

        expect(renderedComponent.find('.page').length).toEqual(5);
        expect(renderedComponent.find('.page').at(4).text()).toEqual('5');
    });

    it('should render 5 icons and an operator with 100 pages', () => {
        const pagination = new PaginationModel({ currentPage: 1 }).setCount(2000);
        const renderedComponent = renderComponent({
            pagination: pagination,
        });

        expect(renderedComponent.find('.page').length).toEqual(6);
        expect(renderedComponent.find('.page').at(5).text()).toEqual('100');
    });

    it('should render properly with 100 pages and active page 5', () => {
        const pagination = new PaginationModel({ currentPage: 5 }).setCount(2000);
        const renderedComponent = renderComponent({
            pagination: pagination,
        });

        const pages = renderedComponent.find('.page');
        expect(pages.length).toEqual(7);
        expect(pages.at(0).text()).toEqual('1');
        expect(pages.at(1).text()).toEqual('●●●');
        expect(pages.at(2).text()).toEqual('3');
        expect(pages.at(3).text()).toEqual('4');
        expect(pages.at(4).text()).toEqual('5');
        expect(pages.at(5).text()).toEqual('●●●');
        expect(pages.at(6).text()).toEqual('100');
    });

    it('should render properly with 100 pages and active page 6', () => {
        const pagination = new PaginationModel({ currentPage: 6 }).setCount(2000);
        const renderedComponent = renderComponent({
            pagination: pagination,
        });

        const pages = renderedComponent.find('.page');
        expect(pages.length).toEqual(7);
        expect(pages.at(0).text()).toEqual('1');
        expect(pages.at(1).text()).toEqual('●●●');
        expect(pages.at(2).text()).toEqual('6');
        expect(pages.at(3).text()).toEqual('7');
        expect(pages.at(4).text()).toEqual('8');
        expect(pages.at(5).text()).toEqual('●●●');
        expect(pages.at(6).text()).toEqual('100');
    });

    it('should render properly with 100 pages and active page 62', () => {
        const pagination = new PaginationModel({ currentPage: 62 }).setCount(2000);
        const renderedComponent = renderComponent({
            pagination: pagination,
        });

        const pages = renderedComponent.find('.page');
        expect(pages.length).toEqual(7);
        expect(pages.at(0).text()).toEqual('1');
        expect(pages.at(1).text()).toEqual('●●●');
        expect(pages.at(2).text()).toEqual('60');
        expect(pages.at(3).text()).toEqual('61');
        expect(pages.at(4).text()).toEqual('62');
        expect(pages.at(5).text()).toEqual('●●●');
        expect(pages.at(6).text()).toEqual('100');
    });

    it('should render properly with 2000 pages and active page 1120', () => {
        const pagination = new PaginationModel({ currentPage: 1120 }).setCount(40000);
        const renderedComponent = renderComponent({
            pagination: pagination,
        });

        const pages = renderedComponent.find('.page');
        expect(pages.length).toEqual(7);
        expect(pages.at(0).text()).toEqual('1');
        expect(pages.at(1).text()).toEqual('●●●');
        expect(pages.at(2).text()).toEqual('1119');
        expect(pages.at(3).text()).toEqual('1120');
        expect(pages.at(4).text()).toEqual('1121');
        expect(pages.at(5).text()).toEqual('●●●');
        expect(pages.at(6).text()).toEqual('2000');
    });
});
