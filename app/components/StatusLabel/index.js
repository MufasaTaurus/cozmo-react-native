import React, { PropTypes } from 'react';
import './statusLabel.less';

export class StatusLabel extends React.Component {

    constructor(props) {
        super(props);
        this.colors = {
            success: { b: '#D5ECFE', f: '#87C5F6' },
            fail: { b: '#FCDAD9', f: '#F8AAA7' },
            open: { b: '#ffdabd', f: '#ff6f00' },
            unpaid: { b: '#ffdabd', f: '#ff6f00' },
            pending: { b: '#cde6f9', f: '#64b5f6' },
            paid: { b: '#cde6f9', f: '#64b5f6' },
            syncing: { b: '#cde6f9', f: '#64b5f6' },
            solved: { b: '#e0e0e0', f: '#979797' },
            'not started': { b: '#e0e0e0', f: '#979797' },
            reserved: { b: '#CEF1ED', f: '#3B9188' },
            complete: { b: '#CEF1ED', f: '#3B9188' },
            completed: { b: '#CEF1ED', f: '#3B9188' },
            synced: { b: '#CEF1ED', f: '#3B9188' },
            default: { b: '#e0e0e0', f: '#979797' },
        };
    }

    render() {
        const key = this.props.label.toLowerCase();
        const background = this.colors[key] ? this.colors[key].b : this.colors.default.b;
        const color = this.colors[key] ? this.colors[key].f : this.colors.default.f;
        const style = {
            background: background,
            color: color,
            borderColor:color
        };
        return (
            <div className="status-label" style={ style }>
                { this.props.label }
            </div>
        );
    }
}

StatusLabel.propTypes = {
    label: PropTypes.string
};

export default StatusLabel;
