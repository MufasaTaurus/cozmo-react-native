// const variables = [
//     { name: 'Address', key: '{{address}}' },
//     { name: 'Agent Name', key: '{{agent_name}}' },
//     { name: 'Guest Name', key: '{{guest_name}}' },
//     { name: 'Listing Url', key: '{{listing_url}}' }
// ];

const variables = {
    custom: [
        {
            display: 'Abc',
            name: 'abc',
            value: ''
        },
    ],
    reservations: [
        {
            display: 'Id',
            name: 'reservation_id',
            value: ''
        },
        {
            display: 'Price',
            name: 'reservation_price',
            value: ''
        },
        {
            display: 'Adults',
            name: 'adults',
            value: ''
        },
        {
            display: 'Children',
            name: 'children',
            value: ''
        },
        {
            display: 'Guest count',
            name: 'guest_count',
            value: ''
        },
        {
            display: 'Number of nights',
            name: 'num_nights',
            value: ''
        },
        {
            display: 'Arrival date',
            name: 'arrival_date',
            value: ''
        },
    ],
    users: {
        guest: [
            {
                display: 'Name',
                name: 'guest_name',
                value: ''
            },
            {
                display: 'E-mail',
                name: 'guest_email',
                value: ''
            },
            {
                display: '2nd E-mail',
                name: 'guest_secondary_email',
                value: ''
            },
            {
                display: 'Phone',
                name: 'guest_phone',
                value: ''
            },
            {
                display: '2nd Phone',
                name: 'guest_secondary_phone',
                value: ''
            },
        ],
        agent: [
            {
                display: 'Name',
                name: 'agent_name',
                value: ''
            },
            {
                display: 'E-mail',
                name: 'agent_email',
                value: ''
            },
            {
                display: 'Phone',
                name: 'agent_phone',
                value: ''
            },
        ],
        cleaner: [
            {
                display: 'Name',
                name: 'cleaner_name',
                value: ''
            },
            {
                display: 'E-mail',
                name: 'cleaner_email',
                value: ''
            },
            {
                display: 'Phone',
                name: 'cleaner_email',
                value: ''
            },
        ],
    },
    property: [
        {
            display: 'Address',
            name: 'property_address',
            value: ''
        },
        {
            display: 'Name',
            name: 'property_name',
            value: ''
        },
        {
            display: 'City',
            name: 'city',
            value: ''
        },
        {
            display: 'Country',
            name: 'country',
            value: ''
        },
        {
            display: 'Continent',
            name: 'continent',
            value: ''
        },
        {
            display: 'Region',
            name: 'region',
            value: ''
        },
        {
            display: 'District',
            name: 'district',
            value: ''
        },
        {
            display: 'Postal Code',
            name: 'postal_code',
            value: ''
        },
        {
            display: 'Type',
            name: 'property_type',
            value: ''
        },
        {
            display: 'Rental Type',
            name: 'rental_type',
            value: ''
        },
        {
            display: 'Bedrooms',
            name: 'bedrooms',
            value: ''
        },
        {
            display: 'Bathrooms',
            name: 'bathrooms',
            value: ''
        },
        {
            display: 'Max guests',
            name: 'max_guests',
            value: ''
        },
        {
            display: 'Summary',
            name: 'summary',
            value: ''
        },
        {
            display: 'Description',
            name: 'description',
            value: ''
        },
    ],
    listing: [
        {
            display: 'Url',
            name: 'listing_url',
            value: ''
        },
        {
            display: 'Check in from',
            name: 'check_in_from',
            value: ''
        },
        {
            display: 'Check in to',
            name: 'check_in_to',
            value: ''
        },
        {
            display: 'Check out until',
            name: 'check_out_until',
            value: ''
        },
        {
            display: 'Things to do',
            name: 'things_to_do',
            value: ''
        },
        {
            display: 'Min stay',
            name: 'min_stay',
            value: ''
        },
        {
            display: 'Max stay',
            name: 'max_stay',
            value: ''
        },
    ]
};

export const replaceVariables = (text, reservation, username) => {
    let replacedText = text;
    replacedText = replacedText.replace('{{address}}', reservation.getPropertyAddress());
    replacedText = replacedText.replace('{{agent_name}}', username);
    replacedText = replacedText.replace('{{guest_name}}', reservation.getGuestFullName());
    replacedText = replacedText.replace('{{listing_url}}', reservation.getListingUrl());
    return replacedText;
};

export default variables;
