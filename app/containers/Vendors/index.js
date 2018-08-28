import React from 'react';
import Helmet from 'react-helmet';
import VendorsComponent from 'components/Vendors';

class Vendors extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Vendors"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
          
                <VendorsComponent
                    section={ this.props.params.section }
                    id={ this.props.params.id } />
            </article>
        );
    }
}

export default Vendors;
