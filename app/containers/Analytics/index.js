import React from 'react';
import Helmet from 'react-helmet';
import Analytics from 'components/Analytics';

class AnalyticsContainer extends React.Component {

    render() {
        return (
            <article>
                <Helmet
                    title="Analytics"
                    meta={[
                        { name: 'description', content: 'Analytics' },
                    ]}
                />
                <Analytics/>
            </article>
        );
    }
}

export default AnalyticsContainer;
