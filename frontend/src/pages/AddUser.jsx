import React, { useState } from 'react'
import Forms from '../components/Forms'
import AddFriend from '../assets/add-friend2.svg'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'

const AddUser = () => {
  const API_URL = import.meta.env.VITE_BACKEND_URL
  const [addUser, setAddUser] = useState({
    name: '',
    email: '',
    role: '',
    password: '',
    designation: ''
  })

  const handleFormSubmit = async () => {
    axios
      .post(`${API_URL}/api/users/addUser`, {
        name: addUser.name,
        email: addUser.email,
        role: addUser.role,
        password: 'Abhi123!@#',
        designation: addUser.designation
      })
      .then(response => {
        console.log('response ' + response)
        setAddUser({
          name: '',
          email: '',
          role: '',
          designation: ''
        })
        toast.success('User added successfully !')
      })
      .catch(error => {
        if (error.response.status === 409) {
          toast.error('User already exists !')
        }
        console.log('error ' + error.response.status)
      })
  }

  return (
    <div>
      <Navbar />
      <div className='text-4xl font-semibold flex justify-center mt-10'>
        Add Colleague
      </div>
      <div className='w-screen h-full flex py-10 items-center'>
        <div className='w-1/2'>
          <img
            src={AddFriend}
            width={500}
            alt='add-friend'
            className='w-full p-10 '
          />
        </div>
        <div className='w-1/2'>
          <Forms
            addUser={addUser}
            setAddUser={setAddUser}
            handleFormSubmit={handleFormSubmit}
          />
        </div>
      </div>
    </div>
  )
}

export default AddUser
