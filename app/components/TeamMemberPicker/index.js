import React from 'react';
import Select from 'components/Select';
import Assignee from 'components/Assignee';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectTeam} from 'containers/App/selectors';
import './teamMemberPicker.less';

export class TeamMemberPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultValue: props.defaultValue,
            query: ''
        };
        this.me = null;
    }

    chooseMe() {
        this.setState({ defaultValue: this.me.getId() });
        this.props.onChange(this.me.getId());
    }

    onSearchChange(value) {
        this.setState({ query: value });
    }

    render() {
        let options = this.props.team
            .filter(t => t.filterUser(this.state.query))
            .map(user => {
                const isMe = user.isMe();
                if (!this.me && isMe) {
                    this.me = user;
                }
                const label = <div className="assignee-wrapper"><Assignee fullName={ user.getFullName() } isMe={ isMe }/></div>;
                return (
                    { name: label, value: user.getId() }
                );
            });
        if (this.props.withAll) {
            options = options.unshift({ name: 'All Assignees', value: '' });
        }
        return (
            <div className="team-member-picker">
                { this.props.chooseMe && <span className="choose-me" onClick={ () => this.chooseMe() }>{ this.props.chooseMe }</span> }
                <Select
                    placeholder={ this.props.placeholder }
                    label={ this.props.label }
                    query={ this.state.query }
                    onChange={ this.props.onChange }
                    options={ options.toArray() }
                    defaultValue={ this.state.defaultValue }
                    small={ this.props.small }
                    withSearch
                    onSearchChange={ (val) => this.onSearchChange(val) }
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    team: selectTeam(),
});

export default connect(mapStateToProps)(TeamMemberPicker);
