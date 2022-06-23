import { lazy } from 'react'

const Dashboard = lazy(() => import('../pages/Dashboard'))
const Campaigns = lazy(() => import('../pages/Campaigns'))
const CampaignsNew = lazy(() => import('../pages/NewCampaign'))
const Transactions = lazy(() => import('../pages/Transactions'))
const Page404 = lazy(() => import('../pages/404'))
const Blank = lazy(() => import('../pages/Blank'))

/**
 * ⚠ These are internal routes!
 * They will be rendered inside the app, using the default `containers/Layout`.
 * If you want to add a route to, let's say, a landing page, you should add
 * it to the `App`'s router, exactly like `Login`, `CreateAccount` and other pages
 * are routed.
 *
 * If you're looking for the links rendered in the SidebarContent, go to
 * `routes/sidebar.js`
 */
const routes = [
  {
    path: '/dashboard', // the url
    component: Dashboard, // view rendered
  },
  {
    path: '/campaigns', // the url
    component: Campaigns, // view rendered
  },
  {
    path: '/campaigns/new', // the url
    component: CampaignsNew, // view rendered
  },
  {
    path: '/transactions', // the url
    component: Transactions, // view rendered
  },
  {
    path: '/404',
    component: Page404,
  },
  {
    path: '/blank',
    component: Blank,
  },
]

export default routes