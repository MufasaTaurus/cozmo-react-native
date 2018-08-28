import React, {PropTypes} from 'react';
import './vendorName.less';

function VendorName({ fullName, email, avatar, reversed }) {

    const colors = [
        '#8e97dd',
        '#8edddd',
        '#dd8e8e',
        '#b7dd8e',
        '#dd8eda'
    ];

    const createAvatar = () => {
        const initials = fullName
            .split(' ')
            .map(word => word.substr(0, 1).toUpperCase())
            .join('');

        const firstLetter = initials.charCodeAt(0);
        const secondLetter = initials.length > 1 ? initials.charCodeAt(1) : 0;
        const color = colors[(firstLetter + secondLetter) % 5];

        return <div style={{ background: color }} className="badge">{ initials }</div>;
    };

    return (
        <div className={ 'vendor-name' + (reversed ? ' reversed' : '') }>
            { avatar ? <img className="image" src={ avatar }/> : createAvatar() }
            <div className="vendor-info">
                <div className="full-name">{ fullName }</div>
                <div className="email">{ email }</div>
            </div>
        </div>
    );
}

VendorName.propTypes = {
    fullName: PropTypes.string.isRequired,
    email: PropTypes.string,
    avatar: PropTypes.string,
    reversed: PropTypes.bool
};

export default VendorName;

