import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import './importHeader.less';

export default class ImportHeader extends React.Component {

    renderTop() {
        const { top, onBack } = this.props;
        return (
            <div className="top">
                <div className={ 'icon-wrapper' + (onBack ? ' margin' : '') }>{ top.icon }</div>
                <div className="title">{ top.title }</div>
            </div>
        );
    }

    renderBottom() {
        const { bottom, top } = this.props;
        return (
            <div className="bottom">
                <div className={ 'image' + (top ? '' : ' big') }
                    style={{ backgroundImage: 'url(' + bottom.image + ')' }}>
                    <div className="content">{ bottom.content }</div>
                </div>
            </div>
        );
    }

    renderNavigation() {
        const { onClose, onBack, top } = this.props;
        return (
            <div className={ 'navigation' + (top ? '' : ' over-image') }>
                {
                    onBack ?
                        <div className="back" onClick={ onBack }>
                            <SVG icon={ 'backArrow' } size="26"/>
                        </div>
                        :
                        <div/>
                }
                <div className="close" onClick={ onClose }>&times;</div>
            </div>
        );
    }

    render() {
        const { top, bottom } = this.props;
        return (
            <div className="import-header">
                { top && this.renderTop() }
                { bottom && this.renderBottom() }
                { this.renderNavigation() }
            </div>
        );
    }
}

ImportHeader.propTypes = {
    top: PropTypes.shape({
        icon: PropTypes.object,
        title: PropTypes.string,
    }),
    bottom: PropTypes.shape({
        image: PropTypes.string,
        content: PropTypes.node,
    }),
    onClose: PropTypes.func,
    onBack: PropTypes.func,
};
