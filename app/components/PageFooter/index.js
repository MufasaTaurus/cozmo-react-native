import React, { PropTypes } from 'react';
import ButtonNew from 'components/ButtonNew';
import './pageFooter.less';

export class PageFooter extends React.Component {

    render() {
        const { submitDisabled, submitLabel, secondaryActionLabel, onSubmit, onCancel, onSecondaryAction, hideCancel } = this.props;

        return (
            <div className="page-footer">
                <div className="page-footer-left-side">
                    { secondaryActionLabel && <ButtonNew label={ secondaryActionLabel } className="ghost" onClick={ onSecondaryAction }/> }
                </div>
                <div className="page-footer-right-side">
                    { !hideCancel &&  <ButtonNew label="Cancel" className="ghost" onClick={ onCancel }/> }
                    <ButtonNew label={ submitLabel } className="big" disabled={ submitDisabled } onClick={ onSubmit }/>
                </div>
            </div>
        );
    }
}

PageFooter.propTypes = {
    submitDisabled: PropTypes.bool,
    submitLabel: PropTypes.string,
    secondaryActionLabel: PropTypes.string,
    onSubmit: PropTypes.func,
    onCancel: PropTypes.func,
    onSecondaryAction: PropTypes.func,
    hideCancel: PropTypes.bool,
};

PageFooter.defaultProps = {
    submitDisabled: false,
    submitLabel: 'Save',
    onSubmit: () => {},
    onCancel: () => {},
    onSecondaryAction: () => {},
};

export default PageFooter;
