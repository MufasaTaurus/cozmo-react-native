import React, {PropTypes} from 'react';
import './spinner.less';


function Spinner({ size = 50, visible = true, className = '' }) {

    return (
        <span className={ 'vj-spinner ' + className } dangerouslySetInnerHTML={{ __html: svg(size) }}/>
    );
}

const svg = size => `
<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24">
  <path fill="#54a6e7" d="M12,0V3.5a8.5,8.5,0,0,1,0,17V24A12,12,0,0,0,12,0Z"/>
  <path fill="#6ab4f7" d="M3.5,12A8.5,8.5,0,0,1,12,3.5V0A12,12,0,0,0,12,24V20.5A8.5,8.5,0,0,1,3.5,12Z"/>
  <path fill="#57d0c0" d="M19.43,16.13a8.49,8.49,0,0,1-14.81.07L1.64,18A12,12,0,0,0,22.37,18Z"/>
</svg>
`;

Spinner.propTypes = {
    size: PropTypes.number,
    visible: PropTypes.bool,
    className: PropTypes.string
};

export default Spinner;

