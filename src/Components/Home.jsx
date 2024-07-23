import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Journal from './Journal'
import homebg from "../assets/homebg.jpeg"


const Home = () => {

  const navigate = useNavigate()

  const userData = useSelector(store => store.user.userData)



  useEffect(() => {
    if(!userData){
      navigate('/')
    }
  })

  return (
    <div className=' bg-gray-200 min-h-[120vh] pb-[100px] overflow-auto' style={{backgroundImage : `url(${homebg})`}} >
      <Navbar/>
      <Journal/>
    </div>
  )
}

export default Home;
