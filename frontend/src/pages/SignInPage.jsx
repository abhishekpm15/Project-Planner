import React, { useEffect, useState } from 'react'
import { SignIn, useUser } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'

const SignInPage = () => {
  const { isSignedIn, user } = useUser()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (isSignedIn) {
      navigate('/home')
    } else {
      setLoading(false)
    }
  }, [isSignedIn, user, navigate])

  if (loading) return <p>Loading...</p>

  return <SignIn />
}

export default SignInPage
