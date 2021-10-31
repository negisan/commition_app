import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Navbar, PrivateRoute } from './components'

import {
  Account,
  Home,
  ArtworkDetails,
  UserPage,
  Requests,
  Login,
  Signup,
  ErrorPage,
} from './pages'

function App() {
  return (
    <div>
      <ToastContainer
        position='top-center'
        autoClose={5000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/login' component={Login} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/user/:user' component={UserPage} />
        <Route exact path='/user/:user/artwork/:id' component={ArtworkDetails} />
        <PrivateRoute exact path='/account' component={Account} />
        <PrivateRoute exact path='/requests' component={Requests} />
        <Route path='*' component={ErrorPage} />
      </Switch>
    </div>
  )
}
export default App
