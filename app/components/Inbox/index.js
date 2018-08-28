import React from 'react';
import Spinner from 'components/Spinner';
import Filters from './Filters';
import CreateNewTicket from './CreateNewTicket';
import Breadcrumbs from './Breadcrumbs';
import TicketsList from './TicketsList';
import TicketDetails from './TicketDetails';
import Guest from './Guest';
import UnderConstruction from 'components/UnderConstruction';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectModalVisible, selectTickets} from 'containers/Inbox/selectors';
import {createNewTicket, setModalVisible, fetchTickets} from 'containers/Inbox/actions';
import './inbox.less';

export class InboxComponent extends React.Component {

    constructor(props) {
        super(props);
        if (!this.props.tickets.size) {
            this.props.fetchTickets();
        }
    }

    shouldDisplayPlaceholder() {
        return process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging';
    }

    render() {
        const shouldDisplayPlaceholder = this.shouldDisplayPlaceholder();
        const renderContent = () => {
            if (this.props.loading) {
                return <div className="spinner-wrapper"><Spinner size={ 100 }/></div>;
            } else {
                return (
                    <div className="inbox-loaded">
                        { this.props.id ? '' :
                            <div className="side-bar-wrapper">
                                <Filters/>
                            </div>
                        }
                        <div className="inbox-content">
                            <Breadcrumbs id={ this.props.id } guestId={ this.props.guestId }/>
                            <div className="inbox-content-content">
                                { this.props.id ?
                                    this.props.guestId ?
                                        <Guest guestId={ this.props.guestId }/>
                                            :
                                        <TicketDetails id={ this.props.id }/>
                                    :
                                    <TicketsList/>
                                }
                                { this.props.modalVisible &&
                                    <CreateNewTicket
                                        onSubmit={ this.props.createNewTicket }
                                        onClose={ () => this.props.setModalVisible(false) }/>
                                }
                            </div>
                        </div>
                    </div>
                );
            }
        };

        return (
            shouldDisplayPlaceholder ?
                <UnderConstruction page="Inbox"/>
                :
                <div className="inbox">
                    { renderContent() }
                </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    modalVisible: selectModalVisible(),
    tickets: selectTickets(),
});


export function mapDispatchToProps(dispatch) {
    return {
        createNewTicket: (data) => dispatch(createNewTicket(data)),
        setModalVisible: (visible) => dispatch(setModalVisible(visible)),
        fetchTickets: () => dispatch(fetchTickets()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(InboxComponent);
