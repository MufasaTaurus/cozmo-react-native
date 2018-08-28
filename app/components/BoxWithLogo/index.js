import React from 'react';
import SVG from 'components/SVG';
import './boxWithLogo.less';

export class BoxWithLogo extends React.Component {

    render() {
        return (
            <div className="box-with-logo-wrapper">
                <div className="box-with-logo">
                    <div className="logo-wrapper">
                        { this.props.alert &&
                            <div className="box-alert">
                                <SVG icon="info" size="20" className="alert-icon"/>
                                { this.props.alert }
                            </div>
                        }
                        <SVG icon={ 'logoV' } size={ 60 }/>
                    </div>
                    { this.props.ribbon }
                    <div className="title">
                        { this.props.title }
                    </div>
                    <div className="subtitle">
                        { this.props.subtitle }
                    </div>
                    <div className="content">
                        { this.props.content }
                    </div>
                </div>
            </div>
        );
    }
}

export default BoxWithLogo;
