import React from 'react';

export default function Image({ className, color }) {
    const icon =
        `<path fill="${color}" d="M-133.9,0H20.3c2,0,3.5,1.6,3.5,3.5c0,0.9-0.4,1.8-1,2.5L6.6,22.9C5.9,23.6,5,24,4,24h-154.1
	c-2,0-3.5-1.6-3.5-3.5c0-0.9,0.4-1.8,1-2.5l16.2-16.9C-135.7,0.4-134.8,0-133.9,0z"/>`;

    return (
        <svg className={ className } xmlns="http://www.w3.org/2000/svg" width="27px" height="27px" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: icon }} />
    );
}
