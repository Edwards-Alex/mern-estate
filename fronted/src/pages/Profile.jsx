import { React, useRef, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'

const Profile = () => {

  const { currentUser } = useSelector((state) => state.user)
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  //filebase storage
  /* 
    allow read;
    allow write : if
    request.resource.size < 2 * 1024 * 1024 &&
    request.resource.contentType.matches('image/.*')
  */

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file])

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred /
          snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
          ((downloadURL) => {
            setFormData({ ...formData, avatar: downloadURL });
          })
      }
    )
  }


  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          hidden
          ref={fileRef}
          accept='image/*'
        />
        {/* click this img just click fileRef input */}
        <img onClick={() => fileRef.current.click()} className='rounded-full h-24 w-24 object-cover cursor-pointer self-center' src={formData.avatar || currentUser.avatar} alt="profile" />
        <p className='text-sm self-center'>
          {fileUploadError ? (
          <span className='text-red-700'>Error Image upload(image must less than 2 mb)</span> 
           ) : filePerc > 0 && filePerc < 100 ? (
          <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
           ) : filePerc === 100 ? (
          <span className='text-green-700'>ImageSuccessfully uploaded!</span>
           ) : (
            ""
          )
        }
        </p>
        <input className='border p-3 rounded-lg' type="text" placeholder='username' id='username' /* value={currentUser.username} */ />
        <input className='border p-3 rounded-lg' type="text" placeholder='email' id='email' /* value={currentUser.email} */ />
        <input className='border p-3 rounded-lg' type="password" placeholder='password' id='password' />
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
