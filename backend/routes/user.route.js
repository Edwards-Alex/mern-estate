import express from "express";

const userRouter = express.Router();

userRouter.get('/test', (req, res) => {
  res.json({
    msg: 'Hello World!',
  });
});

export default userRouter;