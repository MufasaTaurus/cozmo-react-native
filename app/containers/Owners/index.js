import React from 'react';
import Helmet from 'react-helmet';
import OwnersComponent from 'components/Owners';

class Owners extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Owners"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
                <OwnersComponent
                    id={ this.props.params.id }
                    section={ this.props.params.section }
                />
            </article>
        );
    }
}

export default Owners;
