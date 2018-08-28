import React from 'react';
import debounce from 'lodash/debounce';
import Search from 'components/Search';
import Spinner from 'components/Spinner';
import Ticket from '../Ticket';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {searchTickets} from 'containers/Inbox/actions';
import {selectSearchingTickets, selectSearchedTickets} from 'containers/Inbox/selectors';

export class FindTickets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.searchTickets = debounce(this.searchTickets.bind(this), 500);
    }

    onQueryChange(value) {
        this.setState({ query: value });
        this.searchTickets(value);
    }

    searchTickets(val) {
        if (val) {
            this.props.searchTickets(val);
        }
    }

    render() {
        const isEmpty = this.props.tickets.size === 0;
        const selected = this.props.selected.map(t => t.getId());
        this.props.parent && selected.push(this.props.parent.getId());
        return (
            <div className="find-tickets-search">
                <div className="search-wrapper">
                    <Search
                        onChange={ (evt) => this.onQueryChange(evt.target.value) }
                        value={ this.state.query }
                        placeholder="Search tickets"/>
                </div>

                <div className="found-tickets">
                    { this.props.loading ?
                        <div className="spinner-wrapper"><Spinner/></div>
                        :
                        isEmpty || !this.state.query ? <div className="empty-state">No Results</div>
                            :
                            this.props.tickets
                                .filter(t => selected.indexOf(t.getId()) < 0)
                                .map(t => {
                                    return (
                                        <Ticket
                                            key={ t.getId() }
                                            ticket={ t }
                                            canDropToSelected
                                            onDrop={ this.props.onDrop }
                                        />
                                    );
                            })
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    tickets: selectSearchedTickets(),
    loading: selectSearchingTickets(),
});


export function mapDispatchToProps(dispatch) {
    return {
        searchTickets: (data) => dispatch(searchTickets(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(FindTickets);
