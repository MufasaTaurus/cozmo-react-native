import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Table from 'components/Table';
import SVG from 'components/SVG';
import CreditCard from './CreditCard';
import moment from 'moment';
import './billing.less';

export class Billing extends React.Component {

    constructor(props) {
        super(props);
        this.tableHeader = [
            { name: 'Invoice Date', type: 'date' },
            { name: 'ID', type: 'inv-id'  },
            { name: 'Amount', type: 'amount'  },
            { name: '', type: 'button' },
        ];
        this.paymentTableHeader = [
            { name: 'Billing Item', type: 'date' },
            { name: 'Price per item/month', type: 'inv-id'  },
            { name: 'Items', type: 'amount'  },
            { name: 'Total/month', type: 'button' },
        ];
        this.invoices = [
            { date: moment(), id: 'IF38583X', amount: 2344 },
            { date: moment(), id: 'IF38584X', amount: 1344 },
            { date: moment(), id: 'IF38585X', amount: 344 },
        ];
        this.billing = [
            { item: 'Team Members', price: 25, qnty: 15, total: 375 },
            { item: 'Properties', price: 5, qnty: 100, total: 500 }
        ];
    }

    getInvoices() {
        return this.invoices
            .map((inv, index) => {
                const download = (
                    <div className="download-wrapper">
                        <RaisedButton label={ <SVG icon="download" size="20"/> } primary={ true } className="download"/>
                    </div>
                );
                return {
                    className: 'invoice',
                    key: index,
                    values: [
                        inv.date.format('MMM DD, YYYY'),
                        inv.id,
                        '$' + inv.amount,
                        download
                    ]
                };
            });
    }

    getBilling() {
        const billing = this.billing
            .map((b, index) => {
                const item = <span className="plan-item">{ b.item }</span>;
                return {
                    className: 'billing',
                    key: index,
                    values: [
                        item,
                        '$' + b.price,
                        b.qnty,
                        '$' + b.total,
                    ]
                };
            });
        billing.push({
            className: 'billing-total',
            key: 'total',
            values: [
                <span className="plan-item">Total</span>,
                '',
                '',
                <span className="total-payment">$875/mo</span>,
            ]
        });

        return billing;
    }

    render() {
        return (
            <div className="settings-billing">
                <div className="settings-billing-content">
                    <div className="settings-billing-content-card">
                        <div className="header">
                            <div className="change-plan-button"><RaisedButton label="Change" primary={ true }/></div>
                            <div className="title">Subscription Plan <span className="plan">(Organization - Enterprise)</span></div>
                            <div className="subtitle">Edit your company information</div>
                        </div>
                        <Table head={ this.paymentTableHeader } body={ this.getBilling() } className="billing-table"/>
                    </div>
                    <div className="settings-billing-content-card">
                        <div className="header">
                            <div className="title">Payment Information</div>
                            <div className="subtitle">Credit card details</div>
                        </div>
                        <CreditCard/>
                    </div>
                    <div className="settings-billing-content-card">
                        <div className="header">
                            <div className="title">Billing History</div>
                            <div className="subtitle">Edit your personal information</div>
                        </div>
                        <Table head={ this.tableHeader } body={ this.getInvoices() }/>
                    </div>
                </div>
            </div>
        );
    }
}


export default Billing;
