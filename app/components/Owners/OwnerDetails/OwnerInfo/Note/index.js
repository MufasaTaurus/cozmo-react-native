import React from 'react';
import ButtonNew from 'components/ButtonNew';
import TextField from 'components/TextField';
import SVG from 'components/SVG';
import './note.less';

export class Note extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            note: props.owner.getNote()
        };
    }

    submitForm() {
        this.setState({ editMode: false });
        //this.props.updateOwner(this.state);
    }

    render() {
        return (
            <div className="owner-details-note">
                <div className="step-header">
                    <SVG className="step-header-icon" icon="assignment"/>
                    <span>Note</span>
                    { !this.state.editMode &&
                        <SVG className="step-header-icon edit" icon="edit" onClick={ () => this.setState({ editMode: true })}/>
                    }
                </div>
                { this.state.editMode ?
                    <div className="note-edit">
                        <TextField
                            id="note"
                            multiLine
                            rows={ 16 }
                            value={ this.state.note }
                            onChange={ (evt) => this.setState({ note: evt.target.value }) }
                        />
                        <div className="submit">
                            <ButtonNew
                                label="Save"
                                className="small green"
                                onClick={ () => this.submitForm() }
                            />
                        </div>
                    </div>
                    :
                    <div className="note-text">
                        { !this.state.note && <div className="empty-state">No Note</div> }
                        { this.state.note.split('\n').map((p, index) => <div key={ index }>{ p }</div>) }
                    </div>
                }
            </div>
        );
    }
}

export default Note;

