import React from 'react';
import Modal from 'components/Modal';
import TextField from 'components/TextField';
import './addGroup.less';

export class AddGroup extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: this.props.group ? this.props.group.getName() : '',
            description: this.props.group ? this.props.group.getDescription() : ''
        };
    }

    onChange(field, value) {
        this.setState({ [field]: value });
    }

    render() {
        const isEditing = !!this.props.group;
        const form = (
            <div>
                { !isEditing &&
                    <div className="info">
                        <div className="title">Create New Group</div>
                    </div>
                }
                <div className="add-group-form">
                    <TextField
                        id="name"
                        label="Group Name"
                        maxLength={ 50 }
                        value={ this.state.name }
                        onChange={ (evt) => this.onChange('name', evt.target.value) }
                    />
                    <TextField
                        id="desc"
                        label="Description"
                        multiLine
                        maxLength={ 200 }
                        value={ this.state.description }
                        onChange={ (evt) => this.onChange('description', evt.target.value) }
                    />
                </div>
            </div>
        );
        return (
            <div className="properties-group-add-group">
                <Modal
                    title={ isEditing ? 'Edit Group' : 'Create Group' }
                    icon={ isEditing ? 'edit' : 'addBox' }
                    content={ form }
                    loading={ this.props.loading }
                    onClose={ this.props.onClose }
                    onSubmit={ () => this.props.onSubmit(this.state) }
                    submitDisabled={ !this.state.name }
                    submitLabel={ isEditing ? 'Save' : 'Create' }
                />
            </div>
        );
    }
}

export default AddGroup;
