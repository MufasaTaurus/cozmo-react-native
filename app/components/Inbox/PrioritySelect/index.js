import React from 'react';
import Select from 'components/Select';
import './prioritySelect.less';

export default function PrioritySelect({ onChange, onlyPriorities, placeholder, label, small, defaultValue }) {

    const pUrgent = <span><span className="priority urgent"></span> Urgent</span>;
    const pHigh = <span><span className="priority high"></span> High</span>;
    const pMedium = <span><span className="priority medium"></span> Medium</span>;
    const pLow = <span><span className="priority low"></span> Low</span>;

    const options = [
        { name: 'All Priorities', value: '' },
        { name: pUrgent, value: 4 },
        { name: pHigh, value: 3 },
        { name: pMedium, value: 2 },
        { name: pLow, value: 1 },
    ];

    return (
        <div className="priority-select">
            <Select
                placeholder={ placeholder }
                onChange={ onChange }
                label={ label }
                small={ small }
                defaultValue={ defaultValue }
                options={ onlyPriorities ? options.slice(1) : options }/>
        </div>
    );
}


