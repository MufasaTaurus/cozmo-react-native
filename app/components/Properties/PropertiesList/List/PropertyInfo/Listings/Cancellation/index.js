import React from 'react';
import SVG from 'components/SVG';
import Section from '../../Section/index';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { updateProperty } from 'containers/Properties/actions';
import { makeSelectSelectedProperty } from 'containers/Properties/selectors';
import './cancellation.less';


export class Cancellation extends React.Component {

    constructor(props) {
        super(props);
        this.policies = [
            {
                name: 'Easy',
                icon: 'veryHappy',
                desc: '100% refund 1 day prior to arrival'
            },
            {
                name: 'Okay',
                icon: 'happy',
                desc: '100% refund 7 day prior to arrival'
            },
            {
                name: 'Fair',
                icon: 'neutral',
                desc: '100% refund 14 day prior to arrival'
            },
            {
                name: 'Rigid',
                icon: 'sad',
                desc: '100% refund 30 day prior to arrival'
            },
            {
                name: 'Strict',
                icon: 'verySad',
                desc: '100% refund 60 day prior to arrival'
            },
            {
                name: 'Long Term',
                icon: 'longTerm',
                desc: '100% refund 90 day prior to arrival'
            }
        ];
    }

    setPolicyActive(name) {
        if (name === this.props.property.get('cancellation_policy')) {
            return;
        }
        this.props.updateProperty({
            id: this.props.property.get('id'),
            section: 'cancellation_policy',
            val: name
        });
    }

    render() {
        const activePolicy = this.props.property.get('cancellation_policy', '');
        const policies =
            <div className="policies">
                { this.policies.map((p) => policy({
                    name: p.name,
                    icon: p.icon,
                    desc: p.desc,
                    active: activePolicy === p.name,
                    onClick: () => this.setPolicyActive(p.name)
                })) }
            </div>;

        return (
            <div className="cancellation-policy">
                <Section
                    title={ 'Cancellation Policy' }
                    subtitle={ 'Choose a policy to determine how your guests can cancel their reservation' }
                    customContent={ policies }/>
            </div>
        );
    }
}

const policy = ({ name, icon, desc, active, onClick }) => {
    return (
        <div className="policy" key={ name } onClick={ onClick }>
            <div className="icon"><SVG icon={ icon } size="50"/></div>
            <div className="name">{ name }</div>
            <div className="desc">{ desc }</div>
            { active ? <div className="checkmark"><SVG icon="check"/></div> : '' }
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    property: makeSelectSelectedProperty(),
});

export function mapDispatchToProps(dispatch) {
    return {
        updateProperty: (data) => dispatch(updateProperty(data)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Cancellation);


