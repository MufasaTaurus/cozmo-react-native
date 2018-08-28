import React from 'react';
import PropertyName from 'components/PropertyName';
import SVG from 'components/SVG';
import './listingIntegrationInfo.less';


export class ListingIntegrationInfo extends React.Component {

    render() {
        const prop = this.props.propertyModel;
        return (
            <div className="listing-integration-info">
                <table>
                    <tr>
                        <td><SVG icon="home"/> Listed Address</td>
                        <td>
                            <PropertyName name={ prop.getName() } address={ prop.getAddress() } image={ prop.getImage() }/>
                        </td>
                    </tr>
                    <tr>
                        <td><SVG icon="chart"/> Integration Status</td>
                        <td><span className="status-label">Synced</span></td>
                    </tr>
                    <tr>
                        <td><SVG icon="laptop"/> Listing URL</td>
                        <td>
                            <a href="https://www.airbnb.com/rooms/34134554" target="_blank">https://www.airbnb.com/rooms/34134554</a>
                        </td>
                    </tr>
                    <tr>
                        <td><SVG icon="file"/> Listing ID</td>
                        <td>12345</td>
                    </tr>
                </table>
            </div>
        );
    }
}

export default ListingIntegrationInfo;
