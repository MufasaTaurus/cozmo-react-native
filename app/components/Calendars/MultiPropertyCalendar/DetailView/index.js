import React from 'react';
import Rows from '.././Rows';

export class DetailView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            shouldRender: false,
        };
    }

    componentDidMount() {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => this.setState({ shouldRender: true }));
        });
    }

    render() {
        return (
            this.state.shouldRender ?
                <Rows
                    rows={ this.props.rows }
                    query={ this.props.query }
                    handleSearchQueryChange={ this.props.handleSearchQueryChange }
                    loading={ this.props.loading }
                    fetchNextPeriod={ this.props.fetchNextPeriod }
                    fetchNextPage={ this.props.fetchNextPage }
                    numberOfProperties={ this.props.numberOfProperties }
                    datesFilter={ this.props.datesFilter }
                    onCurrentMonthChange={ this.props.datesFilter }
                    days={ this.props.days } />
                : null
        );
    }
}

export default DetailView;
