import React from 'react';
import Helmet from 'react-helmet';
import PropertiesComponent from 'components/Properties';

class Properties extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Properties"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
                <PropertiesComponent
                    id={ this.props.params.id }
                    isCreateNew={ this.props.routes[this.props.routes.length - 1].name === 'create-property' }
                    mainSection={ this.props.params.mainSection  }
                    subsection={ this.props.params.subsection  }
                    section={ this.props.params.section } />
            </article>
        );
    }
}

export default Properties;
