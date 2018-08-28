import React, {PropTypes} from 'react';
import './tagTextField.less';

export class TagTextField extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    onInputChange(value) {
        this.setState({ value: value });
    }

    onKeyUp(keyCode) {
        if (keyCode === 13) {
            this.props.onChange(this.state.value);
            this.setState({ value: '' });
        }
    }

    render() {
        const { placeholder, tags, label, id, onDelete } = this.props;

        return (
            <div className={ 'tag-text-field-group' + (this.props.small ? ' small' : '') }>
                { label && <label className="tag-text-field-label" htmlFor={ id }>{ label }</label> }
                <div className="tags-and-input">
                    { tags.map((t, index) => {
                        return (
                            <div className="tag" key={ index }>
                                { t }
                                <span className="delete" onClick={ () => onDelete(t)}>
                                    <span className="icon">&times;</span>
                                </span>
                            </div>
                        );
                    }) }
                    <input
                        className="tag-text-field"
                        type="text"
                        onKeyUp={ (evt) => this.onKeyUp(evt.keyCode) }
                        onChange={ (evt) => this.onInputChange(evt.target.value) }
                        id={ id }
                        placeholder={ placeholder }
                        value={ this.state.value }
                    />
                </div>
            </div>

        );
    }

}

TagTextField.propTypes = {
    placeholder: PropTypes.string,
    onChange: PropTypes.func,
    tags: PropTypes.array,
    label: PropTypes.string,
    id: PropTypes.string.isRequired,
    small: PropTypes.bool
};

export default TagTextField;

