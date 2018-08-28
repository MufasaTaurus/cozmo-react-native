import React from 'react';
import Spinner from 'components/Spinner';
import CreateProperty from 'components/Properties/PropertiesList/CreateProperty';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { startImport, fetchProperties } from 'containers/Properties/actions';
import { fetchTemplates } from 'containers/App/actions';
import { makeSelectProperties, makeSelectImport, makeSelectFetchPropertiesLoading } from 'containers/Properties/selectors';
import { makeSelectTemplates } from 'containers/Templates/selectors';
import { push } from 'react-router-redux';
import ImportDialog from './ImportDialog';
import List from './List';
import PropertiesEmptyState from './PropertiesEmptyState';
import './propertiesList.less';

export class PropertiesList extends React.Component {

    constructor(props) {
        super(props);
        this.counter = 0;
    }

    componentWillMount() {
        if (!this.props.properties.size) {
            this.props.fetchProperties();
        }

        // if (!this.props.templates.size) {
        //     this.props.fetchTemplates();
        // }
    }

    render() {
        const noProperties =
            <PropertiesEmptyState startImport={ this.props.startImport }
                                  createNewProperty={ this.props.createNewProperty }/>;

        const properties =
            <List properties={ this.props.properties } id={ this.props.id } section={ this.props.section } subsection={ this.props.subsection }/>;

        const renderContent = () => {
            if (!this.counter && this.props.loading) {
                return <div className="spinner-wrapper"><Spinner className="spinner" size={ 100 }/></div>;
            } else {
                this.counter = 1;
                if (this.props.isCreateNew) {
                    return <CreateProperty/>;
                }
                if (this.props.properties.size) {
                    return properties;
                } else {
                    return noProperties;
                }
            }
        };

        return (
            <div className="properties">
                { renderContent() }
                { this.props.import ? <ImportDialog /> : '' }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    properties: makeSelectProperties(),
    import: makeSelectImport(),
    loading: makeSelectFetchPropertiesLoading(),
    templates: makeSelectTemplates(),
});

export function mapDispatchToProps(dispatch) {
    return {
        startImport: () => dispatch(startImport()),
        fetchProperties: () => dispatch(fetchProperties()),
        createNewProperty: () => dispatch(push('/properties/create')),
        fetchTemplates: () => dispatch(fetchTemplates()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(PropertiesList);
