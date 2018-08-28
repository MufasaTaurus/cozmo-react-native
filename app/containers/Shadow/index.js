import React from 'react';
import Helmet from 'react-helmet';
import ShadowComponent from 'components/Shadow';

class Shadow extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Shadow"
                    meta={[
                        { name: 'description', content: 'Voyajoy' },
                    ]}
                />
                <ShadowComponent />
            </article>
        );
    }
}

export default Shadow;
