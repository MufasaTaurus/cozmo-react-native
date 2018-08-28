import React, {PropTypes} from 'react';
import SVG from 'components/SVG';
import Tabs from 'components/Tabs';
import ButtonNew from 'components/ButtonNew';
import Ticket from './Ticket';
import DropContainer from './DropContainer';
import SelectedTickets from './SelectedTickets';
import FindTickets from './FindTickets';
import RecentTickets from './RecentTickets';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import './mergeTickets.less';

export class MergeTickets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            parent: null,
            selected: this.props.tickets
        };
    }

    handleFormChange(field, value) {
        this.setState({ [field]: value });
    }

    onTicketDrop(ticket, target) {
        if (!ticket.canDropToSelected && target.name === 'SelectedTickets') {
            return false;
        }

        let selected = this.state.selected;
        let parent = this.state.parent;
        const droppedTicket = ticket.ticket;

        if (target.name === 'SelectedTickets') {
            selected.push(ticket.ticket);
            if (parent.getId() === droppedTicket.getId()) {
                parent = null;
            }
        } else {
            selected = this.state.selected.filter(t => t.getId() !== droppedTicket.getId());
            if (parent) {
                selected.push(parent);
            }
            parent = droppedTicket;
        }

        this.setState({
            parent: parent,
            selected: selected
        });
    }

    removeTicket(id) {
        const selected = this.state.selected.filter(t => t.getId() !== id);
        this.setState({
            selected: selected
        });
    }

    submitForm() {
        this.props.onSubmit({
            id: this.state.parent.getId(),
            tickets: this.state.selected.map(t => t.getId())
        });
    }

    render() {
        const parent = this.state.parent ?
            <Ticket
                isSelected
                canDropToSelected
                ticket={ this.state.parent }
                onDrop={ (ticket, target) => this.onTicketDrop(ticket, target) }/>
            : null;
        return (
            <div className="inbox-merge-tickets-modal">
                <div className="merge-tickets-modal">
                    <div className="modal-header">
                        <span><SVG className="header-icon" icon="merge"/>MergeTickets</span>
                        <span className="close" onClick={ this.props.onClose }>&times;</span>
                    </div>
                    <div className="modal-content">
                        <div className="modal-section">
                            <div className="section-title">Parent Ticket</div>
                            <div className="section-content">
                                <DropContainer parent={ parent }/>
                                <div className="spacer">
                                    <div className="line"/>
                                    <div className="icon-merge"><SVG icon="merge" size="46"/></div>
                                    <div className="line"/>
                                </div>
                                <div className="choose-tickets">
                                    <div className="find">
                                        <div className="section-title">Find Tickets</div>
                                        <div className="find-tickets-box">
                                            <Tabs tabs={[
                                                { title: 'Search', content:
                                                    <FindTickets
                                                        selected={ this.state.selected }
                                                        parent={ this.state.parent }
                                                        onDrop={ (ticket, target) => this.onTicketDrop(ticket, target) }
                                                    /> },
                                                { title: 'Recently Viewed Tickets', content:
                                                    <RecentTickets
                                                        selected={ this.state.selected }
                                                        parent={ this.state.parent }
                                                        onDrop={ (ticket, target) => this.onTicketDrop(ticket, target) }
                                                    />
                                                }
                                            ]}/>
                                        </div>
                                    </div>
                                    <div className="selected">
                                        <div className="section-title">Selected Tickets</div>
                                        <div className="selected-tickets-box">
                                            <SelectedTickets
                                                selected={ this.state.selected }
                                                onTicketDrop={ (ticket, target) => this.onTicketDrop(ticket, target) }
                                                onRemoveTicket={ (id) => this.removeTicket(id) }
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="submit-section">
                            <ButtonNew
                                disabled={ !(this.state.parent && this.state.selected.length) }
                                onClick={ () => this.submitForm() }
                                label="Merge"
                                big/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default (DragDropContext(HTML5Backend)(MergeTickets));
