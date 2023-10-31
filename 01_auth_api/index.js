const express = require('express');
require('dotenv').config();
const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');


const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.json());
app.use("/auth", authRouter);
app.use("", userRouter);

const startApp = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running. Use API on port: ${PORT}`);
    })
  } catch (e) {
    console.error(`Failed to launch app with error: ${e.message}`);
    process.exit(1);
  }
}

startApp();