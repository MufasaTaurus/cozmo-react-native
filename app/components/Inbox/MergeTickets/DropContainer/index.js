import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import { DropTarget } from 'react-dnd';

export class DropContainer extends React.Component {

    render() {
        const { isOver, connectDropTarget } = this.props;
        return connectDropTarget(
            <div className={ 'drag-and-drop-container' + (isOver ? ' add' : '') }>
                { this.props.parent ? this.props.parent :
                    isOver ?
                        <div className="d-n-d-title"><SVG icon="addBox" size="20" className="add-icon"/>ADD</div>
                        :
                        <div>
                            <div className="d-n-d-title">Drag and drop 1 ticket</div>
                            <div className="d-n-d-subtitle">All tickets are merged to a parent ticket.</div>
                        </div>
                }
            </div>
        );
    }
}

const boxTarget = {
    drop() {
        return { name: 'DropContainer' };
    },
};

const dropCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
};

export default DropTarget('ticket', boxTarget, dropCollect)(DropContainer);
