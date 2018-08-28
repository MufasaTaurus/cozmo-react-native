import React from 'react';
import ButtonNew from 'components/ButtonNew';
import MoreMenu from 'components/MoreMenu';
import Modal from 'components/Modal';
import Fee from './Fee';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { addFee, updateFee, deleteFee } from 'containers/Properties/actions';
import { makeSelectSelectedProperty, makeSelectNewProperty } from 'containers/Properties/selectors';
import FeeModel from 'models/Fee';
import './fees.less';

export class Fees extends React.Component {

    constructor(props) {
        super(props);
        const prop = props.create ? props.newProperty : props.property;
        this.state = {
            modalOpen: false,
            fees: prop.get('additional_fees', []).toArray().map(d => new FeeModel(d.toObject())),
            fee: null,
            prop: prop.get('id')
        };
    }

    componentWillReceiveProps(nextProps) {
        const prop = nextProps.create ? nextProps.newProperty : nextProps.property;
        this.setState({
            fees: prop.get('additional_fees', []).toArray().map(d => new FeeModel(d.toObject())),
        });
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    onClose() {
        this.setState({ modalOpen: false });
    }

    submitForm() {
        if (this.state.fee.getId()) {
            this.updateFee(this.state.fee);
        } else {
            this.createFee(this.state.fee);
        }
        this.onClose();
    }

    createFee(fee) {
        this.props.addFee(fee.setProp(this.state.prop));
    }

    deleteFee(fee) {
        const id = fee.getId();
        if (id) {
            this.props.deleteFee({ id: id, prop: this.state.prop });
        }
    }

    updateFee(fee) {
        this.props.updateFee(fee);
    }

    editFee(fee) {
        this.setState({ fee: fee, modalOpen: true });
    }

    render() {
        return (
            <section className="pricing-fees">
                <div className="fees-open-modal">
                    <ButtonNew
                        label="Add"
                        className="small green"
                        onClick={ () => this.setState({ modalOpen: true, fee: new FeeModel({}) }) }
                    />
                </div>
                <table className="fees-table">
                    <thead>
                    <tr>
                        <td>Name</td>
                        <td>Fee</td>
                        <td>Basis</td>
                        <td/>
                    </tr>
                    </thead>
                    <tbody>
                    { this.state.fees.map(fee => {
                        const id = fee.getId();
                        const menu = <MoreMenu buttons={[
                            { label: 'Edit', click: () => this.editFee(fee) },
                            { label: 'Delete', click: () => this.deleteFee(fee) },
                        ]}/>;
                        return (
                            <tr key={ id }>
                                <td className="name">{ fee.getType() }</td>
                                <td className="value">{ fee.getValue() }</td>
                                <td className="days">{ fee.getDaysBefore() }</td>
                                <td className="menu">{ menu }</td>
                            </tr>
                        );
                    }) }
                    </tbody>
                </table>
                { this.state.modalOpen &&
                    <Modal
                        title={ this.state.id ? 'Edit Fee' : 'Create Fee' }
                        icon="addBox"
                        content={ <Fee fee={ this.state.fee } /> }
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
        addFee: (data) => dispatch(addFee(data)),
        updateFee: (data) => dispatch(updateFee(data)),
        deleteFee: (data) => dispatch(deleteFee(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Fees);
