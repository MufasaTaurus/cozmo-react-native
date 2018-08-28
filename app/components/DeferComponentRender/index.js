import React from 'react';

export default function deferComponentRender(WrappedComponent) {
    class DeferredRenderWrapper extends React.Component {
        constructor(props, context) {
            super(props, context);
            this.state = { shouldRender: false };
        }

        componentDidMount() {
            window.requestAnimationFrame(() => {
                window.requestAnimationFrame(() => this.setState({ shouldRender: true }));
            });
        }

        render() {
            return this.state.shouldRender ? <WrappedComponent {...this.props} /> : null;
        }
    }

    return DeferredRenderWrapper;
}
