import React from 'react';
import Section from 'components/Properties/PropertiesList/List/PropertyInfo/Section';
import SVG from 'components/SVG';
import TitleHeader from 'components/TitleHeader';
import Image from './Image/index';
import ButtonNew from 'components/ButtonNew';
import CustomProgressBar from 'components/CustomProgressBar';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectNewProperty } from 'containers/Properties/selectors';
import { wizardSetStep } from 'containers/Properties/actions';
import PropertyModel from 'models/Property';
import './review.less';

export class Review extends React.Component {

    constructor(props) {
        super(props);
        const property = new PropertyModel(props.newProperty);
        const specialDirections = !!property.getDirections();
        const rooms = property.hasRooms();
        const amens = property.hasAmenities();
        const pois = property.hasThingsToDo();
        const progress = 20 + (specialDirections ? 15 : 0) + (rooms ? 15 : 0) + (amens ? 25 : 0) + (pois ? 25 : 0);
        const titles = [
            'Acceptable',
            'Good enough',
            'Perfect!'
        ];
        this.state = {
            progress: progress,
            title: progress === 25 ? titles[0] : (progress === 100 ? titles[2] : titles[1]),
            subtitle: progress === 100 ? 'Yay! Your post is ready to go! ' : 'We found that you skipped the following optional fields. We strongly recommend to fill them out for more booking!',
            steps: [
                {
                    id: 'location',
                    title: 'Location',
                    icon: 'pin',
                    desc: 'Special Directions helps customers to find your place without pain',
                    step: 0,
                    missing: !specialDirections
                },
                {
                    id: 'rooms',
                    title: 'Bedroom Details',
                    icon: 'bed',
                    desc: 'Bedroom details helps customers to avoid sleeping on a floor',
                    step: 2,
                    missing: !rooms
                },
                {
                    id: 'amens',
                    title: 'Amenities',
                    icon: 'tv',
                    desc: 'Brag your amenities! It attracts more customers',
                    step: 3,
                    missing: !amens
                },
                {
                    id: 'pois',
                    title: 'Things to do',
                    icon: 'heart',
                    desc: 'You can sound like a cool local by adding Things to do list',
                    step: 6,
                    missing: !pois
                }
            ]
        };
    }

    render() {
        return (
            <section className="review step">
                <TitleHeader title="Complete" icon="done" iconSize={ 19 }/>
                <Section
                    customContent={
                        <div className="review-content">
                            <div className="progress-bar-wrapper">
                                <CustomProgressBar value={ this.state.progress }/>
                            </div>
                            <div className="text">
                                <div className="title">{ this.state.title }</div>
                                <div className="subtitle">{ this.state.subtitle }</div>
                            </div>
                            <div className="steps">
                                { this.state.steps.filter(s => s.missing).map(step => {
                                    return stepComponent({
                                        icon: step.icon,
                                        title: step.title,
                                        desc: step.desc,
                                        onClick: () => this.props.setStep(step.step),
                                        key: step.id
                                    });
                                }) }
                                { this.state.progress === 100 && <div className="image-wrapper"><Image/></div> }
                            </div>
                        </div>
                    }
                />
            </section>
        );
    }
}

const stepComponent = ({ icon, title, desc, onClick, key }) => {
    return (
        <div className="step-tile" key={ key }>
            <div className="icon"><SVG icon={ icon }/></div>
            <div className="step-title">{ title }</div>
            <div className="desc">{ desc }</div>
            <div className="edit"><ButtonNew label="Edit" className="small" onClick={ onClick }/></div>
        </div>
    );
};

const mapStateToProps = createStructuredSelector({
    newProperty: makeSelectNewProperty() //wizardSetStep
});

export function mapDispatchToProps(dispatch) {
    return {
        setStep: (step) => dispatch(wizardSetStep(step)),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Review);
