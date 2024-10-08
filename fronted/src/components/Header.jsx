import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Header = () => {

    const { currentUser } = useSelector(state => state.user)

    return (
        <header className='bg-slate-200 shadow-emerald-100'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
                <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                    <span className='text-slate-500'>Sahand</span>
                    <span className='text-slate-700'>Estate</span>
                </h1>
                <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                    <input
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                        type="text" placeholder='Search...' />
                    <FaSearch className='text-slate-600' />
                </form>
                <ul className='flex gap-4'>
                    <Link to='/' className='hidden sm:inline text-slate-700 hover:underline'>Home</Link>
                    <Link to='/about' className='hidden sm:inline  text-slate-700 hover:underline'>About</Link>
                    <Link to='/profile' >
                        {currentUser ? (
                            <img className='rounded-full h-7 w-7 object-cover' src={currentUser.avatar} alt='profile'/>
                        ): <li className='text-slate-700 hover:underline'>Sign in</li>
                        }
                    </Link>
                </ul>
            </div>
        </header>
    )
}

export default Header
