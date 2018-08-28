import React from 'react';
import Spinner from 'components/Spinner';
import SideBar from 'components/SideBar';
import OwnersProperties from './OwnersProperties';
import OwnerContact from './OwnerContact';
import ImportProperties from './ImportProperties';
import Note from './Note';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOwners, selectLoading } from 'containers/Owners/selectors';
import { fetchOwners, updateOwner } from 'containers/Owners/actions';
import './ownerInfo.less';

export class OwnerInfo extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            import: false
        };
    }

    render() {
        return (
            <div className="owner-info">
                <div>
                    <OwnersProperties owner={ this.props.owner } onImport={ () => this.setState({ import: true }) }/>
                </div>
                <div className="right-side">
                    <OwnerContact owner={ this.props.owner } updateOwner={ this.props.updateOwner }/>
                    <Note owner={ this.props.owner } updateOwner={ this.props.updateOwner }/>
                </div>
                <ImportProperties onClose={ () => this.setState({ import: false }) } open={ this.state.import }/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    owners: selectOwners(),
    loading: selectLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchOwners: () => dispatch(fetchOwners()),
        selectOwner: (id) => dispatch(push('/owners/' + id)),
        updateOwner: (data) => dispatch(updateOwner(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerInfo);
