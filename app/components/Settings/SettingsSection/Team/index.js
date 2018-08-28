import React from 'react';
import Spinner from 'components/Spinner';
import SearchBox from 'components/SearchBox';
import SVG from 'components/SVG';
import Table from 'components/Table';
import VendorName from 'components/VendorName';
import RaisedButton from 'material-ui/RaisedButton';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {fetchChannels, toggleChannel} from 'containers/Settings/actions';
import {makeSelectChannels, selectLoading} from 'containers/Settings/selectors';
import './team.less';

export class Team extends React.Component {

    constructor(props) {
        super(props);
        // if(!this.props.channels.size) {
        //     this.props.fetchChannels();
        // }
        this.tableHeader = [
            { name: 'Email' },
            { name: 'Phone' },
            { name: 'Security Role' },
            { name: 'Status' },
            { name: '', type: 'buttons' },
        ];
        this.team = [
            { name: 'Aga', email: 'aga@voyajoy.com', status: 'Accepted', phone: '12345678', role: 'Admin', avatar: '' },
            { name: 'Gregory', email: 'gregory@voyajoy.com', status: 'Invited', phone: '12356564', role: 'Admin', avatar: '' },
        ];
    }

    getUsers() {
        return this.team
            //.filter(job => new JobModel(job).filterJob(this.state.query))
            .map((team, index) => {
                const name = <VendorName fullName={ team.name } avatar={ team.avatar } email={ team.email }/>;
                const status = <span className="status">{ team.status }</span>;
                const menu =
                    <span>
                        <span className="menu-icon"><SVG icon="security" size="20"/></span>
                        <span className="menu-icon"><SVG icon="edit" size="20"/></span>
                    </span>;
                return {
                    className: 'team-user',
                    key: index,
                    values: [
                        name,
                        team.phone,
                        team.role,
                        status,
                        menu
                    ]
                };
            });
            //.toArray();
    }

    render() {
        return (
            <div className="settings-team">
                <div className="settings-team-card">
                    <div className="settings-team-card-header">
                        <div className="search-box-wrapper">
                            <SearchBox placeholder="Search users"/>
                        </div>
                        <RaisedButton
                            label="Add user"
                            //onClick={ this.saveTemplate.bind(this) }
                            primary={ true }/>
                    </div>
                    <div className="settings-team-card-content">
                        <Table head={ this.tableHeader } body={ this.getUsers() }/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    channels: makeSelectChannels(),
    loading: selectLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchChannels: () => dispatch(fetchChannels()),
        toggleChannel: (data) => dispatch(toggleChannel(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Team);
