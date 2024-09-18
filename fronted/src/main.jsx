// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import SignContextProvider from './context/SignContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <SignContextProvider>
          <App />
        </SignContextProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
