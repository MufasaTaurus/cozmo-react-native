import React from 'react';
import ButtonNew from 'components/ButtonNew';
import SearchBox from 'components/SearchBox';
import PropertyName from 'components/PropertyNameNew';
import Checkbox from 'components/Checkbox';
import Table from 'components/Table';
import MoreMenu from 'components/MoreMenu';
import TitleHeader from 'components/TitleHeader';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { updateProperty } from 'containers/Properties/actions';
import { selectLoadingGroups, makeSelectProperties } from 'containers/Properties/selectors';
import PropertyModel from 'models/Property';

export class GroupEmails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            addProperties: false,
        };
        this.emailsTableHeader = [
            { name: 'Template Name' },
            { name: 'Description' },
            { name: 'Type', type: 'short' },
            { name: 'Automation', type: 'short' },
        ];
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
            .filter(p => p.get('group') === this.props.group.getId())
            .map((prop) => {
                const property = new PropertyModel(prop);
                const id = property.getId();
                const location = (
                    <div className="location">
                        <div className="city">City</div>
                        <div className="state">State</div>
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
                const propName = <PropertyName name={ property.getName() } address={ property.getAddress() } image={ property.getImage() }/>;
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
                        property.getOwner(),
                        menu
                    ]
                };
            }).toArray();
    }

    render() {
        return (
            <div className="group-emails-section">
                <TitleHeader title="Group Auto Emails" icon="autoEmail"/>
                <div className="search-bar">
                    <SearchBox
                        onChange={ (evt) => this.setState({ query: evt.target.value }) }
                        value={ this.state.query }/>
                    <ButtonNew
                        className="small"
                        onClick={ () => this.props.createEmail(this.props.group.getId()) }
                        label="Add"/>
                </div>
                <Table head={ this.emailsTableHeader } body={ [] }/>
                <div className="empty-state">No group auto email yet</div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    properties: makeSelectProperties(),
    loading: selectLoadingGroups()
});

export function mapDispatchToProps(dispatch) {
    return {
        updateProperty: (data) => dispatch(updateProperty(data)),
        createEmail: (id) => dispatch(push('/properties/groups/' + id + '/create-email')),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupEmails);
