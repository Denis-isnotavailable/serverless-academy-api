const express = require('express');
const { authValidation } = require('../middlewares/validationMiddlewares');
const getUser = require('../controllers/userController');


const userRouter = express.Router();

userRouter.get("/me", authValidation, getUser);

module.exports = userRouter;