import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import TextField from 'components/TextField';
import Select from 'components/Select';
import './room.less';

export class Room extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            beds: props.room.getBeds()
        };
    }

    addBed() {
        const beds = this.state.beds;
        beds.push('');
        this.setState({ beds: beds });
    }

    removeBed() {
        const beds = this.state.beds;
        beds.pop();
        this.setState({ beds: beds });
    }

    render() {
        const { id, onDelete, room, onChange } = this.props;
        return (
            <div className="rooms-details-room">
                <div className="room-details-header">
                    <div className="room-name">Room #{ id }</div>
                    { id !== 1 && <SVG className="delete" icon="del" size="18" onClick={ onDelete }/> }
                </div>
                <div className="room-details-form">
                    <TextField
                        id="r-name"
                        label="Room name"
                        placeholder="e.g. Living Room"
                        onChange={ (evt) => { room.setName(evt.target.value); onChange(); } }
                        value={ room.getName() }
                    />
                    <div className="dropdowns">
                        <div className="first">
                            <Select
                                label="Type"
                                placeholder="-"
                                onChange={ (val) => { room.setType(val); onChange(); } }
                                defaultValue={ room.getType() }
                                options={[
                                    { name: 'Attic', value: 'Attic' },
                                    { name: 'Basement', value: 'Basement' },
                                    { name: 'Bedroom', value: 'Bedroom' },
                                    { name: 'Kid’s Bedroom', value: 'Kids Bedroom' },
                                    { name: 'Guest Bedroom', value: 'Guest Bedroom' },
                                    { name: 'Loft', value: 'Loft' },
                                    { name: 'Master Bedroom', value: 'Master Bedroom' },
                                    { name: 'Other Studio', value: 'Other' },
                                ]}/>
                            <Select
                                label="Bathroom"
                                placeholder="-"
                                onChange={ (val) => { room.setBathroom(val); onChange(); } }
                                defaultValue={ room.getBathroom() }
                                options={[
                                    { name: '1 bathroom', value: 1 },
                                    { name: 'No bathroom', value: 0 },
                                ]}/>
                        </div>
                        <div className="second">
                            { this.state.beds.map((bed, index) => {
                                return (
                                    <Select
                                        key={ index }
                                        id={ index }
                                        label="Bed"
                                        placeholder="-"
                                        onChange={ (val) => { room.setBed(index, val); onChange(); } }
                                        defaultValue={ bed }
                                        options={[
                                            { name: 'Twin Bed', value: 'Twin Bed' },
                                            { name: 'Crib', value: 'Crib' },
                                            { name: 'Full Size', value: 'Full Size' },
                                            { name: 'King Size', value: 'King Size' },
                                            { name: 'Other', value: 'Other' },
                                            { name: 'Queen Size', value: 'Queen Size' },
                                            { name: 'Single/Twin size', value: 'Single/Twin size' },
                                            { name: 'Bunk Bed', value: 'Bunk Bed' },
                                        ]}/>
                                );
                            }) }
                            <div className="buttons">
                                { this.state.beds.length > 1 &&
                                    <div className="delete btn" onClick={ () => this.removeBed() }>
                                        <SVG icon="deleteCircle" size="20"/>
                                    </div>
                                }
                                { this.state.beds.length < 5 &&
                                    <div className="btn" onClick={ () => this.addBed() }>
                                        <SVG icon="addCircle" size="20"/>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Room.PropTypes = {
    id: PropTypes.any.isRequired,
    onDelete: PropTypes.func,
    onChange: PropTypes.func,
    room: PropTypes.object
};

export default Room;
