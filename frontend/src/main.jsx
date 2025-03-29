import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import SignInPage from './pages/signInPage.jsx'
import HomePage from './pages/home.jsx'
import UserPage from './pages/userPage.jsx'
import AddUser from './pages/addUser.jsx'
import { ToastContainer } from 'react-toastify'
import Navbar from './components/Navbar.jsx'
import ClosedTask from './pages/ClosedTask.jsx'
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

createRoot(document.getElementById('root')).render(
  <>
  {/* <StrictMode> */}
    <ToastContainer />
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl='/'>
      <Router>
        <Routes>
          <Route path='/' element={<App />}/>
          <Route path='/sign-in' element={<SignInPage />}/>
          <Route path='/home' element={<HomePage />}/>
          <Route path='/home/:id' element={<UserPage />}/>
          <Route path='/addUser' element={<AddUser />}/>
          <Route path='/closedTasks/:id' element={<ClosedTask />}/>
        </Routes>
      </Router>
    </ClerkProvider>
  {/* </StrictMode> */}
  </>
)
