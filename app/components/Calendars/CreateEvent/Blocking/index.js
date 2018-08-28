import React from 'react';
import ButtonNew from 'components/ButtonNew';
import TextField from 'components/TextField';
import SVG from 'components/SVG';
import './blocking.less';

export class Blocking extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            blocked: true,
            label: ''
        };
    }

    onSubmit() {
        this.props.onSubmit(this.state);
    }

    render() {
        const { dates } = this.props;
        return (
            <div className="calendars-create-new-event-blocking">
                <div className="create-event-header">
                    <div className="create-event-icon clickable" onClick={ this.props.goBack }><SVG icon="backArrow"/></div>
                    <div className="create-event-title">Block Dates</div>
                </div>
                <div className="blocking-content">
                    <div className="vj-subsection-header">Selected Dates</div>
                    <div className="dates">
                        <span className="date">
                            { dates.from.format('YYYY-MM-DD') }
                        </span>
                        <span className="separator">-</span>
                        <span className="date">
                            { dates.to.format('YYYY-MM-DD') }
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
                    <ButtonNew label="Cancel" onClick={ this.props.onCancel } className="ghost"/>
                    <ButtonNew label="Block" onClick={ () => this.onSubmit() }/>
                </div>
            </div>
        );
    }
}

export default Blocking;
