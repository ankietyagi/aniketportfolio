import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './ThemeContext'
import App from './App'
import UsPage from './app/UsPage' // Ensure this path is correct based on your file tree
import './index.css'

// This is the gatekeeper
const currentPath = window.location.pathname;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {currentPath === '/hey_beautiful_open_this' ? (
      <UsPage />
    ) : (
      <ThemeProvider>
        <App />
      </ThemeProvider>
    )}
  </React.StrictMode>,
)
