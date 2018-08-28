import React from 'react';
import Select from 'components/Select';
import SVG from 'components/SVG';
import DatePicker from 'components/DatePicker';
import TextField from 'components/TextField';
import PageFooter from 'components/PageFooter';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { selectOwners, selectLoading } from 'containers/Owners/selectors';
import { updateOwner } from 'containers/Owners/actions';
import './contract.less';

export class Contract extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            booking: '',
            vrbo: '',
            airbnb: '',
            ta: '',
            payout: 'ach',
            payin: 'ach'
        };
    }

    onChange(field, value) {
        this.setState({ [field]: value });
    }

    render() {
        return (
            <div className="owner-details-contract-wrapper">
                <div className="owner-details-contract">
                    <div className="owner-details-contract-content">
                        <div className="step-header">
                            <SVG className="step-header-icon" icon="contract"/>
                            <span>Contract</span>
                        </div>
                        <div className="section">
                            <div className="section-title">Contract Info</div>
                            <div className="section-content">
                                <div className="contract-info">
                                    <Select
                                        label="Contract Type"
                                        placeholder="-"
                                        options={[
                                            { name: 'EliteVR', value: 'r' },
                                            { name: 'StandardVR', value: 'w' },
                                            { name: 'Property Management', value: 'm' },
                                        ]}
                                    />
                                    <DatePicker
                                        label="Date"
                                        value={ this.state.date }
                                        onSelect={ (date) => this.onChange('date', date) }
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section-title">Voyajoy Commission</div>
                            <div className="section-content">
                                <div className="commission">
                                    <TextField
                                        id="comm"
                                        type="number"
                                        addonRight="%"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="section">
                            <div className="section-title">Billing Type</div>
                            <div className="section-content">
                                <div className="routing">
                                    <Select
                                        placeholder="-"
                                        options={[
                                            { name: 'Legacy - monthly statement - all activity combined into a single statement', value: 'r' },
                                            { name: 'Pay as Voyojoy gets paid and bill owner monthly for commissions on owner listings', value: 'w' },
                                            { name: 'Pay as Voyojoy gets paid only', value: 'm' },
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <PageFooter/>
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
        updateOwner: (data) => dispatch(updateOwner(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Contract);
