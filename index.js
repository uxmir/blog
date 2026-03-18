require("dotenv").config();
const express = require("express");
const connectionDataBase = require("./config/db");
const cookieParser = require("cookie-parser");
const authRouter=require('./src/routes/authRoutes')

//for dns connection with mongodb atlas
const dns = require("dns");
dns.setServers(["1.1.1.1", "8.8.8.8"]);
const app = express();

//authRoute
app.use('/api/v1/auth',authRouter)

//middleware
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT ? process.env.PORT : 3000;
//database connection
connectionDataBase();
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
