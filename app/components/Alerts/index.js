import React from 'react';
import SVG from 'components/SVG';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { removeAlert } from 'containers/App/actions';
import { makeSelectAlerts } from 'containers/App/selectors';
import './alerts.less';

export class Alerts extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            currentAlert: {},
            visible: false
        };
    }

    componentWillReceiveProps(nextProps) {
        const alert = nextProps.alerts.first();
        if (alert) {
            this.setState({
                currentAlert: {
                    message: alert.get('message'),
                    icon: alert.get('icon'),
                    type: alert.get('type') || 'info'
                },
                visible: true
            });
            setTimeout(() => this.closeAlert(), 3000);
        }
    }

    closeAlert() {
        this.setState({
            visible: false
        });

        setTimeout(() => this.props.removeAlert(0), 1000);
    }

    render() {
        const message = this.state.currentAlert.message;
        const type = this.state.currentAlert.type;
        const visible = this.state.visible;
        return (
            <div className="vj-alert">
                <div className={ 'alert ' + type + (visible ? ' visible' : '') }>
                    <SVG className="alert-icon" icon={ this.state.currentAlert.icon || 'info' }/>
                    { message }
                </div>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    alerts: makeSelectAlerts(),
});

export function mapDispatchToProps(dispatch) {
    return {
        removeAlert: (id) => dispatch(removeAlert(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts);
