import React from 'react';
import moment from 'moment';
import TitleHeader from 'components/TitleHeader';
import Spinner from 'components/Spinner';
import ButtonNew from 'components/ButtonNew';
import StatusLabel from 'components/StatusLabel';
import ActionButton from 'components/ActionButton';
import SegmentedButton from 'components/SegmentedButton';
import Select from 'components/Select';
import Table from 'components/Table';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { createStructuredSelector } from 'reselect';
import {  } from 'containers/Properties/actions';
import {  } from 'containers/Properties/selectors';
import './mapping.less';

export class Mapping extends React.Component {

    constructor(props) {
        super(props);
        this.tableHeader = [
            { name: 'Name' },
            { name: 'Amenity', type: 'amen' },
            { name: 'Display', type: 'display' },
            { name: 'Properties', type: 'short' },
        ];
    }

    onChange(field, value) {
        this.setState({ [field]: value });
    }

    getAmenities() {
        const amens = [
            { id: 1, props: 12, name: 'Adventure', displayed: true },
            { id: 2, props: 32, name: 'antiquing', displayed: false  },
            { id: 3, props: 22, name: 'Away From It All', displayed: true  }
        ];
        return amens
            .map((am) => {
                const seg = (
                    <div className="segmented">
                        <SegmentedButton
                            value={ am.displayed }
                            onClick={ (val) => this.onChange('displayed', val) }
                            segments={[
                                { label: 'ON', value: true },
                                { label: 'OFF', value: false, activeClass: 'off-active' }
                            ]}/>
                    </div>
                );
                const sel = (
                    <div className="amen-select">
                        <Select small options={[ { name: 'Adventure', value: 'a' }, { name: 'Away', value: 's' } ]}/>
                    </div>
                );
                return {
                    className: 'amenity',
                    key: am.id,
                    values: [
                        <span className="name">{ am.name }</span>,
                        sel,
                        seg,
                        am.props
                    ]
                };
            });
    }

    render() {
        return (
            <div className="properties-connections-mapping">
                <TitleHeader title="Mapping" icon="fork"/>
                <Table head={ this.tableHeader } body={ this.getAmenities() }/>
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    //import: makeSelectImport(),
    //loading: makeSelectFetchPropertiesLoading()
});

export function mapDispatchToProps(dispatch) {
    return {
        goBack: () => dispatch(push('/properties/connections')),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Mapping);
