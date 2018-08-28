import React from 'react';
import Select from 'components/Select';

export default function TypeSelect({ onChange, onlyTypes, placeholder, label, small, defaultValue }) {

    const options = [
        { name: 'All Types', value: '' },
        { name: 'Question', value: 'Question' },
        { name: 'Incident', value: 'Incident' },
        { name: 'Problem', value: 'Problem' },
        { name: 'Task', value: 'Task' },
    ];

    return (
        <div className="type-select">
            <Select
                label={ label }
                placeholder={ placeholder }
                small={ small }
                onChange={ onChange }
                defaultValue={ defaultValue }
                options={ onlyTypes ? options.slice(1) : options }/>
        </div>
    );
}


