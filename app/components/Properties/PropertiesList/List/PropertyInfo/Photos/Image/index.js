import React from 'react';
import ReactDOM from 'react-dom';
import SVG from 'components/SVG';
import { DragSource, DropTarget } from 'react-dnd';
import flow from 'lodash/flow';

export class Image extends React.Component {

    render() {
        const { connectDragSource, connectDropTarget, isDragging, isOver, index } = this.props;
        const opacity = (isDragging) ? 0 : 1;
        return connectDragSource(connectDropTarget(
            <div className="image" style={{ opacity: opacity, cursor: 'move' }}>
                <span className="delete" onClick={ this.props.onDelete }><SVG icon="cancel" size="14"/></span>
                <div
                    className="img-background"
                    onClick={ this.props.onClick }
                    style={{ backgroundImage: 'url(' + this.props.url + ')' }} />
                { index === 0 && <div className="cover"><SVG className="icon" icon="bookmark" size="16"/>Cover photo</div> }
            </div>
        ));
    }
}

Image.PropTypes = {
    url: React.PropTypes.string.isRequired
};

const imageSource = {
    beginDrag(props) {
        return {
            id: props.id,
            index: props.index,
        };
    },
};

const imageTarget = {
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
        isDragging: monitor.isDragging()
    };
};

const dropCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver()
    };
};

export default flow(DragSource('image', imageSource, dragCollect), DropTarget('image', imageTarget, dropCollect))(Image);
