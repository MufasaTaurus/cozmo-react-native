import React from 'react';
import Spinner from 'components/Spinner';
import Breadcrumbs from 'components/Breadcrumbs';
import Charts from './Charts';
import Boxes from './Boxes';
import PropertyBox from './PropertyBox';
import Filters from './Filters';
import UnderConstruction from 'components/UnderConstruction';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setSelectedProperty } from 'containers/Analytics/actions';
import { selectSelectedProperty } from 'containers/Analytics/selectors';
import './analytics.less';

export class Analytics extends React.Component {

    shouldDisplayPlaceholder() {
        return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
    }

    render() {
        const shouldDisplayPlaceholder = this.shouldDisplayPlaceholder();
        const renderContent = () => {
            if (false) {
                return <div className="spinner-wrapper"><Spinner size={ 100 }/></div>;
            } else {
                return (
                    <div>
                        <Breadcrumbs section={ 'Insights' } subsection={[{ title: 'Insights' }]} />
                        <div className="analytics-content">
                            <Filters onPropertyChange={ this.props.setSelectedProperty }/>
                            <PropertyBox property={ this.props.selectedProperty }/>
                            <Boxes values={{ revenue: '-$156.45', profit: '+$15006.45', occupancy: '70%' }}/>
                            <Charts />
                        </div>
                    </div>
                );
            }
        };

        return (
            shouldDisplayPlaceholder ?
                <UnderConstruction page="Insights" link="https://voyajoy.com/cozmo-vrs/performance-insights"/>
                :
                <div className="analytics">
                    { renderContent() }
                </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    selectedProperty: selectSelectedProperty(),
    // loading: makeSelectLoading()
});

export function mapDispatchToProps(dispatch) {
    return {
        setSelectedProperty: (prop) => dispatch(setSelectedProperty(prop)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Analytics);
