import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import OwnersList from './OwnersList';
import OwnerDetails from './OwnerDetails';
import UnderConstruction from 'components/UnderConstruction';
import './owners.less';

export class OwnersComponent extends React.Component {

    shouldDisplayPlaceholder() {
        return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
    }

    render() {
        const shouldDisplayPlaceholder = this.shouldDisplayPlaceholder();
        const renderContent = () => {
            if (this.props.id) {
                return <OwnerDetails id={ this.props.id } section={ this.props.section }/>;
            } else {
                return <OwnersList/>;
            }
        };

        return (
            shouldDisplayPlaceholder ?
                <UnderConstruction page="Owners"/>
                :
                <div className="owners">
                    <div className="breadcrumbs">
                        <Breadcrumbs section={ 'Owners' } subsection={[{ title: 'Owners List' }]} />
                    </div>
                    <div className="owners-content">
                        { renderContent() }
                    </div>
                </div>
        );
    }
}

export default OwnersComponent;
