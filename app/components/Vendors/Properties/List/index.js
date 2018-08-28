import React from 'react';
import TitleHeader from 'components/TitleHeader';
import SearchBar from 'components/SearchBar';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import PropertyName from 'components/PropertyNameNew';
import CleanerName from 'components/CleanerName';
import ButtonNew from 'components/ButtonNew';
import Scheduler from '.././Scheduler';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectVendorsProperties, makeSelectLoading, selectVendorsPropertiesPagination } from 'containers/Vendors/selectors';
import { fetchVendorsProperties } from 'containers/Vendors/actions';
import './list.less';

export class List extends React.Component {

    constructor(props) {
        super(props);
        this.tableHeader = [
            { name: 'Property Name' },
            { name: 'Cleaners' },
            { name: 'Primary Cleaner' },
            { name: 'Schedule Assistant' },
        ];
    }

    getProperties() {
        return this.props.properties
            .map((property) => {
                const id = property.getId();
                const propName = <PropertyName name={ property.getName() } address={ property.getAddress() } image={ property.getImage() }/>;
                const cleanersNum = property.getVendors().size;
                const primaryCleaner = property.getVendors().first();
                const setup = <div className="setup-wrapper"><ButtonNew label="Setup" className="green small setup"/></div>;
                return {
                    className: 'property',
                    key: id,
                    onClick: () => this.props.selectProperty(id),
                    values: [
                        propName,
                        cleanersNum ? (cleanersNum + (cleanersNum === 1 ? 'Cleaner' : ' Cleaners')) : '',
                        <CleanerName fullName={ primaryCleaner ? primaryCleaner.getFullName() : '' }/>,
                        cleanersNum ? <Scheduler value={ property.getSchedulingAssistant() }/> : setup,
                    ]
                };
            }).toArray();
    }

    render() {
        return (
            <div className="vendors-properties-list">
                <div className="vj-card">
                    <TitleHeader title="Properties" icon="town"/>
                    <SearchBar borderTop={ false } borderBottom={ false }/>
                    <div>
                        <Table head={ this.tableHeader } body={ this.getProperties() } loading={ this.props.loading }/>
                        <div className="vj-pagination-wrapper">
                            <Pagination pagination={ this.props.pagination } onChange={ this.props.fetchVendorsProperties }/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    properties: selectVendorsProperties(),
    loading: makeSelectLoading(),
    pagination: selectVendorsPropertiesPagination(),
});

export function mapDispatchToProps(dispatch) {
    return {
        selectProperty: (id) => dispatch(push('/vendors/properties/' + id)),
        fetchVendorsProperties: () => dispatch(fetchVendorsProperties()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
