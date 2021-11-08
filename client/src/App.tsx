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
  RequestsCreator,
  Login,
  Signup,
  ErrorPage,
  Order,
  AllArtworks
} from './pages'

function App() {
  return (
    <div>
      <ToastContainer
        position='top-center'
        autoClose={4000}
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
        <Route exact path="/artworks" component={AllArtworks} />
        <Route exact path='/artworks/:id' component={ArtworkDetails} />
        <PrivateRoute exact path='/user/:user/order' component={Order} />
        <PrivateRoute exact path='/account' component={Account} />
        <PrivateRoute exact path='/requests' component={Requests} />
        <PrivateRoute exact path='/requests/creator' component={RequestsCreator} />
        <Route path='*' component={ErrorPage} />
      </Switch>
    </div>
  )
}
export default App
