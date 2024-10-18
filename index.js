import express from "express"
import dotenv from "dotenv"
import appRoutes from "./routes/apiRoute.js"
import { Unkey } from '@unkey/api';
import { Ratelimit } from "@unkey/ratelimit";
dotenv.config();
export const ratelimit = new Ratelimit({
  rootKey: process.env.UNKEY_KEY,
  namespace: "system-api",
  limit: 100,  // Global limit of 100 requests
  duration: "1m",  // Within a 1-minute window
  async: true
});

export const unkey = new Unkey({token : process.env.UNKEY_KEY});
export const app = express(); 
app.use(express.json());
app.use (appRoutes)


app.listen(3000,()=>{
    console.log("server is running on  3000 port")
})