import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import SVG from 'components/SVG';

function Item({ title, desc, icon, isNew = false, linkTo }) {

    const content =
        <div className="item">
            { isNew ? <div className="new-ribbon"/> : '' }
            { isNew ? <div className="new-icon"><SVG icon={ 'exclamation' } size={ 16 } /></div> : '' }
            <div className="icon-wrapper"><SVG icon={ icon } size={ 50 } /></div>
            <div className="text">
                <div className="title">{ title }</div>
                <div className="desc">{ desc }</div>
            </div>
            <div className="arrow"/>
        </div>;

    return (
        linkTo ? <Link to={ linkTo }>{ content }</Link> : content
    );
}

Item.propTypes = {
    title: PropTypes.string.isRequired,
    desc: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    isNew: PropTypes.bool,
};

export default Item;
