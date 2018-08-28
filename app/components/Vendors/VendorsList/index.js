import React from 'react';
import SearchBox from 'components/SearchBox';
import Invite from './Invite';
import Tabs from 'components/Tabs';
import Table from 'components/Table';
import CleanerName from 'components/CleanerName';
import DisableVendor from './DisableVendor';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectVendors, makeSelectLoading, makeSelectVendorsListQuery } from 'containers/Vendors/selectors';
import { changeVendorsListQuery, deleteVendor, updateVendor } from 'containers/Vendors/actions';
import VendorModel from 'models/Vendor';
import MoreMenu from 'components/MoreMenu';
import './vendorsList.less';

export class VendorsList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            disableVendorOpen: false,
            vendorToDisable: null
        };
        this.tableHeader = [
            { name: 'Name' },
            { name: 'Contact' },
            { name: 'Status', type: 'short' },
            { name: 'Property', type: 'short' },
            { name: '', type: 'menu' },
        ];
        this.tableHeaderForDisabled = [
            { name: 'Name' },
            { name: 'Contact' },
            { name: 'Property', type: 'short' },
            { name: '', type: 'menu' },
        ];
    }

    disableVendor(vendor) {
        this.props.updateVendor({ id: vendor.getId(), is_active: false });
        this.setState({
            vendorToDisable: vendor,
            disableVendorOpen: true
        });
    }

    getVendors() {
        return this.props.vendors
            .map(v => new VendorModel(v))
            .filter(vendor => vendor.isActive())
            .filter(vendor => vendor.filterVendor(this.props.query))
            .map((vendorModel) => {
                const name = <CleanerName fullName={ vendorModel.getFullName() }/>;
                const contact =
                    <div className="contact">
                        <div className="email">{ vendorModel.getEmail() }</div>
                        <div className="phone">{ vendorModel.getPhone() }</div>
                    </div>;
                const menu =
                    <MoreMenu buttons={[
                        { label: 'Edit', click: () => this.props.selectVendor(vendorModel.getId()) },
                        { label: 'Disable', click: () => this.disableVendor(vendorModel) },
                        { label: 'Delete', click: () => this.props.deleteVendor(vendorModel.getId()) }
                    ]}/>;
                return {
                    className: 'vendor',
                    key: vendorModel.getId(),
                    onClick: () => this.props.selectVendor(vendorModel.getId()),
                    values: [
                        name,
                        contact,
                        'Active',
                        vendorModel.getJobsNumber(),
                        menu
                    ]
                };
            })
            .toArray();
    }

    getDisabledVendors() {
        return this.props.vendors
            .map(v => new VendorModel(v))
            .filter(vendor => !vendor.isActive())
            .filter(vendor => vendor.filterVendor(this.props.query))
            .map((vendorModel) => {
                const name = <CleanerName fullName={ vendorModel.getFullName() }/>;
                const contanct =
                    <div className="contact">
                        <div className="email">{ vendorModel.getEmail() }</div>
                        <div className="phone">{ vendorModel.getPhone() }</div>
                    </div>;
                const menu =
                    <MoreMenu buttons={[
                        { label: 'Active', click: () => this.props.updateVendor({ id: vendorModel.getId(), is_active: true }) },
                        { label: 'Delete', click: () => this.props.deleteVendor(vendorModel.getId()) }
                    ]}/>;
                return {
                    className: 'vendor',
                    key: vendorModel.getId(),
                    onClick: () => this.props.selectVendor(vendorModel.getId()),
                    values: [
                        name,
                        contanct,
                        'Disable',
                        menu
                    ]
                };
            })
            .toArray();
    }

    render() {
        const list = (active) => {
            return (
                <div>
                    <div className="search-section">
                        <div className="search-box-wrapper">
                            <SearchBox
                                className="large"
                                onChange={ (evt) => this.props.changeQuery(evt.target.value) }
                                value={ this.props.query }/>
                        </div>
                    </div>
                    <Table
                        head={ active ? this.tableHeader : this.tableHeaderForDisabled }
                        body={ active ? this.getVendors() : this.getDisabledVendors() }
                    />
                </div>
            );
        };

        return (
            <div className="vendors-list">
                <div className="content">
                    <div className="vendors-tables">
                        <Tabs tabs={[
                            { title: 'Active', content: list(true) },
                            { title: 'Disable', content: list() },
                        ]}
                        />
                    </div>
                    <div className="invite">
                        <Invite/>
                    </div>
                </div>
                { this.state.disableVendorOpen &&
                    <DisableVendor
                        onClose={ () => this.setState({ disableVendorOpen: false }) }
                        vendor={ this.state.vendorToDisable }/>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    vendors: makeSelectVendors(),
    loading: makeSelectLoading(),
    query: makeSelectVendorsListQuery()
});

export function mapDispatchToProps(dispatch) {
    return {
        selectVendor: (id) => dispatch(push('/vendors/details/' + id)),
        changeQuery: (query) => dispatch(changeVendorsListQuery(query)),
        deleteVendor: (id) => dispatch(deleteVendor(id)),
        updateVendor: (data) => dispatch(updateVendor(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(VendorsList);
