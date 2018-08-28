import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import Ticket from '../Ticket';
import { DropTarget } from 'react-dnd';

export class SelectedTickets extends React.Component {

    render() {
        const { isOver, connectDropTarget, onTicketDrop, selected, onRemoveTicket, canDrop } = this.props;
        return connectDropTarget(
            <div className="box-selected-tickets">
                { selected.map(t => {
                    return (
                        <div className="ticket-wrapper" key={ t.getId() }>
                            <Ticket
                                ticket={ t }
                                isSelected
                                onDrop={ onTicketDrop }
                            />
                            <span className="remove-ticket" onClick={ () => onRemoveTicket(t.getId()) }>
                                <SVG icon="cancel" size="20"/>
                            </span>
                        </div>
                    );
                }) }
                { canDrop && isOver && <div className="add-placeholder"><SVG className="add-icon" size="16" icon="addCircle"/>add</div>}
            </div>
        );
    }
}

const boxTarget = {
    drop() {
        return { name: 'SelectedTickets' };
    },
};

const dropCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.getItem() && monitor.getItem().canDropToSelected,
    };
};

export default DropTarget('ticket', boxTarget, dropCollect)(SelectedTickets);
