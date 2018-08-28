import React from 'react';
import SearchBox from 'components/SearchBox';
import Tag from 'components/Templates/Tag';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {makeSelectTemplates} from 'containers/App/selectors';
import {fetchTemplates} from 'containers/App/actions';
import TemplateModel from 'models/Template';
import TagModel from 'models/Tag';
import './templatePicker.less';


export class TemplatePicker extends React.Component {

    constructor(props) {
        super(props);
        this.state = { query: '' };
    }

    componentWillMount() {
        if (!this.props.templates.size) {
            this.props.fetchTemplates();
        }
    }

    render() {
        return (
            this.props.show ?
                <div className="template-picker-wrapper" style={{ zIndex: 10 }}>
                    <div className="template-picker" style={ this.props.style }>
                        <div className="search-box-wrapper">
                            <SearchBox
                                onChange={ (evt) => this.setState({ query: evt.target.value }) }
                                value={ this.state.query }
                                placeholder={ 'Search templates' }/>
                        </div>
                        <div className="templates-list">
                            { this.props.templates
                                .filter(t => new TemplateModel(t).filterTemplate(this.props.query ? this.props.query : this.state.query))
                                .map((template, index) => {
                                    const tpl = new TemplateModel(template);
                                    return (
                                        <div
                                            className="template"
                                            onClick={ this.props.onSelect.bind(this, tpl) }
                                            key={ index }>
                                            <div className="template-name">{ tpl.getName() }</div>
                                            <div className="template-tags">
                                                { tpl.getTags().splice(0, 3).map((tag, index) => {
                                                    const tagModel = new TagModel(tag);
                                                    return <Tag tag={ tagModel.getName() } key={ index }/>;
                                                }) }
                                            </div>
                                        </div>
                                    );
                                }) }
                        </div>
                    </div>
                </div>
                :
                <div/>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    templates: makeSelectTemplates(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchTemplates: () => dispatch(fetchTemplates()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(TemplatePicker);
