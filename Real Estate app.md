## Real Estate app 

### 1. Install tailwind css and push project on github repository

   install  tailwind css  for react vite search tailwind css doc. <br />

- git init 

- git add .

- git commit -m "install react js and tailwind css and create first template"

  then create new repository on github and push code on master branch

- git remote add origin https://github.com/Edwards-Alex/mern-estate.git

- git branch -M master

- git push -u origin master





### 2. Create pages and routes	

```jsx
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import SignIn from './pages/Signin.jsx'
import SignUp from './pages/SignUp.jsx'
import About from './pages/About.jsx'
import Profile from './pages/Profile.jsx'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/sign-in' element={<SignIn/>}/>
        <Route path='/sign-up' element={<SignUp/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
```

then add this one to the Github

- branch plush all changes and commit them 

<div align='left'><img src="https://img.picui.cn/free/2024/09/09/66de65fbcfdfc.png" alt="push on Github wit" style="zoom:50%;" /></div>





### 3. Create Header component

- create Header.jsx

1. ```jsx
   import React from 'react'
   import { FaSearch } from 'react-icons/fa'
   import { Link } from 'react-router-dom'
   
   const Header = () => {
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
                       <Link to='sign-in' className='text-slate-700 hover:underline'>Sign in</Link>
                   </ul>
               </div>
           </header>
       )
   }
   
   export default Header
   ```

   mounted it in App.jsx

2. ```jsx
   import React from 'react'
   import { BrowserRouter, Routes, Route } from 'react-router-dom'
   import Home from './pages/Home.jsx'
   import SignIn from './pages/Signin.jsx'
   import SignUp from './pages/SignUp.jsx'
   import About from './pages/About.jsx'
   import Profile from './pages/Profile.jsx'
   import Header from './components/Header.jsx'
   
   const App = () => {
     return (
       <BrowserRouter>
         <Header/>
         <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/sign-in' element={<SignIn/>}/>
           <Route path='/sign-up' element={<SignUp/>}/>
           <Route path='/about' element={<About/>}/>
           <Route path='/profile' element={<Profile/>}/>
         </Routes>
       </BrowserRouter>
     )
   }
   
   export default App
   ```





### 4. Create and run the server

- npm install -y    //it can create server config file package.json
- npm install express //use express to easily create our backend and Apis.

- create folder backend and main file index.js 

  ```js
  import express from 'express';
  
  const app = express();
  
  app.listen(3000,() => {
      console.log('Server is runing on port 3000!');
  })
  ```





### 5. Connect to database

- npm install mongoose

  - import mongoose in index.js 

  - connet function input url to complete them.

  - ```js
    import express from 'express';
    import mongoose from 'mongoose';
    import dotenv from 'dotenv';
    dotenv.config();
    
    mongoose.connect(process.env.MOGO).then(()=>{
        console.log('Connect to MongoDB!')
    }).catch((err)=>{
        console.log(err);
    });
    
    const app = express();
    
    app.listen(3000,() => {
        console.log('Server is runing on port 3000!');
    })
    ```

  - ```env
    MOGO='mongodb+srv://1032607679w:*******@mern-estate.doz7s.mongodb.net/?retryWrites=true&w=majority&appName=mern-estate'
    ```






### 6. Create user model

- ```js
  import mongoose from "mongoose";
  
  const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: true,
        unique: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  
  const userModel = mongoose.models.user || mongoose.model('user',userSchema);
  
  export default userModel;
  ```





###  7. Create a test API route

- create a user route

- ```js
  import express from "express";
  
  const userRouter = express.Router();
  
  userRouter.get('/test', (req, res) => {
    res.json({
      msg: 'Hello World!',
    });
  });
  
  export default userRouter;
  ```

- mount user route to index.js

- ```js
  import express from "express";
  import mongoose from "mongoose";
  import dotenv from "dotenv";
  dotenv.config();
  import userRouter from "./routes/user.route.js"
  
  mongoose
    .connect(process.env.MOGO)
    .then(() => {
      console.log("Connect to MongoDB!");
    })
    .catch((err) => {
      console.log(err);
    });
  
  const app = express();
  const port = 3000;
  
  //middleware
  app.use(express.json());
  
  //api endpoints
  app.use('/api/user',userRouter);
  
  app.listen(port, () => {
    console.log(`Server is runing on port ${port}!`);
  });
  ```





### 8. Create sign up API route

- create auth.route.js

- ```js
  import express from 'express';
  import { signup } from '../controllers/auth.controller.js';
  
  const authRouter = express.Router();
  
  authRouter.post('/signup',signup);
  
  export default authRouter;
  ```

- create auth.controller.js

- ```js
  import userModel from "../models/User.model.js";
  
  export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = new userModel({ username, email, password });
    await newUser.save();
    res.status(201).json("User created successfully!");
  };
  ```

- mount authRouter in index.js 

- ```js
  import express from "express";
  import mongoose from "mongoose";
  import dotenv from "dotenv";
  dotenv.config();
  import userRouter from "./routes/user.route.js"
  import authRouter from "./routes/auth.route.js";
  
  mongoose
    .connect(process.env.MOGO)
    .then(() => {
      console.log("Connect to MongoDB!");
    })
    .catch((err) => {
      console.log(err);
    });
  
  const app = express();
  const port = 3000;
  
  //middleware
  app.use(express.json());
  
  //api endpoints
  app.use('/api/user',userRouter);
  app.use('/api/auth',authRouter);
  
  app.listen(port, () => {
    console.log(`Server is runing on port ${port}!`);
  });
  ```




### 9. Create a middleware and a function to handle possible errors

```js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js";

mongoose
  .connect(process.env.MOGO)
  .then(() => {
    console.log("Connect to MongoDB!");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
const port = 3000;

//response can use json
app.use(express.json());


//api endpoints
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);



//middleware
app.use((err,req,res,next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  return res.status(statusCode).json({
    success:false,
    statusCode,
    message,
  });
});

app.listen(port, () => {
  console.log(`Server is runing on port ${port}!`);
});


```

- use middleware in controller.js

- ```js
  import userModel from "../models/User.model.js";
  import bcryptsjs from "bcryptjs";
  
  //param add next and function next(error) use this middleware
  export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptsjs.hashSync(password, 10);
    const newUser = new userModel({ username, email, password: hashedPassword });
  
    try {
      await newUser.save();
      res.status(201).json("User created successfully!");
    } catch (error) {
      next(error);
    }
  };
  
  ```



### 10. Complete sign up page UI

```jsx
import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4 justify-center'>
        <input type="text" placeholder='username'
        className='border p-3 rounded-lg' id='username'/>
        <input type="email" placeholder='email'
        className='border p-3 rounded-lg' id='email'/>
        <input type="password" 
        className='border p-3 rounded-lg' id='password'/>
        <button className='bg-slate-700 text-white p-3 
        rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>Sign Up</button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={'/sign-in'}>
          <span className='text-blue-700'>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
```



### 11. Complete sign up page functionality

```jsx
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

```





### 12. Create sign in API route

```js
import userModel from "../models/User.model.js";
import bcryptsjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptsjs.hashSync(password, 10);
  const newUser = new userModel({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res.status(201).json({success:true,message:"User created successfully!"});
  } catch (error) {
    // next(error);
    res.json({success:false,message:error.message});
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const vaildUser = await userModel.findOne({ email });
    if (!vaildUser) return next(errorHandler(404, "User not found!"));
    const vaildPassword = bcryptsjs.compareSync(password, vaildUser.password);
    if (!vaildPassword) return next(errorHandler(401, "Wrong credential!"));
    const token = jwt.sign({ id: vaildUser._id }, process.env.JWT_SECRET);
    //seprate the password for safety
    const { password: pass, ...rest} = vaildUser._doc;
    //save this token as browser cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};

```

### 13. Complete sign in page functionality

```jsx
import { React, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState(null);
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    /* const res = await fetch('/api/auth/signin', {
      method: 'POST',
      hearders: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }); */
    const res = await axios.post('/api/auth/signin',formData);
    console.log(res.data);
    if(res.data.success === false){
      toast.error(res.data.message);
      setLoading(false);
      setError(res.data.message);
      return;
    }
    toast.success(res.data.message);
    setLoading(false);
    setError(null);
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

```



### 14. Add redux toolkit

- ### Install Redux Toolkit and React-Redux

- `npm install @reduxjs/toolkit react-redux`

- ### Create a Redux Store at `src/redux/store.js`

- Create a file named `src/app/store.js`. Import the `configureStore` API from Redux Toolkit. We'll start by creating an empty Redux store, and exporting it:

```js
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user/userSlice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";

const rootReducer = combineReducers({ user: userReducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);


// Infer the `RootState` and `AppDispatch` types from the store itself
// export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
// export type AppDispatch = typeof store.dispatch

```

- ### Provide the Redux Store to React

- Once the store is created, we can make it available to our React components by putting a React-Redux `<Provider>` around our application in `src/index.js`. Import the Redux store we just created, put a `<Provider>` around your `<App>`, and pass the store as a prop:

```jsx
// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { persistor, store } from './redux/store.js'
import { Provider } from 'react-redux'
import SignContextProvider from './context/SignContext.jsx'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'


createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <SignContextProvider>
          <App />
        </SignContextProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
)
```

- ### Create a Redux State Slice at `src/redux/user/userSlice`

- Add a new file named `src/features/counter/counterSlice.js`. In that file, import the `createSlice` API from Redux Toolkit.

  Creating a slice requires a string name to identify the slice, an initial state value, and one or more reducer functions to define how the state can be updated. Once a slice is created, we can export the generated Redux action creators and the reducer function for the whole slice.

  Redux requires that [we write all state updates immutably, by making copies of data and updating the copies](https://redux.js.org/tutorials/fundamentals/part-2-concepts-data-flow#immutability). However, Redux Toolkit's `createSlice` and `createReducer` APIs use [Immer](https://immerjs.github.io/immer/) inside to allow us to [write "mutating" update logic that becomes correct immutable updates](https://redux.js.org/tutorials/fundamentals/part-8-modern-redux#immutable-updates-with-immer).

```js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    signInStar: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signFailure: (state, action) => {
      state.err = action.payload;
      state.loading = false;
    },
  },
});

export const { signInStar, signInSuccess, signFailure } = userSlice.actions;
export default userSlice.reducer;

```

- edit signIn.jsx page with redux replace normal variable example const loading and const error

- ```jsx
  import { React, useState } from 'react'
  import { Link, useNavigate } from 'react-router-dom'
  import axios from 'axios';
  import { toast } from 'react-toastify';
  import { useDispatch, useSelector } from 'react-redux';
  import { signInStar, signFailure, signInSuccess } from '../redux/user/userSlice';
  
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
      console.log(res.data);
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
  
  ```

  

### 15. Add redux persist

help us store the redux information in local storage

- `npm install redux-persist`

- edit store.js configure your redux-persist add `const persistedReducer `and configure it in const store` reducer: persistedReducer,`

- ```js
  import { combineReducers, configureStore } from "@reduxjs/toolkit";
  import userReducer from "./user/userSlice";
  import { persistReducer, persistStore } from "redux-persist";
  import storage from "redux-persist/lib/storage";
  
  const rootReducer = combineReducers({ user: userReducer });
  
  const persistConfig = {
    key: "root",
    storage,
    version: 1,
  };
  
  const persistedReducer = persistReducer(persistConfig, rootReducer);
  
  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
  
  export const persistor = persistStore(store);
  
  
  // Infer the `RootState` and `AppDispatch` types from the store itself
  // export type RootState = ReturnType<typeof store.getState>
  // Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
  // export type AppDispatch = typeof store.dispatch
  
  ```

- edit your main.js let PersistGate include <APP>

- ```jsx
  // import { StrictMode } from 'react'
  import { createRoot } from 'react-dom/client'
  import App from './App.jsx'
  import './index.css'
  import { persistor, store } from './redux/store.js'
  import { Provider } from 'react-redux'
  import SignContextProvider from './context/SignContext.jsx'
  import { BrowserRouter } from 'react-router-dom'
  import { PersistGate } from 'redux-persist/integration/react'
  
  
  createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <SignContextProvider>
            <App />
          </SignContextProvider>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
  ```






### 16. Add Google OAuth functionaily

- create component OAuth.jsx

- ```jsx
  import {React} from 'react';
  
  const OAuth = () => {
  
      const handleGoogleClick = async () => {
          try{
             // ...the logic for handleGoogleAuth 
          }catch(error){
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
  
  ```

- search browser firebase

  - go to console.
  - add a project and file in the content.
  - web project click web and register app .

- add Firebase SDK

  - `npm install firebase` at fronted floder

  - Then,initialise Firebase and begin using the SDKs for the products that you'd like to use.

  - create file firebase.js at fronted/src floder

  - ```js
    // Import the functions you need from the SDKs you need
    import { initializeApp } from "firebase/app";
    // TODO: Add SDKs for Firebase products that you want to use
    // https://firebase.google.com/docs/web/setup#available-libraries
    
    // Your web app's Firebase configuration
    const firebaseConfig = {
        //apiKey save in .env for security
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    //   apiKey: "AIzaSyB6kTxYlzEyHBErJIoCdi-PWo4F-XXm_rw",
      authDomain: "mern-estate-dafdf.firebaseapp.com",
      projectId: "mern-estate-dafdf",
      storageBucket: "mern-estate-dafdf.appspot.com",
      messagingSenderId: "979277743495",
      appId: "1:979277743495:web:121bec7158d6a2c9507f22"
    };
    
    // Initialize Firebase
    export const app = initializeApp(firebaseConfig);
    ```

- in browser navigate bar Build , Authentication

- choose you need additional providers example google 

- file in the content 

- ```jsx
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
  ```

- add  functionaily at auth.controller.js then add this functionaily at router

- ```js
  import userModel from "../models/User.model.js";
  import bcryptsjs from "bcryptjs";
  import { errorHandler } from "../utils/error.js";
  import jwt from "jsonwebtoken";
  
  export const signup = async (req, res) => {
    const { username, email, password } = req.body;
    const hashedPassword = bcryptsjs.hashSync(password, 10);
    const newUser = new userModel({ username, email, password: hashedPassword });
  
    try {
      await newUser.save();
      res.status(201).json({success:true,message:"User created successfully!"});
    } catch (error) {
      // next(error);
      res.json({success:false,message:error.message});
    }
  };
  
  export const signin = async (req, res/* , next */) => {
    const { email, password } = req.body;
    try {
      const vaildUser = await userModel.findOne({ email });
      if (!vaildUser) return /* next(errorHandler(404, "User not found!")); */res.json({success:false,message:"User not found!"})
      const vaildPassword = bcryptsjs.compareSync(password, vaildUser.password);
      if (!vaildPassword) return /* next(errorHandler(401, "Wrong credential!")); */res.json({success:false,message:"User not found!"})
      const token = jwt.sign({ id: vaildUser._id }, process.env.JWT_SECRET);
      //seprate the password for safety
      const { password: pass, ...rest} = vaildUser._doc;
      //save this token as browser cookie
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } catch (error) {
      // next(error);
      res.json({success:false,message:error.message});
    }
  };
  
  export const google = async(req,res) => {
    
    const {name,email,photo} = req.body;
  
    try {
      const user = await userModel.findOne({email});
      if(user){
        const token = jwt.sign({id:user_id},process.env.JWT_SECRET);
        const {password:pass,...rest} = user._doc;
        res
          .cookie('access_token',token,{httpOnly:true})
          .status(200)
          .json(rest);
      }else{
        const generatedPassword = Math.random().toString(36).slice(-8)+Math.random().toString(36).slice(-8);
        const hashedPassword = bcryptsjs.hashSync(generatedPassword,10);
        const username = name.split(" ").join("").toLowerCase() +  Math.random().toString(36).slice(-4);
        const newUser = new userModel({
          username,
          email,
          password:hashedPassword,
          avatar:photo});
        await newUser.save();
        const token = jwt.sign({id:newUser._id},process.env.JWT_SECRET);
        const {password:pass,...rest} = newUser._doc;
        res.cookie('access_token',token,{httpOnly:true}).status(200).json(rest)
      }
    } catch (error) {
      res.json({success:false,message:error});
    }
  }
  ```

-  ```js
   import express from 'express';
   import { google, signin, signup } from '../controllers/auth.controller.js';
   
   const authRouter = express.Router();
   
   authRouter.post('/signup',signup);
   authRouter.post('/signin',signin);
   authRouter.post('/google',google);
   
   export default authRouter;
   ```

  





### 17. Update the header and make the profile page private

- update header.jsx 

- ```jsx
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
                      //update the header link to profile when currentUser exist
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
  
  ```

- create PrivateRoute.jsx and include  ProfileRoute.jsx

- ```jsx
  import React from 'react'
  import { useSelector } from 'react-redux'
  import { Outlet, Navigate } from 'react-router-dom';
  
  const PrivateRoute = () => {
  
      const { currentUser } = useSelector((state) => state.user);
  	
      //Navigate is component useNavigate() is hook function 
      return currentUser ? <Outlet /> : <Navigate to='/sign-in' />
  }
  
  export default PrivateRoute
  ```

- ```jsx
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
            //include profile
          <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
        </Routes>
      </>
    )
  }
  
  export default App
  ```



### 18. Complete profile page UI

update page component/Profile.jsx

```jsx
import React from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {

  const { currentUser } = useSelector((state) => state.user)

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='rounded-full h-24 w-24 object-cover cursor-pointer self-center' src={currentUser.avatar} alt="profile" />
        <input className='border p-3 rounded-lg' type="text" placeholder='username' id='username' value={currentUser.username} />
        <input className='border p-3 rounded-lg' type="text" placeholder='email' id='email' value={currentUser.email} />
        <input className='border p-3 rounded-lg' type="password" placeholder='password' id='password'/>
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
```



### 19.  Complete image upload functionality

complete handleFileUpload functionality

- import getStorage() : get firebase storage use for storage the formData database

- import uploadBytesResumable() : upload file  with file reference

- then use formData's information render on the page

  ```jsx
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
  
  ```

  

### 20. Create user updated api route

- add `/api/user/update/:id` route in  user router

- create until `VerifyUser` and userController handle logic

- pre create verifyUser npm cookie-parser use for read cookies info,because verifyUser with access_token store in cookie

- `npm i cookie-parper` and configure it in index.js,notice: `app.use(cookieParser());`position  must before than endPoint ,otherwise req.cookies is undefined.

- ```js
  import express from "express"; 
  import mongoose from "mongoose";
  import dotenv from "dotenv";
  dotenv.config();
  import userRouter from "./routes/user.route.js"
  import authRouter from "./routes/auth.route.js";
  import cookieParser from "cookie-parser";
  
  mongoose
    .connect(process.env.MOGO)
    .then(() => {
      console.log("Connect to MongoDB!");
    })
    .catch((err) => {
      console.log(err);
    });
  
  const app = express();
  const port = 8888;
  
  
  app.use(express.json());
  
  app.use(cookieParser());
  //api endpoints
  app.use('/api/user',userRouter);
  app.use('/api/auth',authRouter);
  
  //middleware
  app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error!!!';
  
    return res.status(statusCode).json({
      success:false,
      statusCode,
      message,
    });
  });
  
  app.listen(port, () => {
    console.log(`Server is runing on port ${port}!`);
  });
  ```

- ```js
  import express from "express";
  import { verifyToken } from "../utils/verifyUser.js";
  import { updateUser } from "../controllers/user.controller.js";
  
  const userRouter = express.Router();
  
  userRouter.post('/update/:id',verifyToken,updateUser);
  
  export default userRouter;
  ```

- ```js
  import userModel from "../models/user.model.js";
  import { errorHandler } from "../utils/error.js"
  import bcryptjs from 'bcryptjs';
  
  export const updateUser = async(req,res,next) => {
  
     if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only update your own account!'));
     
     try {
      if(req.body.password) {
          req.body.password = bcryptjs.hashSync(req.body.password,10);
      }
  
      const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{
          $set: {
              username: req.body.username,
              email: req.body.email,
              password:req.body.password,
              avator:req.body.avatar
          } 
      },{new:true})
  
      const {password,...rest} = updatedUser._doc
  
      res.status(200).json(rest);
     } catch (error) {
       next(error)
     }
  }
  ```

 

### 21.  Complete update user functionality

- add handleSubmit function use to add all changes to formData 

- then post endpoint with formData use to update user information

- ```jsx
  import { React, useRef, useState, useEffect } from 'react'
  import { useDispatch, useSelector } from 'react-redux'
  import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
  import { app } from '../firebase'
  import axios from 'axios'
  import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/user/userSlice'
  import { toast } from 'react-toastify'
  
  const Profile = () => {
  
    const { currentUser, loading, error } = useSelector((state) => state.user)
    const fileRef = useRef(null);
    const [file, setFile] = useState(undefined);
    const [filePerc, setFilePerc] = useState(0);
    const [fileUploadError, setFileUploadError] = useState(false);
    const [formData, setFormData] = useState({});
    const dispatch = useDispatch();
  
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
  
    const handleChange = (event) => {
      setFormData({ ...formData, [event.target.id]: event.target.value });
    }
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        dispatch(updateUserStart());
        const res = await axios.post(`/api/user/update/${currentUser._id}`, formData);
        
        if (res.data.success == false) {
          dispatch(updateUserFailure(res.data.message));
          return;
        }
        toast.success(res.data.message);
        dispatch(updateUserSuccess(res.data));
      } catch (error) {
        toast.error(error.response.data.message);
        dispatch(updateUserFailure(error.response.data.message));
      }
  
    }
  
    return (
      <div className='p-3 max-w-lg mx-auto'>
        <h1 className='text-3xl text-center font-semibold my-7'>Profile</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
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
          <input onChange={handleChange} className='border p-3 rounded-lg' type="text" placeholder='username' id='username' defaultValue={currentUser.username} />
          <input onChange={handleChange} className='border p-3 rounded-lg' type="text" placeholder='email' id='email' defaultValue={currentUser.email} />
          <input className='border p-3 rounded-lg' type="password" placeholder='password' id='password' />
          <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
            {loading ? 'loading' : 'update'}
          </button>
        </form>
        <div className='flex justify-between mt-5'>
          <span className='text-red-700 cursor-pointer'>Delete Account</span>
          <span className='text-red-700 cursor-pointer'>Sign Out</span>
        </div>
      </div>
    )
  }
  
  export default Profile
  ```

- this is user.controller.js use to hanldeSubmit  

- ```js
  import userModel from "../models/user.model.js";
  import { errorHandler } from "../utils/error.js"
  import bcryptjs from 'bcryptjs';
  
  export const updateUser = async(req,res,next) => {
  
     if(req.user.id !== req.params.id) return next(errorHandler(401,'You can only update your own account!'));
     
     try {
      if(req.body.password) {
          req.body.password = bcryptjs.hashSync(req.body.password,10);
      }
  
      const updatedUser = await userModel.findByIdAndUpdate(req.params.id,{
          $set: {
              username: req.body.username,
              email: req.body.email,
              password:req.body.password,
              avatar:req.body.avatar
          } 
      },{new:true})
  
      const {password,...rest} = updatedUser._doc
      rest.message = 'updated user success';
      res.status(200).json(rest);
     } catch (error) {
       next(error)
     }
  }
  ```

  
