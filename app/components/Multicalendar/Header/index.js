import React from 'react';
import Days from './Days';
import SearchBox from 'components/SearchBox';


export class Header extends React.Component {

    render() {
        return (
            <div className="header">
                <div className="search-section">
                    <div className="search-box-wrapper">
                        <SearchBox
                            onChange={ (evt) => this.props.handleSearchQueryChange(evt.target.value) }
                            value={ this.props.query }/>
                    </div>
                </div>
                <Days days={ this.props.days }/>
            </div>
        );
    }
}

export default Header;
