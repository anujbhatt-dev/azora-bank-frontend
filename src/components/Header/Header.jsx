import React, { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../../App'

export default function Header() {
  const userData = useContext(UserContext)
  return (
    <div className='flex justify-between items-center h-[4rem] border-b px-[1rem] '>
        <h4 className='font-bold md:text-[1rem] text-[.80rem]'>Welcome to Azora Bank</h4>
        {userData.auth?
        <div className=''>
            <NavLink onClick={userData.logout} className={`text-orange-600 font-medium mr-[1rem] md:text-[1rem] text-[.80rem]`} to="login">Logout</NavLink>
        </div>
        :
        <div className=''>
            <NavLink className={({isActive})=>`${isActive?`text-orange-600`:`text-zinc-800`} font-medium mr-[1rem] md:text-[1rem] text-[.80rem]`} to="login">Login</NavLink>
            <NavLink className={({isActive})=>`${isActive?`text-orange-600`:`text-zinc-800`} font-medium md:text-[1rem] text-[.80rem]`} to="">Signup</NavLink>
        </div>
        }
        
    </div>
  )
}
