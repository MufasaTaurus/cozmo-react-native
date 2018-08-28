import React from 'react';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import findKey from 'lodash/findKey';
import SearchBox from 'components/SearchBox';
import ButtonNew from 'components/ButtonNew';
import PropertyName from 'components/PropertyNameNew';
import ActionButton from 'components/ActionButton';
import ButtonGroup from 'components/ButtonGroup';
import Spinner from 'components/Spinner';
import MoreMenu from 'components/MoreMenu';
import Checkbox from 'components/Checkbox';
import Table from 'components/Table';
import SVG from 'components/SVG';
import Pagination from 'components/Pagination';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOwners, selectLoading } from 'containers/Owners/selectors';
import { fetchOwners } from 'containers/Owners/actions';
import './ownersProperties.less';

export class OwnerProperties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            selectedProperties: {}
        };
    }

    toggleProperty(id) {
        const props = this.props.owner.getProperties().map(p => p.getId());
        const selected = this.state.selectedProperties;
        if (id === 'all') {
            const isAll = this.isAllSelected();
            const all = {};
            props.map(t => all[t] = !isAll);
            this.setState({ selectedProperties: all });
        } else {
            const isSelected = !!this.state.selectedProperties[id];
            selected[id] = !isSelected;
            this.setState({ selectedProperties: selected });
        }
    }

    isAllSelected() {
        const props = this.props.owner.getProperties().map(p => p.getId());
        const selected = this.state.selectedProperties;
        let isAll = true;
        props.forEach(t => {
            if (!selected[t]) {
                isAll = false;
                return;
            }
        });

        return !isEmpty(selected) && isAll;
    }

    getSelectedProperties() {
        return keys(this.state.selectedProperties);
    }

    shouldShowActions() {
        return !!findKey(this.state.selectedProperties, t => t === true);
    }

    changeQuery(value) {
        this.setState({ query: value });
    }

    getProperties() {
        return this.props.owner.getProperties()
            .map((property) => {
                const id = property.getId();
                const menu =
                    <MoreMenu buttons={[
                        { label: 'Archive', click: () => this.props.archiveProperty(property.getId()) },
                    ]}/>;
                const location = (
                    <div className="location">
                        <div className="city">{ property.getCity() }</div>
                        <div className="state">{ property.getState() }</div>
                    </div>
                );
                const check = (
                    <div className="checkbox-wrapper">
                        <Checkbox
                            id={ id }
                            onChange={ () => this.toggleProperty(id) }
                            checked={ this.state.selectedProperties[id] }
                        />
                    </div>
                );
                return {
                    className: 'property',
                    key: property.getId(),
                    values: [
                        check,
                        <PropertyName name={ property.getName() } address={ property.getAddress() } image={ property.getImage() }/>,
                        location,
                        menu
                    ]
                };
            });
    }

    render() {
        const tableHeader = [
            { name: <div className="checkbox-wrapper"><Checkbox id="all" onChange={ () => this.toggleProperty('all') } checked={ this.isAllSelected() }/></div> },
            { name: 'Property Name' },
            { name: 'City/State' },
            { name: '', type: 'menu' },
        ];
        const showActions = this.shouldShowActions();
        return (
            <div className="owner-details-properties">
                <div className="step-header">
                    <SVG className="step-header-icon" icon="town"/>
                    <span>{ this.props.owner.getFirstName() }'s Properties</span>
                </div>
                <div className="search-bar">
                    <SearchBox
                        className="search-box"
                        onChange={ (evt) => this.changeQuery(evt.target.value) }
                        value={ this.state.query }
                        placeholder="Search"/>
                    { showActions &&
                        <div className="archive-action">
                            <ActionButton
                                icon="sync"
                                onClick={ () => {} }/>
                        </div>
                    }
                    <ButtonNew
                        className="small"
                        onClick={ this.props.onImport }
                        label="import"/>
                </div>
                <Table head={ tableHeader } body={ this.getProperties() }/>
                { !this.props.owner.getProperties().length && <div className="empty-state">No Property Imported</div> }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    owners: selectOwners(),
    loading: selectLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchOwners: () => dispatch(fetchOwners()),
        selectOwner: (id) => dispatch(push('/owners/' + id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerProperties);

