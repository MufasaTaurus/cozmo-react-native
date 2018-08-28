import React from 'react';
import Days from './Days';
import SearchBox from 'components/SearchBox';

export class Header extends React.Component {

    render() {
        return (
            <div className="header" id="header" onScroll={ (e) =>  e.preventDefault() }>
                <div className="search-section">
                    <div className="search-box-wrapper">
                        <SearchBox
                            placeholder="Search property"
                            onChange={ (evt) => this.props.handleSearchQueryChange(evt.target.value) }
                            value={ this.props.query }/>
                    </div>
                </div>
                <Days days={ this.props.days } basic={ this.props.basic }/>
            </div>
        );
    }
}

export default Header;
