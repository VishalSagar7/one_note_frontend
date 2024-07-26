import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import AccountCircleRoundedIcon from '@mui/icons-material/AccountCircleRounded';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const Navbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();
  const userInfo = useSelector(store => store.user.userData);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <div className='w-full h-[80px] bg-sky-500 flex justify-between items-center px-[25px] lg:px-[200px] fixed top-0 z-10'>
      <h1 className='text-xl text-white font-semibold'>{userInfo.name} 📝</h1>

      <div className='h-full text-white flex items-center'>
        <div className='h-full text-white flex items-center'>
          <Link to={"/home"}>
            <h1 className='text-xl font-semibold hover:text-gray-200'>Home</h1>
          </Link>
        </div>

        <Tooltip title="Profile">
          <AccountCircleRoundedIcon
            onClick={handleClick}
            sx={{
              fontSize: '30px',
              marginLeft: '30px',
              cursor: 'pointer'
            }}
          />
        </Tooltip>

        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          sx={{ 
            marginTop :'2px',

          }}
        >
          <MenuItem onClick={handleClose}>{userInfo.name}</MenuItem>
          <MenuItem onClick={handleClose}>{userInfo.email}</MenuItem>
          <MenuItem onClick={() => navigate('/')}>Logout</MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Navbar;
