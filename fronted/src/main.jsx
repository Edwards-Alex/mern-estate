// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { store } from './redux/store.js'
import { Provider } from 'react-redux'
import SignContextProvider from './context/SignContext.jsx'
import { BrowserRouter } from 'react-router-dom'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <SignContextProvider>
        <App />
      </SignContextProvider>
    </BrowserRouter>
  </Provider>
)
