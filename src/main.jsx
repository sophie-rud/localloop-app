import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles/variables.css'
import {RouterProvider} from "react-router-dom"
import {router} from './routes/router.jsx'
import 'leaflet/dist/leaflet.css';
import {AuthProvider} from "./contexts/auth-context.jsx";


createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <RouterProvider router={router} />
    </AuthProvider>
// <StrictMode>
//     <App />
//   </StrictMode>,
)
