import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import './searchBox.less';

class SearchBox extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            focus: false,
        };
    }

    toggleFocus() {
        this.setState({ focus: !this.state.focus });
    }

    getIconSize() {
        const type = this.props.className;
        if (type.indexOf('large') > -1 || type.indexOf('overlay') > -1) {
            return 18;
        }
        if (type.indexOf('small') > -1) {
            return 14;
        }

        return 16;
    }

    render() {
        const { onChange, value, className, placeholder } = this.props;

        return (
            <div className={ 'search-box' + (this.state.focus ? ' focused' : '') }>
                <div className={ 'search-box-inside ' + className }>
                    <SVG className="icon" icon="search" size={ this.getIconSize() }/>
                    <input className="search-box-input"
                           type="text"
                           placeholder={ placeholder }
                           value={ value }
                           onChange={ onChange }
                           onFocus={ () => this.toggleFocus() }
                           onBlur={ () => this.toggleFocus() }
                    />
                </div>
            </div>
        );
    }
}

SearchBox.defaultProps = {
    placeholder: 'Search',
    className: '',
};

SearchBox.propTypes = {
    className: PropTypes.string,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default SearchBox;
