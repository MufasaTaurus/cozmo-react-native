// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import {getAsyncInjectors} from './utils/asyncInjectors';
import { chunkFailedToLoad } from 'containers/App/actions';

const errorLoading = (err, store) => {
    console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
    store.dispatch(chunkFailedToLoad())
};

const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};

export default function createRoutes(store) {
    // create reusable async injectors using getAsyncInjectors factory
    const {injectReducer, injectSagas} = getAsyncInjectors(store);

    return [
        {
            path: '/',
            name: 'home',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/HomePage/reducer'),
                    import('containers/HomePage/sagas'),
                    import('containers/HomePage'),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('home', reducer.default);
                    injectSagas('home', sagas.default);
                    renderRoute(component);
                });

                importModules.catch((err) => errorLoading(err, store));
            },
        }, {
            path: '/signup',
            name: 'signup',
            childRoutes: [
                {
                    path: 'account-verification',
                }, {
                    path: 'email'
                }, {
                    path: 'forgot'
                }
            ],
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Signup/reducer'),
                    import('containers/Signup/sagas'),
                    import('containers/Signup'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('signup', reducer.default);
                    injectSagas('signup', sagas.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        }, {
            path: '/reset-password',
            name: 'resetPassword',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/ResetPassword/reducer'),
                    import('containers/ResetPassword/sagas'),
                    import('containers/ResetPassword'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('resetPassword', reducer.default);
                    injectSagas('resetPassword', sagas.default);
                    renderRoute(component);
                });
                importModules.catch(errorLoading);
            }
        },{
            path: '/forgot',
            name: 'forgot',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Signup/reducer'),
                    import('containers/Signup/sagas'),
                    import('containers/Signup'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('signup', reducer.default);
                    injectSagas('signup', sagas.default);
                    renderRoute(component);
                });
                importModules.catch(errorLoading);
            }
        },
        {
            path: '/onboarding',
            name: 'onboarding',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Onboarding/reducer'),
                    import('containers/Onboarding/sagas'),
                    import('containers/Onboarding'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('onboarding', reducer.default);
                    injectSagas('onboarding', sagas.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        },
        {
            path: 'properties',
            name: 'properties',
            childRoutes: [
                {
                    path: 'create',
                    name: 'create-property'
                }, {
                    path: ':id',
                    childRoutes: [
                        {
                            path: ':section',
                            childRoutes: [
                                {
                                    path: ':subsection'
                                }
                            ],
                        }
                    ],
                }
            ],
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Properties/reducer'),
                    import('containers/Properties/sagas'),
                    import('containers/Templates/reducer'),
                    import('containers/Templates/sagas'),
                    import('containers/Reservations/reducer'),
                    import('containers/Reservations/sagas'),
                    import('containers/Properties'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, reducerSecondary, sagasSecondary, reducer3, sagas3, component]) => {
                    injectReducer('properties', reducer.default);
                    injectSagas('properties', sagas.default);
                    injectReducer('templates', reducerSecondary.default);
                    injectSagas('templates', sagasSecondary.default);
                    injectReducer('reservations', reducer3.default);
                    injectSagas('reservations', sagas3.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        }, {
            path: 'reservations',
            name: 'reservations',
            childRoutes: [
                {
                    path: ':id'
                }
            ],
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Reservations/reducer'),
                    import('containers/Reservations/sagas'),
                    import('containers/Reservations'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('reservations', reducer.default);
                    injectSagas('reservations', sagas.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        }, {
            path: 'calendars',
            name: 'calendars',
            childRoutes: [
                {
                    path: ':id'
                }
            ],
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Reservations/reducer'),
                    import('containers/Reservations/sagas'),
                    import('containers/Reservations'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('reservations', reducer.default);
                    injectSagas('reservations', sagas.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        }, {
            path: 'vendors',
            name: 'vendors',
            childRoutes: [
                {
                    path: ':section',
                    childRoutes: [
                        {
                            path: ':id'
                        }
                    ]
                }
            ],
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Vendors/reducer'),
                    import('containers/Vendors/sagas'),
                    import('containers/Vendors'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('vendors', reducer.default);
                    injectSagas('vendors', sagas.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        }, {
            path: 'templates',
            name: 'templates',
            childRoutes: [
                {
                    path: ':id'
                }
            ],
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Templates/reducer'),
                    import('containers/Templates/sagas'),
                    import('containers/Templates'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('templates', reducer.default);
                    injectSagas('templates', sagas.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        }, {
            path: 'inbox',
            name: 'inbox',
            childRoutes: [
                {
                    path: ':id',
                    childRoutes: [
                        {
                            path: ':guestId'
                        }
                    ],
                }
            ],
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Inbox/reducer'),
                    import('containers/Inbox/sagas'),
                    import('containers/Inbox'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('inbox', reducer.default);
                    injectSagas('inbox', sagas.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        }, {
            path: 'settings',
            name: 'settings',
            childRoutes: [
                {
                    path: ':section',
                    childRoutes: [
                        {
                            path: ':subsection'
                        }
                    ]
                }
            ],
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Settings/reducer'),
                    import('containers/Settings/sagas'),
                    import('containers/Settings'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('settings', reducer.default);
                    injectSagas('settings', sagas.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        }, {
            path: 'insights',
            name: 'analytics',
            childRoutes: [
                {
                    path: ':section',
                    childRoutes: [
                        {
                            path: ':subsection'
                        }
                    ]
                }
            ],
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Analytics/reducer'),
                    import('containers/Analytics/sagas'),
                    import('containers/Analytics'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('analytics', reducer.default);
                    injectSagas('analytics', sagas.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        }, {
            path: 'owners',
            name: 'owners',
            childRoutes: [
                {
                    path: ':id',
                    childRoutes: [
                        {
                            path: ':section'
                        }
                    ]
                }
            ],
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Owners/reducer'),
                    import('containers/Owners/sagas'),
                    import('containers/Owners'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('owners', reducer.default);
                    injectSagas('owners', sagas.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        }, {
            path: 'websites',
            name: 'websites',
            childRoutes: [
                {
                    path: ':id',
                    childRoutes: [
                        {
                            path: ':section'
                        }
                    ]
                }
            ],
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Websites/reducer'),
                    import('containers/Websites/sagas'),
                    import('containers/Websites'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('websites', reducer.default);
                    injectSagas('websites', sagas.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        }, {
            path: 'shadow',
            name: 'shadow',
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    import('containers/Shadow/reducer'),
                    import('containers/Shadow/sagas'),
                    import('containers/Shadow'),
                ]);
                const renderRoute = loadModule(cb);
                importModules.then(([reducer, sagas, component]) => {
                    injectReducer('shadow', reducer.default);
                    injectSagas('shadow', sagas.default);
                    renderRoute(component);
                });
                importModules.catch((err) => errorLoading(err, store));
            }
        }, {
            path: '*',
            name: 'notfound',
            getComponent(nextState, cb) {
                import('containers/NotFoundPage')
                    .then(loadModule(cb))
                    .catch(errorLoading);
            },
        },
    ];
}
