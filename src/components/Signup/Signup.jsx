import React, { useContext, useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App'
import toast from 'react-hot-toast';

export default function Signup(){
  const userData = useContext(UserContext)
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/user/signup', formData);
      console.log(response.data);
      // Handle successful signup
      userData.authorize(response.data)
      toast.success("signup successfull!!")
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
      toast.error("unable to signup")
      // Handle errors
    }
  };

  return (
    <div className='h-[80vh] flex justify-center items-center flex-col'>
      <h2 className='text-[1.5rem] font-bold w-[20rem] text-fuchsia-900 uppercase'>Signup</h2>
      <h2 className='text-[1rem] w-[20rem] mb-[2rem] opacity-50'>Banking made easy</h2>
      <form className='flex justify-center items-center flex-col w-[20rem] min-h-[55vh]' onSubmit={handleSubmit}>
        <label htmlFor="name" className='w-full mb-[.4rem] text-[1rem] font-semibold text-zinc-700'>Name</label>
        <input autoComplete={"false"} className='w-full bg-transparent bottom-0 border-b mb-[1rem] h-[3rem] pl-[.5rem] rounded text-zinc-700' type="text" name="name" value={name} onChange={handleChange} placeholder="Name" required />
        <label htmlFor="email" className='w-full mb-[.4rem] text-[1rem] font-semibold text-zinc-700'>Email</label>
        <input autoComplete={"false"} className='w-full bg-transparent bottom-0 border-b mb-[1rem] h-[3rem] pl-[.5rem] rounded text-zinc-700' type="email" name="email" value={email} onChange={handleChange} placeholder="Email" required />
        <label htmlFor="password" className='w-full mb-[.4rem] text-[1rem] font-semibold text-zinc-700'>Password</label>
        <input autoComplete={"false"} className='w-full bg-transparent bottom-0 border-b mb-[1rem] h-[3rem] pl-[.5rem] rounded' type="password" name="password" value={password} onChange={handleChange} placeholder="Password" required />
        <button className='self-start h-[3rem] w-[10rem] text-center bg-fuchsia-900 text-slate-50 rounded transition-all hover:-translate-y-[3px] active:-translate-y-[1px] mb-[1rem] shadow-sm shadow-gray-600' type="submit">Signup</button>
        <h2  className='text-[1rem] w-[20rem] mb-[2rem]'>existing user? <NavLink className="font-medium transition-all duration-500 hover:italic" to="/login">Login</NavLink></h2>
      </form>
    </div>
  );
};
