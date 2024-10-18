import { Unkey, verifyKey } from "@unkey/api";


async function verifyApiKey(req, res, next) {
    // Extract API key from the request header
    const apiKey = req.headers['x-api-key'];
  
    // Check if API key exists
    if (!apiKey) {
      return res.status(401).json({ message: 'API key missing' });
    }
      // Verify the API key using Unkey
      const { error , result } = await verifyKey({
        key : apiKey
      }); // Assuming `unkey.verify` is the method
      
      if (!result.valid) {
        return res.status(403).json({ message: 'Invalid API key' });
      }
  
    if(error){
        return res.status(error.code).json({ message: error.message }); 

    }
      // Proceed to the next middleware if verification is successful
      next();
      
  }
  
  export default verifyApiKey;