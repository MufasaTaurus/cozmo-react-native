import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import './pagination.less';

export class Pagination extends React.Component {

    getPages() {
        const total = this.props.pagination.getTotalPages();
        const active = this.props.pagination.getCurrentPage();
        let i = 1;
        const numbers = [];
        while (i <= total) {
            numbers.push(i);
            i++;
        }

        if (numbers.length > 5) {
            if (active <= 2) {
                numbers.splice(4);
                numbers.push('-');
                numbers.push(total);
            } else if (active > 2 && active < total - 3) {
                const first =  active - (active % 3);
                numbers.splice(0, first - 1);
                numbers.splice(3);
                numbers.unshift('-');
                numbers.unshift(1);
                numbers.push('+');
                numbers.push(total);
            } else if (active >= total - 3) {
                numbers.splice(0, total - 4);
                numbers.unshift('-');
                numbers.unshift(1);
            }
        }

        return numbers;
    }

    setPage(page) {
        this.props.pagination.setPage(page);
        this.onPaginationChange();
    }

    prev() {
        this.props.pagination.prevPage();
        this.onPaginationChange();
    }

    next() {
        this.props.pagination.nextPage();
        this.onPaginationChange();
    }

    shouldDisplay() {
        return this.props.pagination.getTotalPages() > 1;
    }

    onPaginationChange() {
        this.props.onChange();
    }

    render() {
        const total = this.getPages();
        const active = this.props.pagination.getCurrentPage();
        const prevDisabled = active === 1;
        const nextDisabled = active === this.props.pagination.getTotalPages();
        const separator = <span>&#9679;&#9679;&#9679;</span>;
        return (
            <div className="vj-pagination">
                { this.shouldDisplay() ?
                    <div className="vj-pagination-content">
                        <div className="summary">
                            <span className="value">{ this.props.pagination.getDisplayFrom() }-{ this.props.pagination.getDisplayTo() }</span>
                            <span> of </span>
                            <span className="value">{ this.props.pagination.getCount() }</span>
                        </div>
                        { total.map(p =>
                        <div
                            key={ p }
                            className={ 'page' + (p === active ? ' active' : '') + (p === '-' || p === '+' ? ' separator' : '') }
                            onClick={ p === '-' || p === '+' ? () => {} : () => this.setPage(p) }>
                            { p === '-' || p === '+' ? separator : p }
                        </div>
                        ) }
                        <div className={ 'arrow prev' + (prevDisabled ? ' disabled' : '') }
                             onClick={ prevDisabled ? () => {} : () => this.prev() }>
                            <SVG icon="backArrow"/>
                        </div>
                        <div className={ 'arrow next' + (nextDisabled ? ' disabled' : '') }
                             onClick={ nextDisabled ? () => {} : () => this.next() }>
                            <SVG icon="backArrow"/>
                        </div>
                    </div>
                    :
                    ''
                }
            </div>
        );
    }
}

Pagination.PropTypes = {
    pagination: PropTypes.object.isRequired,
    onChange: PropTypes.func.isRequired
};

export default Pagination;
