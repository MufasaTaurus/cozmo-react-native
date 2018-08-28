import React, {PropTypes} from 'react';

export class GridView extends React.Component {

    constructor(props) {
        super(props);
        this.style = {
            display: 'flex',
            width: '100%',
            height: '100%',
            flexWrap: 'wrap'
        };
    }

    render() {
        return (
            <div className="grid-view" style={ this.style }>
                <div style={{ flex: 1, marginRight: 10 }}>
                    { this.props.items.first.map((item, index) => {
                        return <div key={ index } style={{ marginBottom: 10 }}>{ item.content }</div>;
                    }) }
                </div>
                <div style={{ flex: 3 }}>
                    { this.props.items.second.map((item, index) => {
                        return <div key={ index } style={{ marginBottom: 10 }}>{ item.content }</div>;
                    }) }
                </div>
            </div>
        );
    }
}

GridView.propTypes = {
    items: PropTypes.object.isRequired,
};

export default GridView;

