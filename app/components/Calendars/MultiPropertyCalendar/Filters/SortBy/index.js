import React from 'react';
import SVG from 'components/SVG';
import onClickOutside from 'react-onclickoutside';
import './sortBy.less';

export class SortBy extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
        this.sortOptions = [
            { name: 'Price: low to high', value: 'price' },
            { name: 'Price: high to low', value: '-price' },
            { name: 'Guests: low to high', value: 'capacity' },
            { name: 'Guests: high to low', value: '-capacity' },
            { name: 'None', value: null },
        ];
    }

    handleClickOutside() {
        this.setState({ open: false });
        this.props.disableOnClickOutside();
    }

    toggleOpen() {
        this.setState({ open: !this.state.open });
        if (this.state.open) {
            this.props.disableOnClickOutside();
        } else {
            this.props.enableOnClickOutside();
        }
    }

    getPicketName() {
        if (this.props.value == null) {
            return 'Sort By';
        } else {
            return this.sortOptions.filter(f => f.value === this.props.value)[0].name;
        }
    }

    render() {
        return (
            <div className="sort-by">
                <div className="sort-by-button" onClick={ () => this.toggleOpen() }>
                    <div className="sort-icon"><SVG icon="sort" size="20"/></div>
                    <div className="label">{ this.getPicketName() }</div>
                    <div className="icon"><SVG icon="triangle" size="14"/></div>
                </div>
                { this.state.open &&
                    <div className="options">
                        { this.sortOptions.map(o => {
                            return <div key={ o.name }
                                        className="option"
                                        onClick={ () => { this.props.onChange(o.value); this.toggleOpen(); } }>
                                        { o.name }
                                    </div>;
                        }) }
                    </div>
                }
            </div>
        );
    }
}

export default onClickOutside(SortBy);
