import React from 'react';
import StatusLabel from 'components/StatusLabel';
import Select from 'components/Select';

export default function StatusSelect({ onChange, onlyStatuses, placeholder, label, small, defaultValue }) {

    const open = <StatusLabel label="Open"/>;
    const pending = <StatusLabel label="Pending"/>;
    const solved = <StatusLabel label="Solved"/>;

    const options = [
        { name: 'All Tickets', value: '' },
        { name: open, value: 'Open' },
        { name: pending, value: 'Pending' },
        { name: solved, value: 'Solved' },
    ];

    return (
        <div className="status-select">
            <Select
                placeholder={ placeholder }
                onChange={ onChange }
                label={ label }
                small={ small }
                defaultValue={ defaultValue }
                options={ onlyStatuses ? options.slice(1) : options }/>
        </div>
    );
}


