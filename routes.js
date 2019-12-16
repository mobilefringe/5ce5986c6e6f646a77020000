define([], function () {
    return [
        {
            path: '/',
            name:'home',
            component: view('home')
        },
        {
            path: '/about-us',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('about'),
                    meta: {
                        pageName: 'About Us',
                    },
                    name: 'about'
                }
            ]
        },
        {
            path: '/contact-us',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('contact'),
                    meta: {
                        pageName: 'Contact Us',
                    },
                    name: 'contact'
                }
            ]
        },
        {
            path: '/directions',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('directions'),
                    meta: {
                        pageName: 'Directions',
                    },
                    name: 'directions'
                }
            ]
        },
        {
            path: '/events/:id',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('event_details'),
                    meta: {
                        pageName: 'Events',
                    },
                    name: 'eventDetails',
                    props: true
                }
            ]
        },
        {
            path: '/jobs',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('jobs'),
                    meta: {
                        pageName: 'Careers',
                    },
                    name: 'jobs'
                },
                {
                    path: ':id',
                    component: view('job_details'),
                    meta: {
                        pageName: 'Careers',
                    },
                    name: 'jobDetails',
                    props: true
                }
            ]
        },
        // {
        //     path: '/newsletter',
        //     component: view('default'),
        //     children: [
        //         {
        //             path: '',
        //             component: view('newsletter'),
        //             meta: {
        //                 pageName: 'Newsletter',
        //             },
        //             name: 'newsletter'
        //         }
        //     ]
        // },
        {
            path: '/pages',
            component: view('default'),
            children: [
                {
                    path: ':id',
                    component: view('page_details'),
                    name: 'pageDetails',
                    props: true
                }
            ]
        },
        {
            path: '/posts',
            component: view('default'),
            children: [{
                    path: '',
                    component: view('posts'),
                    name: 'postList'
                },
                {
                    path: ':id',
                    component: view('post_details'),
                    name: 'postDetails',
                    props: true
                }
            ]
        },
        {
            path: 'https://lewisgroupofcompanies.com/lewis-privacy-policy/',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('page_details'),
                    meta: {
                        pageName: 'Privacy Policy',
                    },
                    name: 'privacy-policy'
                }
            ]
        },
        {
            path: '/promotions/:id',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('promotion_details'),
                    meta: {
                        pageName: 'Sales',
                    },
                    name: 'promotionDetails',
                    props: true
                }
            ]
        },
        {
            path: '/sales-and-events',
            component: view('default'),
            meta: {
                breadcrumb: 'Sales & Events',
            },
            children: [
                {
                    path: '',
                    component: view('sales_and_events'),
                    name: 'sales_and_events'
                }
            ]
        },
        {
            path: '/stores',
            component: view('default'),
            children: [
                {   
                    path: '',
                    component: view('stores'),
                    meta: {
                        pageName: 'Store Directory',
                    },
                    name: 'storeList'
                },
                {
                    path: ':id',
                    component: view('store_details'),
                    meta: {
                        pageName: 'Store Details',
                    },
                    name: 'storeDetails',
                    props: true
                }
            ]
        },
        {
            path: '/search-results',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('search_results'),
                    meta: {
                        pageName: 'Search Results',
                    },
                    name: 'search-results'
                }
            ]
        },
        {
            path: '/terms-of-use',
            component: view('default'),
            children: [
                {
                    path: '',
                    component: view('page_details'),
                    meta: {
                        pageName: 'Terms of Use',
                    },
                    name: 'terms-of-use'
                }
            ]
        },
        {
            path: '*',
            redirect: '/'
        }
    ]

    /*
    * Asynchronously load view (lazy-loading)
    * @param {string} name the filename (basename) of the view to load.
    */
    function view(name) {
        return function(resolve) { require(['vue!' + name + '.vue'], resolve); }
    };
});
