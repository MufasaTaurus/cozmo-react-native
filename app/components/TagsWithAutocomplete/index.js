import React, { PropTypes } from 'react';
import Tags from 'components/Tags';
import './tagsWithAutocomplete.less';

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
            //this.props.onChange(this.state.value);
            //this.setState({ value: '' });
        }
    }

    onAddTag(tag) {
        this.props.onChange(tag);
        this.setState({ value: '' });
    }

    render() {
        const { placeholder, tags, label, id, onDelete } = this.props;
        return (
            <div className={ 'tags-with-autocomplete-group' + (this.props.small ? ' small' : '') }>
                { label && <label className="tags-with-autocomplete-label" htmlFor={ id }>{ label }</label> }
                <div className="tags-and-input">
                    { tags.map((t, index) => {
                        return (
                            <div className="tag" key={ index }>
                                { t.get('name') }
                                <span className="delete" onClick={ () => onDelete(t) }>
                                    <span className="icon">&times;</span>
                                </span>
                            </div>
                        );
                    }) }
                    <input
                        className="tags-field"
                        onKeyUp={ (evt) => this.onKeyUp(evt.keyCode) }
                        onChange={ (evt) => this.onInputChange(evt.target.value) }
                        id={ id }
                        placeholder={ placeholder }
                        value={ this.state.value }
                    />
                </div>
                <Tags
                    show={ this.state.value }
                    query={ this.state.value }
                    onSelect={ (tag) => this.onAddTag(tag) } />
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

