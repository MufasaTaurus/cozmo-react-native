import React from 'react';
import SearchBox from 'components/SearchBox';
import ButtonNew from 'components/ButtonNew';
import Spinner from 'components/Spinner';
import MoreMenu from 'components/MoreMenu';
import Table from 'components/Table';
import SVG from 'components/SVG';
import CleanerName from 'components/CleanerName';
import AddOwner from './AddOwner';
import Pagination from 'components/Pagination';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOwners, selectLoading } from 'containers/Owners/selectors';
import { fetchOwners } from 'containers/Owners/actions';
import './ownersList.less';

export class OwnersList extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
            addOwnerOpen: false
        };

        if (!props.owners.length) {
            props.fetchOwners();
        }

        this.tableHeader = [
            { name: 'Name' },
            { name: 'Contact' },
            { name: 'Properties', type: 'short' },
            { name: '', type: 'menu' },
        ];
    }

    changeQuery(value) {
        this.setState({ query: value });
    }

    getOwners() {
        return this.props.owners
            //.filter(vendor => vendor.filterVendor(this.props.query))
            .map((owner) => {
                const menu =
                    <MoreMenu buttons={[
                        { label: 'Edit', click: () => this.props.selectOwner(owner.getId()) },
                    ]}/>;
                const contact = (
                    <div className="owner-contact">
                        <div className="email">{ owner.getEmail() }</div>
                        <div className="phone">{ owner.getPhone() }</div>
                    </div>
                );
                const name = <CleanerName fullName={ owner.getFullName() }/>;
                return {
                    className: 'owner',
                    key: owner.getId(),
                    //onClick: () => this.props.selectVendor(vendorModel.getId()),
                    values: [
                        name,
                        contact,
                        owner.getPropertiesNumber(),
                        menu
                    ]
                };
            })
            .toArray();
    }

    render() {
        return (
            <div className="owners-list">
                <div className="step-header">
                    <SVG className="step-header-icon" icon="face"/>
                    <span>Owners</span>
                </div>
                <div className="search-bar">
                    <SearchBox
                        className="search-box"
                        onChange={ (evt) => this.changeQuery(evt.target.value) }
                        value={ this.state.query }
                        placeholder="Search"/>
                    <ButtonNew
                        className="small"
                        onClick={ () => this.setState({ addOwnerOpen: true }) }
                        label="add"/>
                </div>
                <div className="table-wrapper">
                    { this.props.loading ?
                        <div className="spinner-wrapper"><Spinner size={ 100 }/></div>
                        :
                        <div>
                            <Table
                                head={ this.tableHeader }
                                body={ this.getOwners() }
                            />
                            <div className="pagination-wrapper">
                                {/*<Pagination pagination={ this.props.pagination } onChange={ () => this.props.fetchTemplates() }/>*/}
                            </div>
                        </div>
                    }
                </div>
                <AddOwner
                    open={ this.state.addOwnerOpen }
                    onClose={ () => this.setState({ addOwnerOpen: false })}
                />
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
        selectOwner: (id) => dispatch(push('/owners/' + id + '/info')),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OwnersList);
