import { React, useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import OAuth from '../components/OAuth';
// import { SignContext } from '../context/SignContext';

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  // const {url} = useContext(SignContext)
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // try {
    setLoading(true);
    const res = await axios.post('/api/auth/signup', formData);

    /* const res = await fetch('http://localhost:3000/api/auth/signup', {
      method: 'POST',
      hearders: {
        'Content-Type':'application/json',
      },
      body: JSON.stringify(formData),
    }); 

    const data = await res.json();*/
    if (res.data.success === false) {
      toast.error(res.data.message);
      setError(res.data.message);
      setLoading(false);
      // setError(null);
      return;
    }
    toast.success(res.data.message);
    setError(null);
    setLoading(false);
    navigate('/sign-in');

    // } catch (error) {
    // setLoading(false);
    // setError(error.message);
    // }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-center'>
        <input type="text" placeholder='username' onChange={handleChange}
          className='border p-3 rounded-lg' id='username' />
        <input type="email" placeholder='email' onChange={handleChange}
          className='border p-3 rounded-lg' id='email' />
        <input type="password" placeholder='password' onChange={handleChange}
          className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'loading...' : 'Sign Up'}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignUp
