import React from 'react';
import Table from 'components/Table';
import SVG from 'components/SVG';
import PropertyName from 'components/PropertyNameNew';
import Spinner from 'components/Spinner';
import SearchBox from 'components/SearchBox';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { fetchAssignedProperties } from 'containers/Vendors/actions';
import { makeSelectAssignedProperties, makeSelectJobsLoading } from 'containers/Vendors/selectors';

export class AssignedProperties extends React.Component {

    constructor(props) {
        super(props);
        if (!this.props.assignments.has(this.props.id)) {
            this.props.fetchAssignedProperties(this.props.id);
        }
        this.state = { query: '' };
        this.tableHeader = [
            { name: 'Property' },
            { name: '$ per', type: 'date' },
        ];
    }

    handleSearchQueryChange(value) {
        this.setState({ query: value });
    }

    getAssignedProperties() {
        return this.props.assignments
            .get(this.props.id)
            .filter(a => a.filterAssignments(this.state.query))
            .map((assignment) => {
                const prop = assignment.getProperty();
                const property = <PropertyName name={ prop.getName() } address={ prop.getAddress() } image={ prop.getImage() }/>;
                return {
                    className: 'assigned-property',
                    key: prop.getId(),
                    values: [
                        property,
                        <span className="cleaning-fee">{ assignment.getCleaningFee() }</span>,
                    ]
                };
            });
    }

    render() {
        return (
            <div className="jobs-list">
                <div className="section-header">
                    <SVG className="section-header-icon" icon="town"/>
                    <span>Assigned Properties</span>
                </div>
                { this.props.loading ? <Spinner/>
                    :
                    <div>
                        <div className="search">
                            <div className="search-box-wrapper">
                                <SearchBox
                                    onChange={ (evt) => this.handleSearchQueryChange(evt.target.value) }
                                    value={ this.state.query }/>
                            </div>
                        </div>
                        <Table head={ this.tableHeader } body={ this.getAssignedProperties() }/>
                        { !this.props.assignments.get(this.props.id).length &&
                        <div className="empty-state">There are no Assigned Properties for the moment</div>
                        }
                    </div>
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    assignments: makeSelectAssignedProperties(),
    loading: makeSelectJobsLoading(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchAssignedProperties: (id) => dispatch(fetchAssignedProperties(id)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignedProperties);
