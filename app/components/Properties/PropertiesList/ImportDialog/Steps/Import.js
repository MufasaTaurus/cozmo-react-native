import React from 'react';
import Spinner from 'components/Spinner';
import ButtonNew from 'components/ButtonNew';
import ImportHeader from '../ImportHeader';
import Checkbox from 'components/Checkbox';
import SVG from 'components/SVG';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectPropertiesToImport, makeSelectListings, makeSelectLoading, makeSelectTool } from 'containers/Properties/selectors';
import { setPropertiesToImport, importListings, finishWhenNoListings } from 'containers/Properties/actions';
import { fromJS } from 'immutable';
import ImportTool from 'models/ImportTool';
import image from 'assets/images/bg-import-large.jpg';

export class Import extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            allPropertiesChecked: false,
            canImport: true,
            properties: this.makeListingArray(this.props.listings),
        };
    }

    makeListingArray(listings) {
        let array = [];
        listings.map((listing) => {
            array.push({
                name: listing.get('name'),
                address: listing.get('address'),
                img: listing.get('image') || '//cdn.voyajoy.com/images/placeholder.png',
                id: listing.get('pk'),
                checked: false,
            });
        });
        return array;
    }

    toggleProperty(index) {
        let propsToImport = this.state.properties;
        propsToImport[index].checked = !propsToImport[index].checked;
        this.setState({
            allPropertiesChecked: false,
            properties: propsToImport,
        });
    }

    toggleAllProperty() {
        let newPropertiesArray = this.state.properties;
        if (this.state.allPropertiesChecked) {
            newPropertiesArray.map((property) => {
                property.checked = false;
            });
            this.setState({
                allPropertiesChecked: false,
                properties: newPropertiesArray,
            });
        } else {
            newPropertiesArray.map((property) => {
                property.checked = true;
            });
            this.setState({
                allPropertiesChecked: true,
                properties: newPropertiesArray,
            });
        }
    }

    onSubmit() {
        let propsToImport = [];
        this.state.properties.map((property) => {
            if (property.checked) {
                propsToImport.push(property.id);
            }
        });
        if (propsToImport.length) {
            this.props.setPropertiesToImport(fromJS(propsToImport));
            this.props.importListings();
        } else {
            this.setState({ canImport: false });
        }
    }

    render() {
        const importTool = new ImportTool(this.props.tool);
        const isListings = this.props.listings.size > 0;
        const bottom = {
            image: image,
            content:
                <div className="header-content">
                    <div className="logo-wrapper"><img src={ importTool.getLogo() } height="100%"/></div>
                    <div className="title">
                        <SVG icon="import" size="64"/>
                        <div className="title-text">
                            { importTool.getName() } Import Tool
                            <div className="subtitle">
                                Import Listing
                            </div>
                        </div>
                    </div>
                </div>,
        };
        const table =
            <table>
                <thead>
                    <tr>
                        <th>
                            <div className="cell-wrapper">
                                <Checkbox
                                    type="checkbox"
                                    id="0"
                                    onChange={ () => this.toggleAllProperty() }
                                    checked={ this.state.allPropertiesChecked }
                                />
                                <span>Listing Name</span>
                            </div>
                        </th>
                        <th>Address</th>
                    </tr>
                </thead>
                <tbody>
                { this.state.properties.map((listing, index) => {
                    return property({
                        name: listing.name,
                        address: listing.address,
                        img: listing.img,
                        id: listing.id,
                        onClick: () => this.toggleProperty(index),
                        checked: listing.checked,
                    });
                })}
                </tbody>
            </table>;

        return (
            <div className="import-dialog-step">
                <ImportHeader
                    bottom={ bottom }
                    onClose={ this.props.onClose }
                    onBack={ this.props.onBack }
                />
                <div className="body">
                    { this.props.loading && <div className="disabler"><Spinner/></div> }
                    { isListings ?
                        <div>
                            <div className="listing-title">
                                Your Listings ({ this.props.listings.size }) <span> Select the listings you want to import into Cozmo</span>
                            </div>
                            <div className="listing-list">
                                { table }
                            </div>
                        </div>
                        :
                        <div className="empty-listing">
                            There are no listings
                        </div>
                    }
                    <div className="verification-content">
                        { isListings ?
                            <div>
                                <ButtonNew
                                    className="big"
                                    label="Import"
                                    disabled={ this.props.loading }
                                    onClick={ () => this.onSubmit() } />
                                { !this.state.canImport &&
                                    <div className="error-msg"><div>There is nothing to import</div></div>
                                }
                            </div>
                            :
                            <div>
                                <ButtonNew
                                    className="big"
                                    label="Exit"
                                    onClick={ this.props.finishWhenNoListings } />
                            </div>
                        }
                    </div>
                </div>
            </div>
        );
    }
}

const property = ({ name, img, address, id, onClick, checked }) => {
    return (
        <tr key={ id } onClick={ onClick }>
            <td className="name">
                <div className="cell-wrapper">
                    <Checkbox type="checkbox" onChange={ onClick } id={ id } checked={ checked }/>
                    <img className="image" src={ img } width="32" height="32" />
                    <span>{ name }</span>
                </div>
            </td>
            <td className="address">{ address }</td>
        </tr>
    );
};

const mapStateToProps = createStructuredSelector({
    propertiesToImport: makeSelectPropertiesToImport(),
    listings: makeSelectListings(),
    loading: makeSelectLoading(),
    tool: makeSelectTool()
});


export function mapDispatchToProps(dispatch) {
    return {
        setPropertiesToImport: (ids) => dispatch(setPropertiesToImport(ids)),
        importListings: () => dispatch(importListings()),
        finishWhenNoListings: () => dispatch(finishWhenNoListings()),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Import);
