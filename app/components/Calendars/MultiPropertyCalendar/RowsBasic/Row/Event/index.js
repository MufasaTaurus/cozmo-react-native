import React from 'react';
import Tooltip from '../../../../Tooltip';
import BlockingTooltip from '../../../../BlockingTooltip';
import './event.less';

export class Event extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            tooltip: false,
        };
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState.tooltip !== this.state.tooltip;
    }

    toggleTooltip(evt) {
        evt.stopPropagation();
        this.setState({ tooltip: !this.state.tooltip });
    }

    render() {
        const { reservation, blocking, onBlockingClick } = this.props;
        const active = this.state.tooltip;
        const width = this.props.days * 22;
        return (
            <div className={ 'calendar-event-basic' + (active ? ' active' : '') } onClick={ (evt) => this.toggleTooltip(evt) }>
                <div className={ 'event-content'} style={{ width: width }}>
                    { reservation &&
                        <Tooltip
                            reservation={ reservation }
                            visible={ this.state.tooltip }
                            onClose={ () => this.setState({ tooltip: false }) }/>
                    }
                    { blocking &&
                        <BlockingTooltip
                            blocking={ blocking }
                            visible={ this.state.tooltip }
                            onClick={ onBlockingClick }
                            onClose={ () => this.setState({ tooltip: false }) }/>
                    }
                </div>
            </div>
        );
    }
}

Event.defaultProps = {
    onClick: () => {}
};

export default Event;
