import React, { PropTypes } from 'react';
import './cleanerName.less';

function CleanerName({ fullName, onlyBadge }) {

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

    return (
        <div className="cleaner-name">
            { createBadge() }
            <div className="cleaner-info">
                { !onlyBadge && <div className="name">{ fullName }</div> }
            </div>
        </div>
    );
}

CleanerName.propTypes = {
    fullName: PropTypes.string.isRequired,
    onlyBadge: PropTypes.bool,
};

export default CleanerName;
