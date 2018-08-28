import React, { PropTypes } from 'react';
import ButtonNew from 'components/ButtonNew';
import SearchBox from 'components/SearchBox';
import './searchBar.less';

class SearchBar extends React.Component {

    getWrapperClassName() {
        return (
            'wrapper' +
            (this.props.borderTop ? '' : ' no-border-top') +
            (this.props.borderBottom ? '' : ' no-border-bottom')
        );
    }

    render() {
        return (
            <div className="search-bar">
                <div className={ this.getWrapperClassName() }>
                    <SearchBox
                        className={ this.props.searchBox.className ? this.props.searchBox.className : 'large' }
                        { ...this.props.searchBox }/>
                    { this.props.button &&
                        <ButtonNew
                            className={ this.props.button.className ? this.props.button.className : 'small' }
                            { ...this.props.button }/>
                    }
                </div>
            </div>
        );
    }
}

SearchBar.defaultProps = {
    searchBox: {},
    borderTop: true,
    borderBottom: true,
};

SearchBar.propTypes = {
    searchBox: PropTypes.shape({
        className: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        onChange: PropTypes.func
    }),
    button: PropTypes.shape({
        handleRoute: PropTypes.func,
        linkTo: PropTypes.string,
        icon: PropTypes.node,
        onClick: PropTypes.func,
        fullWidth: PropTypes.bool,
        disabled: PropTypes.bool,
        type: PropTypes.string,
        className: PropTypes.string,
        label: PropTypes.string.isRequired,
    }),
    borderTop: PropTypes.bool,
    borderBottom: PropTypes.bool,
};

export default SearchBar;
