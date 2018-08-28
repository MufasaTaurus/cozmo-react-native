import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import './tag.less';

function Tag({ tag, onDelete }) {

    return (
        <span className="template-tag">
            { tag }
            { onDelete ?
                <span className="delete" onClick={ onDelete }>
                    <SVG icon="cancel" size={ 14 }/>
                </span>
                : '' }
        </span>
    );
}

Tag.propTypes = {
    tag: PropTypes.string.isRequired,
    onDelete: PropTypes.func
};

export default Tag;
