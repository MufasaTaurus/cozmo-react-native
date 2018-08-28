import React, { PropTypes } from 'react';
import Spinner from 'components/Spinner';
import './table.less';

export class Table extends React.Component {


    render() {
        let hasMenu = false;
        let hasCheckbox = false;
        return (
            <div className="vj-list-table-wrapper">
                { this.props.loading && <div className="disabler"><Spinner/></div> }
                <table className={ 'vj-list-table' + (this.props.className ? ' ' + this.props.className : '') }>
                    <thead>
                    <tr>
                        { this.props.head.map((item, index) => {
                            item.type === 'menu' ? hasMenu = true : '';
                            item.type === 'checkbox' ? hasCheckbox = true : '';
                            return (
                                <td key={ index } className={ item.type }>{ item.name }</td>
                            );
                        }) }
                    </tr>
                    </thead>
                    <tbody>
                    { this.props.body.map((item, index) => {
                        return (
                            <tr
                                className={ item.className }
                                key={ item.key || index }>
                                { item.values.map((val, index) => {
                                    const onClick = (hasMenu && index === item.values.length - 1) || (hasCheckbox && index === 0) ? () => {} : item.onClick;
                                    return (
                                        <td
                                            onClick={ onClick }
                                            key={ index }>
                                            { val }
                                        </td>
                                    );
                                }) }
                            </tr>
                        );
                    }) }
                    </tbody>
                </table>
            </div>
        );
    }
}

Table.propTypes = {
    head: PropTypes.array.isRequired,
    body: PropTypes.array,
    className: PropTypes.string,
    loading: PropTypes.bool
};

Table.defaultProps = {
    head: [],
    body: [],
    loading: false
};

export default Table;


