import express from "express";
import helmet from "helmet";
import hpp from "hpp";
import mongoose from "mongoose";
import morgan from "morgan";
import config from "./config";
import cors from "cors";
import "babel-polyfill";

// Routes
import postsRoutes from "./routes/api/post";
const { MONGO_URI } = config;
const app = express();

app.use(hpp()); // 보안
app.use(helmet()); // 보안
app.use(cors({ origin: true, credentials: true })); // 외부소스 불러오기
app.use(morgan("dev"));
app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("MongoDB Conneted...!");
  })
  .catch((err) => console.log(err));

// USE routes
app.get("/");
app.use("/api/post", postsRoutes);

export default app;
