import React from 'react';
import TextField from 'components/TextField';
import Modal from 'components/Modal';
import CleanerPicker from 'components/CleanerPicker';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateJob } from 'containers/Vendors/actions';
import { addAlert } from 'containers/App/actions';
import { selectSelectedJob, makeSelectLoading } from 'containers/Vendors/selectors';
import { selectCleaners } from 'containers/App/selectors';
import './reassign.less';

export class Reassign extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            assignee: props.assignee,
            originalAssignee: props.assignee,
            cost: parseInt(props.cost),
            id: props.id
        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            assignee: nextProps.assignee,
            originalAssignee: nextProps.assignee,
            cost: parseInt(nextProps.cost),
            id: nextProps.id
        });
    }

    handleChange(field, value) {
        this.setState({ [field]: value });
    }

    canSubmit() {
        return this.state.assignee !== this.state.originalAssignee && this.state.cost;
    }

    submitForm() {
        this.props.updateJob(this.state);
        this.props.onClose();
    }

    render() {
        const canSubmit = this.canSubmit();
        const form = (
            <div className="reassign-form">
                <div className="intro">
                    <div className="title">Assign your cleaner</div>
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
                        submitLabel="Assign"
                        title="Reassign a Cleaner"
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
    job: selectSelectedJob(),
    loading: makeSelectLoading(),
    cleaners: selectCleaners(),
});

export function mapDispatchToProps(dispatch) {
    return {
        updateJob: (data) => dispatch(updateJob(data)),
        addAlert: (data) => dispatch(addAlert(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Reassign);
