import React from 'react';
import AllChannels from './AllChannels/index';
import Airbnb from './Airbnb/index';
import Booking from './Booking/index';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { startImport, fetchProperties } from 'containers/Properties/actions';
import { makeSelectProperties, makeSelectImport, makeSelectFetchPropertiesLoading } from 'containers/Properties/selectors';
import { push } from 'react-router-redux';


export class Channels extends React.Component {

    renderSection() {
        switch (this.props.section) {
            case 'airbnb':
                return <Airbnb/>;
            case 'booking-com':
                return <Booking/>;
            default:
                return <AllChannels/>;
        }
    }

    render() {
        return (
            <div className="channels">
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

export default connect(mapStateToProps, mapDispatchToProps)(Channels);

