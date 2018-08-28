import React, {PropTypes} from 'react';
import SVG from 'components/SVG';
import './search.less';

function SearchBox({ placeholder, value, onChange }) {

    return (
        <div className="vj-search">
            <span className="vj-search-icon"><SVG icon="search" size="18"/></span>
            <input className="vj-search-input" type="text" placeholder={ placeholder } value={ value } onChange={ onChange } />
        </div>
    );
}

SearchBox.propTypes = {
    placeholder: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func
};

export default SearchBox;
