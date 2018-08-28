import React from 'react';
import SearchBox from 'components/SearchBox';
import ButtonNew from 'components/ButtonNew';
import Spinner from 'components/Spinner';
import MoreMenu from 'components/MoreMenu';
import Pagination from 'components/Pagination';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectTemplates, makeSelectLoading, selectTemplatesPagination } from 'containers/Templates/selectors';
import { deleteTemplate } from 'containers/Templates/actions';
import { fetchTemplates } from 'containers/App/actions';
import TemplateModel from 'models/Template';

export class MessageTemplates extends React.Component {

    constructor(props) {
        super(props);
        this.state = { query: '' };
    }

    changeQuery(value) {
        this.setState({ query: value });
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
                        <ButtonNew
                            className="small"
                            onClick={ () => this.props.addTemplate() }
                            label="add"/>
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
                                        <td>Description</td>
                                        <td className="type">Type</td>
                                        <td className="menu"/>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    { this.props.templates.map(t => {
                                        const template = new TemplateModel(t);
                                        const id = template.getId();
                                        if (template.filterTemplate(this.state.query)) {
                                            return (
                                                <tr key={ id } className="template">
                                                    <td><span className="template-name">{ template.getName() }</span></td>
                                                    <td>{ template.getDescription() }</td>
                                                    <td>{ template.getType() }</td>
                                                    <td>
                                                        <MoreMenu buttons={[
                                                            { label: 'Preview', click: () => this.props.editTemplate(id) },
                                                            { label: 'Delete', click: () => this.props.deleteTemplate(id) }
                                                        ]}/>
                                                    </td>
                                                </tr>
                                            );
                                        }
                                    }) }
                                    </tbody>
                                </table>
                                <div className="pagination-wrapper">
                                    <Pagination pagination={ this.props.pagination } onChange={ () => this.props.fetchTemplates() }/>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    templates: makeSelectTemplates(),
    loading: makeSelectLoading(),
    pagination: selectTemplatesPagination()
});

export function mapDispatchToProps(dispatch) {
    return {
        addTemplate: () => dispatch(push('/templates/create')),
        editTemplate: (id) => dispatch(push('/templates/' + id)),
        deleteTemplate: (id) => dispatch(deleteTemplate(id)),
        fetchTemplates: () => dispatch(fetchTemplates()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MessageTemplates);
