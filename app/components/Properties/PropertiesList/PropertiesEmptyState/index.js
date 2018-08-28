import React, { PropTypes } from 'react';
import ButtonNew from 'components/ButtonNew';
import SVG from 'components/SVG';
import './propertiesEmptyState.less';

class PropertiesEmptyState extends React.Component {

    render() {
        return (
            <div className="properties-empty-state">
                <SVG icon="houseEmpty" size="153" />
                <div className="title">
                    No properties have been added yet!
                </div>
                <div className="subtitle">
                    Add one now. If you need help, you can reach out to us by going to our help center
                </div>
                <div className="buttons">
                    {/*<ButtonNew label="import"*/}
                               {/*icon="import"*/}
                               {/*onClick={ this.props.startImport }/>*/}
                    <ButtonNew label="create"
                               icon="edit"
                               onClick={ this.props.createNewProperty }/>
                </div>
            </div>
        );
    }
}

PropertiesEmptyState.PropTypes = {
    startImport: PropTypes.func,
    createNewProperty: PropTypes.func,
};

export default PropertiesEmptyState;
