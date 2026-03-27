function main() {
  require("dotenv").config();
  const express = require("express");
  const connectionDataBase = require("./config/db");
  const cookieParser = require("cookie-parser");
  const authRouter = require("./src/routes/authRoutes");
  const blogRouter = require("./src/routes/blogRoutes");
  const commentRouter = require("./src/routes/commentRoutes");
  const replyRouter = require("./src/routes/replyRoutes");
  const likeRouter=require("./src/routes/likeRoutes")
  const dislikeRouter=require("./src/routes/dislikeRoutes")

  //for dns connection with mongodb atlas
  const dns = require("dns");
  dns.setServers(["1.1.1.1", "8.8.8.8"]);
  const app = express();

  //middleware
  app.use(express.json());
  app.use(cookieParser());
  //for file
  app.use("/uploads", express.static("uploads"));

  //allRoute
  app.use("/api/v1/auth", authRouter);
  app.use("/api/v2/blog", blogRouter);
  app.use("/api/v3/comment", commentRouter);
  app.use("/api/v4/reply", replyRouter);
  app.use("/api/v5/like",likeRouter)
  app.use("/api/v6/dislike",dislikeRouter)

  const PORT = 3000;
  //database connection
  connectionDataBase();
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`server is running on http://0.0.0.0: ${PORT}`);
  });
}

main();
