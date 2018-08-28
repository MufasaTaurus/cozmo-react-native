import React, { PropTypes } from 'react';
import Websites from './Websites';
import Vendors from './Vendors';
import Analytics from './Analytics';
import Reservations from './Reservations';
import SVG from 'components/SVG';
import Breadcrumbs from 'components/Breadcrumbs';
import './underConstraction.less';

export default class UnderConstraction extends React.Component {

    getImage() {
        switch (this.props.page) {
            case 'Websites':
                return <Websites/>;
            case 'Vendors':
                return <Vendors/>;
            case 'Insights':
                return <Analytics/>;
            case 'Reservations':
                return <Reservations/>;
            default:
                return <SVG icon="underConstruction" size="295" />;
        }
    }

    getInfoText() {
        switch (this.props.page) {
            case 'Websites':
                return 'Choose from over 30 mobile friendly templates to quickly build your booking website to attract guests and keep them returning. You should not be limited to the listing pages on the booking platforms.';
            case 'Vendors':
                return 'Never experience a missed cleaning appointment again. Manage your cleaners and automate schedules and notifications and monitor dashboards.';
            case 'Insights':
                return 'Stay one step ahead of the curve by understanding how your properties are performing and taking steps to improve performance.';
            case 'Reservations':
                return 'Manage all your vacation rental listings and reservations from a single intuitive, elegantly designed interface.';
            default:
                return 'Stay tuned while we perfect this feature for you.';
        }
    }

    render() {
        return (
            <div className="under-construction">
                <div className="breadcrumbs">
                    <Breadcrumbs section={ this.props.page } subsection={[{ title: '' }]}/>
                </div>
                <div className="under-construction-page">
                    { this.getImage() }
                    <div className="title">
                        { this.props.page } is Under construction
                    </div>
                    <div className="subtitle">
                        { this.getInfoText() }
                    </div>
                    { this.props.link &&
                        <a className="learn-more" target="_blank" href={ this.props.link }>
                            Learn more
                        </a>
                    }
                </div>
            </div>
        );
    }
}

UnderConstraction.propTypes = {
    page: PropTypes.string.isRequired
};
