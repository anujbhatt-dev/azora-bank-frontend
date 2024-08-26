import { useEffect, useState, createContext } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import axios from 'axios';
import { Toaster } from "react-hot-toast";

// Create UserContext to manage user authentication and data
export const UserContext = createContext();

function App() {
  const navigate = useNavigate();

  // State to manage authentication status
  const [auth, setAuth] = useState(false);

  // State to manage user data
  const [data, setData] = useState({}); // Initialize as empty object

  // Function to set user data and mark user as authenticated
  const authorize = async (userData) => {
    try {
      setAuth(true);
      setData(userData); // Avoid shallow cloning unless necessary
    } catch (error) {
      console.log("Authorization error:", error);
    }
  };

  // Function to log out the user
  const logout = () => {
    setAuth(false);
    setData({});
    navigate("/login");
  };

  // Function to handle updates to user data
  const handleData = (total) => {
    console.log("Updating user data");
    const newData = data
    newData.account.balance = total
    setData({
      ...newData   
    })
    console.log(data);
    
  };
  
  useEffect(()=>{
    console.log("app: ");
    
  },[])
  

  return (
    // Provide context to child components
    <UserContext.Provider value={{ auth, data, authorize, logout, handleData, setAuth ,setData}}>
      <div className='min-h-screen pb-[18vh] mx-[2rem] lg:mx-[20rem] relative'>
        <Toaster
          position="top-right"
          reverseOrder={false}
        />
        <Header />
        <Outlet />
        <Footer />
      </div>
    </UserContext.Provider>
  );
}

export default App;
