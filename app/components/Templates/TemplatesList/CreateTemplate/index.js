import React from 'react';
import SVG from 'components/SVG';
import Breadcrumbs from 'components/Breadcrumbs';
import ButtonNew from 'components/ButtonNew';
import ButtonGroup from 'components/ButtonGroup';
import Spinner from 'components/Spinner';
import TextField from 'components/TextField';
import TagsWithAutocomplete from 'components/TagsWithAutocomplete';
import PropertyPickerSmall from 'components/PropertyPickerSmall';
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
import './createTemplate.less';

export class CreateTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            tags: [],
            tagsText: '',
            tagsPadding: 0,
            description: '',
            content: null,
            messageContent: '',
            initContent: '',
            type: 'Email',
            headline: '',
            subject: '',
            prop: '',
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
    }

    onChangeTagsText(value) {
        this.setState({ tagsText: value });
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
            this.state.tags.length > 0 &&
            content
        );
    }

    saveTemplate() {
        const content = this.state.type === 'Email' ? this.state.content : this.state.messageContent;
        const data = {
            name: this.state.name,
            tags: this.state.tags.map(t => t.get('id')),
            description: this.state.description,
            content: content,
            type: this.state.type,
            headline: this.state.headline,
            subject: this.state.subject,
            id: this.state.id,
            prop: this.state.prop,
        };
        if (this.state.id) {
            this.props.editTemplate(data);
        } else {
            this.props.addTemplate(data);
        }
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

    render() {
        const disableSubmit = !this.canSaveTemplate();
        const textMessage = <TextField
            id="text-message"
            multiLine
            value={ this.state.messageContent }
            onChange={ (evt) => this.onChange('messageContent', evt.target.value) }
            placeholder="Click here to type your message"/>;
        return (
            <div className="create-template">
                <Breadcrumbs section={ 'Templates' } subsection={[{ title: 'Create new template' }]} />
                { this.props.loading ?
                    <div className="spinner-wrapper"><Spinner/></div>
                    :
                    <div className="content">
                        <section className="details-section">
                            <div className="template-details">
                                <div className="templates-details-header">
                                    <div>
                                        <SVG className="header-icon" icon="quilt"/>
                                        <span>Template Details</span>
                                    </div>
                                    <div className="actions">
                                        <ButtonNew label="Cancel" onClick={ this.props.cancel } className="small blue ghost"/>
                                        <ButtonNew label="Save" onClick={ this.saveTemplate.bind(this) } disabled={ disableSubmit } className="small blue"/>
                                        { this.props.id &&
                                        <ButtonGroup buttons={[
                                            { icon: 'copy', onClick: () => this.duplicateTemplate(), tip: 'Duplicate' }
                                        ]}/>
                                        }
                                    </div>
                                </div>
                                <div className="templates-details-content">
                                    <div className="section-left-side">
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
                                        <PropertyPickerSmall
                                            onSelect={ (property) => this.onChange('prop', property.get('id')) }
                                            label="Applicable to"
                                            defaultValue={ this.state.prop }/>
                                        <TagsWithAutocomplete
                                            id="tags"
                                            label="Tags"
                                            onDelete={ (tag) => this.deleteTag(tag) }
                                            onChange={ (tag) => this.addTag(tag) }
                                            tags={ this.state.tags }
                                        />
                                    </div>
                                    <div className="section-right-side">
                                        { this.state.type === 'Message' ?
                                            textMessage
                                            :
                                            <div>
                                                <TextField
                                                    id="subject"
                                                    placeholder="Email Subject"
                                                    onChange={ (evt) => this.onChange('subject', evt.target.value) }
                                                    defaultValue={ this.state.subject }
                                                />
                                                <TextField
                                                    id="headline"
                                                    placeholder="Headline (optional)"
                                                    onChange={ (evt) => this.onChange('headline', evt.target.value) }
                                                    defaultValue={ this.state.headline }
                                                />
                                                <div className="editor-wrapper">
                                                    <TextEditor
                                                        disableAttachments={ true }
                                                        disableSubmit={ true }
                                                        defaultValue={ this.state.initContent }
                                                        onChange={ (html) => this.setState({ content: html })}
                                                        variableToAdd={ this.state.variableToAdd }
                                                        onVariableInserted={ () => this.setState({ variableToAdd: '' }) }
                                                        placeholder="Click here to type your email"/>
                                                </div>
                                            </div>
                                        }
                                    </div>
                                </div>
                            </div>
                        </section>
                        <section className="labels-section">
                            <SmartLabel onClick={ (varibale) => this.insertVariable(varibale) }/>
                        </section>
                    </div>
                }
                { this.state.copyOpen &&
                    <CopyTemplate
                        template={ this.state.template }
                        open={ this.state.copyOpen }
                        error={ this.props.adding === 'error' }
                        onSubmit={ (template) => this.copyTemplate(template) }
                        onClose={ () => this.setState({ copyOpen: false })}/>
                }
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
        cancel: () => dispatch(push('/templates')),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateTemplate);
