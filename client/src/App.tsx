import React from 'react'
import { Switch, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Navbar } from './components'

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
        <Route exact path='/:user' component={UserPage} />
        <Route exact path='/:user/artwork/:id' component={UserArtwork} />
        <Route path='*' component={ErrorPage} />
      </Switch>
      {/* <Account /> */}
      {/* <Requests /> */}
    </div>
  )
}
export default App
