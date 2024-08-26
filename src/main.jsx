import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"; 
import App from './App.jsx'
import './index.css'
import Page404 from './components/Page404/Page404.jsx';
import Login from './components/Login/Login.jsx';
import Signup from './components/Signup/Signup.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_BASE_URL
axios.defaults.withCredentials = true;




const router = createBrowserRouter([{
  path:"/",
  element:<App/>,
  errorElement:<Page404/>,
  children:[
    {
      path:"/",
      element:<Signup/>      
    },
    {
      path:"/login",
      element:<Login/>      
    },
    {
      path:"/dashboard",
      element:<Dashboard/>      
    },
  ]
}])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
