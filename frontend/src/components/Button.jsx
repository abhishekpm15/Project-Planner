import React from 'react'
import AddIcon from "../assets/plus.png"
import { useNavigate } from 'react-router-dom'
const Button = ({title, clickFunction}) => {
  const navigate = useNavigate();
  return (
    <button
      type='button'
      className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm  me-2 flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 cursor-pointer'
      onClick={()=>{navigate(clickFunction)}}
    >
    <span className='mr-2'><img src={AddIcon} alt='add-icon' width={20} height={20}/></span>
      {title}
    </button>
  )
}

export default Button
