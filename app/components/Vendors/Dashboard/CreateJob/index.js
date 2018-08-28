import React from 'react';
import Modal from 'components/Modal';
import TextField from 'components/TextField';
import DatePicker from 'components/DatePicker';
import Payments from 'components/Vendors/JobDetails/Payments';
import PropertyPickerSmall from 'components/PropertyPickerSmall';
import CleanerPicker from 'components/CleanerPicker';
import Select from 'components/Select';
import './createJob.less';

export class CreateJob extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            prop: props.property,
            assignee: null,
            time_estimate: '',
            from: '10:00',
            to: '22:00',
            date: props.date,
            cost: ''
        };
    }

    onChange(field, value) {
        this.setState({ [field]: value });
    }

    canSubmit() {
        return (
            this.state.cost &&
            this.state.assignee &&
            this.state.prop
        );
    }

    onSubmit() {
        this.props.onSubmit({
            cost: this.state.cost,
            assignee: this.state.assignee,
            prop: this.state.prop,
            time_estimate: this.state.time_estimate ? this.state.time_estimate : 0,
            time_frame: {
                lower: this.state.date.format('YYYY-MM-DDT') + this.state.from,
                upper: this.state.date.format('YYYY-MM-DDT') + this.state.to
            },
            reimbursement: 0,
            type: 'Clean'
        });
        this.props.onClose();
    }

    render() {
        const form = (
            <div className="dashboard-create-job">
                <div className="modal-section">
                    <div className="section-title">Schedule</div>
                    <div className="section-content">
                        <div className="side-by-side">
                            <div className="narrow space">
                                <PropertyPickerSmall
                                    onSelect={ (property) => this.onChange('prop', property.get('id')) }
                                    label="Property"
                                    defaultValue={ this.state.prop }/>
                            </div>
                            <div className="narrow">
                                <DatePicker
                                    label="Date"
                                    value={ this.state.date }
                                    onSelect={ (date) => this.onChange('date', date) }
                                />
                            </div>
                        </div>
                        <div className="side-by-side time-frame">
                            <div className="small space">
                                <Select
                                    id="from"
                                    label="Working Window"
                                    addonLeft="From"
                                    onChange={ (val) => this.onChange('from', val) }
                                    defaultValue={ this.state.from }
                                    options={[
                                        { name: '10am', value: '10:00' },
                                        { name: '11am', value: '11:00' },
                                    ]}
                                />
                            </div>
                            <div className="small space">
                                <Select
                                    id="to"
                                    addonLeft="To"
                                    onChange={ (val) => this.onChange('to', val) }
                                    defaultValue={ this.state.to }
                                    options={[
                                        { name: '10pm', value: '22:00' },
                                        { name: '11pm', value: '23:00' },
                                    ]}
                                />
                            </div>
                            <div className="small">
                                <TextField
                                    id="est"
                                    label="Estimated Cleaning Time"
                                    addonRight="Hours"
                                    type="number"
                                    max="100"
                                    min="1"
                                    value={ this.state.time_estimate }
                                    onChange={ (evt) => this.onChange('time_estimate', evt.target.value) }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal-section">
                    <div className="section-title">Assign a Cleaner</div>
                    <div className="section-content">
                        <div className="narrow">
                            <CleanerPicker
                                label="Assignee"
                                onSelect={ (cleaner) => this.onChange('assignee', cleaner.getId()) }
                                defaultValue={ this.state.assignee }
                                propId={ this.state.prop }
                            />
                        </div>
                    </div>
                </div>
                <div className="modal-section">
                    <div className="section-title">Payment</div>
                    <div className="section-content">
                        <Payments
                            // cost={ this.state.cost }
                            onChange={ (val) => this.setState({ cost: val.cost }) }/>
                    </div>
                </div>
            </div>
        );
        const canSubmit = this.canSubmit();
        return (
            <div className="copy-template">
                { this.props.open &&
                <Modal
                    title="Create a Cleaning Job"
                    icon="addBox"
                    content={ form }
                    submitDisabled={ !canSubmit }
                    submitLabel="Assign"
                    onClose={ this.props.onClose }
                    onSubmit={ () => this.onSubmit() }
                />
                }
            </div>
        );
    }
}

export default CreateJob;
