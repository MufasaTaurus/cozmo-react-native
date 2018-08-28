import React from 'react';
import SearchBox from 'components/SearchBox';
import Checkbox from 'components/Checkbox';
//import ButtonMenu from './ButtonMenu';
import ButtonNew from 'components/ButtonNew';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import Tabs from 'components/Tabs';
import PropertyInfo from './PropertyInfo';
import PropertyName from 'components/PropertyNameNew';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectProperty, changeDisplay, selectDraft, startImport, fetchProperties } from 'containers/Properties/actions';
import { makeSelectSelectedProperty, makeSelectDisplay, selectPropertiesPagination, makeSelectFetchPropertiesLoading } from 'containers/Properties/selectors';
import PropertyModel from 'models/Property';
import CheckboxList from 'models/CheckboxList';
import { push } from 'react-router-redux';
import './propertiesList.less';

export class PropertiesList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            checkboxListActive: new CheckboxList({ items: this.getItemsForCheckboxList(props.properties, 'Active') }),
            //checkboxListArchived: new CheckboxList({ items: this.getItemsForCheckboxList(props.properties, 'Archived') }),
            checkboxListDraft: new CheckboxList({ items: this.getItemsForCheckboxList(props.properties, 'Draft') }),
        };
    }

    // componentDidMount() {
    //     if (this.props.id) {
    //         const selected = this.props.properties.toArray().filter((prop) => (prop.get('id') + '') === this.props.id);
    //         this.props.selectProperty(selected[0]);
    //     }
    // }

    componentWillReceiveProps(nextProps) {
        this.setState({
            checkboxListActive: this.state.checkboxListActive.setItems(this.getItemsForCheckboxList(nextProps.properties, 'Active')),
            //checkboxListArchived: this.state.checkboxListArchived.setItems(this.getItemsForCheckboxList(nextProps.properties, 'Archived')),
            checkboxListDraft: this.state.checkboxListDraft.setItems(this.getItemsForCheckboxList(nextProps.properties, 'Draft'))
        });
    }

    getItemsForCheckboxList(properties, status) {
        return properties
            .filter(p => p.get('status') === status)
            .map(p => p.get('id'))
            .toArray();
    }

    toggleCheckbox(id, status) {
        const variable = 'checkboxList' + status;
        this.setState({ [variable]: this.state[variable].toggleItem(id) });
    }

    getPropertiesCount() {
        const filter = (status) => this.props.properties.filter((property) => property.get('status') === status).size;
        return {
            active: filter('Active'),
            disabled: filter('Archived'),
            drafts: filter('Draft')
        };
    }

    renderProperties(status) {
        const properties = this.props.properties.map(prop => new PropertyModel(prop));
        const variable = 'checkboxList' + status;
        return properties
            .filter(property => property.getStatus() === status)
            .filter(property => property.filterProperties(this.state.query))
            .map((property) => {
                const id = property.getId();
                const check = (
                    <div className="checkbox-wrapper">
                        <Checkbox
                            id={ id }
                            onChange={ () => this.toggleCheckbox(id, status) }
                            checked={ this.state[variable].isItemChecked(id) }
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
                    onClick: () => {
                        if (status === 'Draft') {
                            this.props.selectDraft(this.props.properties.filter(p => p.get('id') === property.getId()).first());
                            this.props.goToDraftEdit();
                        } else {
                            //this.props.selectProperty(this.props.properties.filter(p => p.get('id') === property.getId()).first());
                            this.props.goToPropertyCalendar(property.getId());
                        }
                    },
                    values: [
                        check,
                        propName,
                        property.getType(),
                        property.getRoomType(),
                        <span className="br-ba">{ property.getBRBA() }</span>,
                        property.getOwner(),
                        property.getSource() ? <span className="api-label">API</span> : ''
                    ]
                };
            }).toArray();
    }

    render() {
        const count = this.getPropertiesCount();
        const checkboxSelectAll = (status) => {
            return (
                <div className="checkbox-wrapper">
                    <Checkbox id="all" onChange={ () => this.toggleCheckbox('all', status) } checked={ this.state['checkboxList' + status].isAllSelected() }/>
                </div>
            );
        };
        const tableHeader = (status) => {
            return [
                { name: checkboxSelectAll(status), type: 'checkbox' },
                { name: 'Property Name' },
                { name: 'Type' },
                { name: 'Room Type' },
                { name: 'BR/BA', type: 'short' },
                { name: 'Owner' },
                { name: '', type: 'label' },
            ];
        };
        const table = (status) =>
            <div>
                <div className="search-bar">
                    <div className="search-box-wrapper">
                        <div className="checkbox-all">{ checkboxSelectAll(status) }</div>
                        <SearchBox
                            className="large"
                            onChange={ (evt) => this.setState({ query: evt.target.value }) }
                            value={ this.state.query }/>
                    </div>
                    {/*<ButtonMenu startImport={ this.props.startImport } />*/}
                    <ButtonNew label="Add" linkTo="/properties/create" className="small"/>
                </div>
                <Table head={ tableHeader(status) } body={ this.renderProperties(status) } loading={ this.props.loading }/>
                { status === 'Active' &&
                    <div className="vj-pagination-wrapper">
                        <Pagination pagination={ this.props.pagination } onChange={ () => this.props.fetchProperties() }/>
                    </div>
                }
            </div>;
        return (
            this.props.id ?
                <PropertyInfo id={ this.props.id } section={ this.props.section } subsection={ this.props.subsection }/>
                :
                <div className="properties-in-properties-list ">
                    <div className="properties-list">
                        <Tabs tabs={[
                            { title: 'Active (' + count.active + ')', content: table('Active') },
                            // { title: 'Disabled (' + count.disabled + ')', content: table('Archived') },
                            { title: 'Drafts (' + count.drafts + ')', content: table('Draft') },
                        ]}/>
                    </div>
                </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    selectedProperty: makeSelectSelectedProperty(),
    loading: makeSelectFetchPropertiesLoading(),
    pagination: selectPropertiesPagination(),
    display: makeSelectDisplay(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchProperties: () => dispatch(fetchProperties()),
        selectProperty: (property) => dispatch(selectProperty(property)),
        selectDraft: (property) => dispatch(selectDraft(property)),
        changeDisplay: (display) => dispatch(changeDisplay(display)),
        goToDraftEdit: () => dispatch(push('/properties/create')),
        goToPropertyCalendar: (id) => dispatch(push('/properties/' + id + '/calendar')),
        startImport: () => dispatch(startImport()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesList);
