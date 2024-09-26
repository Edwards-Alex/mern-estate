import { React } from 'react';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
import axios from 'axios';
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../redux/user/userSlice';
import { useNavigate } from 'react-router-dom'

const OAuth = () => {

  // const [data,setData] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider()

      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider);

      /* setData(pre=> ({
        ...pre,
        ['name']:result.user.displayName,
        ['email']:result.user.email,
        ['photo']:result.user.photoURL
      })) */
      const data = {
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL
      }
      const res = await axios.post('/api/auth/google', data);
      console.log(res);
      dispatch(signInSuccess(res.data));
      navigate('/');
    } catch (error) {
      console.log('could not sign with google', error);
    }
  }

  return (
    <button
      onClick={handleGoogleClick}
      type='button'
      className='bg-red-700 text-white rounded-lg uppercase p-3 hover:opacity-95'>continue with GOOGLE</button>
  )
}

export default OAuth
