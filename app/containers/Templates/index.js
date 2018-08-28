import React from 'react';
import Helmet from 'react-helmet';
import TemplatesComponent from 'components/Templates';

class Templates extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Vendors"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
                <TemplatesComponent
                    id={ this.props.params.id } />
            </article>
        );
    }
}

export default Templates;
