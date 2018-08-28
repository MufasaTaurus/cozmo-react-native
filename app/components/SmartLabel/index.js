import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import SVG from 'components/SVG';
import SearchBox from 'components/SearchBox';
import ButtonNew from 'components/ButtonNew';
import { createStructuredSelector } from 'reselect';
import { makeSelectVariables } from 'containers/App/selectors';
import keys from 'lodash/keys';
import isArray from 'lodash/isArray';
import capitalize from 'lodash/capitalize';
import './smartLabel.less';

class SmartLabel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: '',
            searchQuery: '',
        };
    }

    handleSectionClick(label) {
        if (this.state.open === label) {
            this.setState({ open: '' });
        } else {
            this.setState({ open: label });
        }
    }

    onChangeSearch(e) {
        this.setState({ searchQuery: e.target.value });
    }

    renderSection(section) {
        const label = this.renderSectionLabel(section.name);
        const list = this.renderSectionList(section.variables);
        return (
            <div className="section" key={ section.index }>
                { label }
                { this.state.open === section.name && list }
            </div>
        );
    }

    renderSectionLabel(sectionName) {
        let className = 'section-label';
        if (this.state.open === sectionName) {
            className += ' active';
        }
        return (
            <div className={ className } onClick={ () => this.handleSectionClick(sectionName) }>
                { sectionName }
                <SVG className="icon" icon="triangle" size="18"/>
            </div>
        );
    }

    renderSectionList(variables) {
        const section = isArray(variables)  ?
            this.renderVariablesList(variables) :
            this.renderSubsection(variables);
        return (
            <div className="list">
                { section }
            </div>
        );
    }

    renderSubsection(variables) {
        return (
            keys(variables).map(subsectionName => {
                return variables[subsectionName].map((variable, index) => {
                    variable.subsection = capitalize(subsectionName);
                    return this.renderVariable(variable, index);
                });
            })
        );
    }

    renderVariablesList(variables) {
        return (
            variables.map((variable, index) => {
                return this.renderVariable(variable, index);
            })
        );
    }

    renderVariable(variable, index) {
        const lowerCasedQuery = this.state.searchQuery.toLowerCase();
        if (variable.display.toLowerCase().indexOf(lowerCasedQuery) < 0) { return false; }
        return (
            <div className="list-variable" key={ index }>
                <span className="type">{ variable.subsection }</span>
                <span>{ variable.display }</span>
                <ButtonNew
                    label="insert"
                    className="small yellow"
                    onClick={ () => this.props.onClick(variable) } />
            </div>
        );
    }

    render() {
        const variables = this.props.variables.toJS();
        const sections = keys(variables).map((section, index) => {
            return this.renderSection({
                name: section,
                variables: variables[section],
                index: index
            });
        });
        return (
            <div className="smart-label">
                <div className="label-box">
                    <SVG className="icon" icon="fork"/>
                    Smart Label
                </div>
                <div className="search-box-wrapper">
                    <SearchBox onChange={ (e) => this.onChangeSearch(e) }/>
                </div>
                <div>
                    { sections }
                </div>
            </div>
        );
    }
}

SmartLabel.defaultProps = {
    onClick: () => {},
};

SmartLabel.propTypes = {
    onClick: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
    variables: makeSelectVariables()
});

export default connect(mapStateToProps)(SmartLabel);
