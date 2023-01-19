import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { HashRouter as Router } from 'react-router-dom'
import './index.css'

import { ContextProvider } from './context/AppContext'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ContextProvider>
      <Router>
        <App />
      </Router>
    </ContextProvider>
  </React.StrictMode>
)
