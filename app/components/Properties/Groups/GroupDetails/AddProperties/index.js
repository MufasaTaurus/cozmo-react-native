import React from 'react';
import isEmpty from 'lodash/isEmpty';
import forOwn from 'lodash/forOwn';
import findKey from 'lodash/findKey';
import Modal from 'components/Modal';
import Pagination from 'components/Pagination';
import SearchBox from 'components/SearchBox';
import Table from 'components/Table';
import ButtonNew from 'components/ButtonNew';
import PropertyName from 'components/PropertyNameNew';
import Checkbox from 'components/Checkbox';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateProperty, fetchPropertiesFiltered, setSelectedGroup } from 'containers/Properties/actions';
import { selectPropertiesFiltered, selectPropertiesPagination, makeSelectFetchPropertiesLoading } from 'containers/Properties/selectors';
import PropertyModel from 'models/Property';
import './addProperties.less';

export class AddProperties extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            selectedProperties: {}
        };
    }

    changeQuery(value) {
        this.setState({ query: value });
    }

    toggleProperty(id) {
        const props = this.props.properties.map(p => p.get('id'));
        const selected = this.state.selectedProperties;
        if (id === 'all') {
            const isAll = this.isAllSelected();
            const all = this.state.selectedProperties;
            props.map(t => all[t] = !isAll);
            this.setState({ selectedProperties: all });
        } else {
            const isSelected = !!this.state.selectedProperties[id];
            selected[id] = !isSelected;
            this.setState({ selectedProperties: selected });
        }
    }

    isAllSelected() {
        const props = this.props.properties.map(p => p.get('id'));
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

    shouldEnableSubmit() {
        return !!findKey(this.state.selectedProperties, t => t === true);
    }

    getSelectedPropertiesIds() {
        const selectedProperties = [];
        const selected = this.state.selectedProperties;

        forOwn(selected, (value, key) => {
            if (value) {
                selectedProperties.push(key);
            }
        });

        return selectedProperties;
    }

    onSubmit() {
        this.getSelectedPropertiesIds().map(id =>
            this.props.updateProperty({
                id: id,
                section: 'group',
                val: this.props.id
            })
        );
        this.props.onClose();
    }

    getProperties() {
        return this.props.properties
            .map((prop) => {
                const property = new PropertyModel(prop);
                const id = property.getId();
                const location = (
                    <div className="location">
                        <div className="city">City</div>
                        <div className="state">State</div>
                    </div>
                );
                const check = (
                    <div className="checkbox-wrapper">
                        <Checkbox
                            id={ 'propId: ' + id }
                            onChange={ () => this.toggleProperty(id) }
                            checked={ this.state.selectedProperties[id] }
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
                        property.getBRBA(),
                        location,
                        property.getOwner()
                    ]
                };
            }).toArray();
    }

    componentWillMount() {
        this.props.setGroup({ group: -1 });
    }

    componentWillUnmount() {
        this.props.setGroup({ group: this.props.id });
    }

    render() {
        const checkboxAll = <div className="checkbox-wrapper">
            <Checkbox id="all-props" onChange={ () => this.toggleProperty('all') } checked={ this.isAllSelected() }/>
        </div>;
        const tableHeader = [
            { name: checkboxAll },
            { name: 'Property Name' },
            { name: 'Type' },
            { name: 'Room Type' },
            { name: 'BR/BA', type: 'short' },
            { name: 'City/State' },
            { name: 'Owner' },
        ];
        const disableSubmit = !this.shouldEnableSubmit();
        const content = (
            <div className="modal-content-add-properties">
                <div className="prop-table">
                    <div className="search-bar">
                        { checkboxAll }
                        <SearchBox
                            className="search-box"
                            onChange={ (evt) => this.changeQuery(evt.target.value) }
                            value={ this.state.query }
                            placeholder="Search"/>
                    </div>
                    <Table head={ tableHeader } body={ this.getProperties() } loading={ this.props.loading }/>
                    <div className="vj-pagination-wrapper">
                        <Pagination pagination={ this.props.pagination } onChange={ () => this.props.fetchProperties() }/>
                    </div>
                </div>
                <div className="footer">
                    <ButtonNew label="Cancel" className="ghost" onClick={ this.props.onClose }/>
                    <ButtonNew label="Add" className="big" disabled={ disableSubmit } onClick={ () => this.onSubmit() }/>
                </div>
            </div>
        );
        return (
            <div className="properties-group-add-properties">
                <Modal
                    title="Add Property to Group"
                    icon="addBox"
                    className="wide"
                    hideActions
                    content={ content }
                    onClose={ this.props.onClose }
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    properties: selectPropertiesFiltered(),
    pagination: selectPropertiesPagination(),
    loading: makeSelectFetchPropertiesLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        updateProperty: (data) => dispatch(updateProperty(data)),
        fetchProperties: () => dispatch(fetchPropertiesFiltered()),
        setGroup: (data) => dispatch(setSelectedGroup(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddProperties);
