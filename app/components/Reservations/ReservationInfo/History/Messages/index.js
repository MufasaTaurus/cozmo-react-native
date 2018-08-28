import React from 'react';
import Spinner from 'components/Spinner';
import VendorName from 'components/VendorName';
import SVG from 'components/SVG';
import MessageModel from 'models/ReservationMessage';

export class Messages extends React.Component {

    render() {
        return (
            <div className="reservation-details-history-conversation">
                { this.props.loading ?
                    <Spinner/>
                    :
                    this.props.reservation.getMessages().map((msg, index) => {
                        const messageModel = new MessageModel(msg);
                        return (
                            message({
                                key: index,
                                message: messageModel.getText(),
                                author: {
                                    name: messageModel.getSenderFullName(),
                                    email: messageModel.getSenderEmail(),
                                    avatar: messageModel.getSenderAvatar()
                                },
                                date: messageModel.getDate(),
                                fromUser: messageModel.isOutgoing(),
                                attachments: messageModel.getAttachments()
                            })
                        );
                    })
                }
            </div>
        );
    }
}

const message = ({ message, author, date, isOutgoing, attachments, key }) => {
    return (
        <div key={ key } className={ 'message' + (isOutgoing ? ' user' : '') }>
            <div className="author">
                <VendorName
                    fullName={ author.name }
                    avatar={ author.avatar }
                    email={ author.email }
                    reversed={ isOutgoing }
                />
            </div>
            <div className="message-content" dangerouslySetInnerHTML={{ __html: message }}/>
            <div className="message-attachments">
                { attachments.map((a, index) => {
                    const ext = a.getName().substr(-4);
                    const isPhoto = (ext === '.png') || (ext === '.jpg') || (ext === '.jpeg');
                    return (
                        <div className="message-attachment" key={ index }>
                            { isPhoto ?
                                <img width={ 'auto' } height={ 100 } src={ a.getUrl() }/>
                                :
                                <div className="file-thumb">
                                    <SVG icon="file" size="50"/><div className="file-name">{ a.getName() }</div>
                                </div>
                            }
                        </div>
                    );
                }) }
            </div>
            <div className="date">{ date.format('MMM D, YYYY - hh:mmA') } &#9679; Email</div>
        </div>
    );
};

export default Messages;
