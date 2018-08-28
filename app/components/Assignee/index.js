import React, {PropTypes} from 'react';
import './assignee.less';

function Assignee({ fullName, isMe, onlyBadge }) {

    const colors = [
        '#92CBF7',
        '#58E2C2',
        '#CE81DE',
        '#ED9A9B',
        '#FECA7C'
    ];

    const createBadge = () => {
        const letter = fullName.substr(0, 1).toUpperCase();
        const color = colors[letter.charCodeAt(0) % 5];

        return <div style={{ background: color }} className="badge">{ letter }</div>;
    };

    const names = isMe ? ['Me'] : fullName.split(' ');

    return (
        <div className="assignee">
            { fullName === 'Unassigned' ? '' : createBadge() }
            <div className="assignee-info">
                { !onlyBadge && names.map(name => <div key={ name } className="name">{ name }</div>) }
            </div>
        </div>
    );
}

Assignee.propTypes = {
    fullName: PropTypes.string.isRequired,
    isMe: PropTypes.bool,
    onlyBadge: PropTypes.bool,
};

export default Assignee;

