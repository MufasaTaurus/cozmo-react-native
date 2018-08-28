import React from 'react';
import TextField from 'components/TextField';
import Modal from 'components/Modal';
import CleanerPicker from 'components/CleanerPicker';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { assignVendor } from 'containers/Vendors/actions';
import { makeSelectLoading } from 'containers/Vendors/selectors';
import './addCleaner.less';

export class AddCleaner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            assignee: props.assignee,
            cost: parseInt(props.cost),
            id: props.id
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            assignee: nextProps.assignee,
            cost: parseInt(nextProps.cost),
            id: nextProps.id
        });
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    canSubmit() {
        return this.state.assignee && this.state.cost;
    }

    submitForm() {
        this.props.assignVendor({
            cleaning_fee: this.state.cost,
            property: this.props.id,
            id: this.state.assignee
        });
        this.props.onClose();
    }

    render() {
        const canSubmit = this.canSubmit();
        const form = (
            <div className="assign-cleaner-form">
                <div className="intro">
                    <div className="title">Add your Cleaner</div>
                    <div className="subtitle">Choose your existing cleaner in data for this property.</div>
                </div>
                <div className="side-by-side">
                    <div className="small space">
                        <CleanerPicker
                            label="Assignee"
                            onSelect={ (cleaner) => this.handleChange('assignee', cleaner.getId()) }
                            defaultValue={ this.state.assignee }
                            property={ this.props.property }
                        />
                    </div>
                    <div className="small">
                        <TextField
                            id="fee"
                            label="$ per"
                            addonLeft="$"
                            type="number"
                            value={ this.state.cost }
                            onChange={ (evt) => this.handleChange('cost', evt.target.value) }
                        />
                    </div>
                </div>
            </div>
        );
        return (
            <div className="vendors-job-details-reassign">
                { this.props.open &&
                <Modal
                    content={ form }
                    submitLabel="Add"
                    title="Add a Cleaner"
                    icon="addBox"
                    submitDisabled={ !canSubmit }
                    onClose={ this.props.onClose }
                    onSubmit={ () => this.submitForm() }
                />
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        assignVendor: (data) => dispatch(assignVendor(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCleaner);
