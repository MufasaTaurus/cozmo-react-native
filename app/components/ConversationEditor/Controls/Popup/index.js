import React from 'react';
import StyleButton from '../StyleButton';

class Popup extends React.Component {

    render() {
        const blockType = this.props.editorState
            .getCurrentContent()
            .getBlockForKey(this.props.editorState.getSelection().getStartKey())
            .getType();
        return (
            <div className="popup">
                { this.props.elements.map((section, index) => {
                    return (
                        <div className="popup-section" key={ index }>
                            { section.map((elem) => (
                                <StyleButton
                                    key={ elem.icon }
                                    icon={ elem.icon }
                                    editorState={ this.props.editorState }
                                    active={
                                        this.props.editorState.getCurrentInlineStyle().has(elem.style) ||
                                        blockType === elem.style
                                    }
                                    onToggle={ elem.onToggle }
                                    style={ elem.style }
                                />
                            )) }
                        </div>
                    );
                }) }
            </div>
        );
    }
}

export default Popup;

