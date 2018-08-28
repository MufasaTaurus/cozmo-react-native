import React from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectVendors, makeSelectLoading, makeSelectVendorsListQuery } from 'containers/Vendors/selectors';
import { changeVendorsListQuery, deleteVendor } from 'containers/Vendors/actions';
//import './vendorsList.less';

export class Payments extends React.Component {

    handleFormChange(field, value) {
        this.setState({ [field]: value });
    }

    render() {
        return (
            <div className="vendors-payments">
                <div className="content">
                    Payments - TBD
                </div>
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Payments);
