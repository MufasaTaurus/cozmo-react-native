import React from 'react';
import TitleHeader from 'components/TitleHeader';
import Table from 'components/Table';
import ButtonNew from 'components/ButtonNew';
import CleanerName from 'components/CleanerName';
import MoreMenu from 'components/MoreMenu';
import SVG from 'components/SVG';
import AddCleaner from './AddCleaner';
import Image from './Image';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectVendorsProperties } from 'containers/Vendors/selectors';
import { fetchVendorsProperties, changeVendorOrder } from 'containers/Vendors/actions';
import './cleaners.less';

export class Cleaners extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            add: false
        };
        this.tableHeader = [
            { name: 'Name' },
            { name: 'Contact' },
            { name: '$ Per' },
            { name: 'Priority' },
            { name: '', type: 'menu' },
        ];
    }

    changeOrder(cleaners) {
        const order = cleaners
            .map(c => c.getId());
        this.props.changeVendorOrder({
            id: this.props.id,
            order: order,
            cleaners: cleaners
        });
    }

    onArrowClick(id, isUp) {
        let cleaners = this.props.cleaners.sort((a, b) => a.getOrder() > b.getOrder());
        if (isUp) {
            if (cleaners.first().getId() === id) {
                return false;
            } else {
                const index = cleaners.findKey(c => c.getId() === id);
                cleaners = cleaners
                    .update(index, c => c.setOrder(index - 1))
                    .update(index - 1, c => c.setOrder(index));
            }
        } else {
            if (cleaners.last().getId() === id) {
                return false;
            } else {
                const index = cleaners.findKey(c => c.getId() === id);
                cleaners = cleaners
                    .update(index, c => c.setOrder(index + 1))
                    .update(index + 1, c => c.setOrder(index));
            }
        }

        this.changeOrder(cleaners);
        this.forceUpdate();
    }

    getCleaners() {
        return this.props.cleaners
            .sort((a, b) => a.getOrder() > b.getOrder())
            .map((cleaner, index) => {
                const id = cleaner.getId();
                const contact =
                    <div className="cleaner-contact">
                        <div className="email">{ cleaner.getEmail() }</div>
                        <div className="phone">{ cleaner.getPhone() }</div>
                    </div>;
                const name =
                    <div className="icon-wrapper">
                        { !index && <div className="icon"><SVG icon="medal" size={ 18 }/></div> }
                        <CleanerName fullName={ cleaner.getFullName() }/>
                    </div>;
                const order =
                    <div className="arrows">
                        <div className="arrow up" onClick={ () => this.onArrowClick(id, true) }>
                            <span className="icon"><SVG icon="backArrow" size={ 15 }/></span>
                        </div>
                        <div className="arrow down" onClick={ () => this.onArrowClick(id) }>
                            <span className="icon"><SVG icon="backArrow" size={ 15 }/></span>
                        </div>
                    </div>;
                const menu = <MoreMenu buttons={ [
                    { label: 'Edit', click: () => {} },
                    { label: 'Details', click: () => {} },
                    { label: 'Archive', click: () => {} }
                ] }/>;
                return {
                    className: 'property',
                    key: id,
                    //onClick: () => this.props.selectProperty(id),
                    values: [
                        name,
                        contact,
                        '123',
                        order,
                        menu
                    ]
                };
            }).toArray();
    }

    render() {
        return (
            <div className="vendors-properties-details-cleaners">
                <div className="add-cleaner">
                    <Image/>
                    <div className="title">Cleaners for this Property</div>
                    <div className="info">Add cleaners for the schedule assistant.</div>
                    <ButtonNew label="Add" className="green" onClick={ () => this.setState({ add: true }) }/>
                </div>
                <div className="cleaners-list">
                    <div className="vj-card">
                        <TitleHeader title="Cleaners Added" icon="guests"/>
                        <Table head={ this.tableHeader } body={ this.getCleaners() }/>
                        <div className="legend">
                            <span className="icon"><SVG icon="medal" size={ 18 }/></span>
                            <span className="text">Primary Cleaner</span>
                        </div>
                    </div>
                </div>
                <AddCleaner open={ this.state.add } onClose={ () => this.setState({ add: false }) } id={ this.props.id }/>
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
        changeVendorOrder: (data) => dispatch(changeVendorOrder(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cleaners);
