import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import NotFound from '../assets/not-found.svg'
import Navbar from '../components/Navbar'
import { Loading } from '../components/Loading'

const API_URL = import.meta.env.VITE_BACKEND_URL

const UserPage = () => {
  const [userDetails, setUserDetails] = useState('')
  const [error, setError] = useState('')
  const params = useParams()
  const [load, setLoad] = useState(false)

  useEffect(() => {
    setLoad(true)
    axios
      .get(`${API_URL}/api/users/getUserById/${params.id}`)
      .then(res => {
        console.log('user details' + JSON.stringify(res.data.user))
        setUserDetails(res.data.user)
      })
      .catch(err => {
        console.log('error ' + err)
      }).finally(()=>{
        setLoad(false)
      })
  }, [])

  useEffect(() => {
    if (userDetails !== '') {
      axios
        .get(`${API_URL}/api/task/${params.id}`)
        .then(res => {
          console.log('get User Tasks' + res)
        })
        .catch(error => {
          setError(error.response.data.message)
          console.log('error user tasks' + error.response.data.message)
        })
    }
  }, [userDetails])

  console.log('params' + JSON.stringify(params.id))

  if (load) return <Loading />
  if (error !== '')
    return (
      <div>
        <Navbar />
        <div className='w-screen h-full flex justify-center items-center p-10 text-4xl'>
          <img src={NotFound} alt='not-found' width={300} className='mx-5' />
          <span className='bg-red-500 p-4 rounded-bl-4xl rounded-tr-4xl mx-2'>
            {error}
          </span>
          for {userDetails.name}
        </div>
      </div>
    )

  return (
    <div className='w-screen h-screen flex justify-center p-10 text-4xl'></div>
  )
}

export default UserPage
