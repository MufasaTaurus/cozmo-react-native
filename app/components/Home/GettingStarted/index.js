import React from 'react';
import SVG from 'components/SVG';
import Items from 'components/Home/GettingStarted/Items';
import PercentIndicator from 'components/Home/GettingStarted/PercentIndicator';
import './gettingStarted.less';

export class GettingStarted extends React.Component {

    getSteps() {
        return [
            {
                title: 'CREATE/IMPORT LISTINGS',
                desc: 'Get started by building your first listing from scratch or import them from another supported website using our import tool.',
                icon: 'importEdit',
                linkTo: '/properties',
                isNew: true
            },
            {
                title: 'ADD TEAMMATES',
                desc: 'The more the merrier. Add your team to start helping you manage your properties.',
                icon: 'personAdd',
                isNew: true
            },
            {
                title: 'WATCH TUTORIALS',
                desc: 'Learn how to use and get the best out of your toolset in order to be productive and effective.',
                icon: 'play',
                isNew: false
            },
            {
                title: 'CUSTOMIZE YOUR ACCOUNT',
                desc: 'Fill out your profile and personal information. Set up a subdomain to quickly access your dashboard.',
                icon: 'settings',
                isNew: false
            },
            {
                title: 'ADD PHONE SERVICE: AIRCALL INTEGRATION',
                desc: 'Use a VOIP calling software provider to easily make and take calls from anywhere. Track call performance!',
                icon: 'phone',
                isNew: false
            },
            {
                title: 'EXPLORE POWERFUL APP INTEGRATIONS',
                desc: 'Use a VOIP calling software provider to easily make and take calls from anywhere. Track call performance!',
                icon: 'apps',
                isNew: false
            }
        ];
    }


    render() {
        return (
            <div className="getting-started">
                <div className="header">
                    <div className="left-side">
                        <div className="icon-wrapper"><SVG icon={ 'newExclamation' } size={ 88 } /></div>
                        <div className="text-wrapper">
                            <h1>Getting started</h1>
                            <p className="info">Setup your workspace and account by exploring Cozmo and completing the checklist.</p>
                        </div>
                    </div>
                    <PercentIndicator percent={ 10 } />
                </div>
                <Items items={ this.getSteps() } />
            </div>
        );
    }
}

export default GettingStarted;
