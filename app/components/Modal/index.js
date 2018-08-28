import React, { PropTypes } from 'react';
import SVG from 'components/SVG';
import Spinner from 'components/Spinner';
import ButtonNew from 'components/ButtonNew';
import './modal.less';

export class Modal extends React.Component {

    render() {
        const { title, icon, content, submitLabel, cancelLabel, submitDisabled, onSubmit, onClose, hideCancel, hideActions, className, small, loading } = this.props;
        return (
            <div className="modal-wrapper">
                <div className="modal-overlay" style={{ zIndex: 10001 }}>
                    <div className={ 'modal ' + className + (small ? ' small' : '') }>
                        { loading && <div className="loading"><Spinner/></div> }
                        <div className="modal-header">
                            <div>
                                <SVG className="header-icon" icon={ icon } size={ 20 }/>
                                <span>{ title }</span>
                            </div>
                            <div className="close" onClick={ onClose }>&times;</div>
                        </div>
                        <div className="modal-content">
                            { content }
                        </div>
                        { !hideActions &&
                        <div className="modal-actions">
                            { !hideCancel && <ButtonNew label={ cancelLabel } className={ 'ghost' + (small ? '' : ' big') } onClick={ onClose }/>}
                            <ButtonNew label={ submitLabel } className={ small ? '' : 'big' } disabled={ submitDisabled } onClick={ onSubmit }/>
                        </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

Modal.propTypes = {
    title: PropTypes.string,
    icon: PropTypes.string,
    content: PropTypes.any,
    submitLabel: PropTypes.string,
    cancelLabel: PropTypes.string,
    submitDisabled: PropTypes.bool,
    onClose: PropTypes.func,
    onSubmit: PropTypes.func,
    hideCancel: PropTypes.bool,
    hideActions: PropTypes.bool,
    className: PropTypes.string,
    small: PropTypes.bool,
    loading: PropTypes.bool
};

Modal.defaultProps = {
    submitLabel: 'Save',
    cancelLabel: 'Cancel',
    className: '',
    submitDisabled: false,
    hideCancel: false,
    hideActions: false,
    loading: false,
    onClose: () => {},
    onSubmit: () => {},
};

export default Modal;
