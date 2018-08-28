import React from 'react';
import ButtonNew from 'components/ButtonNew';
import SearchBox from 'components/SearchBox';
import PropertyName from 'components/PropertyNameNew';
import Checkbox from 'components/Checkbox';
import Table from 'components/Table';
import MoreMenu from 'components/MoreMenu';
import AddProperties from '.././AddProperties';
import TitleHeader from 'components/TitleHeader';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { updateProperty, fetchPropertiesFiltered, setSelectedGroup } from 'containers/Properties/actions';
import { selectLoadingGroups, selectPropertiesFiltered, selectSelectedGroup, makeSelectFetchPropertiesLoading } from 'containers/Properties/selectors';
import PropertyModel from 'models/Property';
import CheckboxList from 'models/CheckboxList';

export class GroupProperties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            addProperties: false,
            checkboxList: new CheckboxList({ items: this.getItemsForCheckboxList(props.properties) })
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ checkboxList: this.state.checkboxList.setItems(this.getItemsForCheckboxList(nextProps.properties)) });
    }

    getItemsForCheckboxList(properties) {
        return properties
            .filter(p => p.get('group') === this.props.group.getId())
            .map(p => p.get('id'))
            .toArray();
    }

    toggleCheckbox(id) {
        this.setState({ checkboxList: this.state.checkboxList.toggleItem(id) });
    }

    numberOfProperties() {
        return this.props.properties.filter(p => p.get('group') === this.props.group.getId()).size;
    }

    removeFromGroup(id) {
        this.props.updateProperty({
            id: id,
            section: 'group',
            val: null
        });
    }

    getProperties() {
        return this.props.properties
            .map((prop) => {
                const property = new PropertyModel(prop);
                const id = property.getId();
                const location = (
                    <div className="location">
                        <div className="city">{ property.getCity() }</div>
                        <div className="state">{ property.getState() }</div>
                    </div>
                );
                const menu = <MoreMenu buttons={ [
                    { label: 'Edit', click: () => this.props.goToProperty(property.getId()) },
                    { label: 'Remove', click: () => this.removeFromGroup(property.getId()) },
                ] }/>;
                const check = (
                    <div className="checkbox-wrapper">
                        <Checkbox
                            id={ id }
                            onChange={ () => this.toggleCheckbox(id) }
                            checked={ this.state.checkboxList.isItemChecked(id) }
                        />
                    </div>
                );
                const propName = <PropertyName
                    name={ property.getName() }
                    address={ property.getAddress() }
                    image={ property.getImage() }
                    type={ property.getType() + ' ' + property.getBRBA() }
                    city={ property.getCity() + ' ' + property.getOwner() }
                />;
                return {
                    className: 'property',
                    key: id,
                    values: [
                        check,
                        propName,
                        property.getType(),
                        property.getRoomType(),
                        <span className="br-ba">{ property.getBRBA() }</span>,
                        location,
                        property.getOwner(),
                        menu
                    ]
                };
            }).toArray();
    }

    componentWillMount() {
        this.props.setGroup({ group: this.props.group.getId() });
    }

    render() {
        const title = this.props.group.getName() + ' (' + this.numberOfProperties() + ')';
        const checkboxAll = <div className="checkbox-wrapper">
            <Checkbox id="all" onChange={ () => this.toggleCheckbox('all') } checked={ this.state.checkboxList.isAllSelected() }/>
        </div>;
        const tableHeader = [
            { name:  checkboxAll },
            { name: 'Property Name' },
            { name: 'Type' },
            { name: 'Room Type' },
            { name: 'BR/BA', type: 'short' },
            { name: 'City/State' },
            { name: 'Owner' },
            { name: '', type: 'short' },
        ];
        return (
            <div className="group-properties-section">
                <TitleHeader title={ title } icon="town"/>
                <div className="search-bar">
                    { checkboxAll }
                    <SearchBox
                        onChange={ (evt) => this.setState({ query: evt.target.value }) }
                        value={ this.state.query }/>
                    <ButtonNew
                        className="small"
                        onClick={ () => this.setState({ addProperties: true }) }
                        label="Add property"/>
                </div>
                <Table head={ tableHeader } body={ this.getProperties() } loading={ this.props.loadingProperties }/>
                { this.numberOfProperties() === 0 && <div className="empty-state">No properties</div> }
                { this.state.addProperties &&
                    <AddProperties
                        id={ this.props.group.getId() }
                        onClose={ () => this.setState({ addProperties: false }) }/>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    properties: selectPropertiesFiltered(),
    loading: selectLoadingGroups(),
    loadingProperties: makeSelectFetchPropertiesLoading(),
    selectedGroup: selectSelectedGroup(),
});

export function mapDispatchToProps(dispatch) {
    return {
        updateProperty: (data) => dispatch(updateProperty(data)),
        goToGroupDetails: (id) => dispatch(push('/properties/groups/' + id)),
        goToProperty: (id) => dispatch(push('/properties/' + id)),
        fetchProperties: () => dispatch(fetchPropertiesFiltered()),
        setGroup: (data) => dispatch(setSelectedGroup(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupProperties);
