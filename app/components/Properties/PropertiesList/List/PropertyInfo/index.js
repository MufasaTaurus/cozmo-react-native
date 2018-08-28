import React from 'react';
import BasicDetails from './BasicDetails';
import SideBar from 'components/SideBar';
import DropdownRouter from 'components/DropdownRouter';
import Location from './Location';
import Rooms from './Rooms';
import Photos from './Photos';
import Availability from './Availability';
import Amenities from './Amenities';
import ThingsToDo from './ThingsToDo';
import Breadcrumbs from 'components/Breadcrumbs';
import Listings from './Listings';
import Channels from './Channels';
import Emails from './Emails';
import Calendar from './Calendar';
import Booking from './Booking';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchProperty } from 'containers/Properties/actions';
import { makeSelectSelectedProperty } from 'containers/Properties/selectors';
import './propertyInfo.less';

export class PropertyInfo extends React.Component {

    componentWillMount() {
        if (!this.props.property || (this.props.property.get('id') + '' !== this.props.id)) {
            this.props.fetchProperty(this.props.id);
        }
    }

    shouldHideSection(section) {
        switch (section) {
            case 'channels':
            case 'autoEmails':
            case 'listings':
            case 'availability':
                return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
            default:
                return true;
        }
    }

    renderSection() {
        if (!this.props.property || (this.props.property.get('id') + '' !== this.props.id)) return '';

        switch (this.props.section) {
            case 'location':
                return <Location />;
            case 'room-details':
                return <Rooms />;
            case 'photos':
                return <Photos />;
            case 'availability':
                return <Availability />;
            case 'amenities':
                return <Amenities />;
            case 'things-to-do':
                return <ThingsToDo />;
            case 'rates':
            case 'cancellation':
                return <Listings section={ this.props.section } />;
            case 'channels':
            case 'airbnb':
            case 'booking-com':
                return <Channels section={ this.props.section } />;
            case 'emails':
                return <Emails section={ this.props.section } propId={ this.props.id } subsection={ this.props.subsection }/>;
            case 'details':
                return <BasicDetails />;
            case 'ical-sync':
                return <Booking section={ this.props.section } />;
            default:
                return <Calendar property={ this.props.property } />;
        }
    }

    getSideMenu() {
        return ([
            {
                title: 'Booking management',
                icon: 'dates',
                baseUrl: '/properties/' + this.props.id,
                items: [
                    {
                        title: 'Calendar',
                        url: '/calendar'
                    },
                    {
                        title: 'iCal Sync',
                        url: '/ical-sync'
                    }
                ]
            },
            {
                title: 'Property details',
                icon: 'home',
                baseUrl: '/properties/' + this.props.id,
                items: [
                    {
                        title: 'Location',
                        url: '/location'
                    },
                    {
                        title: 'Basic Details',
                        url: '/details'
                    },
                    {
                        title: 'Amenities',
                        url: '/amenities'
                    },
                    {
                        title: 'Room Details',
                        url: '/room-details'
                    },
                    {
                        title: 'Photos',
                        url: '/photos'
                    },
                    {
                        title: 'Availability',
                        hidden: this.shouldHideSection('availability'),
                        url: '/availability'
                    },
                    {
                        title: 'Things to Do',
                        url: '/things-to-do'
                    },
                ]
            },
            {
                title: 'Listing Rules',
                icon: 'file',
                hidden: this.shouldHideSection('listings'),
                baseUrl: '/properties/' + this.props.id,
                items: [
                    {
                        title: 'Cancellation Policy',
                        url: '/cancellation'
                    },
                    {
                        title: 'Fees and Rates',
                        url: '/rates'
                    }
                ]
            },
            {
                title: 'Auto Emails',
                icon: 'autoEmail',
                hidden: this.shouldHideSection('autoEmails'),
                baseUrl: '/properties/' + this.props.id,
                items: [
                    {
                        title: 'Auto Emails',
                        url: '/emails'
                    },
                ]
            },
            {
                title: 'Channels',
                icon: 'channel',
                hidden: this.shouldHideSection('channels'),
                baseUrl: '/properties/' + this.props.id,
                items: [
                    {
                        title: 'All channels',
                        url: '/channels'
                    },
                    {
                        title: 'Airbnb',
                        url: '/airbnb'
                    },
                    {
                        title: 'Booking.com',
                        url: '/booking-com'
                    }
                ]
            },
        ]);
    }

    getBreadcrumbsSection() {
        switch (this.props.section) {
            case 'location':
                return 'Location';
            case 'room-details':
                return 'Room details';
            case 'photos':
                return 'Photos';
            case 'availability':
                return 'Availability';
            case 'amenities':
                return 'Amenities';
            case 'things-to-do':
                return 'Things to do';
            case 'rates':
                return 'Fees and Rates';
            case 'cancellation':
                return 'Cancellation Policy';
            case 'channels':
            case 'airbnb':
            case 'booking-com':
                return 'Channels';
            case 'emails':
                return 'Auto Emails';
            case 'ical-sync':
                return 'iCal Sync';
            case 'calendar':
                return 'Calendar';
            default:
                return 'Basic details';
        }
    }

    render() {
        const image = this.props.property ? this.props.property.get('cover_image') : '';
        const name = this.props.property ? this.props.property.get('name') : '';
        const breadcrumbsAddress = this.props.property ? this.props.property.get('address') || this.props.property.get('name') || '#' + this.props.id : '';
        const topMenuImage =
            <div className="image">
                <img src={ image } width="100%" />
                <div className="overlay">{ name }</div>
            </div>;
        return (
            <div className="property-info-wrapper">
                <Breadcrumbs
                    section={ this.getBreadcrumbsSection() }
                    subsection={[
                        { title: 'Properties', link: '/properties' },
                        { title: breadcrumbsAddress }
                    ]} />
                <div className="property-info">
                    <SideBar contentTop={ topMenuImage } content={ this.getSideMenu() } />
                    <div className="info">
                        <section className="content-wrapper">
                            <DropdownRouter content={ this.getSideMenu() }/>
                            { this.renderSection() }
                        </section>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    property: makeSelectSelectedProperty()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchProperty: (id) => dispatch(fetchProperty(id))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertyInfo);
