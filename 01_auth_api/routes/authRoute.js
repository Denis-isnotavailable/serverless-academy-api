const express = require('express');
const { userParamsValidation, tokenValidation } = require('../middlewares/validationMiddlewares');
const { signInController, signUpController, refreshTokenController } = require('../controllers/authController');


const authRouter = express.Router();

authRouter.post("/sign-in", userParamsValidation, signInController);
authRouter.post("/sign-up", userParamsValidation, signUpController);
authRouter.post("/refresh", tokenValidation, refreshTokenController);

module.exports = authRouter;