import React from 'react'
import { useNavigate } from 'react-router-dom'
import Previous from '../assets/previous.png'

const Navbar = () => {
  const navigate = useNavigate()
  return (
    <div
      className='absolute top-10 left-10 hover:scale-150 duration-200'
      onClick={() => {
        navigate('/')
      }}
    >
      <img src={Previous} alt='previous' width={30} />
    </div>
  )
}

export default Navbar
