import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import alertify from 'alertifyjs';
import 'alertifyjs/build/css/alertify.min.css';
// Configuración de alertify
alertify.set('notifier', 'position', 'top-center');

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
