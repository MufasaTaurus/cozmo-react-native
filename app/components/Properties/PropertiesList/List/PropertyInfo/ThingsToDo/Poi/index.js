import React from 'react';
import Modal from 'components/Modal';
import TextField from 'components/TextField';
import SVG from 'components/SVG';

export class Poi extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            descField: '',
            savedDesc: this.props.desc,
            descOpen: false,
        };
    }

    getPOIIcon(category) {
        switch (category) {
            case 'restaurants':
                return 'restaurant';
            case 'outdoor':
                return 'sun';
            case 'museums':
                return 'museum';
            case 'for_kids':
                return 'kids';
            case 'nightlife':
                return 'wineGlass';
            case 'groceries':
                return 'shopping';
            case 'entertainment':
                return 'ticket';
            case 'landmarks':
                return 'pin';
            default:
                return 'moreHorizontal';
        }
    }

    getPOICategory(category) {
        switch (category) {
            case 'restaurants':
                return 'Restaurant';
            case 'outdoor':
                return 'Outdoor';
            case 'museums':
                return 'Museum';
            case 'for_kids':
                return 'For Kids';
            case 'nightlife':
                return 'Night life';
            case 'groceries':
                return 'Shopping';
            case 'entertainment':
                return 'Entertainment';
            case 'landmarks':
                return 'Landmark';
            default:
                return 'Other';
        }
    }

    openModal() {
        this.setState({
            descField: this.state.savedDesc,
            descOpen: true
        });
    }

    closeModal() {
        this.setState({
            descField: '',
            descOpen: false
        });
    }

    changeField(val) {
        this.setState({ descField: val });
    }

    saveModal() {
        this.props.onDescChange(this.state.descField);
        this.setState({ savedDesc: this.state.descField });
        this.closeModal();
    }

    render() {
        const { name, address, category, id, image, onRemove, onImageClick } = this.props;
        const icon = this.getPOIIcon(category);
        const modalContent =
            <div className="description-modal">
                <div className="poi-info">
                    <div className="image" style={{ backgroundImage: `url("${ image }")` }}/>
                    <div>
                        <div className="name">{ name }</div>
                        <div className="address">{ address }</div>
                        <div className="category">{ this.getPOICategory(category) }</div>
                    </div>
                </div>
                <div className="text-field-wrapper">
                    <TextField
                        id={ id + '' }
                        multiLine
                        value={ this.state.descField }
                        placeholder="Add fun things to do in your welcome letter!"
                        onChange={ (e) => this.changeField(e.target.value) }
                    />
                </div>
            </div>;

        return (
            <div className="poi">
                <div className="content">
                    <div className="content-info">
                        <div
                            className="image"
                            style={{ backgroundImage: `url("${ image }")` }}
                            onClick={ onImageClick }>
                            <SVG className="poi-icon" icon={ icon } size="20"/>
                        </div>
                        <div className="content-info-data">
                            <div className="name">{ name }</div>
                            <div className="address">{ address }</div>
                            <div className="description" onClick={ () => this.openModal() }>
                                <div className="desc-preview">
                                    { this.state.savedDesc || 'No description' }
                                </div>
                                <div className="edit-button">{ this.state.savedDesc ? 'Edit' : '+Add' }</div>
                            </div>
                        </div>
                    </div>
                    <div className="remove" onClick={ onRemove }><SVG icon="cancel" size="20"/></div>
                </div>
                { this.state.descOpen &&
                    <Modal
                        title="Description"
                        icon="addBox"
                        content={ modalContent }
                        onClose={ () => this.closeModal() }
                        onSubmit={ () => this.saveModal() }
                    />
                }
            </div>
        );
    }
}

export default Poi;
