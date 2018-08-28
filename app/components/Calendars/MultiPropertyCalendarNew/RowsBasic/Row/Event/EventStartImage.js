import React from 'react';

export default function Image({ className, color }) {
    const icon =
        `<path fill="${color}" d="M19.9,0H174c2,0,3.5,1.6,3.5,3.5c0,0.9-0.4,1.8-1,2.5l-16.2,16.9c-0.7,0.7-1.6,1.1-2.6,1.1H3.7
	c-2,0-3.5-1.6-3.5-3.5c0-0.9,0.4-1.8,1-2.5L17.4,1.1C18.1,0.4,19,0,19.9,0z"/>`;

    return (
        <svg className={ className } xmlns="http://www.w3.org/2000/svg" width="27px" height="27px" viewBox="0 0 24 24" dangerouslySetInnerHTML={{ __html: icon }} />
    );
}
