import React from 'react';
import Helmet from 'react-helmet';
import SettingsComponent from 'components/Settings';

class Templates extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Settings"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
                <SettingsComponent
                    section={ this.props.params.section }
                    subsection={ this.props.params.subsection }
                    query={ this.props.location.query }
                />
            </article>
        );
    }
}

export default Templates;
