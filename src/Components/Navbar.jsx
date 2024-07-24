import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from "react-router-dom";
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import { Link } from 'react-router-dom';
import Tooltip from '@mui/material/Tooltip';


const Navbar = () => {

  const navigate = useNavigate();
  const userInfo = useSelector(store => store.user.userData);


  useEffect(() => {
    if (!userInfo) {
      navigate('/')
    }
  })

  return (
    <div className='w-full h-[80px] bg-sky-500 flex justify-between items-center px-[25px] lg:px-[200px] fixed top-0 z-10'>
      <h1 className='text-xl text-white font-semibold '>{userInfo.name} 📝</h1>


      <div className='h-full text-white flex items-center'>

        <div className='h-full text-white flex items-center'>
          <Link to={"/home"}><h1 className='text-xl font-semibold hover:text-gray-200'>Home</h1></Link>
        </div>

        <Tooltip title ="profile">
          <AccountCircleRoundedIcon
            sx={{
              fontSize: '30px',
              marginLeft: '30px'
            }}
          />
        </Tooltip>
      </div>

    </div>
  )
}

export default Navbar;

