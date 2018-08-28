import React from 'react';
import moment from 'moment';
import ButtonNew from 'components/ButtonNew';
import TextField from 'components/TextField';
import SVG from 'components/SVG';
import './unblocking.less';

export class Unblocking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blocked: true,
            label: props.blocking.get('summary')
        };
    }

    onSubmit() {
        this.props.onSubmit(this.state);
    }

    onDelete() {
        this.props.onDelete(this.props.blocking.get('id'));
    }

    render() {
        const { blocking, onCancel } = this.props;
        return (
            <div className="calendars-create-new-event-unblocking">
                <div className="create-event-header">
                    <div className="create-event-icon"><SVG icon="block"/></div>
                    <div className="create-event-title">Block Dates</div>
                    <div className="create-event-close" onClick={ onCancel }>&times;</div>
                </div>
                <div className="unblocking-content">
                    <div className="vj-subsection-header">Selected Dates</div>
                    <div className="dates">
                        <span className="date">
                            { moment(blocking.getIn(['time_frame', 'lower'])).format('YYYY-MM-DD') }
                        </span>
                        <span className="separator">-</span>
                        <span className="date">
                            { moment(blocking.getIn(['time_frame', 'upper'])).format('YYYY-MM-DD') }
                        </span>
                    </div>
                    <TextField
                        id="label"
                        label="Label"
                        value={ this.state.label }
                        onChange={ (evt) => this.setState({ label: evt.target.value }) }
                    />
                </div>
                <div className="actions">
                    <ButtonNew label="Cancel" onClick={ onCancel } className="ghost"/>
                    <ButtonNew label="Delete" onClick={ () => this.onDelete() } className="ghost red"/>
                    <ButtonNew label="Save" className="save" onClick={ () => this.onSubmit() }/>
                </div>
            </div>
        );
    }
}

export default Unblocking;
