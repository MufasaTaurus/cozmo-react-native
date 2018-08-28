import React from 'react';
import map from 'lodash/map';

export class ImageUploader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            file: '',
            imagePreviewUrl: ''
        };
        this._handleImageChange = this._handleImageChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
    }

    _handleSubmit(e) {
        e.preventDefault();
    }

    _handleImageChange(e) {
        e.preventDefault();

        map(e.target.files, file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.setState({
                    file: file,
                    imagePreviewUrl: reader.result
                });
                this.props.onImageUploaded(file, reader.result);
            };
            reader.readAsDataURL(file);
        });
    }

    render() {
        return (
            <div style={{ position: 'absolute' }} className="image-uploader">
                <form onSubmit={ this._handleSubmit }>
                    <input
                        type="file"
                        onChange={ this._handleImageChange }
                        accept="image/x-png,image/jpeg,image/png"
                        multiple
                        style={{ opacity: 0, height: 50, width: 150, cursor: 'pointer' }} />
                </form>
            </div>
        );
    }
}

export default ImageUploader;
