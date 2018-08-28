import React from 'react';
import debounce from 'lodash/debounce';
import { fromJS } from 'immutable';
import Room from './Room/index';
import Button from 'components/ButtonNew';
import Section from '../Section/index';
import TitleHeader from 'components/TitleHeader';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateNewProperty, updateProperty } from 'containers/Properties/actions';
import { makeSelectSelectedProperty, makeSelectNewProperty } from 'containers/Properties/selectors';
import RoomModel from 'models/Room';
import './rooms.less';

export class Rooms extends React.Component {

    constructor(props) {
        super(props);
        const property = props.create ? props.newProperty : props.property;
        this.state = {
            dialogOpen: false,
            editedRoom: '',
            form: {},
            rooms: property.get('rooms').size ? property.get('rooms').map(r => new RoomModel({}).convertFrom(r)).toArray() : [new RoomModel({})]
        };
        this.saveExistingProperty = debounce(this.saveExistingProperty.bind(this), 1000);
    }

    saveRooms() {
        const rooms = this.state.rooms.map(room =>
            fromJS({
                description: room.getName(),
                type: room.getType(),
                beds: room.getBeds(),
                bathrooms: room.getBathroom(),
            })
        );
        if (this.props.create) {
            this.props.updateNewProperty(this.props.newProperty.set('rooms', fromJS(rooms)));
        } else {
            this.saveExistingProperty(rooms);
        }
    }

    saveExistingProperty(rooms) {
        this.props.updateProperty({
            id: this.props.property.get('id'),
            section: 'rooms',
            val: rooms
        });
    }

    deleteRoom(index) {
        const rooms = this.props.newProperty.get('rooms');
        this.props.updateNewProperty(
            this.props.newProperty.set('rooms', rooms.remove(index))
        );
    }

    editRoom(index) {
        const rooms = this.props.newProperty.get('rooms');
        const room = rooms.get(index);
        const bed = room.get('amenities').find((a) => a.get('name') === 'beds');
        const bathrooms = room.get('amenities').find((a) => a.get('name') === 'bathrooms');
        this.setState({
            form: {
                description: room.get('description'),
                type: room.get('room'),
                beds: bed ? bed.get('value') : '',
                bathrooms: bathrooms ? bathrooms.get('value') : ''
            },
            dialogOpen: true,
            editedRoom: index
        });
    }

    addRoom() {
        const rooms = this.state.rooms;
        rooms.push(new RoomModel({}));
        this.setState({ rooms: rooms });
    }

    removeRoom(index) {
        const rooms = this.state.rooms;
        rooms.splice(index, 1);
        this.setState({ rooms: rooms });
    }

    render() {
        return (
            <section className="rooms-details step">
                <TitleHeader title="Room details (optional)" icon="bedAirplane"/>
                <Section title={ '' } customContent={
                    <div>
                        { this.state.rooms.map((room, index) => {
                            return (
                                <Room
                                    key={ index }
                                    room={ room }
                                    id={ index + 1 }
                                    onDelete={ () => this.removeRoom(index) }
                                    onChange={ () => this.saveRooms() }
                                />
                            );
                        }) }

                        { this.state.rooms.length < 20 &&
                            <div className="add-room">
                                <Button
                                    label="Add"
                                    className="small green"
                                    onClick={ () => this.addRoom() }
                                />
                            </div>
                        }
                    </div>
                }/>
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
        updateNewProperty: (data) => dispatch(updateNewProperty(data)),
        updateProperty: (data) => dispatch(updateProperty(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Rooms);
