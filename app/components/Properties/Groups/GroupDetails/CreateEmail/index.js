import React from 'react';
import SVG from 'components/SVG';
import ButtonNew from 'components/ButtonNew';
import Tabs from 'components/Tabs';
import Spinner from 'components/Spinner';
import TitleHeader from 'components/TitleHeader';
import TextField from 'components/TextField';
import PageFooter from 'components/PageFooter';
import TagsWithAutocomplete from 'components/TagsWithAutocomplete';
import Select from 'components/Select';
import CopyTemplate from './CopyTemplate';
import TextEditor from 'components/TextEditor';
import SmartLabel from 'components/SmartLabel';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectTemplates, selectAddingTemplate, selectLoadingTemplate } from 'containers/Templates/selectors';
import { addTemplate, editTemplate, fetchTemplate } from 'containers/Templates/actions';
import TemplateModel from 'models/Template';
import { push } from 'react-router-redux';
import { fromJS } from 'immutable';
import './createEmail.less';

export class CreateEmail extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tags: [],
            when: '',
            description: '',
            content: null,
            messageContent: '',
            initContent: '',
            type: 'Email',
            headline: '',
            subject: '',
            prop: '',
            time: '10:00',
            days: '',
            variableToAdd: '',
            template: null,
            copyOpen: false
        };
    }

    componentWillMount() {
        if (this.props.id) {
            const existingTemplate = this.props.templates.filter(t => t.get('id') + '' === this.props.id).first();
            if (existingTemplate) {
                this.populateForm(new TemplateModel(existingTemplate));
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.id && !nextProps.loading) {
            if (nextProps.templates.size) {
                const existingTemplate = nextProps.templates.filter(t => t.get('id') + '' === nextProps.id).first();
                if (existingTemplate) {
                    this.populateForm(new TemplateModel(existingTemplate));
                } else {
                    this.props.fetchTemplate(this.props.id);
                }
            }
        }

        if (this.props.adding === 'adding' && nextProps.adding === '') {
            this.setState({ copyOpen: false });
        }
    }

    onChange(field, value) {
        this.setState({ [field]: value });
        if (field === 'when') {
            this.populateEmail(value);
        }
    }

    addTag(tag) {
        const tags = this.state.tags;
        if (!tags.filter(t => t.get('id') === tag.get('id')).length) {
            tags.push(tag);
        }
        this.setState({ tags: tags });
    }

    deleteTag(tag) {
        const tags = this.state.tags;
        const index = tags.indexOf(tag);
        tags.splice(index, 1);
        this.setState({ tags: tags });
    }

    canSaveTemplate() {
        const content = this.state.type === 'Email' ? this.state.content : this.state.messageContent;
        return (
            this.state.name &&
            //this.state.tags.length > 0 &&
            content
        );
    }

    saveTemplate() {
        alert('Not implemented yet');
        // const content = this.state.type === 'Email' ? this.state.content : this.state.messageContent;
        // const data = {
        //     name: this.state.name,
        //     tags: this.state.tags.map(t => t.get('id')),
        //     description: this.state.description,
        //     content: content,
        //     type: this.state.type,
        //     headline: this.state.headline,
        //     subject: this.state.subject,
        //     id: this.state.id,
        //     prop: this.state.prop,
        // };
        // if (this.state.id) {
        //     this.props.editTemplate(data);
        // } else {
        //     this.props.addTemplate(data);
        // }
    }

    populateForm(model) {
        this.setState({
            name: model.getName(),
            description: model.getDescription(),
            content: model.getType() === 'Email' ? model.getContent() : '',
            initContent: model.getType() === 'Email' ? model.getContent() : null,
            tags: model.getTags(),
            id: model.getId(),
            type: model.getType(),
            messageContent: model.getType() === 'Message' ? model.getContent() : '',
            headline: model.getHeadline(),
            subject: model.getSubject(),
            prop: model.getProp(),
            template: model
        });
    }

    populateEmail() {
        this.setState({
            headline: 'Prefilled text',
            subject: 'Prefilled text',
            content: <p>Prefilled text</p>,
            initContent: <p>Prefilled text</p>,
        });
    }

    insertVariable(variable) {
        const variableToAdd = `{{${variable.name}}}`;
        this.setState({ variableToAdd: variableToAdd });
    }

    duplicateTemplate() {
        this.setState({ copyOpen: true });
    }

    copyTemplate(template) {
        this.props.addTemplate(template);
    }

    getPreview() {
        const when = this.state.when;
        const days = parseInt(this.state.days) > 1 ? this.state.days + ' days' : this.state.days + ' day';
        let preview = 'Send this email {{when}} {{time}} - time zone is based on property location.';
        if (when === 'after booking' || when === 'after cancellation') {
            preview = preview.replace('{{when}}', when + ' confirmed');
            preview = preview.replace('{{time}}', '');
        } else if (when === 'before stay') {
            preview = preview.replace('{{when}}', days + ' or less before check-in');
        } else if (when === 'after stay') {
            preview = preview.replace('{{when}}', days + ' or less after check-out');
        } else if (when === 'during stay') {
            const text = this.state.trigger === 'in' ? 'after check-in' : 'before check-out';
            preview = preview.replace('{{when}}', days + ' or less ' + text);
        }

        preview = preview.replace('{{time}}', 'at ' + this.state.time + 'AM');

        return preview;
    }

    render() {
        const disableSubmit = !this.canSaveTemplate();
        const textMessage = <TextField
            id="text-message"
            multiLine
            value={ this.state.messageContent }
            onChange={ (evt) => this.onChange('messageContent', evt.target.value) }
            placeholder="Click here to type your message"/>;
        const basicSettings = (
            <div className="basic-settings">
                <TextField
                    id="name"
                    label="Template Name"
                    onChange={ (evt) => this.onChange('name', evt.target.value) }
                    defaultValue={ this.state.name }
                />
                <TextField
                    id="desc"
                    label="Description"
                    onChange={ (evt) => this.onChange('description', evt.target.value) }
                    defaultValue={ this.state.description }
                    multiLine
                />
                <Select
                    id="type"
                    label="Type"
                    onChange={ (val) => this.onChange('type', val) }
                    defaultValue={ this.state.type }
                    options={[
                        { name: 'Email', value: 'Email' },
                        { name: 'Message', value: 'Message' },
                    ]}
                />
                <Select
                    id="prop"
                    label="Applicable"
                    defaultValue={ 'group' }
                    disabled
                    options={[
                        { name: this.props.group.getName(), value: 'group' },
                    ]}
                />
                <TagsWithAutocomplete
                    id="tags"
                    label="Tags"
                    onDelete={ (tag) => this.deleteTag(tag) }
                    onChange={ (tag) => this.addTag(tag) }
                    tags={ this.state.tags }
                />
            </div>
        );
        const timeSettings = (
            <div className="time-settings">
                <div className="vj-subsection-header">Day</div>
                <Select
                    id="name"
                    label="Send Before/After..."
                    onChange={ (val) => this.onChange('when', val) }
                    defaultValue={ this.state.when }
                    placeholder="-"
                    options={[
                        { name: 'After booking', value: 'after booking' },
                        { name: 'After cancellation', value: 'after cancellation' },
                        { name: 'Before stay', value: 'before stay' },
                        { name: 'During stay', value: 'during stay' },
                        { name: 'After stay', value: 'after stay' },
                    ]}
                />
                { (this.state.when === 'before stay' || this.state.when === 'after stay') &&
                    <div>
                        <TextField
                            id="days"
                            label="Day"
                            onChange={ (evt) => this.onChange('days', evt.target.value) }
                            value={ this.state.days }
                            addonRight="Days or less"
                            type="number"
                        />
                        <div className="before-check-in">
                            <TextField
                                id="before"
                                disabled
                                value={ this.state.when === 'before stay' ? 'Before' : 'After'  + ' check-in date' }
                            />
                        </div>
                    </div>
                }
                { this.state.when === 'during stay' &&
                    <div>
                        <Select
                            id="trigger"
                            label="Trigger Event"
                            onChange={ (val) => this.onChange('trigger', val) }
                            defaultValue={ this.state.trigger }
                            placeholder="-"
                            options={[
                                { name: 'Check-in date', value: 'in' },
                                { name: 'Check-out date', value: 'out' }
                            ]}
                        />
                        <div className="side-by-side">
                            <div className="left">
                                <TextField
                                    id="n-days"
                                    onChange={ (evt) => this.onChange('days', evt.target.value) }
                                    value={ this.state.days }
                                    addonRight="Days"
                                    type="number"
                                />
                            </div>
                            <div className="right">
                                <TextField
                                    id="before"
                                    disabled
                                    value={ this.state.trigger === 'out' ? 'Before' : 'After' }
                                />
                            </div>
                        </div>
                    </div>
                }
                { this.state.when &&
                    <div>
                        <div className="vj-subsection-header time-header">Time</div>
                        <Select
                            id="time"
                            label="Time"
                            onChange={ (val) => this.onChange('time', val) }
                            defaultValue={ this.state.time }
                            placeholder="-"
                            options={[
                                { name: '10:00AM', value: '10:00' },
                                { name: '11:00AM', value: '11:00' },
                                { name: '12:00AM', value: '12:00' },
                            ]}
                        />
                        <div className="preview">
                            <div className="preview-title">Preview</div>
                            <div className="preview-text">{ this.getPreview() }</div>
                        </div>
                    </div>
                }
            </div>
        );
        return (
            <div className="create-email-wrapper">
                <div className="create-email">
                    { this.props.loading ?
                        <div className="spinner-wrapper"><Spinner/></div>
                        :
                        <div className="email-form">
                            <TitleHeader title="Create Group Auto Email" icon="addBox"/>
                            <div className="email-form-content">
                                <section className="email-info">
                                    <Tabs tabs={[
                                        { title: 'Basic Settings', content: basicSettings },
                                        { title: 'Time Settings', content: timeSettings },
                                    ]}/>
                                    <div className="group-email-info">
                                        <SVG icon="groups" size={ 40 } className="icon"/>
                                        <div>
                                            <div className="title">Group Auto email template</div>
                                            <div className="text">
                                                This template will be created in the all properties of the selected group.
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <section className="email-body">
                                    { this.state.type === 'Message' ?
                                        textMessage
                                        :
                                        <div>
                                            <TextField
                                                id="subject"
                                                placeholder="Subject"
                                                onChange={ (evt) => this.onChange('subject', evt.target.value) }
                                                value={ this.state.subject }
                                            />
                                            <TextField
                                                id="headline"
                                                placeholder="Header (optional)"
                                                onChange={ (evt) => this.onChange('headline', evt.target.value) }
                                                value={ this.state.headline }
                                            />
                                            <div className="editor-wrapper">
                                                <TextEditor
                                                    disableAttachments={ true }
                                                    disableSubmit={ true }
                                                    defaultValue={ this.state.initContent }
                                                    onChange={ (html) => this.setState({ content: html })}
                                                    variableToAdd={ this.state.variableToAdd }
                                                    onVariableInserted={ () => this.setState({ variableToAdd: '' }) }
                                                    withoutVariables
                                                    placeholder=" "/>
                                            </div>
                                            <ButtonNew
                                                onClick={ () => this.setState({ preview: new TemplateModel(fromJS({
                                                    headline: this.state.headline,
                                                    content: this.state.content,
                                                })) }) }
                                                label="Preview"
                                                className="green small preview"/>
                                        </div>
                                    }
                                </section>
                                <section className="smart-label-section">
                                    <SmartLabel onClick={ (varibale) => this.insertVariable(varibale) }/>
                                </section>
                            </div>
                        </div>
                    }
                    { this.state.copyOpen &&
                        <CopyTemplate
                            template={ this.state.template }
                            open={ this.state.copyOpen }
                            error={ this.props.adding === 'error' }
                            onSubmit={ (template) => this.copyTemplate(template) }
                            onClose={ () => this.setState({ copyOpen: false }) }/>
                    }
                </div>
                <PageFooter
                    submitLabel="Create"
                    onCancel={ () => this.props.cancel(this.props.group.getId()) }
                    onSubmit={ () => this.saveTemplate() }
                    submitDisabled={ disableSubmit }
                    secondaryActionLabel={ this.props.subsection === 'create' ? '' : 'Make a Copy' }
                    //onSecondaryAction={ () => this.duplicateTemplate() }
                />
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    templates: makeSelectTemplates(),
    loading: selectLoadingTemplate(),
    adding: selectAddingTemplate()
});

export function mapDispatchToProps(dispatch) {
    return {
        addTemplate: (data) => dispatch(addTemplate(data)),
        editTemplate: (data) => dispatch(editTemplate(data)),
        fetchTemplate: (id) => dispatch(fetchTemplate(id)),
        cancel: (id) => dispatch(push('/properties/groups/' + id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateEmail);
