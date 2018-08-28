import React from 'react';
import List from './List';
import Details from './Details';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectVendorsProperties } from 'containers/Vendors/selectors';
import { fetchVendorsProperties } from 'containers/Vendors/actions';

export class Properties extends React.Component {

    constructor(props) {
        super(props);
        if (!this.props.properties.size) {
            this.props.fetchVendorsProperties();
        }
    }

    render() {
        return (
            <div className="vendors-payments">
                <div className="content">
                    { this.props.id ?
                        <Details id={ this.props.id }/>
                        :
                        <List/>
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    properties: selectVendorsProperties(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchVendorsProperties: () => dispatch(fetchVendorsProperties()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Properties);
