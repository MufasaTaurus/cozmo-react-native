import React from 'react';
import Modal from 'components/Modal';
import ButtonNew from 'components/ButtonNew';
import MoreMenu from 'components/MoreMenu';
import Discount from './Discount/index';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateProperty, updateNewProperty, deleteDiscount, addDiscount, updateDiscount } from 'containers/Properties/actions';
import { makeSelectSelectedProperty, makeSelectNewProperty } from 'containers/Properties/selectors';
import { fromJS } from 'immutable';
import DiscountModel from 'models/Discount';
import PropertyModel from 'models/Property';
import './discounts.less';

export class Discounts extends React.Component {

    constructor(props) {
        super(props);
        const prop = new PropertyModel(props.create ? props.newProperty : props.property);
        this.state = {
            modalOpen: false,
            discounts: prop.getDiscounts().toArray().map(d => new DiscountModel(d.toObject())),
            discount: null,
            prop: prop.getId()
        };
    }

    componentWillReceiveProps(nextProps) {
        const prop = new PropertyModel(nextProps.create ? nextProps.newProperty : nextProps.property);
        this.setState({
            discounts: prop.getDiscounts().toArray().map(d => new DiscountModel(d.toObject())),
        });
    }

    submitForm() {
        if (this.state.discount.getId()) {
            this.updateDiscount(this.state.discount);
        } else {
            this.createDiscount(this.state.discount);
        }
        this.onClose();
    }

    isDiscountValid(discount) {
        return discount.getDaysBefore() && discount.getValue();
    }

    onClose() {
        this.setState({ modalOpen: false });
    }

    createDiscount(discount) {
        this.props.createDiscount(discount.setProp(this.state.prop));
    }

    deleteDiscount(discount) {
        const id = discount.getId();
        if (id) {
            this.props.deleteDiscount({ id: id, prop: this.state.prop });
        }
    }

    updateDiscount(discount) {
        this.props.updateDiscount(discount);
    }

    editDiscount(discount) {
        this.setState({ discount: discount, modalOpen: true });
    }

    render() {
        return (
            <section className="pricing-discounts">
                <div className="discount-open-modal">
                    <ButtonNew
                        label="Add"
                        className="small green"
                        onClick={ () => this.setState({ modalOpen: true, discount: new DiscountModel({}) }) }
                    />
                </div>
                <table className="discounts-table">
                    <thead>
                    <tr>
                        <td>Type of Discount</td>
                        <td>Discount</td>
                        <td>Discount Ends</td>
                        <td/>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.discounts.map(discount => {
                        const id = discount.getId();
                        const menu = <MoreMenu buttons={[
                            { label: 'Edit', click: () => this.editDiscount(discount) },
                            { label: 'Delete', click: () => this.props.deleteDiscount(discount) },
                        ]}/>;
                        return (
                            <tr key={ id }>
                                <td className="name">{ discount.getType() }</td>
                                <td className="value">{ discount.getValue() }</td>
                                <td className="days">{ discount.getDaysBefore() }</td>
                                <td className="menu">{ menu }</td>
                            </tr>
                        );
                    }) }
                    </tbody>
                </table>
                {
                    this.state.modalOpen &&
                    <Modal
                        title={ this.state.id ? 'Edit Discount' : 'Create Discount' }
                        icon="addBox"
                        content={ <Discount discount={ this.state.discount } /> }
                        onSubmit={ () => this.submitForm() }
                        onClose={ () => this.onClose() }
                    />
                }
            </section>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    property: makeSelectSelectedProperty(),
    newProperty: makeSelectNewProperty()
});

export function mapDispatchToProps(dispatch) {
    return {
        updateProperty: (data) => dispatch(updateProperty(data)),
        updateNewProperty: (data) => dispatch(updateNewProperty(data)),
        deleteDiscount: (data) => dispatch(deleteDiscount(data)),
        createDiscount: (data) => dispatch(addDiscount(data)),
        updateDiscount: (data) => dispatch(updateDiscount(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Discounts);
