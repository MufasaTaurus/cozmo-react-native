import React from 'react';
import Helmet from 'react-helmet';
import HomeComponent from 'components/Home';

class HomePage extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Home Page"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
                <HomeComponent/>
            </article>
        );
    }
}

export default HomePage;
