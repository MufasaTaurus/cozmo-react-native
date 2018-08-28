import React from 'react';
import AddGroup from './AddGroup';
import GroupDetails from './GroupDetails';
import ButtonNew from 'components/ButtonNew';
import Spinner from 'components/Spinner';
import SearchBox from 'components/SearchBox';
import MoreMenu from 'components/MoreMenu';
import TitleHeader from 'components/TitleHeader';
import Table from 'components/Table';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { fetchPropertiesGroups, addPropertiesGroup, fetchProperties, updatePropertiesGroup, deletePropertiesGroup } from 'containers/Properties/actions';
import { selectLoadingGroups, selectPropertiesGroup, makeSelectProperties } from 'containers/Properties/selectors';
import './group.less';

export class Groups extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            addGroup: false,
            groupToEdit: null,
            loading: false,
            query: ''
        };
        this.tableHeader = [
            { name: 'Group Name' },
            { name: 'Description' },
            { name: 'Templates', type: 'short' },
            { name: 'Date Updated', type: 'date' },
            { name: '', type: 'menu' },
        ];
        if (!props.groups.size) {
            props.fetchGroups();
        }
        if (!props.properties.size) {
            props.fetchProperties();
        }
    }

    componentWillReceiveProps() {
        this.setState({ loading: false });
        this.onModalClose();
    }

    onModalClose() {
        this.setState({
            addGroup: false,
            groupToEdit: null
        });
    }

    getGroups() {
        return this.props.groups
            .filter(group => group.filterGroup(this.state.query))
            .map((group) => {
                const menu = <MoreMenu buttons={ [
                    { label: 'Edit', click: () => this.setState({ groupToEdit: group, addGroup: true }) },
                    { label: 'Details', click: () => this.props.goToGroupDetails(group.getId()) },
                    { label: 'Archive', click: () => this.props.deleteGroup(group.getId()) }
                ] }/>;
                return {
                    className: 'group',
                    key: group.getId(),
                    onClick: () => this.props.goToGroupDetails(group.getId()),
                    values: [
                        <span className="name">{ group.getName() + ' (' + group.getPropertiesCount() + ')' }</span>,
                        <span className="desc">{ group.getDescription() }</span>,
                        group.getTemplates(),
                        <div className="date-time">
                            <div className="date">{ group.getDate() }</div>
                            <div className="time">{ group.getTime() }</div>
                        </div>,
                        menu
                    ]
                };
            }).toArray();
    }

    submitForm(data) {
        this.setState({ loading: true });
        if (this.state.groupToEdit) {
            this.props.updateGroup(Object.assign(data, { id: this.state.groupToEdit.getId() }));
        } else {
            this.props.addNewGroup(data);
        }
    }

    render() {
        return (
            <div className="properties-groups-wrapper">
                { this.props.loading ?
                    <div className="spinner-wrapper"><Spinner/></div>
                    :
                    this.props.id ?
                        <GroupDetails id={ this.props.id } createEmail={ this.props.createEmail }/>
                        :
                        <div className="properties-groups">
                            <TitleHeader title="Groups" icon="groups"/>
                            <div className="search-bar">
                                <SearchBox
                                    onChange={ (evt) => this.setState({ query: evt.target.value }) }
                                    value={ this.state.query }/>
                                <ButtonNew
                                    className="small"
                                    onClick={ () => this.setState({ addGroup: true }) }
                                    label="Create a group"/>
                            </div>
                            <Table head={ this.tableHeader } body={ this.getGroups() }/>
                            { this.state.addGroup &&
                                <AddGroup
                                    group={ this.state.groupToEdit }
                                    loading={ this.state.loading }
                                    onClose={ () => this.onModalClose() }
                                    onSubmit={ (data) => this.submitForm(data) }
                                />
                            }
                        </div>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    groups: selectPropertiesGroup(),
    properties: makeSelectProperties(),
    loading: selectLoadingGroups()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchGroups: () => dispatch(fetchPropertiesGroups()),
        fetchProperties: () => dispatch(fetchProperties()),
        addNewGroup: (data) => dispatch(addPropertiesGroup(data)),
        updateGroup: (data) => dispatch(updatePropertiesGroup(data)),
        deleteGroup: (id) => dispatch(deletePropertiesGroup(id)),
        goToGroupDetails: (id) => dispatch(push('/properties/groups/' + id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
