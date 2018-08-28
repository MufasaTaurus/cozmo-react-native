
import React from 'react';
import InfoSection from '../../InfoSection/index';
import Toggle from 'material-ui/Toggle';
import SVG from 'components/SVG';
import ListingIntegrationInfo from 'components/Channels/ListingIntegrationInfo';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {startImport, fetchProperties} from 'containers/Properties/actions';
import {makeSelectSelectedProperty} from 'containers/Properties/selectors';
import PropertyModel from 'models/Property';
import booking from 'assets/images/booking.png';
import './booking.less';


export class Booking extends React.Component {

    render() {
        const propertyModel = new PropertyModel(this.props.property);
        return (
            <div className="channels-booking">
                <div className="channel-and-info">
                    <div className="property-channels">
                        { channel({ name: 'Booking.com', desc: 'Import one or more listings and one month’s reservation data', img: booking }) }
                    </div>
                    <ListingIntegrationInfo propertyModel={ propertyModel }/>
                </div>
                <InfoSection
                    title={ 'Syncing History' }
                    customContent={
                        <div className="syncing-history">
                            <div className="sync-item">
                                <div><SVG icon="refresh" className="icon"/> Rates and Availability</div>
                                <div>Scheduled</div>
                                <div>12:43AM</div>
                                <div>2017-09-13</div>
                            </div>
                            <div className="sync-item">
                                <div><SVG icon="refresh" className="icon"/> Rates and Availability</div>
                                <div>Scheduled</div>
                                <div>12:43AM</div>
                                <div>2017-09-13</div>
                            </div>
                            <div className="sync-item">
                                <div><SVG icon="refresh" className="icon"/> Rates and Availability</div>
                                <div>Scheduled</div>
                                <div>12:43AM</div>
                                <div>2017-09-13</div>
                            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
