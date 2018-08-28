import React from 'react';
import Item from './Item';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import './items.less';


export class Items extends React.Component {

    render() {
        return (
            <div className="items">
                {
                    this.props.items.map((item, index) => {
                        return <Item
                            title={ item.title }
                            desc={ item.desc }
                            icon={ item.icon }
                            isNew={ item.isNew }
                            linkTo={ item.linkTo }
                            key={ index }
                        />;
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = createStructuredSelector({
});

export default connect(null, null)(Items);
