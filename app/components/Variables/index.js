import React from 'react';
import SearchBox from 'components/SearchBox';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectVariables} from 'containers/App/selectors';
import './variables.less';


export class Variables extends React.Component {

    constructor(props) {
        super(props);
        this.state = { query: '' };
    }

    render() {
        return (
            this.props.show ?
                <div className="variables-popup-wrapper" style={{ zIndex: 10 }}>
                    <div className="variables-popup" style={ this.props.style }>
                        { this.props.variables
                            .filter(v => v.get('key').toLowerCase()
                                .indexOf((this.props.query ? this.props.query : this.state.query).toLowerCase()) > -1)
                            .map((variable, index) => {
                                return (
                                    <div
                                        className="variable"
                                        onClick={ this.props.onSelect.bind(this, variable.get('key')) }
                                        key={ index }>
                                        <div className="variable-key">{ variable.get('key') }</div>
                                        <div className="variable-name">{ variable.get('name') }</div>
                                    </div>
                                );
                            }) }
                        { this.props.query === undefined ?
                            <div className="search-box-wrapper">
                                <SearchBox
                                    onChange={ (evt) => this.setState({ query: evt.target.value }) }
                                    value={ this.state.query }
                                    placeholder={ 'Search variables' }/>
                            </div>
                            : ''
                        }
                    </div>
                </div>
                :
                <div/>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    variables: makeSelectVariables(),
});

export default connect(mapStateToProps, null)(Variables);
