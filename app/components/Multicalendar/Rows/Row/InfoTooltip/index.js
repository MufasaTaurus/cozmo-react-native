import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import './infoTooltip.less';


function InfoTooltip({ reservation, propertyName, propertyAddress, propertyAvatar, visible }) {

    return (
        visible ?
            <div className="details-tooltip" style={{ zIndex: 4 }}>
                <div className="tooltip-header"><SVG icon="event" size="16"/> Reservation details</div>
                <div className="tooltip-details">
                    <div className="tooltip-row property-details">
                        <img className="image" src={ propertyAvatar }/>
                        <div className="property-info">
                            <div className="property property-name">{ propertyName }</div>
                            <div className="property">{ propertyAddress }</div>
                        </div>
                    </div>
                    <div className="tooltip-row">
                        <span className="name"><SVG icon="goTo" size="18"/></span>
                        <span className="value">{ reservation.getStartDate('YYYY-MM-DD') }</span>
                    </div>
                    <div className="tooltip-row">
                        <span className="name"><SVG icon="goFrom" size="18"/></span>
                        <span className="value">{ reservation.getEndDate('YYYY-MM-DD') }</span>
                    </div>
                    <div className="tooltip-row">
                        <span className="name"><SVG icon="dates" size="18"/></span>
                        <span className="value">{ reservation.getDuration() }</span>
                    </div>
                    <div className="tooltip-row">
                        <span className="name"><SVG icon="people" size="18"/></span>
                        <span className="value">{ reservation.getNumberOfGuests() }</span>
                    </div>
                    <div className="tooltip-row">
                        <span className="name"><SVG icon="money" size="18"/></span>
                        <span className="value">{ reservation.getPrice() }</span>
                    </div>
                </div>
            </div>
            : <div/>
    );
}

InfoTooltip.propTypes = {
    reservation: PropTypes.object.isRequired,
};

export default InfoTooltip;
