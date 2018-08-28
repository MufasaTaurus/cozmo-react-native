import React from 'react';
import TemplatesList from './TemplatesList';
import CreateTemplate from './TemplatesList/CreateTemplate';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchTemplates } from 'containers/App/actions';
import { fetchLetters } from 'containers/Templates/actions';
import { makeSelectTemplates } from 'containers/Templates/selectors';
import './templates.less';

export class TemplatesComponent extends React.Component {

    componentWillMount() {
        if (!this.props.templates.size) {
            this.props.fetchTemplates();
            this.props.fetchLetters();
        }
    }

    render() {
        const renderContent = () => {
            if (this.props.id) {
                if (this.props.id === 'create') {
                    return <CreateTemplate />;
                } else {
                    return <CreateTemplate id={ this.props.id } />;
                }
            } else {
                return <TemplatesList/>;
            }
        };

        return (
            <div className="templates">
                { renderContent() }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    templates: makeSelectTemplates(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchTemplates: () => dispatch(fetchTemplates()),
        fetchLetters: () => dispatch(fetchLetters()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatesComponent);
