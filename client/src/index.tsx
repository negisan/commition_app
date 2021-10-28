import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'
import './index.css'
import App from './App'
import { AuthProvider } from './context/auth.context'
import { UIProvider } from './context/UI.context'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <UIProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </UIProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
)
