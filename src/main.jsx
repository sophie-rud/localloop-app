import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles/variables.css'
import {RouterProvider} from "react-router-dom"
import {router} from './routes/router.jsx'
import 'leaflet/dist/leaflet.css';

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
// <StrictMode>
//     <App />
//   </StrictMode>,
)
