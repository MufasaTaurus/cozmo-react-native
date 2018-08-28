import React, { PropTypes } from 'react';
import './segmentedButton.less';

export class SegmentedButton extends React.Component {

    onClick (value) {
        if (this.props.onClick && this.props.value !== value) {
            this.props.onClick(value);
        }
    }

    render() {
        const { segments, label, disabled, value } = this.props;
        return (
            <div className="segmented-button">
                { label && <span className="segmented-button-label">{ label }</span> }
                <div className={ 'segmented-button-segments' + (disabled ? ' disabled' : '') }>
                    { segments.map((b, index) => {
                        const active = value === b.value;
                        const activeClass = ' active ' + (b.activeClass ? b.activeClass : '');
                        return (
                            <div
                                key={ index }
                                className={ 'segment' + (active ? activeClass : '') }
                                onClick={ () => this.onClick(b.value) }
                            >
                                <span>{ b.label }</span>
                            </div>
                        );
                    }) }
                </div>
            </div>

        );
    }
}

SegmentedButton.propTypes = {
    segments: PropTypes.array.isRequired,
    value: PropTypes.any,
    label: PropTypes.string,
    onClick: PropTypes.func,
};

export default SegmentedButton;
