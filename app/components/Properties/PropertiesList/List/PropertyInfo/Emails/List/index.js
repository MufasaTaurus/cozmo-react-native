import React from 'react';
import TitleHeader from 'components/TitleHeader';
import SearchBox from 'components/SearchBox';
import ButtonNew from 'components/ButtonNew';
import MoreMenu from 'components/MoreMenu';
import Table from 'components/Table';
import Pagination from 'components/Pagination';
import PreviewEmail from './../PreviewEmail';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { deleteTemplate } from 'containers/Templates/actions';
import { fetchTemplates } from 'containers/App/actions';
import { makeSelectSelectedProperty } from 'containers/Properties/selectors';
import { makeSelectTemplates, selectTemplatesPagination, makeSelectLoading } from 'containers/Templates/selectors';
import { push } from 'react-router-redux';
import TemplateModel from 'models/Template';
import './list.less';

export class List extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            preview: null
        };
        this.header = [
            { name: 'Template Name' },
            { name: 'Description' },
            { name: 'Type', type: 'short' },
            { name: 'Automation', type: 'short' },
            { name: 'Date Updated', type: 'date' },
            { name: '', type: 'menu' },
        ];
    }

    hasTemplates() {
        return this.props.templates.filter(t => t.get('prop') === this.props.property.get('id')).size > 0;
    }

    getTemplates() {
        const templates = this.props.templates.map(t => new TemplateModel(t));
        return templates
            .filter(tpl => tpl.getProp() === this.props.property.get('id'))
            .filter(tpl => tpl.filterTemplate(this.state.query))
            .map((tpl) => {
                const menu = <MoreMenu buttons={ [
                    { label: 'Edit', click: () => this.props.editEmail(this.props.propId, tpl.getId()) },
                    { label: 'Preview', click: () => this.setState({ preview: tpl }) },
                    { label: 'Archive', click: () => this.props.deleteTemplate(tpl.getId()) }
                ] }/>;
                return {
                    className: 'template',
                    key: tpl.getId(),
                    values: [
                        <span className="tpl-name">{ tpl.getName() }</span>,
                        <span className="tpl-desc">{ tpl.getDescription() }</span>,
                        tpl.getType(),
                        'Off',
                        <div className="date">
                            <div className="day">{ tpl.getDate() }</div>
                            <div className="time">{ tpl.getTime() }</div>
                        </div>,
                        menu
                    ]
                };
            }).toArray();
    }

    render() {
        return (
            <div className="property-emails-list">
                <TitleHeader title="Auto Emails" icon="autoEmail"/>
                <div>
                    <div className="search-bar">
                        <SearchBox
                            onChange={ (evt) => this.setState({ query: evt.target.value }) }
                            value={ this.state.query }/>
                        <ButtonNew
                            className="small"
                            onClick={ () => this.props.createEmail(this.props.propId) }
                            label="Add"/>
                    </div>
                    <Table head={ this.header } body={ this.getTemplates() } loading={ this.props.loading }/>
                    <div className="pagination-wrapper">
                        <Pagination pagination={ this.props.pagination } onChange={ () => this.props.fetchTemplates() }/>
                    </div>
                    { !this.hasTemplates() && <div className="empty-state">No auto email</div> }
                </div>
                { this.state.preview && <PreviewEmail template={ this.state.preview } onClose={ () => this.setState({ preview: null }) }/> }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    property: makeSelectSelectedProperty(),
    templates: makeSelectTemplates(),
    loading: makeSelectLoading(),
    pagination: selectTemplatesPagination()
});

export function mapDispatchToProps(dispatch) {
    return {
        deleteTemplate: (id) => dispatch(deleteTemplate(id)),
        createEmail: (id) => dispatch(push('/properties/' + id + '/emails/create')),
        editEmail: (propId, id) => dispatch(push('/properties/' + propId + '/emails/' + id)),
        fetchTemplates: () => dispatch(fetchTemplates()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
