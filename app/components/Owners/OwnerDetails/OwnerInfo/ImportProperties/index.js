import React from 'react';
import isEmpty from 'lodash/isEmpty';
import keys from 'lodash/keys';
import findKey from 'lodash/findKey';
import Modal from 'components/Modal';
import SearchBox from 'components/SearchBox';
import Table from 'components/Table';
import ButtonNew from 'components/ButtonNew';
import PropertyName from 'components/PropertyNameNew';
import Checkbox from 'components/Checkbox';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOwners, selectLoading } from 'containers/Owners/selectors';
import { fetchOwners } from 'containers/Owners/actions';
import './importProperties.less';

export class ImportProperties extends React.Component {

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
        const props = this.props.owners.first().getProperties().map(p => p.getId());
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
        const props = this.props.owners.first().getProperties().map(p => p.getId());
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

    getProperties() {
        return this.props.owners.first().getProperties()
            .map((property) => {
                const id = property.getId();
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
                const prop = <PropertyName name={ property.getName() } address={ property.getAddress() } image={ property.getImage() }/>;
                return {
                    className: 'property',
                    key: id,
                    values: [
                        check,
                        prop,
                        property.getType(),
                        property.getRoomType(),
                        property.getBRBA().split(' ').map((b, index) => <div key={ index }>{ b }</div>),
                        location,
                        property.getOwner()
                    ]
                };
            });
    }

    render() {
        const tableHeader = [
            { name: <div className="checkbox-wrapper"><Checkbox id="all" onChange={ () => this.toggleProperty('all') } checked={ this.isAllSelected() }/></div> },
            { name: 'Property Name' },
            { name: 'Type' },
            { name: 'Room Type' },
            { name: 'BR/BA', type: 'short' },
            { name: 'City/State' },
            { name: 'Owner' },
        ];
        const disableSubmit = !this.shouldEnableSubmit();
        const content = (
            <div className="modal-content">
                <div className="prop-table">
                    <div className="search-bar">
                        <SearchBox
                            className="search-box"
                            onChange={ (evt) => this.changeQuery(evt.target.value) }
                            value={ this.state.query }
                            placeholder="Search"/>
                    </div>
                    <Table head={ tableHeader } body={ this.getProperties() }/>
                </div>
                <div className="footer">
                    <ButtonNew label="Cancel" className="ghost" onClick={ this.props.onClose }/>
                    <ButtonNew label="Add" className="big" disabled={ disableSubmit }/>
                </div>
            </div>
        );
        return (
            <div className="owner-details-import-properties">
                { this.props.open &&
                    <Modal
                        title="Import Properties"
                        icon="import"
                        className="wide"
                        hideActions
                        content={ content }
                        onClose={ this.props.onClose }
                    />
                }
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
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ImportProperties);
