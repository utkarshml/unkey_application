import express from "express"
import { createAPIKey, getAllKeys, getKeyInfo, paidApiData, setRemaining } from "../controller/apiController.js";
import verifyApiKey from "../middleware/keyVerfication.js";

const router = express.Router();


router.get("/api" , verifyApiKey , paidApiData);
router.post("/create" , createAPIKey)
router.get('/api/keys' , getAllKeys)
router.get('/key/info' , getKeyInfo)
router.put('/remain' , setRemaining)


export default router