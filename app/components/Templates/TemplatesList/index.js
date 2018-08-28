import React from 'react';
import Breadcrumbs from 'components/Breadcrumbs';
import Tabs from 'components/Tabs';
import MessageTemplates from './MessageTemplates';
import WelcomeLetters from './WelcomeLetters';
import './templatesList.less';

export class TemplatesList extends React.Component {

    render() {
        return (
            <div className="templates-list">
                <Breadcrumbs section={ 'Templates' } subsection={[{ title: 'Templates List' }]} />
                <div className="content">
                    <Tabs tabs={[
                        { title: 'Message Templates', content: <MessageTemplates/> },
                        { title: 'Welcome Letters', content: <WelcomeLetters/> },
                    ]}/>
                </div>
            </div>
        );
    }
}

export default TemplatesList;
