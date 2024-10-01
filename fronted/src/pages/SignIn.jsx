import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { signInStar, signFailure, signInSuccess } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(null);
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);
    dispatch(signInStar());
    /* const res = await fetch('/api/auth/signin', {
      method: 'POST',
      hearders: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }); */
    const res = await axios.post('/api/auth/signin', formData);
    
    if (res.data.success === false) {
      toast.error(res.data.message);
      /* setLoading(false);
      setError(res.data.message); */
      dispatch(signFailure(res.data.message));
      return;
    }
    toast.success(res.data.message);
    /*  setLoading(false);
     setError(null); */
    dispatch(signInSuccess(res.data));
    navigate('/');
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 justify-center'>
        <input type="email" placeholder='email' onChange={handleChange}
          className='border p-3 rounded-lg' id='email' />
        <input type="password" placeholder='password' onChange={handleChange}
          className='border p-3 rounded-lg' id='password' />
        <button className='bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading' : 'Sign In'}</button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}

export default SignIn
