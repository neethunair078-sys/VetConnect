import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Provider} from "react-redux"
import { Toaster } from "react-hot-toast";
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <App />
        <Toaster position="top-right" />
      </AuthProvider>
    </Provider>
  </StrictMode>,
)
