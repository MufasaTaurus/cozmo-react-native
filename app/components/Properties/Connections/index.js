import React from 'react';
import Spinner from 'components/Spinner';
import ConnectionsList from './List';
import ConnectionDetails from './ConnectionDetails';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchConnections } from 'containers/Properties/actions';
import { selectConnections, selectLoadingConnections } from 'containers/Properties/selectors';
import './connections.less';

export class Connections extends React.Component {

    constructor(props) {
        super(props);

        if (!props.connections.size) {
            props.fetchConnections();
        }
    }

    render() {
        return (
            <div className="properties-connections-wrapper">
                { this.props.loading ?
                    <div className="spinner-wrapper"><Spinner/></div>
                    :
                    this.props.id ? <ConnectionDetails id={ this.props.id }/> : <ConnectionsList/>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    connections: selectConnections(),
    loading: selectLoadingConnections()
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchConnections: () => dispatch(fetchConnections()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Connections);
