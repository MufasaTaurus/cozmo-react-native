import React from 'react';
import SVG from 'components/SVG';
import Variables from 'components/Variables';
import TemplatePicker from 'components/TemplatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Popup from './Popup';
import {REGEXP_URL} from 'utils/const';


export class Controls extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            facesOpen: false,
            textOpen: false,
            linkOpen: false,
            variablesOpen: false,
            url: '',
            urlName: ''
        };

        this.toggleFaces = this.toggleFaces.bind(this);
        this.toggleText = this.toggleText.bind(this);
        this.toggleVariables = this.toggleVariables.bind(this);
        this.toggleLink = this.toggleLink.bind(this);
        this.toggleTemplates = this.toggleTemplates.bind(this);
        this.insertLink = this.insertLink.bind(this);
        this.closeDialog = this.closeDialog.bind(this);
        this.onFileUpload = this.onFileUpload.bind(this);
        this.insertVariable = this.insertVariable.bind(this);
        this.insertTemplate = this.insertTemplate.bind(this);

        this.inlineStyles = [
            { label: 'Bold', style: 'BOLD', icon: 'bold', onToggle: (props) => this.props.onToggleInline(props) },
            { label: 'Italic', style: 'ITALIC', icon: 'italic', onToggle: (props) => this.props.onToggleInline(props) },
            { label: 'Underline', style: 'UNDERLINE', icon: 'underline', onToggle: (props) => this.props.onToggleInline(props) },
        ];
        this.blockTypes = [
            { label: 'H1', style: 'header-one', icon: 'text' },
            { label: 'H2', style: 'header-two', icon: 'text' },
            { label: 'H3', style: 'header-three', icon: 'text' },
            { label: 'H4', style: 'header-four', icon: 'text' },
            { label: 'H5', style: 'header-five', icon: 'text' },
            { label: 'H6', style: 'header-six', icon: 'text' },
            { label: 'Blockquote', style: 'blockquote', icon: 'text' },
            { label: 'UL', style: 'unordered-list-item', icon: 'bulletList' },
            { label: 'OL', style: 'ordered-list-item', icon: 'orderedList' },
            { label: 'Code Block', style: 'code-block', icon: 'text' },
        ];
        this.link = [
            { label: 'Link', style: 'LINK', icon: 'link', onToggle: this.toggleLink },
        ];
        this.lists = [
            { label: 'UL', style: 'unordered-list-item', icon: 'bulletList', onToggle: (props) => this.props.onToggleBlock(props) },
            { label: 'OL', style: 'ordered-list-item', icon: 'orderedList', onToggle: (props) => this.props.onToggleBlock(props) },
        ];
        this.alignments = [
            { label: 'Left', style: 'align-left', icon: 'alignLeft', onToggle: (props) => this.props.onToggleBlock(props) },
            { label: 'Right', style: 'align-right', icon: 'alignRight', onToggle: (props) => this.props.onToggleBlock(props) },
            { label: 'Center', style: 'align-center', icon: 'alignCenter', onToggle: (props) => this.props.onToggleBlock(props) },
            { label: 'Justify', style: 'align-justify', icon: 'alignJustify', onToggle: (props) => this.props.onToggleBlock(props) }
        ];
        this.faces = [
            { icon: 'veryHappy', onToggle: () => this.props.insertIcon('veryHappy')},
            { icon: 'happy', onToggle: () => this.props.insertIcon('happy') },
            { icon: 'neutral', onToggle: () => this.props.insertIcon('neutral') },
            { icon: 'sad', onToggle: () => this.props.insertIcon('sad') },
            { icon: 'verySad', onToggle: () => this.props.insertIcon('verySad') }
        ];
    }

    toggleFaces() {
        this.setState({
            facesOpen: !this.state.facesOpen,
            textOpen: false,
            variablesOpen: false
        });
    }

    toggleText() {
        this.setState({
            facesOpen: false,
            variablesOpen: false,
            textOpen: !this.state.textOpen
        });
    }

    toggleVariables() {
        this.setState({
            facesOpen: false,
            textOpen: false,
            variablesOpen: !this.state.variablesOpen,
        });
    }

    toggleLink() {
        this.setState({ linkOpen: !this.state.linkOpen });
    }

    toggleTemplates() {
        this.setState({ templatesOpen: !this.state.templatesOpen });
    }

    onFileUpload(e) {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];
        reader.onloadend = () => {
            this.props.onFileUploaded(file, reader.result);
        };

        reader.readAsDataURL(file);
    }

    setNewValue(field, value) {
        this.setState({ [field]: value });
    }

    insertLink() {
        this.props.insertLink(this.state.url, this.state.urlName ? this.state.urlName : this.state.url);
        this.closeDialog();
    }

    insertVariable(variable) {
        this.props.insertVariable(variable);
        this.setState({ variablesOpen: false });
    }

    insertTemplate(tpl) {
        this.props.insertTemplate(tpl);
        this.setState({ templatesOpen: false });
    }

    closeDialog() {
        this.setState({
            linkOpen: false,
            url: '',
            urlName: ''
        });
    }

    render() {
        return (
            <div className="text-editor-controls">
                <div className="left-side">
                    <span className="option">
                        { this.state.textOpen ?
                            <span className="popup-wrapper">
                                <Popup
                                    editorState={ this.props.editorState }
                                    elements={[this.inlineStyles, this.lists, this.alignments, this.link]} />
                            </span> : '' }
                        <span onClick={ this.toggleText }><SVG className="option-icon" icon={ 'text' }/></span>
                    </span>
                    { this.props.disableAttachments ? '' :
                        <span className="option">
                        { this.props.disabledUpload ? '' :
                            <form style={{ height: 25, width: 25, overflow: 'hidden' }}>
                                <input
                                    type="file"
                                    onChange={ this.onFileUpload }
                                    accept="image/x-png,image/jpeg,image/png,application/x-pdf,application/pdf,image/gif"
                                    style={{ opacity: 0, height: 25, width: 25, cursor: 'pointer' }} />
                            </form>
                        }
                            <SVG className={ 'option-icon attachment' + (this.props.disabledUpload ? ' disabled' : '') } icon={ 'attachment' }/>
                    </span>
                    }
                    <span className="option" onClick={ this.toggleFaces }>
                        { this.state.facesOpen ?
                            <span className="popup-wrapper">
                                <Popup
                                    editorState={ this.props.editorState }
                                    elements={[this.faces]} />
                            </span> : '' }
                        <SVG className="option-icon" icon={ 'happy' }/>
                    </span>
                    <span className="option">
                        <Variables show={ this.state.variablesOpen } onSelect={ this.insertVariable } style={{ bottom: 0 }}/>
                        <span onClick={ this.toggleVariables }><SVG className="option-icon" icon={ 'addCircle' }/></span>
                    </span>
                </div>
                { this.props.disableSubmit ? '' :
                    <div className="right-side">
                        <span className="option">
                            <TemplatePicker show={ this.state.templatesOpen } onSelect={ this.insertTemplate } style={{ bottom: 0, right: 0}}/>
                            <span onClick={ this.toggleTemplates }><SVG className="option-icon" icon={ 'file' }/></span>
                        </span>
                        <span className="option" onClick={ this.props.toggleFullScreen }>
                        <SVG className="option-icon" icon={ 'fullscreen' }/>
                    </span>
                        <span>
                        <RaisedButton
                            label="Send"
                            disabled={ !this.props.editorState.getCurrentContent().hasText() }
                            onClick={ this.props.onSubmit }
                            primary={ true }
                            style={{ margin: '-10px 0 -10px 10px' }} />
                    </span>
                    </div>
                }
                <Dialog
                    title="Add a link"
                    actions={[
                        <FlatButton
                            label="Cancel"
                            primary={ true }
                            onTouchTap={ this.closeDialog }
                            style={{ marginRight: 12 }}
                        />,
                        <RaisedButton
                            label="Add"
                            disabled={ !REGEXP_URL.test(this.state.url) }
                            onClick={ this.insertLink }
                            primary={ true }/>
                    ]}
                    modal={ false }
                    open={ this.state.linkOpen }
                    onRequestClose={ this.toggleLink }
                >
                    <form>
                        <TextField
                            onChange={ (evt) => this.setNewValue('urlName', evt.target.value) }
                            fullWidth={ true }
                            floatingLabelText="Text to display"
                            name="text"/>
                        <TextField
                            onChange={ (evt) => this.setNewValue('url', evt.target.value) }
                            fullWidth={ true }
                            floatingLabelText="URL address"
                            name="url"/>
                    </form>
                </Dialog>
            </div>
        );
    }
}

export default Controls;

