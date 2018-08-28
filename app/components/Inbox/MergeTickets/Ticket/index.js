import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import SVG from 'components/SVG';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

export class Ticket extends React.Component {

    render() {
        const { connectDragSource, connectDropTarget, isDragging, isOver, ticket, isSelected } = this.props;
        return connectDragSource(connectDropTarget(
            <div className={ 'ticket' + (isDragging ? ' is-dragging' : '') }>
                <div className="disabler"/>
                <div className={ 'marker' + (isSelected ? ' is-selected' : '') }/>
                <div className="id"><span className={ 'priority ' + ticket.getPriorityName() }/>#{ ticket.getId() }</div>
                <div className="name">
                    <div className="reporter">
                        { ticket.getRequester() }
                    </div>
                    <div className="subject">
                        { ticket.getTitle() }
                    </div>
                </div>
                <div className="date">
                    { ticket.getCreationDate() }
                </div>
                <span className="delete">
                    <SVG icon="cancel" size="20"/>
                </span>
            </div>
        ));
    }
}

const ticketSource = {
    beginDrag(props) {
        return {
            ticket: props.ticket,
            canDropToSelected: props.canDropToSelected
        };
    },
    endDrag(props, monitor) {
        const item = monitor.getItem();
        const dropResult = monitor.getDropResult();

        if (dropResult) {
            props.onDrop(item, dropResult);
        }
    },
};

const ticketTarget = {
    hover(props, monitor, component) {
        const dragIndex = monitor.getItem().index;
        const hoverIndex = props.index;

        // Don't replace items with themselves
        if (dragIndex === hoverIndex) {
            return;
        }

        // Determine rectangle on screen
        const hoverBoundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();

        // Get horizontal middle
        const hoverMiddleX = (hoverBoundingRect.right - hoverBoundingRect.left) / 2;

        // Determine mouse position
        const clientOffset = monitor.getClientOffset();

        // Get pixels to the left
        const hoverClientX = clientOffset.x - hoverBoundingRect.left;

        // Only perform the move when the mouse has crossed half of the items height

        // Dragging right
        if (dragIndex < hoverIndex && hoverClientX < hoverMiddleX) {
            return;
        }

        // Dragging left
        if (dragIndex > hoverIndex && hoverClientX > hoverMiddleX) {
            return;
        }

        // Time to actually perform the action
        props.moveImage(dragIndex, hoverIndex);

        // Note: we're mutating the monitor item here!
        // Generally it's better to avoid mutations,
        // but it's good here for the sake of performance
        // to avoid expensive index searches.
        monitor.getItem().index = hoverIndex;
    },
};

const dragCollect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
};

const dropCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
};

export default flow(DragSource('ticket', ticketSource, dragCollect), DropTarget('ticket', ticketTarget, dropCollect))(Ticket);
