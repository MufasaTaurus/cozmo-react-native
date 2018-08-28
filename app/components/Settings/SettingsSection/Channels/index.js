import React from 'react';
import Spinner from 'components/Spinner';
import Card from 'components/Card';
import Toggle from 'material-ui/Toggle';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {fetchChannels, toggleChannel} from 'containers/Settings/actions';
import {makeSelectChannels, selectLoading} from 'containers/Settings/selectors';
import ChannelModel from 'models/Channel';
import './channels.less';

export class Channels extends React.Component {

    constructor(props) {
        super(props);
        if(!this.props.channels.size) {
            this.props.fetchChannels();
        }
    }

    render() {
        return (
            <div className="settings-channels">
                <Card icon="channel" title="Available Channels">
                    { this.props.loading ? <Spinner/> :
                        this.props.channels.map(channel => {
                            const ch = new ChannelModel(channel);
                            return channelComponent({
                                key: ch.getId(),
                                name: ch.getName(),
                                desc: ch.getDescription(),
                                img: ch.getImage(),
                                value: ch.getStatus(),
                                onToggle: (evt, checked) => this.props.toggleChannel({ id: ch.getId(), sync: checked })
                            });
                        })
                    }
                </Card>
            </div>
        );
    }
}

const channelComponent = ({ name, desc, img, key, value, onToggle }) => {
    return (
        <div className="channel" key={ key }>
            <div className="channel-label">
                <img className="channel-label-image" src={ img }/>
                <div className="channel-label-info">
                    <div className="channel-name">{ name }</div>
                    <div className="channel-desc">{ desc }</div>
                </div>
            </div>
            <div className="channel-toggle">
                <Toggle
                    defaultToggled={ value }
                    onToggle={ onToggle }
                />
            </div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    channels: makeSelectChannels(),
    loading: selectLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchChannels: () => dispatch(fetchChannels()),
        toggleChannel: (data) => dispatch(toggleChannel(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Channels);
