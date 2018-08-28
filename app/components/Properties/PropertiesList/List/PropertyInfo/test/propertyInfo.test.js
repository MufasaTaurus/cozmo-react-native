import React from 'react';
import { mount } from 'enzyme';
import { PropertyInfo } from 'components/Properties/PropertiesList/List/PropertyInfo';
import { Provider } from 'react-redux';
import { fromJS } from 'immutable';
import { ThingsToDo } from '../ThingsToDo/index';

jest.mock('components/Map');

let actions = [];
const defaultStore = {
    subscribe: () => {},
    dispatch: (action) => actions.push(action),
    getState: () => fromJS({
        reservations: {
            propertyCalendars: {},
            addingRate: 'ok',
            quoteFetching: 'ok',
            quote: null,
            loading: false
        },
        global: {
            windowSize: 0
        },
        properties: {
            newProperty: {
                name: 'Name',
                id: 1,
                description: 'Description',
                address: 'Street',
                arrival_instruction: {
                    description: 'abcdef'
                },
                max_guests: 10,
                thingsToDo: 'To Do',
                calendar: {
                    id: '6a969db1-b59b-4339-9428-5930e0176af2',
                    external_cals: [],
                    prop: 164
                },
                images: [
                    {
                        url: 'image_url',
                        id: 1
                    },
                ],
                rooms: [],
            },
            selectedProperty: {
                name: 'Name',
                id: 1,
                description: 'Description',
                address: 'Street',
                arrival_instruction: {
                    description: 'abcdef'
                },
                max_guests: 10,
                thingsToDo: 'To Do',
                calendar: {
                    id: '6a969db1-b59b-4339-9428-5930e0176af2',
                    external_cals: [],
                    prop: 164
                },
                images: [
                    {
                        url: 'image_url',
                        id: 1
                    },
                ],
                rooms: [],
            },
            selectedProperty2: {
                name: 'Name',
                id: 2,
                description: 'Description',
                address: 'Street',
                arrival_instruction: {
                    description: 'abcdef'
                },
                max_guests: 10,
                thingsToDo: 'To Do',
                calendar: {
                    id: '6a969db1-b59b-4339-9428-5930e0176af2',
                    external_cals: [],
                    prop: 164
                },
                pois: [
                    {
                        id: 1,
                        name: 'old poi',
                        position: {
                            lat: 10,
                            lng: 10,
                        },
                        description: 'old description',
                    }
                ],
                images: [
                    {
                        url: 'image_url',
                        id: 1
                    },
                ],
                rooms: [],
            }
        }
    })
};

const renderComponent = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <PropertyInfo { ...props } />
    </Provider>
);

const renderThingsToDo = (props = {}, store = defaultStore) => mount(
    <Provider store={ store }>
        <ThingsToDo { ...props } />
    </Provider>
);

//
//                          ******** PROPERTY INFO ********
//
describe('<PropertyInfo />', () => {
    it('should render default section', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: '',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('SideBar').length).toEqual(1);
        expect(renderedComponent.find('Breadcrumbs').length).toEqual(1);
        expect(renderedComponent.find('.content-wrapper').length).toEqual(1);
        //expect(renderedComponent.find('Calendar').length).toEqual(1);
        expect(renderedComponent.find('Location').length).toEqual(0);
    });

    it('should render location section', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'location',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('BasicDetails').length).toEqual(0);
        expect(renderedComponent.find('Location').length).toEqual(1);
        expect(renderedComponent.find('Map').length).toEqual(1);
    });

    it('should render Breadcrumbs section', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'location',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const breadcrumbs = renderedComponent.find('Breadcrumbs');
        expect(breadcrumbs.props().section).toEqual('Location');
    });

    it('should pass right props to SideBar', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'location',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const sideBar = renderedComponent.find('SideBar');
        expect(sideBar.props().content[0].baseUrl).toEqual('/properties/1');
    });
});
//
//                          ******** BASIC DETAILS ********
//
describe('<BasicDetails />', () => {
    it('should render Property Details card', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'details',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('Section').length).toEqual(2);
        expect(renderedComponent.find('Section').at(1).find('.title').text()).toEqual('Property Details');
    });

    it('should render Description card', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'details',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('Section').length).toEqual(2);
        expect(renderedComponent.find('Section').at(0).find('.title').text()).toEqual('Description');
    });

    it('should render 3 dropdown inputs', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'details',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('#bed').length).toEqual(1);
        expect(renderedComponent.find('#bath').length).toEqual(1);
        expect(renderedComponent.find('#people').length).toEqual(1);
        expect(renderedComponent.find('#people').find('.value').text()).toEqual('10');
    });

    it('should update property', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'details',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const descriptionSection = renderedComponent.find('#desc');
        expect(descriptionSection.props().value).toEqual('Description');
        descriptionSection.simulate('change', { target: { value: 'abc' } });
        expect(descriptionSection.props().value).toEqual('abc');
    });
});
//
//                          ******** LOCATION ********
//
describe('<Location />', () => {
    it('should render 2 cards and a map', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'location',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('Section').length).toEqual(2);
        expect(renderedComponent.find('Map').length).toEqual(1);
    });

    it('should render address', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'location',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const sections = renderedComponent.find('Section');

        expect(sections.at(0).find('.title').text()).toEqual('Address');
        //expect(sections.at(0).find('#address').props().value).toEqual('Street');

        expect(sections.at(1).find('.title').text()).toEqual('Special Directions (Optional)');
        expect(sections.at(1).find('.text').find('#sd').text()).toEqual('abcdef');
    });
});
//
//                          ******** ROOMS ********
//
describe('<Rooms />', () => {
    it('should render room card', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'room-details',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('.rooms-details').length).toEqual(1);
        expect(renderedComponent.find('Room').length).toEqual(1);
    });

    it('should add and remove room card', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'room-details',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('.add-room').first().length).toEqual(1);
        renderedComponent.find('.add-room').find('ButtonNew').simulate('click');
        expect(renderedComponent.find('Room').length).toEqual(2);
        renderedComponent.find('Room').at(1).find('.delete').simulate('click');
        expect(renderedComponent.find('Room').length).toEqual(1);
    });
});
//
//                          ******** PHOTOS ********
//
describe('<Photos />', () => {
    it('should render header and card', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'photos',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('.title-header').length).toEqual(1);
        expect(renderedComponent.find('.card').length).toEqual(1);
    });

    it('should render photos', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'photos',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const images = renderedComponent.find('Image');
        expect(images.length).toEqual(1);
        expect(images.at(0).props().url).toEqual('image_url');
    });

    it('should extend image when clicked and close on button click', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'photos',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('Modal').length).toEqual(0);
        renderedComponent.find('Image').props().onClick();
        expect(renderedComponent.find('Modal').length).toEqual(1);
        renderedComponent.find('Modal').props().onClose();
        expect(renderedComponent.find('Modal').length).toEqual(0);
    });
});
//
//                          ******** AVAILABILITY ********
//
describe('<Availability />', () => {
    it('should render 5 cards', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'availability',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const cards = renderedComponent.find('Section');
        expect(cards.length).toEqual(4);
    });

    it('card trip length should render', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'availability',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('Section').at(0).props().title).toEqual('Trip Length');
    });

    it('card trip length input min stay should update', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'availability',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const card = renderedComponent.find('Section').at(0);
        expect(card.find('#min-stay').props().value).toEqual('');
        card.find('#min-stay').simulate('change', { target: { value: 5 } });
        expect(card.find('#min-stay').props().value).toEqual(5);
    });

    it('card trip length input max stay should update', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'availability',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const card = renderedComponent.find('Section').at(0);
        expect(card.find('#max-stay').props().value).toEqual('');
        card.find('#max-stay').simulate('change', { target: { value: 10 } });
        expect(card.find('#max-stay').props().value).toEqual(10);
    });

    it('card age restriction should render', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'availability',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('Section').at(1).props().title).toEqual('Age Restriction');
    });

    it('card age restriction input should update', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'availability',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const card = renderedComponent.find('Section').at(1);
        expect(card.find('#min-age').props().value).toEqual(13);
        card.find('#min-age').simulate('change', { target: { value: 18 } });
        expect(card.find('#min-age').props().value).toEqual(18);
    });

    it('card check in/out should render', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'availability',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const card = renderedComponent.find('Section').at(2);
        expect(card.props().title).toEqual('Check In/Out Times');
    });

    it('card check in/out input check in start should update', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'availability',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const inputs = renderedComponent.find('Section').at(2).find('Select');

        expect(inputs.at(0).props().defaultValue).toEqual(null);
        inputs.at(0).props().onChange('10:00');
        expect(inputs.at(0).props().defaultValue).toEqual('10:00');

        expect(inputs.at(1).props().defaultValue).toEqual(null);
        inputs.at(1).props().onChange('10:00');
        expect(inputs.at(1).props().defaultValue).toEqual('10:00');

        expect(inputs.at(2).props().defaultValue).toEqual(null);
        inputs.at(2).props().onChange('10:00');
        expect(inputs.at(2).props().defaultValue).toEqual('10:00');
    });

    it('card reservation should render', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'availability',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('Section').at(3).props().title).toEqual('Reservation Preferences');
    });

    it('card reservation inputs should update', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'availability',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const inputs = renderedComponent.find('Section').at(3).find('Select');

        expect(inputs.at(0).props().value).toEqual(1);
        inputs.at(0).props().onChange(2);
        expect(inputs.at(0).props().value).toEqual(2);

        expect(inputs.at(1).props().value).toEqual(0);
        inputs.at(1).props().onChange(1);
        expect(inputs.at(1).props().value).toEqual(1);

        expect(inputs.at(2).props().value).toEqual(180);
        inputs.at(2).props().onChange(90);
        expect(inputs.at(2).props().value).toEqual(90);

    });

    // it('card calendar should render', () => {
    //     const renderedComponent = renderComponent({
    //         id: 1,
    //         section: 'availability',
    //         property: defaultStore.getState().get('properties').get('selectedProperty')
    //     });
    //
    //     const card = renderedComponent.find('Section').at(4);
    //     expect(card.props().title).toEqual('Calendars Syncing');
    // });
});
//
//                          ******** AMENITIES ********
//
describe('<Amenities />', () => {
    it('should render 4 cards', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'amenities',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('Section').length).toEqual(4);
    });

    it('should update additional amenities', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'amenities',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const additional = renderedComponent.find('Section').at(3);
        expect(additional.props().text).toEqual('');
        additional.find('.text-field').simulate('change', { target: { value: 'New amenities' } });
        expect(additional.find('.text-field').text()).toEqual('New amenities');
    });

    it('amenities should toggle', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'amenities',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const icons = renderedComponent.find('.amen');
        expect(icons.at(2).props().className).toEqual('amen');
        icons.at(2).simulate('click');
        expect(icons.at(2).props().className).toEqual('amen active');
        icons.at(2).simulate('click');
        expect(icons.at(2).props().className).toEqual('amen');
    });
});
//
//                          ******** THINGS TO DO ********
//
describe('<ThingsToDo />', () => {
    it('should render 2 cards', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'things-to-do',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('Section').length).toEqual(1);
        expect(renderedComponent.find('.pois').length).toEqual(1);
    });

    it('should update description', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'amenities',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const description = renderedComponent.find('TextField');
        expect(description.props().value).toEqual('');
        description.props().onChange({ target: { value: 'New description' } });
        expect(description.props().value).toEqual('New description');
    });

    it('should render map', () => {
        const renderedComponent = renderComponent({
            id: '1',
            section: 'things-to-do',
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('.pois').length).toEqual(1);
        expect(renderedComponent.find('Map').length).toEqual(0);
        renderedComponent.find('ButtonNew').at(1).props().onClick();
        expect(renderedComponent.find('.pois').length).toEqual(0);
        expect(renderedComponent.find('Map').length).toEqual(1);
    });

    it('should add pois', () => {
        const addSpy = jest.fn();
        const renderedComponent = renderThingsToDo({
            addPoi: addSpy,
            property: defaultStore.getState().get('properties').get('selectedProperty'),
            fetchProperty: () => {}
        });

        const newPoi = {
            position: {
                lat: 5,
                lng: 5
            }
        };

        renderedComponent.find('ButtonNew').at(1).props().onClick();
        expect(renderedComponent.find('Map').length).toEqual(1);
        renderedComponent.find('Map').props().onAddPoi(newPoi);
        expect(addSpy).toHaveBeenCalled();
    });

    it('should render and remove pois', () => {
        const addSpy = jest.fn();
        const renderedComponent = renderThingsToDo({
            removePoi: addSpy,
            property: defaultStore.getState().get('properties').get('selectedProperty2'),
            fetchProperty: () => {}
        });

        expect(renderedComponent.find('Map').length).toEqual(1);
        expect(renderedComponent.find('Poi').length).toEqual(1);
        renderedComponent.find('Poi').props().onRemove();
        expect(addSpy).toHaveBeenCalled();
    });

    it('should display description of pois', () => {
        const renderedComponent = renderThingsToDo({
            property: defaultStore.getState().get('properties').get('selectedProperty2'),
            fetchProperty: () => {}
        });

        const poi = renderedComponent.find('Poi');

        expect(poi.length).toEqual(1);
        poi.find('.description').simulate('click');
        expect(poi.find('.text-field').text()).toEqual('old description');
    });
});
