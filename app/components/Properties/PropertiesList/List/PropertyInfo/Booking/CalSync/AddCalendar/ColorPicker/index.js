import React from 'react';
import SVG from 'components/SVG';
import './colorPicker.less';

export class ColorPicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            colors: [
                { hex: '#757575', id: null, name: 'grey' },
                { hex: '#fe7b76', id: 'Pink Lemonade', name: 'pink' },
                { hex: '#ffb400', id: 'Royal Gold', name: 'yellow' },
                { hex: '#5b9b44', id: 'Green Tea', name: 'green' },
                { hex: '#1f3975', id: 'Midnight Blue', name: 'darkblue' },
                { hex: '#68306d', id: 'Sweet Plum', name: 'darkviolet' },
                { hex: '#d44d5b', id: 'Courageous Red', name: 'red' },
                { hex: '#ba8f00', id: 'Sunset Yellow', name: 'brown' },
                { hex: '#5cc7bd', id: 'Jungle Teal', name: 'greyish' },
                { hex: '#42a5f5', id: 'Ocean Blue', name: 'blue' },
                { hex: '#9b88b8', id: 'Fighting Fushia', name: 'violet' },
            ],
        };
    }

    onColorSelect(color) {
        this.props.onSelect(color);
    }

    render() {
        return (
            <div className="availability-calendars-add-calendar-color-picker">
                <div className="choose">Choose Display Color:</div>
                <div className="colors">
                    { this.state.colors.map(color => {
                        return (
                            <div
                                onClick={ () => this.onColorSelect(color) }
                                key={ color.id }
                                style={{ background: color.hex }}
                                className="color"
                            >
                                { this.props.active === color.name &&
                                    <SVG className="color-check" icon="checkmark"/>
                                }
                            </div>
                        );
                    }) }
                </div>
            </div>
        );
    }
}

export default ColorPicker;
