import React from 'react';
import Immutable from 'immutable';
import {Editor, EditorState, CompositeDecorator, RichUtils, DefaultDraftBlockRenderMap, Modifier} from 'draft-js';
import {stateToHTML} from 'draft-js-export-html';
import {stateFromHTML} from 'draft-js-import-html';
import Dialog from 'material-ui/Dialog';
import SVG from 'components/SVG';
import Variables from 'components/Variables';
import Controls from './Controls';
import Attachments from './Attachments';
import { replaceVariables } from 'utils/variables';
import 'draft-js/dist/Draft.css';
import './conversationEditor.less';


export class ConversationEditor extends React.Component {

    constructor(props) {
        super(props);
        this.decorator = new CompositeDecorator([{ strategy: findLinkEntities, component: Link }]);
        const initState = stateFromHTML(this.props.defaultValue || '');
        this.state = {
            editorState: EditorState.createWithContent(initState, this.decorator),
            fullScreen: false,
            attachments: [],
            variableToggleString: '{',
            variablesOpen: false,
            variablesQuery: '',
            variablesPosition: { top: 0, left: 0 }
        };
        this.onChange = (editorState) => {
            this.setState({ editorState });
            if (this.props.onChange) {
                let content = '';
                if (editorState.getCurrentContent().hasText()) {
                    content = stateToHTML(editorState.getCurrentContent());
                }
                this.props.onChange(content);
            }
        };
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
        this.toggleVariables = this.toggleVariables.bind(this);
        this.toggleBlockType = this.toggleBlockType.bind(this);
        this.toggleInlineStyle = this.toggleInlineStyle.bind(this);
        this.onTab = this.onTab.bind(this);
        this.insertIcon = this.insertIcon.bind(this);
        this.toggleFullScreen = this.toggleFullScreen.bind(this);
        this.onFileUploaded = this.onFileUploaded.bind(this);
        this.removeAttachment = this.removeAttachment.bind(this);
        this.insertLink = this.insertLink.bind(this);
        this.insertVariable = this.insertVariable.bind(this);
        this.insertTemplate = this.insertTemplate.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.shouldResetContent) {
            this.onChange(EditorState.createEmpty(this.decorator));
            this.setState({ attachments: [] });
        }
    }

    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command);
        if (command === 'backspace') {
            this.toggleVariables('');
        }
        if (newState) {
            this.onChange(newState);
            return 'handled';
        }
        return 'not-handled';
    }

    onTab(e) {
        this.onChange(RichUtils.onTab(e, this.state.editorState, 4));
    }

    toggleBlockType(blockType) {
        this.onChange(
            RichUtils.toggleBlockType(
                this.state.editorState,
                blockType
            )
        );
    }

    toggleInlineStyle(inlineStyle) {
        this.onChange(
            RichUtils.toggleInlineStyle(
                this.state.editorState,
                inlineStyle
            )
        );
    }

    insertIcon(icon) {
        const icons = {
            veryHappy:'😀',
            happy: '🙂',
            neutral: '😐',
            sad: '😟',
            verySad: '😩'
        };
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const contentState = editorState.getCurrentContent();
        const ncs = Modifier.insertText(contentState, selection, icons[icon]);
        const es = EditorState.push(editorState, ncs, 'insert-fragment');
        this.onChange(es);
    }

    insertVariable(variable) {
        const editorState = this.state.editorState;
        const selection = editorState.getSelection();
        const key = selection.getStartKey();
        const blockMap = editorState.getCurrentContent().getBlockMap();
        const block = blockMap.get(key);

        const content = block.getText().split('{');
        let numberOfCharacters = 0;
        if (content.length > 1) {
            numberOfCharacters = content[content.length - 1].length + 1;

            if (content.length > 2) {
                numberOfCharacters++;
            }
        }
        const selectionToReplace = selection.merge({
            anchorOffset: selection.getAnchorOffset() - numberOfCharacters,
            hasFocus: true
        });
        const ncs = Modifier.replaceText(editorState.getCurrentContent(), selectionToReplace, variable + ' ');
        this.onChange(EditorState.push(editorState, ncs, 'insert-variable'));
        this.setState({
            variablesOpen: false,
            variablesQuery: ''
        });
    }

    insertTemplate(tpl) {
        const tplContentState = stateFromHTML(replaceVariables(tpl.getContent(), this.props.reservation, this.props.username));
        const es = EditorState.push(this.state.editorState, tplContentState, 'replace-state');
        this.onChange(es);
    }

    toggleVariables(str) {
        if (str === this.state.variableToggleString) {
            let cursorPosition = window.getSelection().getRangeAt(0).getBoundingClientRect();
            const parentPosition = document.querySelector('.text-editor').getBoundingClientRect();
            if (cursorPosition.top === 0) {
                cursorPosition = document.querySelector('div[data-block=true]:last-child').getBoundingClientRect();
            }
            this.setState({
                variablesPosition: {
                    top: cursorPosition.top - parentPosition.top + 30,
                    left: cursorPosition.left - parentPosition.left
                },
                variablesOpen: true
            });
        } else if (str === '}') {
            this.setState({
                variablesOpen: false,
                variablesQuery: ''
            });
        } else if (this.state.variablesOpen) {
            const currentText = this.state.editorState.getCurrentContent().getLastBlock().getText();
            let text;
            if (str) {
                text = currentText + str;
            } else {
                text = currentText.substr(0, currentText.length - 1);
            }
            const splitText = text.split('$');
            let variable = splitText[splitText.length - 1];
            variable = variable.replace('{', '');
            variable = variable.trim();
            this.setState({ variablesQuery: variable });
        }
    }

    toggleFullScreen() {
        this.setState({ fullScreen: !this.state.fullScreen });
    }

    insertLink(url, urlName) {
        let editorState = this.state.editorState;

        // add space
        let contentState = Modifier.insertText(editorState.getCurrentContent(), editorState.getSelection(), ' ');
        editorState = EditorState.push(editorState, contentState, 'insert-fragment');

        // add link
        const entityKey = editorState
            .getCurrentContent()
            .createEntity('LINK', 'MUTABLE', { url: url, target: '_blank' })
            .getLastCreatedEntityKey();

        contentState = Modifier.replaceText(
            editorState.getCurrentContent(),
            editorState.getSelection(),
            urlName,
            editorState.getCurrentInlineStyle(),
            entityKey
        );

        editorState = EditorState.push(editorState, contentState, 'insert-characters');

        // add space
        const selection = editorState.getSelection().merge({
            anchorOffset: editorState.getSelection().get('anchorOffset') + urlName.length,
            focusOffset: editorState.getSelection().get('anchorOffset') + urlName.length,
        });
        contentState = Modifier.insertText(editorState.getCurrentContent(), selection, ' ');
        editorState = EditorState.push(editorState, contentState, 'insert-characters');
        this.onChange(editorState);
    }

    onFileUploaded(file, src) {
        if (file.size > 5000000) {
            this.props.onError({ message: 'The file is too big. Max file size is 5MB' });
            return;
        }
        const attachments = this.state.attachments;
        attachments.push({ file: file, src: src });
        this.setState({
            attachments: attachments
        });
    }

    removeAttachment(index) {
        const attachments = this.state.attachments;
        attachments.splice(index, 1);
        this.setState({
            attachments: attachments
        });
    }

    render() {
        const blockRenderMap = Immutable.Map({
            'align-right': {
                element: 'div',
                wrapper: <div style={{ textAlign: 'right' }}/>
            },
            'align-left': {
                element: 'div',
                wrapper: <div style={{ textAlign: 'left' }}/>
            },
            'align-center': {
                element: 'div',
                wrapper: <div style={{ textAlign: 'center' }}/>
            },
            'align-justify': {
                element: 'div',
                wrapper: <div style={{ textAlign: 'justify' }}/>
            }
        });

        const editorWithControls =
            <div>
                <Variables
                    style={ this.state.variablesPosition }
                    query={ this.state.variablesQuery }
                    onSelect={ this.insertVariable }
                    show={ this.state.variablesOpen }/>
                <Editor
                    editorState={ this.state.editorState }
                    handleKeyCommand={ this.handleKeyCommand }
                    handleBeforeInput={ this.toggleVariables }
                    placeholder={ this.props.placeholder || 'Reply' }
                    onTab={ this.onTab }
                    spellCheck={ true }
                    blockRenderMap={ DefaultDraftBlockRenderMap.merge(blockRenderMap) }
                    onChange={ this.onChange } />
                <Attachments
                    onRemove={ this.removeAttachment }
                    attachments={ this.state.attachments }/>
                <Controls
                    onToggleBlock={ this.toggleBlockType }
                    onToggleInline={ this.toggleInlineStyle }
                    insertIcon={ this.insertIcon }
                    insertLink={ this.insertLink }
                    insertVariable={ this.insertVariable }
                    insertTemplate={ this.insertTemplate }
                    onChange={ this.onChange }
                    toggleFullScreen={ this.toggleFullScreen }
                    disableAttachments={ this.props.disableAttachments }
                    disableSubmit={ this.props.disableSubmit }
                    submitLabel={ this.props.submitLabel || 'Send' }
                    onSubmit={ () => this.props.onSubmit(stateToHTML(this.state.editorState.getCurrentContent()), this.state.attachments) }
                    onFileUploaded={ this.onFileUploaded }
                    disabledUpload={ this.state.attachments.length > 4 }
                    editorState={ this.state.editorState }/>
            </div>;

        const dialogWithEditor =
            <Dialog className="full-screen-text-editor"
                    modal={ true }
                    open={ this.state.fullScreen }
            >
                <div className="header">
                    <span className="back-arrow" onClick={ this.toggleFullScreen }>
                        <SVG icon="backArrow" />
                    </span>
                    Reservation message
                </div>
                <div className={ 'editor-wrapper' + (this.state.attachments.length ? ' has-attachments' : '') }>
                    { editorWithControls }
                </div>
            </Dialog>;
        return (
            <div className={ 'conversation-editor' + (this.props.isNote ? ' note' : '') }>
                { this.state.fullScreen ? dialogWithEditor : editorWithControls }
            </div>
        );
    }
}

const findLinkEntities = (contentBlock, callback, contentState) => {
    contentBlock.findEntityRanges(
        (character) => {
            const entityKey = character.getEntity();
            return (
                entityKey !== null &&
                contentState.getEntity(entityKey).getType() === 'LINK'
            );
        },
        callback
    );
};

const Link = (props) => {
    const { url } = props.contentState.getEntity(props.entityKey).getData();
    return (
        <a href={ url } style={{ textDecoration: 'underline', color: '#45A8E4' }}>
            {props.children}
        </a>
    );
};

export default ConversationEditor;
