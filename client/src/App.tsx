import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Navbar, PrivateRoute } from './components'

import {
  Account,
  Home,
  UserArtwork,
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
        <Route exact path='/users/:user' component={UserPage} />
        <Route exact path='/users/:user/artwork/:id' component={UserArtwork} />
        <PrivateRoute exact path='/account' component={Account} />
        <PrivateRoute exact path='/requests' component={Requests} />
        <Route path='*' component={ErrorPage} />
      </Switch>
    </div>
  )
}
export default App
