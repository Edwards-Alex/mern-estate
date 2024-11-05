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






### 16. Add Google OAuth functionality

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

- add  functionality at auth.controller.js then add this functionality at router

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






### 22.  Add delete user functionality

- create delete user api route

```js
import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import { updateUser ,deleteUser } from "../controllers/user.controller.js";

const userRouter = express.Router();

userRouter.post('/update/:id',verifyToken,updateUser);
userRouter.delete('/delete/:id',verifyToken,deleteUser);

export default userRouter;
```

- add functionaily delete user for database in user.controller.js

```js
import userModel from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id)
    return next(errorHandler(401, "You can only update your own account!"));

  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    rest.message = "updated user successfully";
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
    if( req.user.id !== req.params.id){
        return next(errorHandler(401,'You can only delete your own account!'));
    }
    try {
        await userModel.findByIdAndDelete(req.params.id);
        res.status(200).json('User has been deleted');

    } catch (error) {
        next(error);
    }
};
```

- add front end profile.jsx click event , click it execute back end deleteUser functionaily

```jsx
import { React, useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import {
  updateUserStart, updateUserSuccess, updateUserFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
} from '../redux/user/userSlice'
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

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`);
      if(res.data.success == false){
        dispatch(deleteUserFailure(res.data.message));
        toast.error(res.data.message);
        return;
      }

      dispatch(deleteUserSuccess(res.data));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
      dispatch(deleteUserFailure(error.message));
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
        <input onChange={handleChange} className='border p-3 rounded-lg' type="password" placeholder='password' id='password' />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'loading' : 'update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
```



### 23. Add sign out user functionality

- create sign out api router at auth.route.js

```js
import express from 'express';
import { google, signin, signup } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup',signup);
authRouter.post('/signin',signin);
authRouter.post('/google',google);
authRouter.get('/signout',signOut);

export default authRouter;
```

- create the functionality signOut at auth.controller.js  and complete it's logic

```js
import bcryptsjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPassword = bcryptsjs.hashSync(password, 10);
  const newUser = new userModel({ username, email, password: hashedPassword });

  try {
    await newUser.save();
    res
      .status(201)
      .json({ success: true, message: "User created successfully!" });
  } catch (error) {
    // next(error);
    res.json({ success: false, message: error.message });
  }
};

export const signin = async (req, res /* , next */) => {
  const { email, password } = req.body;
  try {
    const vaildUser = await userModel.findOne({ email });
    if (!vaildUser)
      return /* next(errorHandler(404, "User not found!")); */ res.json({
        success: false,
        message: "User not found!",
      });
    const vaildPassword = bcryptsjs.compareSync(password, vaildUser.password);
    if (!vaildPassword)
      return /* next(errorHandler(401, "Wrong credential!")); */ res.json({
        success: false,
        message: "Wrong credential!",
      });
    const token = jwt.sign({ id: vaildUser._id }, process.env.JWT_SECRET);
    //seprate the password for safety
    const { password: pass, ...rest } = vaildUser._doc;
    //save this token as browser cookie
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    // next(error);
    res.json({ success: false, message: error.message });
  }
};

export const google = async (req, res) => {
  const { name, email, photo } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = user._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptsjs.hashSync(generatedPassword, 10);
      const username =
        name.split(" ").join("").toLowerCase() +
        Math.random().toString(36).slice(-4);
      const newUser = new userModel({
        username,
        email,
        password: hashedPassword,
        avatar: photo,
      });
      await newUser.save();
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: pass, ...rest } = newUser._doc;
      res
        .cookie("access_token", token, { httpOnly: true })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    res.status(401).json({ success: false, message: error });
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie('access_token');
    res.status(200).json({success:true,message:"User has been logged out!"});
  } catch (error) {
    next(error);
  }
};
```

- add backend signOut functionality at fronted page profile.jsx
- before that we create dispatch in userSlice to handle signout success or failure

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
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state,action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    updateUserFailure: (state,action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart:(state) => {
      state.loading = true;
    },
    deleteUserSuccess:(state,action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
    },
    deleteUserFailure:(state,action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart:(state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state,action) => {
      state.error = null;
      state.loading = false;
      state.currentUser = null;
    },
    signOutUserFailure:(state,action) => {
      state.error = action.payload;
      state.loading = false;
    }
  },
});

export const {
  signInStar,
  signInSuccess,
  signFailure,
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure
} = userSlice.actions;
export default userSlice.reducer;
```



-  frontend logic add at handleSignOut functionality 

```jsx
import { React, useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import {
  updateUserStart, updateUserSuccess, updateUserFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  signOutUserStart,signOutUserSuccess,signOutUserFailure
} from '../redux/user/userSlice'
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

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`);
      if(res.data.success == false){
        dispatch(deleteUserFailure(res.data.message));
        toast.error(res.data.message);
        return;
      }

      dispatch(deleteUserSuccess(res.data));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async() => {
    try {
      dispatch(signOutUserStart());
      const res =  await axios.get('/api/auth/signout');
      if(res.success == false){
        dispatch(signOutUserFailure(res.data.message));
        return;
      }
      dispatch(signOutUserSuccess(res.data));
      toast.success(res.data.message);
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
      toast.error(res.data.message);
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
        <input onChange={handleChange} className='border p-3 rounded-lg' type="password" placeholder='password' id='password' />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'loading' : 'update'}
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
```



### 24. Add create listing API route 

- create listing Api route at new route `/api/listing` in  index.js

```js
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import userRouter from "./routes/user.route.js"
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";

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

//api endpoints
app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);
app.use('/api/listing',listingRouter);



app.listen(port, () => {
  console.log(`Server is runing on port ${port}!`);
});
```

- create **listingRouter ** in routes folder

```js
import express from "express";
import { createListing } from "../controllers/listing.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const listingRouter = express.Router();

listingRouter.post('/create',verifyToken,createListing);

export default listingRouter;
```

- create **listing.controller** add functionality createListing and write logic for create listing.

```js
import listingModel from "../models/listing.model.js";

export const createListing = async (req,res,next) => {
    try {
        const listing = await listingModel.create(req.body);
        return res.status(201).json({
            success:true,
            listing,
        })
    } catch (error) {
        next(error);
    }
}
```

- create **ListingModel** add the rules for that in our application

```js
import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    regularPrice: {
      type: Number,
      required: true,
    },
    discountPrice: {
      type: Number,
      required: true,
    },
    bathrooms: {
      type: Number,
      required: true,
    },
    bedrooms: {
      type: Number,
      required: true,
    },
    furnished: {
      type: Boolean,
      required: true,
    },
    parking: {
      type: Boolean,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    offer: {
      type: Boolean,
      required: true,
    },
    imageUrls: {
      type: Array,
      required: true,
    },
    userRef: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const listingModel =
  mongoose.models.listing || mongoose.model("listing", listingSchema);

export default listingModel;
```

- listing api route create complete



###  25. Complete create listing page UI

- add Link button create Listing  and link to 'create-listing' `CreateListing.jsx`  use Private Route

```jsx
//add Link button create Listing 

import { React, useRef, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import axios from 'axios'
import {
  updateUserStart, updateUserSuccess, updateUserFailure,
  deleteUserStart, deleteUserSuccess, deleteUserFailure,
  signOutUserStart, signOutUserSuccess, signOutUserFailure
} from '../redux/user/userSlice'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

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

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`);
      if (res.data.success == false) {
        dispatch(deleteUserFailure(res.data.message));
        toast.error(res.data.message);
        return;
      }

      dispatch(deleteUserSuccess(res.data));
      toast.success(res.data.message);
    } catch (error) {
      toast.error(error.message);
      dispatch(deleteUserFailure(error.message));
    }
  }

  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await axios.get('/api/auth/signout');
      if (res.success == false) {
        dispatch(signOutUserFailure(res.data.message));
        return;
      }
      dispatch(signOutUserSuccess(res.data));
      toast.success(res.data.message);
    } catch (error) {
      dispatch(signOutUserFailure(error.message));
      toast.error(res.data.message);
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
        <input onChange={handleChange} className='border p-3 rounded-lg' type="password" placeholder='password' id='password' />
        <button disabled={loading} className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>
          {loading ? 'loading' : 'update'}
        </button>
        <Link className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95' to={'/create-listing'}>
          Create Listing
        </Link>
      </form>

      <div className='flex justify-between mt-5'>
        <span onClick={handleDeleteUser} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile
```

- create Route for CreateListing.jsx in`App.jsx` 

```jsx
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
        <Route element={<PrivateRoute />}>
          <Route path='/profile' element={<Profile />} />
          <Route path = '/create-listing' element={<CreateListing/>}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
```



- create `CreateListing.jsx` and complete it's UI

```jsx
import React from 'react'

const CreareListing = () => {
    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
                    <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required />
                    <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='Address' required />
                    <div className='flex gap-4 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='sell' className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='rent' className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='parking' className='w-5' />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='furnished' className='w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='offer' className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='bedrooms' min='1' max='10' required
                                className='p-3 border border-gray-300 rounded-lg' />
                            <p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='bathrooms' min='1' max='10' required
                                className='p-3 border border-gray-300 rounded-lg' />
                            <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='regularPrice' min='1' max='10' required
                                className='p-3 border border-gray-300 rounded-lg' />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                <span className='text-sm'>($/Month)</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='discountedPrice' min='1' max='10' required
                                className='p-3 border border-gray-300 rounded-lg' />
                            <div className='flex flex-col items-center'>
                                <p>Discounted price</p>
                                <span className='text-sm'>($/Month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className='flex gap-4'>
                        <input className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='image/*' multiple />
                        <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>Upload</button>
                    </div>
                    <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>Create Listing</button>
                </div>
            </form>
        </main>
    )
}

export default CreareListing
```



### 26. Complete upload listing images functionality

- create functionality `handleImageSubmit()` to upload images to fairbase storage

```jsx
const handleImageSubmit = (e) => {
        e.preventDefault();
        setUploading(true);
        setImageUploadError(false);
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                setImageUploadError(false);
                setImageUploadError(false);
            }).catch((error) => {
                setUploading(false);
                toast.error('Image upload failed(2mb max per image)')
                setImageUploadError('Image upload failed(2mb max per image)');
            });
            setUploading(false);
        } else {
            setUploading(false);
            toast.error('You can only upload 6 images per listing');
            setImageUploadError('You can only upload 6 images per listing');
        }
    }
```

- create `storeImage()` store the images with fairbase rules 

```jsx
const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        resolve(downloadUrl);
                    });
                }
            )
        })
    }
```

-  some other edit for html page to use more good ,then is total code with `createListing.jsx`

```jsx
import React from 'react'
import { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { toast } from 'react-toastify'


const CreareListing = () => {

    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
    })
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);

    const handleImageSubmit = (e) => {
        e.preventDefault();
        setUploading(true);
        setImageUploadError(false);
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                setImageUploadError(false);
                setImageUploadError(false);
            }).catch((error) => {
                setUploading(false);
                toast.error('Image upload failed(2mb max per image)')
                setImageUploadError('Image upload failed(2mb max per image)');
            });
            setUploading(false);
        } else {
            setUploading(false);
            toast.error('You can only upload 6 images per listing');
            setImageUploadError('You can only upload 6 images per listing');
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        resolve(downloadUrl);
                    });
                }
            )
        })
    }

    const handleRemoveImage = (index) => {
        setFormData(
            {
                ...formData,
                imageUrls: formData.imageUrls.filter((_, i) => i != index),
            }
        )
    }

    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
            <form className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required />
                    <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' required />
                    <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='Address' required />
                    <div className='flex gap-4 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='sell' className='w-5' />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='rent' className='w-5' />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='parking' className='w-5' />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='furnished' className='w-5' />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='offer' className='w-5' />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='bedrooms' min='1' max='10' required
                                className='p-3 border border-gray-300 rounded-lg' />
                            <p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='bathrooms' min='1' max='10' required
                                className='p-3 border border-gray-300 rounded-lg' />
                            <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='regularPrice' min='1' max='10' required
                                className='p-3 border border-gray-300 rounded-lg' />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                <span className='text-sm'>($/Month)</span>
                            </div>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='discountedPrice' min='1' max='10' required
                                className='p-3 border border-gray-300 rounded-lg' />
                            <div className='flex flex-col items-center'>
                                <p>Discounted price</p>
                                <span className='text-sm'>($/Month)</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className='flex gap-4'>
                        <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='image/*' multiple />
                        <button disabled={uploading} onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? "Uploading" : "Upload"}</button>
                    </div>
                    <p className='text-sm text-red-700 my-4'>{imageUploadError && imageUploadError}</p>
                    {

                        formData.imageUrls.length > 0 ? formData.imageUrls.map((url, index) => {
                            return (
                                <div key={url} className='flex justify-between p-3 border items-center'>
                                    <img src={url} alt='listing images' className='w-40 h-40 object-cover rounded-lg' />
                                    <button type='button' onClick={() => handleRemoveImage(index)} className='text-red-700 p-3 rounded-lg uppercase hover:opacity-75'>Delete</button>
                                </div>
                            )
                        }) : null
                    }
                    <button className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>Create Listing</button>
                </div>
            </form>
        </main>
    )
}

export default CreareListing
```

- create object `formData` save form data

```jsx
const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false
    })

 const handleChange = (e) => {
        if (e.target.id === 'sell' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id
            })
        } else if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        } else {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    }
```

- create `handleSumbit` save formData to mongodb database

```jsx
const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) {
                setError('You must upload at least one image');
                toast.error('You must upload at least one image');
                return
            }

            if (+formData.regularPrice < +formData.discountPrice) {
                setError('Discount price must be lower than regular price');
                toast.error('Discount price must be lower than regular price');
                return
            }
            setLoading(true);
            setError(false);

            const res = await axios.post('/api/listing/create', { ...formData, 'userRef': currentUser._id });
            setLoading(false);
            if (res.data.success === false) {
                setError(res.data.message);
                toast.error(res.data.message);
            }

            if (res.data.success === true) {
                setError(false);
                setLoading(false);
                toast.success(res.data.message);
                navigate(`/listing/${res.data.listing._id}`);
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
            setLoading(false);
        }
    }
```

- all codes for `createListing.jsx`

```jsx
import React from 'react'
import { useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { toast } from 'react-toastify'
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'


const CreareListing = () => {
    const { currentUser } = useSelector(state => state.user);
    const navigate = useNavigate();
    const [files, setFiles] = useState([]);
    const [formData, setFormData] = useState({
        imageUrls: [],
        name: '',
        description: '',
        address: '',
        type: 'rent',
        bedrooms: 1,
        bathrooms: 1,
        regularPrice: 50,
        discountPrice: 0,
        offer: false,
        parking: false,
        furnished: false
    })
    console.log(formData);
    const [imageUploadError, setImageUploadError] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        if (e.target.id === 'sell' || e.target.id === 'rent') {
            setFormData({
                ...formData,
                type: e.target.id
            })
        } else if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setFormData({
                ...formData,
                [e.target.id]: e.target.checked
            })
        } else {
            setFormData({
                ...formData,
                [e.target.id]: e.target.value
            })
        }
    }
    
    const handleImageSubmit = (e) => {
        e.preventDefault();
        setUploading(true);
        setImageUploadError(false);
        if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
            const promises = [];

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls) => {
                setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                setImageUploadError(false);
            }).catch((error) => {
                setUploading(false);
                toast.error('Image upload failed(2mb max per image)')
                setImageUploadError('Image upload failed(2mb max per image)');
            });
            setUploading(false);
        } else {
            setUploading(false);
            toast.error('You can only upload 6 images per listing');
            setImageUploadError('You can only upload 6 images per listing');
        }
    }

    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage, fileName);
            const uploadTask = uploadBytesResumable(storageRef, file);
            uploadTask.on(
                "state_changed",
                (snapshot) => {
                    const progress =
                        (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(`Upload is ${progress}% done`);
                },
                (error) => {
                    reject(error);
                },
                () => {
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                        resolve(downloadUrl);
                    });
                }
            )
        })
    }

    const handleRemoveImage = (index) => {
        setFormData(
            {
                ...formData,
                imageUrls: formData.imageUrls.filter((_, i) => i != index),
            }
        )
    }

    const handleSumbit = async (e) => {
        e.preventDefault();
        try {
            if (formData.imageUrls.length < 1) {
                setError('You must upload at least one image');
                toast.error('You must upload at least one image');
                return
            }

            if (+formData.regularPrice < +formData.discountPrice) {
                setError('Discount price must be lower than regular price');
                toast.error('Discount price must be lower than regular price');
                return
            }
            setLoading(true);
            setError(false);

            const res = await axios.post('/api/listing/create', { ...formData, 'userRef': currentUser._id });
            setLoading(false);
            if (res.data.success === false) {
                setError(res.data.message);
                toast.error(res.data.message);
            }

            if (res.data.success === true) {
                setError(false);
                setLoading(false);
                toast.success(res.data.message);
                navigate(`/listing/${res.data.listing._id}`);
            }
        } catch (error) {
            setError(error.message);
            toast.error(error.message);
            setLoading(false);
        }
    }

    return (
        <main className='p-3 max-w-4xl mx-auto'>
            <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
            <form onSubmit={handleSumbit} className='flex flex-col sm:flex-row gap-4'>
                <div className='flex flex-col gap-4 flex-1'>
                    <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required onChange={handleChange} value={formData.name} />
                    <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' onChange={handleChange} value={formData.description} required />
                    <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' onChange={handleChange} value={formData.address} required />
                    <div className='flex gap-4 flex-wrap'>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='sell' className='w-5' onChange={handleChange} checked={formData.type === 'sell'} />
                            <span>Sell</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='rent' className='w-5' onChange={handleChange} checked={formData.type === 'rent'} />
                            <span>Rent</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='parking' className='w-5' onChange={handleChange} checked={formData.parking === true} />
                            <span>Parking spot</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished === true} />
                            <span>Furnished</span>
                        </div>
                        <div className='flex gap-2'>
                            <input type="checkbox" id='offer' className='w-5' onChange={handleChange} checked={formData.offer === true} />
                            <span>Offer</span>
                        </div>
                    </div>
                    <div className='flex flex-wrap gap-6'>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='bedrooms' min='1' max='10' required
                                onChange={handleChange} value={formData.bedrooms}
                                className='p-3 border border-gray-300 rounded-lg' />
                            <p>Beds</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='bathrooms' min='1' max='10' required
                                onChange={handleChange} value={formData.bathrooms}
                                className='p-3 border border-gray-300 rounded-lg' />
                            <p>Baths</p>
                        </div>
                        <div className='flex items-center gap-2'>
                            <input type="number" id='regularPrice' min='50' max='500000' required
                                onChange={handleChange} value={formData.regularPrice}
                                className='p-3 border border-gray-300 rounded-lg' />
                            <div className='flex flex-col items-center'>
                                <p>Regular price</p>
                                <span className='text-sm'>($/Month)</span>
                            </div>
                        </div>
                        {formData.offer && (
                            <div className='flex items-center gap-2'>
                                <input type="number" id='discountPrice' min='0' max='500000' required
                                    onChange={handleChange} value={formData.discountPrice}
                                    className='p-3 border border-gray-300 rounded-lg' />
                                <div className='flex flex-col items-center'>
                                    <p>Discounted price</p>
                                    <span className='text-sm'>($/Month)</span>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div className='flex flex-col flex-1 gap-4'>
                    <p className='font-semibold'>Images:
                        <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                    </p>
                    <div className='flex gap-4'>
                        <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='image/*' multiple />
                        <button disabled={uploading} onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? "Uploading" : "Upload"}</button>
                    </div>
                    <p className='text-sm text-red-700 my-4'>{imageUploadError && imageUploadError}</p>
                    {

                        formData.imageUrls.length > 0 ? formData.imageUrls.map((url, index) => {
                            return (
                                <div key={url} className='flex justify-between p-3 border items-center'>
                                    <img src={url} alt='listing images' className='w-40 h-40 object-cover rounded-lg' />
                                    <button type='button' onClick={() => handleRemoveImage(index)} className='text-red-700 p-3 rounded-lg uppercase hover:opacity-75'>Delete</button>
                                </div>
                            )
                        }) : null
                    }
                    <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>{loading ? 'Creating...' : 'Create Listing'}</button>
                    {error ? <p className='text-red-700 text-sm'>{error}</p> : null}
                </div>
            </form>
        </main>
    )
}

export default CreareListing
```

 

### 27. Create get user listing API route

- create route url at `user.route.js`

- ```js
  userRouter.get('/listings/:id',verifyToken,getUserListings);
  ```

- create functionality `getUserListings` at `user.controller.js`

- ```js
  export const getUserListings = async (req, res, next) => {
    try {
      if (req.user.id == req.params.id) {
        try {
          const listings = await listingModel.find({ userRef: req.params.id });
          res.status(200).json({success:true,listings,message:'Search listings success!'});
        } catch (error) {
          next(error);
        }
      } else {
        return res.json({
          success: false,
          message: "You can only view your own listings!",
        });
      }
    } catch (error) {
      next(error);
    }
  };
  ```

- then user listing api route is complete and test with `Insomnia`

- ![测试结果](https://img.picui.cn/free/2024/10/15/670d90a7a89c0.png)

- api work successfully



### 28. Complete show user listings functionality

- create page UI `show listing` button  and  listings contents UI

- ```jsx
  <button onClick={handleShowListings} className='text-green-700 text-sm w-full'>Show listings</button>
        <p className='text-red-700 mt-5'>{showListingError ? 'Error Showing listings' : ''}</p>
  
  ```

- ```jsx
   {userListings && userListings.length > 0 &&
          <div className='flex flex-col gap-4'>
            <h1 className='text-center mt-7 text-3xl font-semibold'>Your Listing</h1>
            {userListings.map((listing) => (
              <div key={listing._id}
                className='border rounded-lg p-3 flex justify-between items-center gap-4'>
                <Link to={`/listing/${listing._id}`}>
                  <img className='h-16 w-16 object-contain'
                    src={listing.imageUrls[0]}
                    alt="listing cover" />
                </Link>
                <Link className='text-slate-700 flex-1 font-semibold hover:underline truncate' to={`/listing/${listing._id}`}>
                  <p >{listing.name}</p>
                </Link>
                <div className='flex flex-col items-center'>
                  <button className='text-red-700 uppercase'>Delete</button>
                  <button className='text-green-700 uppercase'>Edit</button>
                </div>
              </div>
            ))}
  ```

- create `handleShowListings` functionality

- ```jsx
  const handleShowListings = async () => {
      try {
        setShowListingError(false);
        const res = await axios.get(`/api/user/listings/${currentUser._id}`);
        if (res.data.success === false) {
          setShowListingError(true);
          return;
        }
        toast.success(res.data.message);
        setUserListings(res.data.listings);
      } catch (error) {
        setShowListingError(true);
      }
    }
  ```



### 29. Complete delete user listing functionality

- create api roure for delete listing at `listing.route.js`

- ```js
  listingRouter.delete('/delete/:id',verifyToken,deleteListing);
  ```

- create function `deleteListing` at ``listing.contriler.js

- ```js
  export const deleteListing = async (req, res, next) => {
    const listing = await listingModel.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only delete your own listings!"));
    }
    try {
      await listingModel.findByIdAndDelete(req.params.id);
      res
        .status(200)
        .json({ success: true, message: "Delete listing successfully" });
    } catch (error) {
      next(error);
    }
  };
  ```

- test with `insomnia`

![delete listing](https://www.helloimg.com/i/2024/10/15/670e1827afbd4.png)

- delete listing test successfully

- create delete function  at fronted page `profile.jsx`

- ```jsx
  const handleListingDelete = async (listingId) => {
      try {
        const res = await axios.delete(`/api/listing/delete/${listingId}`);
        if (res.data.success == false) {
          toast.error(res);
          return
        }
  
        setUserListings((prev) => prev.filter((listing) => listing.id !== listingId));
        handleShowListings();
        toast.success(res.data.message);
      } catch (error) {
        toast.error(error.message);
      }
    }
  
  <button onClick={()=>handleListingDelete(listing._id)} className='text-red-700 uppercase'>Delete</button>
  ```



### 30. Complete update listing API route

- create API route for update listing

- ```js
  listingRouter.post('/update/:id',verifyToken,updateListing);
  ```

- create function `updateListing` at `listing.controller.js`

- ```js
  export const updateListing = async (req, res, next) => {
    const listing = await listingModel.findById(req.params.id);
    if (!listing) {
      return next(errorHandler(404, "Listing not found!"));
    }
    if (req.user.id !== listing.userRef) {
      return next(errorHandler(401, "You can only update your own listing!"));
    }
  
    try {
      const updatedListing = await listingModel.findByIdAndUpdate(
        req.params.id,
        req.body,
        //{new : true} : get new listing not pre listing in the return
        { new: true }
      );
      res.status(200).json({success:true,updatedListing});
    } catch (error) {
      next(error);
    }
  };
  ```

- then test this API with `insomnia`

![update listing](https://img.picui.cn/free/2024/10/16/670f0bdc60ab8.png)

- update listing successfully



### 31. Complete update listing functionality

- create Route path for `UpdateListing.jsx`in `App.jsx`

- ```jsx
  import UpdateListing from './pages/UpdateListing.jsx'
  
      <Route element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
            <Route path='/create-listing' element={<CreateListing />} />
            <Route path='update-listing/:listingId' element={<UpdateListing />} />
          </Route>
  ```

- get the `listingId` in `updateListing.jsx `and fetch listing by listingId

- ```jsx
  import { useNavigate, useParams } from 'react-router-dom'
  
  const params = useParams();
  
  useEffect(() => {
          const fetchListing = async () => {
              const listingId = params.listingId;
              console.log(listingId);
              
          }
  
          fetchListing();
      }, [])
  ```

- create api route for fetch listing by listingId in `listing.route.js`

- ```js
  listingRouter.get('/get/:id',getListing);
  ```

- create function `getListing` in `listing.controller.js`

- ```js
  export const getListing = async (req, res, next) => {
    try {
      const listing = await listingModel.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404, "Listing not found!"));
      }
      res.status(200).json({ success: true, listing });
    } catch (error) {
      next(error);
    }
  };
  ```

- test `getListing` API with insomnia

![get listing by Id](https://img.picui.cn/free/2024/10/17/670ff9e0bc967.png)

- set useEffect `fetchListing()`function in `updateListing.jsx`

- ```jsx
   useEffect(() => {
          const fetchListing = async () => {
              const listingId = params.listingId;
              const res = await axios.get(`/api/listing/get/${listingId}`);
              if(res.data.success !== true){
                  console.log(data.message);
                  return;
              }
              setFormData(res.data.listing);
          }
    
          fetchListing();
      }, [])
  ```

- the total code for `updateListing.jsx`

- ```jsx
  import React, { useEffect } from 'react'
  import { useState } from 'react'
  import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
  import { app } from '../firebase';
  import { toast } from 'react-toastify'
  import axios from 'axios';
  import { useSelector } from 'react-redux';
  import { useNavigate, useParams } from 'react-router-dom'
  
  const UpdateListing = () => {
      const { currentUser } = useSelector(state => state.user);
      const navigate = useNavigate();
      const params = useParams();
      const [files, setFiles] = useState([]);
      const [formData, setFormData] = useState({
          imageUrls: [],
          name: '',
          description: '',
          address: '',
          type: 'rent',
          bedrooms: 1,
          bathrooms: 1,
          regularPrice: 50,
          discountPrice: 0,
          offer: false,
          parking: false,
          furnished: false
      })
      const [imageUploadError, setImageUploadError] = useState(false);
      const [uploading, setUploading] = useState(false);
      const [error, setError] = useState(false);
      const [loading, setLoading] = useState(false);
  
      useEffect(() => {
          const fetchListing = async () => {
              const listingId = params.listingId;
              const res = await axios.get(`/api/listing/get/${listingId}`);
              if(res.data.success !== true){
                  console.log(data.message);
                  return;
              }
              setFormData(res.data.listing);
          }
  
          fetchListing();
      }, [])
  
      const handleChange = (e) => {
          if (e.target.id === 'sell' || e.target.id === 'rent') {
              setFormData({
                  ...formData,
                  type: e.target.id
              })
          } else if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
              setFormData({
                  ...formData,
                  [e.target.id]: e.target.checked
              })
          } else {
              setFormData({
                  ...formData,
                  [e.target.id]: e.target.value
              })
          }
      }
  
      const handleImageSubmit = (e) => {
          e.preventDefault();
          setUploading(true);
          setImageUploadError(false);
          if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
              const promises = [];
  
              for (let i = 0; i < files.length; i++) {
                  promises.push(storeImage(files[i]));
              }
              Promise.all(promises).then((urls) => {
                  setFormData({ ...formData, imageUrls: formData.imageUrls.concat(urls) });
                  setImageUploadError(false);
              }).catch((error) => {
                  setUploading(false);
                  toast.error('Image upload failed(2mb max per image)')
                  setImageUploadError('Image upload failed(2mb max per image)');
              });
              setUploading(false);
          } else {
              setUploading(false);
              toast.error('You can only upload 6 images per listing');
              setImageUploadError('You can only upload 6 images per listing');
          }
      }
  
      const storeImage = async (file) => {
          return new Promise((resolve, reject) => {
              const storage = getStorage(app);
              const fileName = new Date().getTime() + file.name;
              const storageRef = ref(storage, fileName);
              const uploadTask = uploadBytesResumable(storageRef, file);
              uploadTask.on(
                  "state_changed",
                  (snapshot) => {
                      const progress =
                          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                      console.log(`Upload is ${progress}% done`);
                  },
                  (error) => {
                      reject(error);
                  },
                  () => {
                      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
                          resolve(downloadUrl);
                      });
                  }
              )
          })
      }
  
      const handleRemoveImage = (index) => {
          setFormData(
              {
                  ...formData,
                  imageUrls: formData.imageUrls.filter((_, i) => i != index),
              }
          )
      }
  
      const handleSumbit = async (e) => {
          e.preventDefault();
          try {
              if (formData.imageUrls.length < 1) {
                  setError('You must upload at least one image');
                  toast.error('You must upload at least one image');
                  return
              }
  
              if (+formData.regularPrice < +formData.discountPrice) {
                  setError('Discount price must be lower than regular price');
                  toast.error('Discount price must be lower than regular price');
                  return
              }
              setLoading(true);
              setError(false);
  
              const res = await axios.post(`/api/listing/update/${params.listingId}`, { ...formData, 'userRef': currentUser._id });
              setLoading(false);
              if (res.data.success === false) {
                  setError(res.data.message);
                  toast.error(res.data.message);
              }
  
              if (res.data.success === true) {
                  setError(false);
                  setLoading(false);
                  toast.success(res.data.message);
                  navigate(`/listing/${res.data.updatedListing._id}`);
              }
          } catch (error) {
              setError(error.message);
              toast.error(error.message);
              setLoading(false);
          }
      }
      return (
          <main className='p-3 max-w-4xl mx-auto'>
              <h1 className='text-3xl font-semibold text-center my-7'>Update a Listing</h1>
              <form onSubmit={handleSumbit} className='flex flex-col sm:flex-row gap-4'>
                  <div className='flex flex-col gap-4 flex-1'>
                      <input type="text" placeholder='Name' className='border p-3 rounded-lg' id='name' maxLength='62' minLength='10' required onChange={handleChange} value={formData.name} />
                      <textarea type="text" placeholder='Description' className='border p-3 rounded-lg' id='description' onChange={handleChange} value={formData.description} required />
                      <input type="text" placeholder='Address' className='border p-3 rounded-lg' id='address' onChange={handleChange} value={formData.address} required />
                      <div className='flex gap-4 flex-wrap'>
                          <div className='flex gap-2'>
                              <input type="checkbox" id='sell' className='w-5' onChange={handleChange} checked={formData.type === 'sell'} />
                              <span>Sell</span>
                          </div>
                          <div className='flex gap-2'>
                              <input type="checkbox" id='rent' className='w-5' onChange={handleChange} checked={formData.type === 'rent'} />
                              <span>Rent</span>
                          </div>
                          <div className='flex gap-2'>
                              <input type="checkbox" id='parking' className='w-5' onChange={handleChange} checked={formData.parking === true} />
                              <span>Parking spot</span>
                          </div>
                          <div className='flex gap-2'>
                              <input type="checkbox" id='furnished' className='w-5' onChange={handleChange} checked={formData.furnished === true} />
                              <span>Furnished</span>
                          </div>
                          <div className='flex gap-2'>
                              <input type="checkbox" id='offer' className='w-5' onChange={handleChange} checked={formData.offer === true} />
                              <span>Offer</span>
                          </div>
                      </div>
                      <div className='flex flex-wrap gap-6'>
                          <div className='flex items-center gap-2'>
                              <input type="number" id='bedrooms' min='1' max='10' required
                                  onChange={handleChange} value={formData.bedrooms}
                                  className='p-3 border border-gray-300 rounded-lg' />
                              <p>Beds</p>
                          </div>
                          <div className='flex items-center gap-2'>
                              <input type="number" id='bathrooms' min='1' max='10' required
                                  onChange={handleChange} value={formData.bathrooms}
                                  className='p-3 border border-gray-300 rounded-lg' />
                              <p>Baths</p>
                          </div>
                          <div className='flex items-center gap-2'>
                              <input type="number" id='regularPrice' min='50' max='500000' required
                                  onChange={handleChange} value={formData.regularPrice}
                                  className='p-3 border border-gray-300 rounded-lg' />
                              <div className='flex flex-col items-center'>
                                  <p>Regular price</p>
                                  <span className='text-sm'>($/Month)</span>
                              </div>
                          </div>
                          {formData.offer && (
                              <div className='flex items-center gap-2'>
                                  <input type="number" id='discountPrice' min='0' max='500000' required
                                      onChange={handleChange} value={formData.discountPrice}
                                      className='p-3 border border-gray-300 rounded-lg' />
                                  <div className='flex flex-col items-center'>
                                      <p>Discounted price</p>
                                      <span className='text-sm'>($/Month)</span>
                                  </div>
                              </div>
                          )}
                      </div>
                  </div>
                  <div className='flex flex-col flex-1 gap-4'>
                      <p className='font-semibold'>Images:
                          <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span>
                      </p>
                      <div className='flex gap-4'>
                          <input onChange={(e) => setFiles(e.target.files)} className='p-3 border border-gray-300 rounded w-full' type="file" id="images" accept='image/*' multiple />
                          <button disabled={uploading} onClick={handleImageSubmit} className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>{uploading ? "Uploading" : "Upload"}</button>
                      </div>
                      <p className='text-sm text-red-700 my-4'>{imageUploadError && imageUploadError}</p>
                      {
  
                          formData.imageUrls.length > 0 ? formData.imageUrls.map((url, index) => {
                              return (
                                  <div key={url} className='flex justify-between p-3 border items-center'>
                                      <img src={url} alt='listing images' className='w-40 h-40 object-cover rounded-lg' />
                                      <button type='button' onClick={() => handleRemoveImage(index)} className='text-red-700 p-3 rounded-lg uppercase hover:opacity-75'>Delete</button>
                                  </div>
                              )
                          }) : null
                      }
                      <button disabled={loading || uploading} className='p-3 bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-95'>{loading ? 'updating...' : 'update Listing'}</button>
                      {error ? <p className='text-red-700 text-sm'>{error}</p> : null}
                  </div>
              </form>
          </main>
      )
  }
  
  export default UpdateListing
  ```

  

### 32. Add image slider to the list page 

- create page `Listing.jsx` to show listing information.

- add page route for `Listing.jsx` in `App.jsx`.

- ```jsx
  <Route path='/listing/:listingId' element={<Listing/>}/>
  ```

- create get listing information route in `listing.route.js`

- not use verify user token，because every one can search this information.

- ```js
  listingRouter.get('/get/:id',getListing);
  ```

- create function `getListing()`in `listing.controller.js`

- ```js
  export const getListing = async (req, res, next) => {
    try {
      const listing = await listingModel.findById(req.params.id);
      if (!listing) {
        return next(errorHandler(404, "Listing not found!"));
      }
      res.status(200).json({ success: true, listing });
    } catch (error) {
      next(error);
    }
  };
  ```

- get information for `listing.jsx`

- ```jsx
   useEffect(() => {
      const fetchListing = async () => {
        try {
          setLoading(true);
          setError(false);
          //in App.js Route path='update-listing/:listingId' so use listingId
          const res = await axios.get(`/api/listing/get/${params.listingId}`)
          if (res.data.success == false) {
            setError(true);
            setLoading(false);
            return;
          }
          setListing(res.data.listing);
          setLoading(false);
          setError(false);
        }
        catch (error) {
          setError(true);
          setLoading(false);
        }
      }
    
      fetchListing();
    },[params.listingId])
  ```

- show image with swiper so install it first in frontend

- ```
  npm i swiper
  ```

- import swiper and use it show image slide

- ```jsx
  import axios from 'axios'
  import React, { useEffect, useState } from 'react'
  import { useParams } from 'react-router-dom'
  import { Swiper, SwiperSlide } from 'swiper/react'
  import SwiperCore from 'swiper'
  import { Navigation } from 'swiper/modules'
  import 'swiper/css/bundle'
  
  const Listing = () => {
  
    SwiperCore.use([Navigation]);
  
    const [listing, setListing] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const params = useParams();
  
    useEffect(() => {
      const fetchListing = async () => {
        try {
          setLoading(true);
          setError(false);
          //in App.js Route path='update-listing/:listingId' so use listingId
          const res = await axios.get(`/api/listing/get/${params.listingId}`)
          if (res.data.success == false) {
            setError(true);
            setLoading(false);
            return;
          }
          setListing(res.data.listing);
          setLoading(false);
          setError(false);
        }
        catch (error) {
          setError(true);
          setLoading(false);
        }
      }
  
      fetchListing();
    }, [params.listingId])
  
    return (
      <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
        {listing && !loading && !error &&
          (
            <div>
              <Swiper navigation>
                {
                  listing.imageUrls.map((url) => (
                    <SwiperSlide key={url}>
                      <div
                        className='h-[550px]'
                        style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}
                      ></div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
            </div>
          )
        }
      </main>
    )
  }
  
  export default Listing
  ```

  

### 33. Complete listing page

- create image slide. `npm install swiper ` import packages 

- ```jsx
  import { Swiper, SwiperSlide } from 'swiper/react'
  import SwiperCore from 'swiper'
  import { Navigation } from 'swiper/modules'
  import 'swiper/css/bundle'
  
  const Listing = () => {
  
    SwiperCore.use([Navigation]);
      
      <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl'>Something went wrong!</p>}
        {listing && !loading && !error &&
          (
            <div>
              <Swiper navigation>
                {
                  listing.imageUrls.map((url) => (
                    <SwiperSlide key={url}>
                      <div
                        className='h-[550px]'
                        style={{ background: `url(${url}) center no-repeat`, backgroundSize: 'cover' }}
                      ></div>
                    </SwiperSlide>
                  ))
                }
              </Swiper>
              </div>
        </main>
  }
  
  ```

- than set share icon , and add click function for it 

- ```jsx
  <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
                <FaShare className='text-slate-500' onClick={() => {
                  console.log('enter onclick function')
                  navigator.clipboard.writeText(window.location.href);
                  toast.success('Link copied!');
                }
                } />
              </div>
  ```

- create title , description and show beds,baths,parking,furnished numbers or status

- ```jsx
   <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
                <p className='text-2xl font-semibold'>
                  {listing.name} - ${' '}
                  {listing.offer
                    ? listing.discountPrice.toLocaleString('en-US')
                    : listing.regularPrice.toLocaleString('en-US')
                  }
                  {listing.type === 'rent' && '/month'}
                </p>
                <p className='flex items-center  mt-6 gap-2 text-slate-600  text-sm'>
                  <FaMapMarkerAlt className='text-green-700' />
                  {listing.address}
                </p>
                <div className='flex gap-4'>
                  <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                    {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                  </p>
                  {
                    listing.offer && (
                      <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>${+listing.regularPrice - +listing.discountPrice}</p>
                    )
                  }
                </div>
                <p className='text-salte-800'>
                  <span className='font-semibold text-black'>
                    Description - {' '}
                  </span>
                  {listing.description}
                </p>
                <ul className=' flex items-center flex-wrap gap-4 sm:gap-6  text-green-900 font-semibold whitespace-nowrap text-sm'>
                  <li className='flex items-center gap-1 '>
                    <FaBed className='text-lg'/>
                    {listing.bedrooms > 1 ? `${listing.bedrooms} beds`: `${listing.bedrooms} bed`}
                  </li>
                  <li className='flex items-center gap-1 '>
                    <FaBath className='text-lg'/>
                    {listing.bathrooms > 1 ? `${listing.bathrooms} baths`: `${listing.bathrooms} bath`}
                  </li>
                  <li className='flex items-center gap-1 '>
                    <FaParking className='text-lg'/>
                    {listing.parking  ? 'Parking spot': 'No Parking'}
                  </li>
                  <li className='flex items-center gap-1 '>
                    <FaChair className='text-lg'/>
                    {listing.furnished ? 'Furnished': 'No Furnished'}
                  </li>
                </ul>
              </div>
            </div>
  ```

- `Listing.jsx` base page is completed.





### 34. Add contact landlord functionality to the listing page

- create route for get user condition landlord account is exist

  ```js
  userRouter.get('/:id',verifyToken,getUser);
  ```

```js
export const getUser = async (req, res, next) => {
  try {
    const user = await userModel.findById(req.params.id);

    if (!user) {
      next(errorHandler(404, "User not found!"));
      return;
    }

    const { password: pass, ...rest } = user._doc;

    res.status(200).json({ success: true, rest });
  } catch (error) {
    next(error);
  }
};
```

- add context for contact landlord in `listing.jsx`

- ```jsx
     {currentUser && listing.userRef !== currentUser._id && !contact && (
                  <button onClick={() => setContact(true)} className='bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95'>
                    Contact landlord
                  </button>
                )}


                {contact && <Contact listing={listing} />}
  ```

- complete `Contact.jsx` page context. create `Contact.jsx` in folder `components`

- ```jsx
  import { useEffect, useState } from 'react'
  import axios from 'axios'
  import { toast } from 'react-toastify';
  import { Link } from 'react-router-dom';
  
  const Contact = ({ listing }) => {
  
    const [landlord, setLandlord] = useState(null);
    const [message, setMessage] = useState(' ');
  
    useEffect(() => {
      const fetchLandlord = async () => {
        try {
          const res = await axios.get(`/api/user/${listing.userRef}`);
          setLandlord(res.data.rest);
        } catch (error) {
          console.log(error);
          toast.error(error.message);
        }
      }
  
      fetchLandlord();
    }, [listing.userRef]);
  
    const onChange = (e) => {
      setMessage(e.target.value);
    }
    return (
      <>
        {landlord && (
          <div className='flex flex-col gap-2'>
            <p>Contact <span className='font-semibold'>
              {landlord.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span></p>
            <textarea
              name="message"
              id="message"
              rows='2'
              value={message}
              onChange={onChange}
              placeholder='Enter your message here...'
              className='w-full border p-3 rounded-lg'
            ></textarea>
            <Link
              to={`mailto:${landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
              className='bg-slate-700 text-white text-center
              p-3 uppercase rounded-lg hover:opacity-95'
            >
              Send Message
            </Link>
          </div>
        )}
      </>
    )
  }
  
  export default Contact
  ```

- test click button for send message to landlord success.





### 35. 	Create search API route 

- create search api at `listing.route.js`

- ```js
  listingRouter.get('/get', getListings);
  ```

- create functionality getlistings() at `listing.controller.js`

- ```js
  export const getListings = async (req, res, next) => {
    try {
      // limit show numbers of result.
      const limit = parseInt(req.query.limit) || 9;
      const startIndex = parseInt(req.query.startIndex) || 0;
      let offer = req.query.offer;
  
      if (offer === undefined || offer === "false") {
        offer = { $in: [false, true] };
      }
  
      let furnished = req.query.furnished;
      // set to a query that can match either false or true values in a MongoDB query.
      if (furnished === undefined || furnished === "false") {
        furnished = { $in: [false, true] };
      }
  
      let parking = req.query.parking;
  
      if (parking === undefined || parking === "false") {
        parking = { $in: [false, true] };
      }
  
      let type = req.query.type;
  
      if (type === undefined || type === "all") {
        type = { $in: ["rent", "sale"] };
      }
  
      const searchTerm = req.query.searchTerm || "";
  
      const sort = req.query.sort || "ceratAt";
  
      const order = req.query.order || 'desc';
  
      const listings = await listingModel.find({
        //$options:'1': searh all either lowercase or uppercase.
        name: { $regex: searchTerm, $options: '1' },
        offer,
        furnished,
        parking,
        type,
      }).sort(
        {[sort]: order}
      ).limit(limit).skip(startIndex);
  
      return res.status(200).json({success:true,listings});
      
    } catch (error) {
      next(error);
    }
  };
  ```

- test search api route in insomnia success.



### 36. Complete header search form functionality

- Add  attribute `searchTerm` in `Header,jsx` and `onChange`functionality in search input 

- ```jsx
  <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                      <input
                          className='bg-transparent focus:outline-none w-24 sm:w-64'
                          type="text"
                          placeholder='Search...'
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                      />
                      <button>
                          <FaSearch className='text-slate-600' />
                      </button>
                  </form>
  ```

- create functionality `handleSubmit` for show `searchTerm` at `window.location.search`

- ```jsx
  const handleSubmit = (e) => {
          e.preventDefault();
          const urlParams = new URLSearchParams(window.location.search);
          urlParams.set('searchTerm', searchTerm);
          const searchQuery = urlParams.toString();
          navigate(`/search?${searchQuery}`);
      }
  ```

- create `useEffect` change search input when `window.location.search` `?searchTerm=''`is change

- ```jsx
  useEffect(()=>{
          const urlParams = new URLSearchParams(location.search);
          const searchTermFromUrl  = urlParams.get('searchTerm');
          if(searchTermFromUrl){
              setSearchTerm(searchTermFromUrl);
          }
      },[location.search])
  ```





### 37.  Create search page UI

- create page `Search.jsx` and add the route for it in `App.jsx`

- ```jsx
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
          <Route path='/search' element={<Search />}/>
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
  ```

- create `Search.jsx` page UI a part of it.

- ```jsx
  import React from 'react'
  
  const Search = () => {
      return (
          <div className='flex flex-col md:flex-row'>
              <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen'>
                  <form className='flex flex-col gap-8'>
                      <div className='flex items-center gap-2'>
                          <label className='whitespace-nowrap font-semibold'>Search Term:</label>
                          <input type="text"
                              id='searchTerm'
                              placeholder='Search...'
                              className='border rounded-lg p-3 w-full'
                          />
                      </div>
                      <div className='flex gap-2 flex-wrap items-center'>
                          <label className='font-semibold'>Type:</label>
                          <div className='flex gap-2'>
                              <input type="checkbox"
                                  id='all'
                                  className='w-5'
                              />
                              <span>Rent & Sale</span>
                          </div>
                          <div className='flex gap-2'>
                              <input type="checkbox"
                                  id='rent'
                                  className='w-5'
                              />
                              <span>Rent</span>
                          </div>
                          <div className='flex gap-2'>
                              <input type="checkbox"
                                  id='sale'
                                  className='w-5'
                              />
                              <span>Sale</span>
                          </div>
                          <div className='flex gap-2'>
                              <input type="checkbox"
                                  id='offer'
                                  className='w-5'
                              />
                              <span>Offer</span>
                          </div>
                      </div>
                      <div className='flex gap-2 flex-wrap items-center'>
                          <label className='font-semibold'>Amenities:</label>
                          <div className='flex gap-2'>
                              <input
                                  type="checkbox"
                                  id="parking"
                                  className='w-5'
                              />
                              <span>Parking</span>
                          </div>
                          <div className='flex gap-2'>
                              <input
                                  type="checkbox"
                                  id="furnished"
                                  className='w-5'
                              />
                              <span>Furnished</span>
                          </div>
                      </div>
                      <div className='flex items-center gap-2'>
                          <label className='font-semibold'>Sort:</label>
                          <select id="sort_order"
                              className='border rounded-lg p-3'
                          >
                              <option>Price high to low</option>
                              <option>Price low to high</option>
                              <option>Latest</option>
                              <option>Oldest</option>
                          </select>
                      </div>
                      <button
                          className='bg-slate-700
                               text-white 
                               p-3 
                               rounded-lg
                               uppercase
                               hover:opacity-95'
                      >
                          Search
                      </button>
                  </form>
              </div>
              <div className='flex flex-col items-center'>
                  <h1
                      className='text-3xl 
                          font-semibold
                          border-b
                          p-3
                          text-slate-700
                          mt-5'
                  >
                      Listing results:
                  </h1>
              </div>
          </div>
      )
  }
  
  export default Search
  ```

- Browse the web success



### 38. Add onChange and onSubmit functionality to the search page

- create object `sidebardata` set `sidebardata` when change information on web page.

```jsx
const [sidebardata, setSidebardata] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'create_at',
        order: 'desc',
    });

const handleChange = (e) => {

        if (e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale') {
            setSidebardata({ ...sidebardata, type: e.target.id });
        }

        if (e.target.id === 'searchTerm') {
            setSidebardata({ ...sidebardata, searchTerm: e.target.value });
        }

        if (e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer') {
            setSidebardata({
                ...sidebardata,
                [e.target.id]:
                    e.target.checked || e.target.checked === 'true' ? true : false
            });
        }

        if (e.target.id === 'sort_order') {
            const sort = e.target.value.split('_')[0] || 'created_at';

            const order = e.target.value.split('_')[1] || 'desc';

            setSidebardata({ ...sidebardata, sort, order });
        }
    }

//example searchTerm change 
  <input type="text"
                            id='searchTerm'
                            placeholder='Search...'
                            className='border rounded-lg p-3 w-full'
                            value={sidebardata.searchTerm}
                            onChange={(e) => handleChange(e)}
                        />
```

- create functionality `handleSubmit`complete information and submit form.

```jsx
const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebardata.searchTerm);
        urlParams.set('type', sidebardata.type);
        urlParams.set('parking', sidebardata.parking);
        urlParams.set('furnished', sidebardata.furnished);
        urlParams.set('offer', sidebardata.offer);
        urlParams.set('sort', sidebardata.sort);
        urlParams.set('order', sidebardata.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    }
```

- when urlParams  change fetch listings in database(mongodb) and change `sidebardata` when urlParams change it will effect `sidebardata`

```jsx
useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if (
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ) {
            setSidebardata({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }

        const fetchListings = async () => {
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await axios.get(`/api/listing/get?${searchQuery}`);
            setListings(res.data.listings);
            setLoading(false);
        };

        fetchListings();
    }, [location.search]);
```

