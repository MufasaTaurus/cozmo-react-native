import React from 'react';
import SVG from 'components/SVG';
import ButtonNew from 'components/ButtonNew';
import './chooseEvent.less';

export class ChooseEvent extends React.Component {

    render() {
        const { chooseEvent, onCancel } = this.props;
        return (
            <div className="calendars-create-new-event-choose-event">
                <div className="create-event-header">
                    <div className="create-event-icon"><SVG icon="addBox"/></div>
                    <div className="create-event-title">Create New Event</div>
                    <div className="create-event-close" onClick={ onCancel }>&times;</div>
                </div>
                <div className="choose-event-content">
                    <div className="vj-subsection-header">Choose Event</div>
                    <div className="event-types">
                        {/*<div className="event"*/}
                             {/*onClick={ () => chooseEvent('inquiry') }*/}
                        {/*>*/}
                            {/*<SVG className="event-icon" icon="check" size="26"/> New Inquiry*/}
                        {/*</div>*/}
                        {/*<div className="event"*/}
                             {/*onClick={ () => chooseEvent('reservation') }*/}
                        {/*>*/}
                            {/*<SVG className="event-icon" icon="check" size="26"/> New Reservation*/}
                        {/*</div>*/}
                        <div className="event"
                             onClick={ () => chooseEvent('blocking') }
                        >
                            <SVG className="event-icon" icon="check" size="26"/> Block Dates
                        </div>
                    </div>
                </div>
                <div className="actions">
                    <ButtonNew label="Cancel" onClick={ this.props.onCancel } className="ghost"/>
                </div>
            </div>
        );
    }
}

export default ChooseEvent;
