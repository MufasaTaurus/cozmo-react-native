import React from 'react';
import ButtonNew from 'components/ButtonNew';
import './job.less';

export class Job extends React.Component {

    render() {
        const { unassigned, job } = this.props;
        return (
            <div className={ 'calendar-job' + (unassigned ? ' unassigned' : '') }>
                { unassigned ?
                    <div className="checkout">
                        <div className="title">Checkout Day</div>
                        <ButtonNew label="Assign" className="small green"/>
                    </div>
                    :
                    <div className="job">
                        <div className="status-badge"/>
                        <div className="details">
                            <div className="status">{ job.getStatus() }</div>
                            <div className="type">{ job.getType() }</div>
                            <div className="vendor">{ job.getAssigneeName() }</div>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

export default Job;
