import React from 'react';
import Modal from 'components/Modal';
import TextField from 'components/TextField';

export default class DiscriptionModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            caption: this.props.caption,
        };
    }

    handleChange(value) {
        this.setState({ caption: value });
    }

    getModalContent() {
        return (
            <div className="modal-content">
                <div className="image">
                    <img className="img" src={ this.props.image.getUrl() }/>
                </div>
                <div className="modal-section">
                    <div className="section-title">Caption (optional)</div>
                    <div className="section-content">
                        <TextField
                            id="caption"
                            value={ this.state.caption }
                            onChange={ (evt) => this.handleChange(evt.target.value) }
                            multiLine
                            counter={ 150 }
                        />
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <Modal
                title="Add Caption (optional)"
                icon="addBox"
                onClose={ () => this.props.onClose() }
                onSubmit={ () => this.props.onSubmit(this.state.caption) }
                content={ this.getModalContent() }
            />
        );
    }
}
