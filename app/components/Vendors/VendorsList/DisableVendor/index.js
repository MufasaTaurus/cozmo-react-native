import React from 'react';
import Modal from 'components/Modal';
import CleanerPicker from 'components/CleanerPicker';
import { connect } from 'react-redux';
import { reassignJobs } from 'containers/Vendors/actions';
import './disableVendor.less';

export class DisableVendor extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            assignee: null,
            originalAssignee: this.props.vendor.getId(),
        };
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    canSubmit() {
        return this.state.assignee !== this.state.originalAssignee;
    }

    submitForm() {
        this.props.reassignJobs({
            id: this.state.originalAssignee,
            assignee: this.state.assignee,
        });
        this.props.onClose();
    }

    closeForm() {
        this.props.reassignJobs({
            id: this.state.originalAssignee,
            assignee: null,
        });
        this.props.onClose();
    }

    render() {
        const canSubmit = this.canSubmit();
        const name = this.props.vendor.getFirstName();
        const form = (
            <div className="reassign-form">
                <div className="intro">
                    <div className="title">{ name }'s jobs</div>
                    <div className="subtitle">The cleaner you disabled was already assigned to jobs. Please reassign other cleaners.</div>
                </div>
                <div className="side-by-side">
                    <div className="small">
                        <CleanerPicker
                            onSelect={ (cleaner) => this.handleChange('assignee', cleaner.getId()) }
                            defaultValue={ this.state.assignee }
                        />
                    </div>
                </div>
            </div>
        );
        return (
            <div className="vendors-job-details-reassign">
                <Modal
                    content={ form }
                    submitLabel="Confirm"
                    cancelLabel="Leave Unassigned"
                    title="Disable Cleaner"
                    icon="syncDisable"
                    submitDisabled={ !canSubmit }
                    onClose={ () => this.closeForm() }
                    onSubmit={ () => this.submitForm() }
                />
            </div>
        );
    }
}

export function mapDispatchToProps(dispatch) {
    return {
        reassignJobs: (data) => dispatch(reassignJobs(data)),
    };
}

export default connect(null, mapDispatchToProps)(DisableVendor);
