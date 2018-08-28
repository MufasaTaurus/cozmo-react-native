import React from 'react';
import InfoSection from '../../InfoSection/index';
import Toggle from 'material-ui/Toggle';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {startImport, fetchProperties} from 'containers/Properties/actions';
import {makeSelectSelectedProperty} from 'containers/Properties/selectors';
import PropertyModel from 'models/Property';
import airbnb from 'assets/images/airbnb.png';
import booking from 'assets/images/booking.png';
import './allChannels.less';


export class AllChannels extends React.Component {

    render() {
        const propertyModel = new PropertyModel(this.props.property);
        return (
            <div className="all-channels">
                <InfoSection
                    title={ 'Channels' }
                    subtitle={ 'For ' + propertyModel.getName() + ', ' + propertyModel.getAddress() }
                    customContent={
                        <div className="property-channels">
                            { channel({ name: 'Airbnb', desc: 'Recommended', img: airbnb }) }
                            { channel({ name: 'Booking.com', desc: 'Import one or more listings and one month’s reservation data', img: booking }) }
                        </div>
                    }
                />
            </div>
        );
    }
}

const channel = ({ name, desc, img }) => {
    return (
        <div className="channel">
            <div className="channel-label">
                <img className="channel-label-image" src={ img }/>
                <div className="channel-label-info">
                    <div className="channel-name">{ name }</div>
                    <div className="channel-desc">{ desc }</div>
                </div>
            </div>
            <div className="channel-toggle">
                <Toggle
                    defaultToggled={ true }
                />
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    property: makeSelectSelectedProperty()
});

export function mapDispatchToProps(dispatch) {
    return {
        startImport: () => dispatch(startImport()),
        fetchProperties: () => dispatch(fetchProperties()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AllChannels);
