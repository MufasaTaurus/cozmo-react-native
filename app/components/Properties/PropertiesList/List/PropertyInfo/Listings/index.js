import React from 'react';
import Pricing from '../Pricing/index';
import Cancellation from './Cancellation/index';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { startImport, fetchProperties } from 'containers/Properties/actions';
import { makeSelectProperties, makeSelectImport, makeSelectFetchPropertiesLoading } from 'containers/Properties/selectors';
import { push } from 'react-router-redux';


export class Listings extends React.Component {

    renderSection() {
        switch (this.props.section) {
            case 'rates':
                return <Pricing />;
            default:
                return <Cancellation />;
        }
    }

    render() {
        return (
            <div className="listings">
                { this.renderSection() }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    properties: makeSelectProperties(),
    import: makeSelectImport(),
    loading: makeSelectFetchPropertiesLoading()
});

export function mapDispatchToProps(dispatch) {
    return {
        startImport: () => dispatch(startImport()),
        fetchProperties: () => dispatch(fetchProperties()),
        createNewProperty: () => dispatch(push('/properties/create'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Listings);
