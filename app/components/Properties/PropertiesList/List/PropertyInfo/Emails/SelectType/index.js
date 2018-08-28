import React from 'react';
import Modal from 'components/Modal';
import ButtonNew from 'components/ButtonNew';
import './selectType.less';

export class SelectType extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            query: '',
        };
        this.header = [
            { name: 'Template Name' },
            { name: 'Description' },
            { name: 'Type', type: 'short' },
            { name: 'Automation', type: 'short' },
        ];
        this.types = [
            { id: 'welcomeLetter', icon: welcomeLetterIcon, title: 'Welcome letter', text: 'Get your guest ready to stay your place. This template include House manual, Things to do, etc. Also, the trigger time is set by Cozmo.' },
            { id: 'checkoutReminder', icon: reminderIcon, title: 'Check out reminder', text: 'Get your guest ready to stay your place. This template include House manual, Things to do, etc. Also, the trigger time is set by Cozmo.' },
            { id: 'can', icon: cancellationIcon, title: 'Cancellation', text: 'Get your guest ready to stay your place. This template include House manual, Things to do, etc. Also, the trigger time is set by Cozmo.' },
            { id: 'cus', icon: customIcon, title: 'Custom', text: 'Get your guest ready to stay your place. This template include House manual, Things to do, etc. Also, the trigger time is set by Cozmo.' },
        ];
    }

    render() {
        const content = (
            <div>
                <div className="intro">
                    <div className="title">Choose a template</div>
                    <div className="subtitle">Add one now. If you need help, you can reach out to us by going to our help center</div>
                </div>
                <div className="tiles">
                    { this.types.map(type => tile({
                        id: type.id,
                        icon: type.icon,
                        title: type.title,
                        text: type.text,
                        onClick: () => { this.props.onSelect(type.id); this.props.onClose(); }
                    }))}
                </div>
            </div>
        );
        return (
            <div className="property-emails-select-type">
                <Modal
                    title="Create Auto Email"
                    icon="addBox"
                    content={ content }
                    onClose={ this.props.onClose }
                    hideActions
                />
            </div>
        );
    }
}

const tile = ({ id, icon, title, text, onClick }) => {
    return (
        <div className="email-type" key={ id }>
            <div className="icon">{ icon }</div>
            <div className="title">{ title }</div>
            <div className="text">{ text }</div>
            <div className="choose"><ButtonNew label="Choose" className="ghost small" onClick={ onClick }/></div>
        </div>
    );
};

const welcomeLetterIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78">
        <g fill="none" fillRule="evenodd">
            <circle cx="39" cy="39" r="39" fill="#E3F2FD"/>
            <circle cx="39" cy="39" r="34" fill="#90CAF9"/>
            <path fill="#FFF" d="M54 33.949V50.32A2.686 2.686 0 0 1 51.321 53H26.68A2.686 2.686 0 0 1 24 50.321V33.95c0-.151.067-.302.184-.402 1.758-1.54 1.775-1.724 10.514-8.103C35.752 24.674 37.61 23 39 23c1.39 0 3.265 1.69 4.302 2.444 8.74 6.379 8.756 6.563 10.514 8.103.117.1.184.251.184.402zm-9.384 10.293c2.64-1.956 4.483-3.323 5.836-4.361a.54.54 0 0 0 .102-.762l-.643-.9a.533.533 0 0 0-.761-.103c-1.337 1.003-3.164 2.388-5.803 4.326-1.048.779-2.943 2.51-4.347 2.51-1.404 0-3.299-1.731-4.347-2.51a1089.984 1089.984 0 0 1-5.803-4.326.533.533 0 0 0-.76.103l-.644.9a.54.54 0 0 0 .102.762c1.353 1.038 3.197 2.405 5.836 4.36 1.32.97 3.4 2.926 5.616 2.926 2.233 0 4.364-1.99 5.616-2.925z"/>
        </g>
    </svg>
);

const reminderIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78">
        <g fill="none" fillRule="evenodd">
            <circle cx="39" cy="39" r="39" fill="#FFF8E1"/>
            <circle cx="39" cy="39" r="34" fill="#FFE082"/>
            <path fill="#FFF" d="M38.82 31.236c0-1.997-1.636-3.618-3.651-3.618-2.016 0-3.65 1.62-3.65 3.618 0 .547.132 1.074.36 1.564a3.788 3.788 0 0 0-1.578-.358c-2.015 0-3.65 1.62-3.65 3.618 0 1.998 1.635 3.618 3.65 3.618 2.016 0 3.65-1.62 3.65-3.618 0-.546-.132-1.074-.36-1.564a3.788 3.788 0 0 0 1.578.358c2.015 0 3.65-1.62 3.65-3.618zM55 44.503c0 .433-1.75 2.167-2.187 2.167-.494 0-2.034-1.772-2.433-2.167l-1.826 1.809 4.183 4.145c.343.34.533.81.533 1.282 0 1.055-1.217 2.261-2.282 2.261-.475 0-.95-.188-1.293-.528L36.937 40.828c-1.996 1.47-4.43 2.468-6.94 2.468-4.145 0-6.997-2.845-6.997-6.934C23 30.18 29.236 24 35.473 24c4.126 0 6.997 2.827 6.997 6.935 0 2.487-1.008 4.9-2.49 6.878l6.75 6.69 1.824-1.81c-.399-.395-2.186-1.922-2.186-2.412 0-.433 1.75-2.167 2.186-2.167.152 0 .324.076.438.189.703.697 6.008 5.653 6.008 6.2z"/>
        </g>
    </svg>
);

const cancellationIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78">
        <g fill="none" fillRule="evenodd">
            <circle cx="39" cy="39" r="39" fill="#ECEFF1"/>
            <circle cx="39" cy="39" r="34" fill="#CFD8DC"/>
            <path fill="#FFF" d="M50 45.704c0 .463-.185.926-.519 1.259l-2.518 2.518a1.796 1.796 0 0 1-1.26.519c-.462 0-.925-.185-1.259-.519L39 44.037l-5.444 5.444a1.796 1.796 0 0 1-1.26.519c-.463 0-.926-.185-1.259-.519l-2.518-2.518a1.796 1.796 0 0 1-.519-1.26c0-.462.185-.925.519-1.259L33.963 39l-5.444-5.444a1.796 1.796 0 0 1-.519-1.26c0-.463.185-.926.519-1.259l2.518-2.518a1.796 1.796 0 0 1 1.26-.519c.462 0 .925.185 1.259.519L39 33.963l5.444-5.444a1.796 1.796 0 0 1 1.26-.519c.463 0 .926.185 1.259.519l2.518 2.518c.334.333.519.796.519 1.26 0 .462-.185.925-.519 1.259L44.037 39l5.444 5.444c.334.334.519.797.519 1.26z"/>
        </g>
    </svg>
);

const customIcon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="78" height="78" viewBox="0 0 78 78">
        <g fill="none" fillRule="evenodd">
            <circle cx="39" cy="39" r="39" fill="#D7F1EF"/>
            <circle cx="39" cy="39" r="34" fill="#9CDCD6"/>
            <path fill="#FFF" d="M39.676 38.818c.645 0 1.178.536 1.178 1.182 0 .646-.533 1.182-1.178 1.182A1.188 1.188 0 0 1 38.498 40c0-.646.534-1.182 1.178-1.182zM45.2 40l9.335 7.35c.331.24.497.646.46 1.034a1.248 1.248 0 0 1-.644.941l-2.357 1.182c-.166.092-.35.13-.534.13-.203 0-.405-.056-.57-.148l-12.705-7.147-2.026 1.22a1.124 1.124 0 0 1-.22.091c.165.573.239 1.182.184 1.792-.166 1.902-1.437 3.711-3.462 5.004-1.565.997-3.37 1.551-5.1 1.551-1.657 0-3.056-.499-4.088-1.44a4.643 4.643 0 0 1-1.454-3.823c.166-1.883 1.436-3.711 3.443-5.004 1.565-.997 3.388-1.551 5.119-1.551 1.03 0 1.97.203 2.78.572.11-.166.24-.295.405-.406L36.012 40l-2.246-1.348a1.417 1.417 0 0 1-.405-.406c-.81.37-1.75.572-2.78.572-1.731 0-3.554-.554-5.119-1.551-2.007-1.293-3.277-3.12-3.443-5.004a4.584 4.584 0 0 1 1.454-3.804c1.032-.96 2.43-1.459 4.088-1.459 1.73 0 3.535.554 5.1 1.551 2.025 1.274 3.296 3.102 3.462 5.004a4.876 4.876 0 0 1-.185 1.792c.074.018.148.055.221.092l2.026 1.219 12.704-7.147c.166-.092.368-.147.57-.147.185 0 .37.037.535.129l2.357 1.182c.35.184.589.535.644.941.037.388-.129.795-.46 1.035L45.2 40zM32.66 35.199c1.123-1.034.424-2.9-1.565-4.155-1.123-.72-2.43-1.09-3.535-1.09-.847 0-1.602.222-2.08.665-1.124 1.034-.424 2.9 1.564 4.155 1.124.72 2.412 1.09 3.536 1.09.847 0 1.601-.222 2.08-.665zm-1.565 13.757c1.989-1.256 2.688-3.12 1.565-4.155-.479-.443-1.233-.665-2.08-.665-1.124 0-2.412.37-3.536 1.09-1.988 1.256-2.688 3.12-1.565 4.155.48.443 1.234.664 2.081.664 1.105 0 2.412-.369 3.535-1.089zm3.277-11.32l1.768 1.071v-.203c0-.424.24-.812.608-1.034l.257-.148-1.454-.867-.479.48c-.147.147-.258.295-.405.424-.055.056-.092.074-.129.111l-.166.166zm4.125 4.137l1.767.59 13.552-10.636-2.357-1.182-14.14 7.96v2.086l-2.947 1.773.166.147c.037.056.074.074.129.111.147.148.258.296.405.443l.479.48 2.946-1.772zm12.962 7.682l2.357-1.182-9.575-7.534-3.259 2.548c-.055.074-.147.092-.239.13l10.716 6.038z"/>
        </g>
    </svg>
);

export default SelectType;
