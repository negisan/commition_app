import React from 'react'

import { Navbar } from './components'

import { Account, Home, UserArtwork, UserPage, Request } from './pages'

function App() {
  return (
    <div>
      <Navbar />
      <Account />
      <Request />
      <UserPage />
      <UserArtwork />
      <Home />
    </div>
  )
}
export default App
