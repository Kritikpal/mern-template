import express from "express";
import { MAX_REQUEST_SIZE } from "./config/expressconfig.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import uploadThroughMulter from "./middlewares/multer.middleware.js";
import mainRouter from "./routers/main.router.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { PATH_PREFIX } from "./constants/routeConstants.js";
import userRouter from "./routers/user.router.js";

const server = express();

server.use(
  express.json({
    limit: MAX_REQUEST_SIZE,
  })
);

server.use(
  express.urlencoded({
    extended: true,
    limit: MAX_REQUEST_SIZE,
  })
);
server.use(express.static("public"));

server.use(cookieParser());
server.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
server.use(uploadThroughMulter.any());
server.use(PATH_PREFIX, mainRouter);
server.use(PATH_PREFIX, userRouter);
server.use(errorHandler);
export default server;
