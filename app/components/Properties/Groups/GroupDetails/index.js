import React from 'react';
import GroupProperties from './GroupProperties';
import GroupEmails from './GroupEmails';
import CreateEmail from './CreateEmail';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import { fetchPropertiesGroups, addPropertiesGroup } from 'containers/Properties/actions';
import { selectLoadingGroups, selectPropertiesGroup } from 'containers/Properties/selectors';
import './groupDetails.less';

export class GroupDetails extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            group: props.groups.filter(g => g.getId() + '' === props.id).first(),
            addProperties: false,
            query: ''
        };
        this.emailsTableHeader = [
            { name: 'Template Name' },
            { name: 'Description' },
            { name: 'Type', type: 'short' },
            { name: 'Automation', type: 'short' },
        ];
    }

    render() {
        return (
            <div className="properties-groups-group-details-wrapper">
                { this.props.createEmail ?
                    <CreateEmail group={ this.state.group }/>
                    :
                    <div className="properties-groups-group-details">
                        <GroupEmails group={ this.state.group }/>
                        <GroupProperties group={ this.state.group }/>
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    groups: selectPropertiesGroup(),
    loading: selectLoadingGroups()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchGroups: () => dispatch(fetchPropertiesGroups()),
        addNewGroup: (data) => dispatch(addPropertiesGroup(data)),
        goToGroupDetails: (id) => dispatch(push('/properties/group/' + id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(GroupDetails);
