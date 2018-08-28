import React, { PropTypes } from 'react';
import TextField from 'components/TextField';
import './section.less';

export class Section extends React.Component  {

    constructor(props) {
        super(props);
        this.state = {
            value: props.text
        };
    }

    componentWillReceiveProps(props) {
        this.state = {
            value: props.text
        };
    }

    getContent() {
        return (
            <TextField
                onChange={ (evt) => this.setNewValue(evt) }
                value={ this.state.value }
                multiLine={ true }
                onBlur={ () => this.saveChanges() }
                //defaultValue={ this.state.value }
                counter={ this.props.counter }
                id={ this.props.id }
                name="text-field"/>
        );
    }

    saveChanges() {
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
        const subtitle = <div className="subtitle">{ this.props.subtitle }</div>;
        return (
            <div className="prop-section">
                <div className="title">{ this.props.title }</div>
                { this.props.subtitle && subtitle }
                { this.props.customContent ? this.props.customContent :
                    <div className="text">
                        { this.getContent() }
                    </div>
                }
            </div>
        );
    }

}

Section.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    text: PropTypes.string,
    customContent: PropTypes.node,
    onSaveChanges: PropTypes.func,
    readonly: PropTypes.bool
};

export default Section;
