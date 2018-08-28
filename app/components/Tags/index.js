import React from 'react';
import Tag from 'components/Templates/Tag';
import SVG from 'components/SVG';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectTags } from 'containers/Templates/selectors';
import { fetchTags,addNewTag } from 'containers/Templates/actions';
import TagModel from 'models/Tag';
import './tags.less';


export class Tags extends React.Component {

    constructor(props) {
        super(props);
        if (!this.props.tags.size) {
            this.props.fetchTags();
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.tags.size && nextProps.tags.size > this.props.tags.size) {
            this.props.onSelect(nextProps.tags.last());
        }
    }

    addNewTag() {
        this.props.addNewTag(this.props.query);
    }

    shouldShowAddSection() {
        return !this.props.tags.filter(t => t.get('name') === this.props.query).size;
    }

    render() {
        return (
            this.props.show ?
                <div className="tags-popup-wrapper" style={{ zIndex: 10 }}>
                    <div className="tags-popup" style={ this.props.style }>
                        { this.props.tags
                            .filter(t => new TagModel(t).filterTag(this.props.query))
                            .map((tag, index) => {
                                const t = new TagModel(tag);
                                return (
                                    <div
                                        className="tag"
                                        onClick={ this.props.onSelect.bind(this, tag) }
                                        key={ index }>
                                        <div><Tag tag={ t.getName() }/></div>
                                    </div>
                                );
                            }) }
                        { this.shouldShowAddSection() &&
                            <div className="add-section" onClick={ () => this.addNewTag() }>
                                <SVG icon="addBox" size="20"/> "{ this.props.query }"
                            </div>
                        }
                    </div>
                </div>
                :
                <div/>
        );
    }
}

const mapStateToProps = createStructuredSelector({
    tags: makeSelectTags(),
});

export function mapDispatchToProps(dispatch) {
    return {
        fetchTags: () => dispatch(fetchTags()),
        addNewTag: (tag) => dispatch(addNewTag(tag)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Tags);
