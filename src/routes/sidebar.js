/**
 * ⚠ These are used just to render the Sidebar!
 * You can include any link here, local or external.
 *
 * If you're looking to actual Router routes, go to
 * `routes/index.js`
 */
const routes = [
    {
        path: '/app/dashboard', // the url
        icon: 'HomeIcon', // the component being exported from icons/index.js
        name: 'Dashboard', // name that appear in Sidebar
    },
    {

        icon: 'CampaignsIcon', // the component being exported from icons/index.js
        name: 'Campaigns', // name that appear in Sidebar
        routes: [
            {
                path: '/app/campaigns', // the url
                icon: 'CampaignsIcon', // the component being exported from icons/index.js
                name: 'View Campaigns', // name that appear in Sidebar
            },
            {
                path: '/app/campaigns/new', // the url
                icon: 'PlusICon', // the component being exported from icons/index.js
                name: 'New Campaign', // name that appear in Sidebar
            },

        ]
    },
    {
        path: '/app/transactions', // the url
        icon: 'TransactionsIcon', // the component being exported from icons/index.js
        name: 'Transactions', // name that appear in Sidebar
    },
]

export default routes