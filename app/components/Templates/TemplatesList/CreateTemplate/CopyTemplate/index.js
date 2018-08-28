import React from 'react';
import Modal from 'components/Modal';
import TextField from 'components/TextField';
import PropertyPickerSmall from 'components/PropertyPickerSmall';
import Select from 'components/Select';
import './copyTemplate.less';

export class CopyTemplate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: props.template.getName() + ' copy',
            description: props.template.getDescription(),
            type: props.template.getType(),
            prop: props.template.getProp()
        };
    }

    onChange(field, value) {
        this.setState({ [field]: value });
    }

    canSubmit() {
        return (
            this.state.name &&
            this.state.description
        );
    }

    onSubmit() {
        this.props.onSubmit(
            {
                name: this.state.name,
                description: this.state.description,
                tags: this.props.template.getTagsIds(),
                content: this.props.template.getContent(),
                type: this.state.type,
                headline: this.props.template.getHeadline(),
                subject: this.props.template.getSubject(),
                prop: this.state.prop,
            }
        );
    }

    render() {
        const form = (
            <div className="copy-template-form">
                <div className="modal-section">
                    <div className="section-title">Template Details</div>
                    <div className="section-content">
                        <div>
                            <TextField
                                id="name"
                                label="Template Name"
                                hasError={ this.props.error ? 'You cant\'t use the same template name' : '' }
                                value={ this.state.name }
                                onChange={ (evt) => this.onChange('name', evt.target.value) }
                            />
                            <TextField
                                id="desc"
                                multiLine
                                label="Description"
                                value={ this.state.description }
                                onChange={ (evt) => this.onChange('description', evt.target.value) }
                            />
                            <div className="side-by-side">
                                <div className="type-selection">
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
                                </div>
                                <div className="applicable-selection">
                                    <PropertyPickerSmall
                                        onSelect={ (property) => this.onChange('prop', property.get('id')) }
                                        label="Applicable to"
                                        defaultValue={ this.state.prop }/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
        const canSubmit = this.canSubmit();
        return (
            <div className="copy-template">
                { this.props.open &&
                    <Modal
                        title="Make a Copy"
                        icon="copy"
                        content={ form }
                        submitDisabled={ !canSubmit }
                        onClose={ this.props.onClose }
                        onSubmit={ () => this.onSubmit() }
                    />
                }
            </div>
        );
    }
}

export default CopyTemplate;
