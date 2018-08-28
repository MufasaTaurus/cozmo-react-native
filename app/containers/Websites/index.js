import React from 'react';
import Helmet from 'react-helmet';
import WebsitesComponent from 'components/Websites';

class Owners extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Websites"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
                <WebsitesComponent
                    id={ this.props.params.id }
                    section={ this.props.params.section }
                />
            </article>
        );
    }
}

export default Owners;
