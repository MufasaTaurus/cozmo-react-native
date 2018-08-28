import React from 'react';
import debounce from 'lodash/debounce';
import TitleHeader from 'components/TitleHeader';
import Select from 'components/Select';
import TextField from 'components/TextField';
import SegmentedButton from 'components/SegmentedButton';
import './basicInfo.less';

export class BasicInfo extends React.Component {

    constructor(props) {
        super(props);
        const scheduler = props.property.getScheduler();
        this.state = {
            scheduler: scheduler.isAuto(),
            estimated: scheduler.getEstimate(),
            from: scheduler.getFrom(),
            to: scheduler.getTo()
        };

        this.saveChanges = debounce(this.saveChanges.bind(this), 300);
    }

    onChange(field, value) {
        this.setState({ [field]: value });
        if (value) {
            this.saveChanges();
        }
    }

    saveChanges() {
        this.props.onChange({
            id: this.props.property.getId(),
            section: 'scheduling_assistant',
            val: {
                automatically_assign: this.state.scheduler,
                time_estimate: this.state.estimated + ':00:00',
                cleaning_from_time: this.state.from,
                cleaning_to_time: this.state.to
            }
        });
    }

    render() {
        const { property } = this.props;
        return (
            <div className="vendors-properties-details-basic-info">
                <div className="property-image" style={{ backgroundImage: 'url(' + property.getImage() + ')' }}>
                    <div className="name">
                        <div className="text">{ property.getName() }</div>
                        <div className="text">{ property.getAddress() }</div>
                    </div>
                </div>
                <div className="cleaning-time">
                    <div className="vj-card">
                        <TitleHeader title="Cleaning Time (Default)" icon="clock"/>
                        <div className="cleaning-time-form">
                            <div className="side-by-side">
                                <div className="short space">
                                    <Select
                                        label="Working Window"
                                        addonLeft="From"
                                        defaultValue={ this.state.from }
                                        options={[
                                            { name: '09:00AM', value: '09:00' },
                                            { name: '10:00AM', value: '10:00' },
                                            { name: '11:00AM', value: '11:00' }
                                        ]}
                                        onChange={ (val) => this.onChange('from', val) }
                                    />
                                </div>
                                <div className="short">
                                    <Select
                                        addonLeft="To"
                                        defaultValue={ this.state.to }
                                        options={[
                                            { name: '06:00PM', value: '18:00' },
                                            { name: '07:00PM', value: '19:00' },
                                            { name: '08:00PM', value: '20:00' }
                                        ]}
                                        onChange={ (val) => this.onChange('to', val) }
                                    />
                                </div>
                            </div>
                            <div className="short">
                                <TextField
                                    id="est"
                                    label="Estimated Cleaning Time"
                                    addonRight="Hours"
                                    type="number"
                                    value={ this.state.estimated }
                                    onChange={ (evt) => this.onChange('estimated', evt.target.value) }
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="scheduler">
                    <div className="vj-card">
                        <TitleHeader title="Schedule Assistant" icon="cogwheel"/>
                        <div className="scheduler-form">
                            <p className="info">
                                Automatically assign job to your cleaners every checkout day.
                            </p>
                            <div className="segmented-wrapper">
                                <SegmentedButton
                                    value={ this.state.scheduler }
                                    onClick={ (val) => this.onChange('scheduler', val) }
                                    segments={[
                                        { label: 'ON', value: true },
                                        { label: 'OFF', value: false, activeClass: 'off-active' }
                                    ]}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default BasicInfo;
