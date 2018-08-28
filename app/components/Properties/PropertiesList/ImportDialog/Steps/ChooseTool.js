import React from 'react';
import SVG from 'components/SVG';
import ImportHeader from '../ImportHeader';
import ButtonNew from 'components/ButtonNew';
import SearchBox from 'components/SearchBox';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectSearchQuery } from 'containers/Properties/selectors';
import { selectTool, changeSearchQuery } from 'containers/Properties/actions';
import airbnb from 'assets/images/airbnb.png';
import homeaway from 'assets/images/homaway.png';
import bookingcom from 'assets/images/booking.png';
import tripavisor from 'assets/images/tripadvisor.png';
import image from 'assets/images/bg-import-tools.jpg';

export class ChooseTool extends React.Component {

    constructor(props) {
        super(props);
        this.tools = [
            {
                title: 'Airbnb',
                logo: { image: airbnb, width: 50, height: 'auto' },
                onClick: () => this.props.selectTool('airbnb')
            },
            {
                title: 'Homeaway',
                logo: { image: homeaway, width: 50, height: 'auto' },
                onClick: () => this.props.selectTool('homeaway')
            },
            {
                title: 'Booking.com',
                logo: { image: bookingcom, width: 50, height: 'auto' },
                onClick: () => this.props.selectTool('booking')
            },
            {
                title: 'Tripadvisor',
                logo: { image: tripavisor, width: 50, height: 'auto' },
                onClick: () => this.props.selectTool('tripadvisor')
            },
        ];
    }

    render() {
        const top = {
            icon: <SVG icon="import" size="34"/>,
            title: 'Import Tools',
        };
        const bottom = {
            image: image,
            content:
                <div className="subtitle-content">
                    <div className="title">
                        select a tool to import properties
                    </div>
                    <div className="subtitle">
                        start your listing by seamlessly importing property data and reservation data once by using one of the tools below
                    </div>
                </div>,
        };

        return (
            <div className="import-dialog-step">
                <ImportHeader
                    top={ top }
                    bottom={ bottom }
                    onClose={ this.props.onClose }/>
                <div className="body">
                    <div className="search-box-wrapper">
                        <SearchBox className="large"
                                   placeholder="Search import tools"
                                   value={ this.props.searchQuery }
                                   onChange={ this.props.changeSearchQuery }/>
                    </div>
                    <div className="tools">
                        { this.tools
                            .filter(tool => tool.title.toLowerCase().indexOf(this.props.searchQuery.toLowerCase()) > -1)
                            .map((tool, index) => renderTool(tool, index))
                        }
                    </div>
                </div>
                <div className="footer">
                    <div className="side left">
                        <SVG icon="happy" className="face-icon" size="32"/>
                        <div className="title">Other options! Using:</div>
                        <div className="buttons">
                            <ButtonNew label="API" className="small green"/>
                            <ButtonNew label="CSV" className="small green"/>
                        </div>
                    </div>
                    <div className="side">
                        <SVG icon="sad" className="face-icon" size="32"/>
                        <div className="title">No Tools?</div>
                        <span>Didn’t find what you’re looking for?</span>
                        <span>Reach out to us to request a tool!</span>
                    </div>
                </div>
            </div>
        );
    }
}

const renderTool = ({ title, logo, onClick }, index) => {
    return (
        <div className="tool" onClick={ onClick } key={ index }>
            <div className="logo-wrapper">
                <img src={ logo.image } width={ logo.width } height={ logo.height }/>
            </div>
            <div className="title">{ title }</div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    searchQuery: makeSelectSearchQuery()
});


export function mapDispatchToProps(dispatch) {
    return {
        selectTool: (id) => dispatch(selectTool(id)),
        changeSearchQuery: (evt) => dispatch(changeSearchQuery(evt.target.value))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChooseTool);
