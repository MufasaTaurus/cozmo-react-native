import React from 'react';
import SVG from 'components/SVG';
import './scheduler.less';

export class Scheduler extends React.Component {

    render() {
        const { value } = this.props;

        return (
            <div className={ 'vendors-scheduler' + (value ? ' on' : ' off') }>
                <div className="icon-wrapper"><SVG className="icon" icon="cogwheel" size={ 18 }/></div>
                <div className="value">{ value ? 'ON' : 'OFF'}</div>
            </div>
        );
    }
}

export default Scheduler;
