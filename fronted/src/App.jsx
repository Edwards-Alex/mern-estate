import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignIn from './pages/Signin.jsx'
import SignUp from './pages/SignUp.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'
import Header from './components/Header.jsx'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import PrivateRoute from './components/PrivateRoute.jsx'
import CreateListing from './pages/CreareListing.jsx'
import UpdateListing from './pages/UpdateListing.jsx'
import Listing from './pages/Listing.jsx'

const App = () => {
  return (
    <>
      <ToastContainer />
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/about' element={<About />} />
        <Route path='/listing/:listingId' element={<Listing/>}/>
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='update-listing/:listingId' element={<UpdateListing />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
