import React, {PropTypes} from 'react';
import TextField from 'material-ui/TextField';
import SVG from 'components/SVG';
import './infoSection.less';

export class InfoSection extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            editMode: false,
            value: props.text
        };
    }

    componentWillReceiveProps(props) {
        this.state = {
            value: props.text
        };
    }

    getContent() {
        if (this.state.editMode || !this.props.text) {
            return (
                <TextField
                    onChange={ (evt) => this.setNewValue(evt) }
                    fullWidth={ true }
                    multiLine={ true }
                    onBlur={ () => this.saveChanges() }
                    floatingLabelText="Enter Text"
                    defaultValue={ this.state.value }
                    name="text-field"/>
            );
        } else {
            return <div>{ this.state.value }</div>;
        }
    }

    toggleTextArea() {
        if (!this.props.readonly && !this.state.editMode) {
            this.setState({
                editMode: !this.state.editMode
            });
        }
    }

    saveChanges() {
        this.setState({
            editMode: false
        });
        if (this.props.onSaveChanges) {
            this.props.onSaveChanges(this.state.value);
        }
    }

    setNewValue(evt) {
        this.setState({
            value: evt.target.value
        });
    }

    render () {
        return (
            <div className="info-section">
                <div className="title">{ this.props.title }</div>
                <div className="subtitle">{ this.props.subtitle }</div>
                { this.props.customContent ? this.props.customContent :
                    <div className="text" onClick={ () => this.toggleTextArea() }>
                        { this.getContent() }
                    </div>
                }
            </div>
        );
    }

}

InfoSection.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    text: PropTypes.string,
    customContent: PropTypes.node,
    onSaveChanges: PropTypes.func,
    readonly: PropTypes.bool
};

export default InfoSection;
