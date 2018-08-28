import React from 'react';
import onClickOutside from 'react-onclickoutside';
import SVG from 'components/SVG';
import ButtonNew from 'components/ButtonNew';
import './filter.less';

export class Filter extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false
        };
    }

    togglePopup() {
        this.setState({ open: !this.state.open });
        if (this.state.open) {
            this.props.disableOnClickOutside();
        } else {
            this.props.enableOnClickOutside();
        }
    }

    handleClickOutside() {
        this.setState({ open: false });
        this.props.disableOnClickOutside();
    }

    render() {
        const { name, icon, content, onApply, onReset, isApplied } = this.props;
        return (
            <div className={ 'calendar-filter' + (this.state.open ? ' active' : '') + (isApplied ? ' applied' : '') }>
                { this.state.open &&
                    <div className="popup-wrapper">
                        <div className="popup">
                            <div>{ content }</div>
                            <div className="actions">
                                <div
                                    className="reset"
                                    onClick={ () => { onReset(); this.togglePopup(); } }>
                                    Reset
                                </div>
                                <div>
                                    <ButtonNew
                                        label="Apply"
                                        className="small"
                                        onClick={ () => { onApply(); this.togglePopup(); } }
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                }
                <div className="filter-title" onClick={ () => this.togglePopup() }>
                    <span className="filter-icon"><SVG icon={ icon }/></span>
                    <span className="filter-name">{ name }</span>
                </div>
            </div>
        );
    }
}

export default onClickOutside(Filter);
