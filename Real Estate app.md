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



### 14. Add redux toolkit

```js
import express from 'express';
import { signin, signup } from '../controllers/auth.controller.js';

const authRouter = express.Router();

authRouter.post('/signup',signup);
//add route endpoint
authRouter.post('/signin',signin);

export default authRouter;
```



```js
import userModel from "../models/User.model.js";
import bcryptsjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

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

//signin function
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



2:44
