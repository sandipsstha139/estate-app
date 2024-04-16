import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from 'cookie-parser';
import morgan from "morgan";

import authRoute from "./routes/auth.route.js"
import postRoute from "./routes/post.route.js"
import testRoute from "./routes/test.route.js"
import userRoute from "./routes/user.route.js"

dotenv.config({ path: './.env' });

const app = express();

app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(morgan(':method :url :status :response-time ms'));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/posts", postRoute);
app.use("/api/test", testRoute);

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})
