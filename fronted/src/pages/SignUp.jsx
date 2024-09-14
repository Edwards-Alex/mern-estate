import {React, useState} from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const handleChange = (e)=> {
    setFormData({
      ...formData,
      [e.target.id]:e.target.value,
    });
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const res = await fetch('/api/auth/signup',{
      method: 'POST',
      hearders:{
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    });  
    const data = await res.json();
    
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-center'>
        <input type="text" placeholder='username' onClick={handleChange}
        className='border p-3 rounded-lg' id='username'/>
        <input type="email" placeholder='email' onClick={handleChange}
        className='border p-3 rounded-lg' id='email'/>
        <input type="password" placeholder='password'  onClick={handleChange}
        className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link> onClick={handleChange}
      </div>
    </div>
  )
}

export default SignUp
