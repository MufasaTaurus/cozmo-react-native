export default class Room {
    constructor(room) {
        this.id = room.id;
        this.name = room.name;
        this.type = room.type;
        this.bathroom = room.bathroom;
        this.beds = room.beds || [''];
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    getBathroom() {
        return this.bathroom;
    }

    getBeds() {
        return this.beds;
    }

    getBed(index) {
        return this.beds[index];
    }

    setName(name) {
        this.name = name;
        return this;
    }

    setType(type) {
        this.type = type;
        return this;
    }

    setBathroom(bathroom) {
        this.bathroom = bathroom;
        return this;
    }

    setBeds(beds) {
        this.beds = beds;
        return this;
    }

    setBed(index, bed) {
        this.getBeds()[index] = bed;
        return this;
    }

    convertFrom(oldRoom) {
        this.name = oldRoom.get('description');
        this.type = oldRoom.get('type');
        this.beds = oldRoom.get('beds');
        this.bathroom = oldRoom.get('bathrooms');
        return this;

    }
}
