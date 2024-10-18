import { verifyKey } from "@unkey/api";
import { ratelimit, unkey } from "../index.js";
    


// Create an API Key
export const createAPIKey = async (req, res) => {
    try {
        const { apiId, name } = req.body;
        const response = await unkey.keys.create({
            apiId,
            name
        })
        console.log(response)
        return res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error creating API Key', error: error.response?.data });
    }
};
// Read All API keys
export const getAllKeys = async (req, res) => {
    
    try {
        const { apiId} = req.body;
        const response = await unkey.apis.listKeys({
            apiId
        })
        console.log(response)
        res.status(201).json(response);
    } catch (error) {
        res.status(500).json({ message: 'Error creating API Key', error: error.response?.data });
    }
};
// Read an key
export const getKeyInfo = async (req, res) => {
    try {
        const { keyId } = req.body;
        const response = await unkey.keys.get({
            keyId,
        })
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating API Key', error: error.response?.data });
    }
};

// set Remaining of key
export const setRemaining = async (req, res) => {
    try {
        const { keyId ,op = "set", value } = req.body;
        const response = await unkey.keys.updateRemaining({
        keyId,
        op ,
        value 
        })
        return res.status(201).json(response);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating API Key', error: error.response?.data });
    }
};
// set Rate Limit of API 
export const setRateLimitOfKey = (req , res) =>{
    const { keyId , name , ownerId , async , limit, duration } = req.body;
    try {
       const ratelimit = unkey.keys.update({
        keyId,
        name ,
        ownerId,
        ratelimit  : {
            async,
            limit,
            duration
        }
       })
       return res.status(201).json(ratelimit);
    } catch (error) {
        return res.status(500).json({ message: 'Error creating API Key', error: error.response?.data });
    }

}

// sendRequests("3ZHqvQnrmv82tM3p2twD3D8Y");



// Testing Paid API controller 
export const paidApiData = async (req, res) =>{
 const globalIdentifier = "system-api";  // Global rate limit identifier
 const {success} = (await ratelimit.limit(globalIdentifier))
 if(!success){
    return res.status(429).json({ message: "Global rate limit exceeded" });
 }
 return  res.json({
    message : "You can access Api"
  })
}