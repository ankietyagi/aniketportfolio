import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './ThemeContext'
import App from './App'
import UsPage from './app/UsPage'
import './index.css'

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
