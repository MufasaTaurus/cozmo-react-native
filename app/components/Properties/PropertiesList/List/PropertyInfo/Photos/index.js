import React from 'react';
import { fromJS } from 'immutable';
import debounce from 'lodash/debounce';
import isEqual from 'lodash/isEqual';
import Spinner from 'components/Spinner';
import DropPhoto from './DropPhoto/index';
import DescriptionModal from './DescriptionModal/index';
import PropertyModel from 'models/Property';
import TitleHeader from 'components/TitleHeader';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Image from './Image/index';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateNewProperty, addPhoto, deletePhoto, updatePropertyPhotos, orderPropertyPhotos, updatePhoto } from 'containers/Properties/actions';
import { makeSelectSelectedProperty, makeSelectNewProperty, makeSelectUploadedImage, makeSelectUploadingImage } from 'containers/Properties/selectors';
import './photos.less';


export class Photos extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dialogOpen: false,
            image: '',
            index: '',
            caption: '',
            uploadingImages: []
        };
        this.reorderImages = debounce(this.reorderImages.bind(this), 3000);
    }

    componentWillReceiveProps(nextProps) {
        if (isEqual(this.props.uploadedImage, nextProps.uploadedImage)) {
            return;
        }

        if (nextProps.uploadedImage.get('id')) {
            const property = this.props.create ? this.props.newProperty : this.props.property;
            let images = property.get('images');
            images = images.push(fromJS({
                order: nextProps.uploadedImage.get('order'),
                url: nextProps.uploadedImage.get('url'),
                id: nextProps.uploadedImage.get('id')
            }));
            this.setPropertyImage(images);
            const ui = this.state.uploadingImages;
            ui.pop();
            this.setState({ uploadingImages: ui });
        }
    }

    onImageUploaded(file, image) {
        const property = this.props.create ? this.props.newProperty : this.props.property;
        let images = property.get('images');
        const ui = this.state.uploadingImages;
        ui.push(image);
        this.setState({ uploadingImages: ui });
        this.props.addPhoto({
            id: property.get('id'),
            file: file,
            order: images.size
        });
    }

    setPropertyImage(images) {
        if (this.props.create) {
            this.props.updateNewProperty(this.props.newProperty.set('images', images));
        } else {
            this.props.updatePropertyPhotos(images);
        }
    }

    moveImage(dragIndex, hoverIndex) {
        const property = this.props.create ? this.props.newProperty : this.props.property;
        let images = property.get('images');
        images = images.update(dragIndex, (image) => image.set('order', hoverIndex));

        let i = hoverIndex;
        if (hoverIndex < dragIndex) {
            while (i < dragIndex) {
                images = images.update(i, (image) => image.set('order', image.get('order') + 1));
                i++;
            }
        } else {
            while (i > dragIndex) {
                images = images.update(i, (image) => image.set('order', image.get('order') - 1));
                i--;
            }
        }

        images = images.sortBy((img) => img.get('order'));
        this.setPropertyImage(images);
        this.reorderImages(images);
    }

    reorderImages(images) {
        const property = this.props.create ? this.props.newProperty : this.props.property;
        this.props.orderPropertyPhotos({
            id: property.get('id'),
            order: images.map((img) => img.get('id'))
        });
    }

    deleteImage(id, index) {
        const property = this.props.create ? this.props.newProperty : this.props.property;
        let images = property.get('images');
        images = images.delete(index);
        let i = index;
        while (i < images.size) {
            images = images.update(i, (image) => image.set('order', image.get('order') - 1));
            i++;
        }
        this.setPropertyImage(images);
        this.props.deletePhoto({
            id: property.get('id'),
            imageId: id,
        });
    }

    imageClicked(image, index) {
        this.setState({
            image: image,
            dialogOpen: true,
            index: index,
            caption: image.getCaption(),
        });
    }

    closeDialog() {
        this.setState({
            dialogOpen: false,
            image: '',
            index: '',
            caption: '',
        });
    }

    submitDialog(caption) {
        const property = this.props.create ? this.props.newProperty : this.props.property;
        const images = property.get('images');
        this.setPropertyImage(images.update(this.state.index, (i) => i.set('caption', caption)));

        this.props.updatePhoto({
            id: property.get('id'),
            imageId: this.state.image.getId(),
            caption: caption
        });
        this.closeDialog();
    }

    handleDropFiles(files) {
        files.map(f => {
            const reader = new FileReader();
            reader.onloadend = () => {
                this.onImageUploaded(f, reader.result);
            };
            reader.readAsDataURL(f);
        });
    }

    getNumberOfPhotos() {
        const property = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
        return '(' + property.getImages().size + ')';
    }

    render() {
        const property = new PropertyModel(this.props.create ? this.props.newProperty : this.props.property);
        return (
            <section className="photos step">
                <TitleHeader title="Photos" icon="photo" iconSize={ 21 }/>
                <div className="drop-container">
                    <DropPhoto
                        onDrop={ (files) => this.handleDropFiles(files) }
                        onImageUploaded={ (file, image) => this.onImageUploaded(file, image) }
                    />
                </div>
                <div className="card">
                    { this.props.loading && <div className="disabler"/> }
                    <div className="header">
                        <span className="title">All Photos { this.getNumberOfPhotos() }</span>
                        <span className="subtitle"> Click photos to add captions</span>
                    </div>
                    <div className="images-wrapper">
                        <div className="images">
                            { property.getImages().map((image, index) => {
                                return <Image
                                    key={ image.getId() }
                                    id={ image.getId() }
                                    index={ index }
                                    onClick={ () => this.imageClicked(image, index) }
                                    onDelete={ () => this.deleteImage(image.getId(), index) }
                                    moveImage={ (dragIndex, hoverIndex) => this.moveImage(dragIndex, hoverIndex) }
                                    url={ image.getUrl() }/>;
                            }) }
                            {
                                this.state.uploadingImages.map((img, index) => {
                                    return (
                                        <div className="image uploading" key={ index }>
                                            <div
                                                className="img-background"
                                                style={{ backgroundImage: 'url(' + img + ')' }} />
                                            <div className="spinner-wrapper"><Spinner size={ 40 }/></div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
                { this.state.dialogOpen &&
                    <DescriptionModal
                        title="Add Caption (optional)"
                        icon="addBox"
                        image={ this.state.image }
                        caption={ this.state.caption }
                        poperty={ property }
                        onClose={ () => this.closeDialog() }
                        onSubmit={ (caption) => this.submitDialog(caption) }
                    />
                }
            </section>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    property: makeSelectSelectedProperty(),
    newProperty: makeSelectNewProperty(),
    uploadedImage: makeSelectUploadedImage(),
    loading: makeSelectUploadingImage()
});

export function mapDispatchToProps(dispatch) {
    return {
        updateNewProperty: (data) => dispatch(updateNewProperty(data)),
        addPhoto: (data) => dispatch(addPhoto(data)),
        deletePhoto: (data) => dispatch(deletePhoto(data)),
        updatePropertyPhotos: (data) => dispatch(updatePropertyPhotos(data)),
        orderPropertyPhotos: (data) => dispatch(orderPropertyPhotos(data)),
        updatePhoto: (data) => dispatch(updatePhoto(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(DragDropContext(HTML5Backend)(Photos));
