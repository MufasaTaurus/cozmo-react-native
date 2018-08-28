import React from 'react';
import List from './List';
import CreateEmail from './CreateEmail';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { } from 'containers/Properties/actions';
import { makeSelectProperties, makeSelectImport, makeSelectFetchPropertiesLoading, makeSelectSelectedProperty } from 'containers/Properties/selectors';
import { push } from 'react-router-redux';
import './emails.less';

export class Emails extends React.Component {

    renderSection() {
        if (this.props.subsection) {
            return <CreateEmail property={ this.props.property } subsection={ this.props.subsection }/>;
        }
        switch (this.props.section) {
            case 'emails':
                return <List propId={ this.props.propId }/>;
            default:
                return <List/>;
        }
    }

    render() {
        return (
            <div className="property-emails">
                { this.renderSection() }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    properties: makeSelectProperties(),
    property: makeSelectSelectedProperty(),
    import: makeSelectImport(),
    loading: makeSelectFetchPropertiesLoading()
});

export function mapDispatchToProps(dispatch) {
    return {
        createNewProperty: () => dispatch(push('/properties/create'))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Emails);
