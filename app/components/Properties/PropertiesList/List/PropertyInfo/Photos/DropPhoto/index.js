import React from 'react';
import SVG from 'components/SVG';
import ImageUploader from 'components/ImageUploader';
import { DropTarget } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import './dropPhoto.less';

export class DropPhoto extends React.Component {

    render() {
        const { isOver, connectDropTarget } = this.props;
        return connectDropTarget(
            <div className={ 'drag-and-drop-photo-container' + (isOver ? ' add' : '') }>
                { this.props.parent ? this.props.parent :
                    isOver ?
                        <div className="d-n-d-add">
                            <SVG icon="addBox" size="20" className="add-icon"/> ADD
                        </div>
                        :
                        <div className="d-n-d-content">
                            <div className="d-n-d-drop">
                                <div className="d-n-d-icon"><SVG icon="illustration" size="90"/></div>
                                <div>
                                    <div className="d-n-d-title">Drag and drop photos here</div>
                                    <div className="d-n-d-subtitle">Upload JPG or PNG</div>
                                </div>
                            </div>
                            <div className="d-n-d-or">or</div>
                            <div className="d-n-d-input">
                                <ImageUploader
                                    onImageUploaded={ this.props.onImageUploaded }/>
                                <div className="d-n-d-button">Browse</div>
                            </div>
                        </div>
                }
            </div>
        );
    }
}

const boxTarget = {
    drop(props, monitor) {
        if (props.onDrop) {
            props.onDrop(monitor.getItem().files);
        }
    },
};

const dropCollect = (connect, monitor) => {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
};

export default DropTarget([NativeTypes.FILE], boxTarget, dropCollect)(DropPhoto);
