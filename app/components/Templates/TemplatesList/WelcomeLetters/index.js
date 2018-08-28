import React from 'react';
import SearchBox from 'components/SearchBox';
import Spinner from 'components/Spinner';
import MoreMenu from 'components/MoreMenu';
import Pagination from 'components/Pagination';
import Preview from '../Preview';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectLoading, selectLettersPagination, selectLetters } from 'containers/Templates/selectors';
import { fetchLetters } from 'containers/Templates/actions';

export class WelcomeLetters extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            preview: null
        };
    }

    changeQuery(value) {
        this.setState({ query: value });
    }

    previewLetter(content) {
        this.setState({ preview: content });
    }

    closePreview() {
        this.setState({ preview: null });
    }

    render() {
        return (
            <div className="templates-list">
                <div className="tab-content">
                    <div className="search-bar">
                        <SearchBox
                            className="large"
                            onChange={ (evt) => this.changeQuery(evt.target.value) }
                            value={ this.state.query }/>
                    </div>
                    <div className="table-wrapper">
                        { this.props.loading ?
                            <div className="spinner-wrapper"><Spinner size={ 100 }/></div>
                            :
                            <div>
                                <table className="templates-list-table">
                                    <thead className="templates-list-header">
                                    <tr>
                                        <td>Template Name</td>
                                        <td className="menu"/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.letters
                                        .filter(l => l.filterLetter(this.state.query))
                                        .map(letter => {
                                            const id = letter.getId();
                                            return (
                                                <tr key={ id } className="template">
                                                    <td>
                                                        <span className="template-name">{ letter.getName() } </span>
                                                        <span>&#9679; { letter.getPropertyName() }</span>
                                                    </td>
                                                    <td>
                                                        <MoreMenu buttons={[
                                                            { label: 'Preview', click: () => this.previewLetter(letter.getContent()) }
                                                        ]}/>
                                                    </td>
                                                </tr>
                                            );
                                        }) }
                                    </tbody>
                                </table>
                                <div className="pagination-wrapper">
                                    <Pagination pagination={ this.props.pagination } onChange={ () => this.props.fetchLetters() }/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
                { this.state.preview && <Preview
                    onClose={ () => this.closePreview() }
                    content={ this.state.preview } />
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    letters: selectLetters(),
    loading: makeSelectLoading(),
    pagination: selectLettersPagination()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchLetters: () => dispatch(fetchLetters()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(WelcomeLetters);
