import React, { useEffect, useState } from 'react'
import { SignOutButton, useAuth } from '@clerk/clerk-react'
import Card from '../components/Card'
import Search from '../components/Search'
import Button from '../components/Button'
import axios from 'axios'
import Logout from '../assets/logout.png'
import { Loading } from '../components/Loading'

const API_URL = import.meta.env.VITE_BACKEND_URL

const HomePage = () => {
  const { userId } = useAuth()
  const [userDetails, setUserDetails] = useState([])
  const [filteredResults, setFilteredResults] = useState([])
  const [load, setLoad] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    if (search !== '') {
      const newUserDetails = userDetails.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase())
      )
      setFilteredResults(newUserDetails)
    }
  }, [search])

  useEffect(() => {
    async function getAllUsers () {
      try {
        setLoad(true)
        const res = await axios.get(`${API_URL}/api/users/getAllUsers`)
        console.log('data  ' + JSON.stringify(res.data))
        setUserDetails(res.data.users)
        setFilteredResults(res.data.users)
      } catch (error) {
        console.log('error ' + error)
      } finally {
        setLoad(false)
      }
    }

    getAllUsers()
  }, [])

  if (load) return <Loading />

  return (
    <div className='min-h-screen p-10 flex flex-col space-y-5 w-screen mt-5'>
      <div className='flex justify-center w-full items-center'>
        <div className='w-1/2'>
          <Search search={search} setSearch={setSearch} />
        </div>
        <div>
          <Button title={'Colleague'} clickFunction={'/addUser'} />
        </div>
        <div className='relative'>
          <span className='absolute top-2.5 right-2 bottom-0 '>
            <img src={Logout} alt='logout-btn' width={25} />
          </span>
          <SignOutButton className='bg-red-400 px-3 py-2 rounded-lg flex items-center w-32' />
        </div>
      </div>
      <div className='p-10 grid grid-cols-5 gap-10 mt-5'>
        {search !== '' &&
          filteredResults.map(data => (
            <Card
              name={data.name}
              key={data.userId}
              id={data.userId}
              designation={data.designation}
              image={'https://github.com/shadcn.png'}
            />
          ))}
        {search === '' &&
          userDetails.map(data => (
            <Card
              name={data.name}
              key={data.userId}
              id={data.userId}
              designation={data.designation}
              image={'https://github.com/shadcn.png'}
            />
          ))}
      </div>
    </div>
  )
}

export default HomePage
