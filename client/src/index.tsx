import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { STRIPE_PUBLISHABLE_KEY } from './helper/constants'

import './index.css'
import App from './App'
import { AuthProvider } from './context/auth.context'
import { UIProvider } from './context/UI.context'
import { UsersProvider } from './context/users.context'
import { OrderProvider } from './context/order.context'
import { RequestsProvider } from './context/requests.context'

const stripePromise = loadStripe(STRIPE_PUBLISHABLE_KEY)

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <Router>
        <UIProvider>
          <AuthProvider>
            <UsersProvider>
              <RequestsProvider>
                <OrderProvider>
                  <App />
                </OrderProvider>
              </RequestsProvider>
            </UsersProvider>
          </AuthProvider>
        </UIProvider>
      </Router>
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
)
