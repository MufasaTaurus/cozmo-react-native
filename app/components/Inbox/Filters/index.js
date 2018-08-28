import React from 'react';
import Radio from 'components/Radio';
import Select from 'components/Select';
import ButtonNew from 'components/ButtonNew';
import TeamMemberPicker from 'components/TeamMemberPicker';
import PrioritySelect from 'components/Inbox/PrioritySelect';
import StatusSelect from 'components/Inbox/StatusSelect';
import TypeSelect from 'components/Inbox/TypeSelect';
import FilterSection from './FilterSection';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectTickets, selectLoading, selectDisplay, selectFilters} from 'containers/Inbox/selectors';
import {setTicketsDisplay, setTicketsFilters, setModalVisible} from 'containers/Inbox/actions';
import './filters.less';

export class Filters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            filters: {
                all: true,
                assigned: false,
                unassigned: false,
                deleted: false
            }
        };
    }

    changeDisplay(display) {
        if (this.props.display !== display) {
            this.props.setDisplay(display);
        }
    }

    changeFilter(filter, option) {
        this.props.setTicketsFilters(filter, option);
    }

    getTicketsCount(type) {
        let num = 0;
        // switch (type) {
        //     case 'all':
        //         num = this.props.tickets.size;
        //         break;
        //     case 'assigned':
        //         num = this.props.tickets.filter(t => t.isAssigned()).size;
        //         break;
        //     case 'unassigned':
        //         num = this.props.tickets.filter(t => !t.isAssigned()).size;
        //         break;
        //     case 'deleted':
        //         num = this.props.tickets.filter(t => t.isDeleted()).size;
        //         break;
        // }

        return num > 0 ? ' (' + num + ')' : '';
    }

    render() {
        const allNum = this.getTicketsCount('all');
        const assignedNum = this.getTicketsCount('assigned');
        const unassignedNum = this.getTicketsCount('unassigned');
        const deletedNum = this.getTicketsCount('deleted');
        return (
            <div className="inbox-filters">
                <div className="create-ticket-section">
                    <ButtonNew onClick={ () => this.props.setModalVisible(true) } label="Create"/>
                </div>
                <FilterSection title="Filter" icon="file" content={
                    <div>
                        <Radio
                            label={ 'All Tickets' + allNum }
                            name="f"
                            id="all"
                            onChange={ () => this.changeDisplay('active') }
                            checked={ this.props.display === 'active' }
                        />
                        <Radio
                            label={ 'Assigned Tickets' + assignedNum }
                            name="f"
                            id="assigned"
                            onChange={ () => this.changeDisplay('assigned') }
                            checked={ this.props.display === 'assigned' }
                        />
                        <Radio
                            label={ 'Unassigned Tickets' + unassignedNum }
                            name="f"
                            id="unassigned"
                            onChange={ () => this.changeDisplay('unassigned') }
                            checked={ this.props.display === 'unassigned' }
                        />
                        <Radio
                            label={ 'Deleted Tickets' + deletedNum }
                            name="f"
                            id="deleted"
                            onChange={ () => this.changeDisplay('archived') }
                            checked={ this.props.display === 'archived' }
                        />
                    </div>
                }/>
                <FilterSection title="View" icon="file" content={
                    <div>
                        <TeamMemberPicker
                            withAll
                            onChange={ (data) => this.changeFilter('assignee', data) }
                            />
                        <StatusSelect  onChange={ (data) => this.changeFilter('status', data) } />
                        <PrioritySelect onChange={ (data) => this.changeFilter('priority', data) }/>
                        <TypeSelect onChange={ (data) => this.changeFilter('type', data) }/>
                    </div>
                }/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    tickets: selectTickets(),
    loading: selectLoading(),
    display: selectDisplay(),
    filters: selectFilters()
});


export function mapDispatchToProps(dispatch) {
    return {
        setDisplay: (display) => dispatch(setTicketsDisplay(display)),
        setModalVisible: (visible) => dispatch(setModalVisible(visible)),
        setTicketsFilters: (filter, value) => dispatch(setTicketsFilters({ filter: filter, value: value })),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters);
