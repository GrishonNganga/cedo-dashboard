import React, { lazy, useEffect } from 'react'
import { Router, Switch, Route, Redirect, useHistory, useLocation } from 'react-router-dom'
import AccessibleNavigationAnnouncer from './components/AccessibleNavigationAnnouncer'

import { refreshToken } from './api/endpoints'
import { userStore } from './stores'

import history from './history'

const Layout = lazy(() => import('./containers/Layout'))
const Login = lazy(() => import('./pages/Login'))
const Onboarding = lazy(() => import('./pages/Onboarding'))
const CreateAccount = lazy(() => import('./pages/CreateAccount'))
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'))

function App() {
  const location = useLocation()
  const user = userStore(state => state.user)
  const storeUser = userStore(state => state.storeUser)

  useEffect(() => {
    if (!user) {
      refreshToken().then(response => {
        if (response && response.status === 200 && response.data.user) {
          storeUser(response.data.user)
        } else {
          storeUser(null)
          history.push("/login")
        }
      })
    }

    if (!user?.company_name && !user?.location && !user?.logo) {
      history.push("/onboarding/step-1")
      return
    } else {
      history.push(location.pathname)
      return
    }

  }, [user])
  return (
    <>
      <Router history={history}>
        <AccessibleNavigationAnnouncer />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/create-account" component={CreateAccount} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/onboarding" component={Onboarding} />
          <Route path="/app" component={Layout} />
          <Redirect exact from="/" to="/login" />
        </Switch>
      </Router>
    </>
  )
}

export default App
