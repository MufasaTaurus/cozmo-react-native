import React from 'react';
import TextField from 'components/TextField';
import ButtonNew from 'components/ButtonNew';
import SVG from 'components/SVG';
import './payments.less';

export class Payments extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            cost: parseInt(props.cost) || '',
            costs: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.cost) {
            this.setState({
                cost: parseInt(nextProps.cost) || ''
            });
        }
    }

    addCost() {
        const costs = this.state.costs;
        costs.push({ name: '', amount: '' });
        this.setState({ costs: costs });
    }

    removeCost(index) {
        const costs = this.state.costs;
        costs.splice(index, 1);
        this.setState({ costs: costs });
    }

    onChange(field, value) {
        this.setState({ [field]: value });
        setTimeout(() => this.props.onChange(this.state), 0);
    }

    changeAmount(index, value) {
        const costs = this.state.costs;
        costs[index].amount = value;
        this.setState({ costs: costs });
        setTimeout(() => this.props.onChange(this.state), 0);
    }

    changeName(index, value) {
        const costs = this.state.costs;
        costs[index].name = value;
        this.setState({ costs: costs });
        setTimeout(() => this.props.onChange(this.state), 0);
    }

    getTotal() {
        let sum = parseInt(this.state.cost);
        this.state.costs.map(c => {
            return sum += parseInt(c.amount) || 0;
        });
        return sum > 0 ? 'Total: $' + sum : '';
    }

    render() {
        return (
            <div className="vendors-job-details-payments">
                <div className="side-by-side">
                    <div className="space narrow">
                        <TextField
                            id="name"
                            label="Name"
                            disabled
                            value="Base Service Fee"
                        />
                    </div>
                    <div className="narrow space">
                        <TextField
                            id="name"
                            label="Amount"
                            addonLeft="$"
                            type="number"
                            value={ this.state.cost }
                            onChange={ (evt) => this.onChange('cost', evt.target.value) }
                        />
                    </div>
                    <div className="tiny">
                        <ButtonNew label="Add" className="yellow small" onClick={ () => this.addCost() }/>
                    </div>
                </div>
                { this.state.costs.map((cost, index) => {
                    return (
                        <div className="side-by-side with-delete" key={ index }>
                            <div className="space narrow">
                                <TextField
                                    id="name"
                                    label="Name"
                                    value={ this.state.costs[index].name }
                                    onChange={ (evt) => this.changeName(index, evt.target.value) }
                                />
                            </div>
                            <div className="narrow space">
                                <TextField
                                    id="name"
                                    label="Amount"
                                    addonLeft="$"
                                    type="number"
                                    value={ this.state.costs[index].amount }
                                    onChange={ (evt) => this.changeAmount(index, evt.target.value) }
                                />
                            </div>
                            <div className="delete" onClick={ () => this.removeCost(index) }>
                                <SVG className="delete" icon="del" size="18" />
                            </div>
                        </div>
                    );
                }) }
                <div className="total">
                    <span>{ this.getTotal() }</span>
                </div>
            </div>
        );
    }
}

Payments.defaultProps = {
    onChange: () => {}
};

export default Payments;
