import React from 'react';
import Spinner from 'components/Spinner';
import SideBar from 'components/SideBar';
import OwnerInfo from './OwnerInfo';
import Payments from './Payments';
import Contract from './Contract';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOwners, selectLoading } from 'containers/Owners/selectors';
import { fetchOwners, updateOwner } from 'containers/Owners/actions';
import './ownerDetails.less';

export class OwnerDetails extends React.Component {

    constructor(props) {
        super(props);
        this.owner = props.owners.filter((o) => o.getId() + '' === props.id).first();
        if (!props.owners.length) {
            props.fetchOwners();
        }
        this.sideBar = [
            {
                title: 'Owner',
                icon: 'account',
                baseUrl: '/owners/' + props.id,
                items: [
                    {
                        title: 'Info & Properties',
                        url: '/info'
                    },
                    {
                        title: 'Payment',
                        url: '/payment'
                    },
                    {
                        title: 'Contract',
                        url: '/contract'
                    }
                ]
            }
        ];
    }

    renderContent() {
        switch (this.props.section) {
            case 'payment':
                return <Payments owner={ this.owner }/>;
            case 'contract':
                return <Contract owner={ this.owner }/>;
            default:
                return <OwnerInfo owner={ this.owner }/>;
        }
    }

    render() {
        return (
            <div className="owner-details">
                <div className="side-menu">
                    <SideBar content={ this.sideBar }/>
                </div>
                <div className="owner-details-content">
                    { this.renderContent() }
                </div>
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
        updateOwner: (data) => dispatch(updateOwner(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnerDetails);
