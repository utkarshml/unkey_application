import { verifyKey } from "@unkey/api";
import readline from "readline"
import { ratelimit } from "../index.js";
import { exit } from "process";

// Rate Limit Testing for an key
async function sendRequests(key) {
    for (let i = 0; i < 150; i++) {
        const {error , result} = await verifyKey({
            key
            })
         if(!result.valid){
            console.log(`Request ${i + 1}: Rate limit exceeded`);
              }
         else if(error){
             console.log(`Request ${i + 1}: Error`, error.message);
         }else{
            console.log(`Request ${i + 1}: Success`);
         }   
    }
    exit()
}

// ratelimit test for global

async function testGlobalRateLimit(globalIdentifier , totalRequests) {
  let passedRequests = 0;
  let rateLimitedRequests = 0;

  // Simulate multiple requests
  for (let i = 0; i < totalRequests; i++) {
    const { success } = await ratelimit.limit(globalIdentifier);

    if (success) {
      passedRequests++;
      console.log(`Request ${i + 1}: Passed`);
    } else {
      rateLimitedRequests++;
      console.log(`Request ${i + 1}: Rate Limited`);
    }
  }

  // Log the final result after all requests
  console.log(`Total requests: ${totalRequests}`);
  console.log(`Passed requests: ${passedRequests}`);
  console.log(`Rate-limited requests: ${rateLimitedRequests}`);
  exit()
}

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Ask user to select the type of rate limit test
rl.question('Choose a test (1 for API key rate limit, 2 for global rate limit): ', async (choice) => {
  if (choice === '1') {
    // Ask for API key to test rate limiting for a specific key
    rl.question('Enter API key for rate limit test: ', async (apiKey) => {
      await sendRequests(apiKey);
      rl.close();
    });
  } else if (choice === '2') {
    // Ask for an identifier for global rate limit testing
    rl.question('Enter identifier for global rate limit: ', async (identifier) => {
      rl.question('Enter total requests: ' , async (totalRequests)=>{
      testGlobalRateLimit(identifier , totalRequests)
      rl.close();

      })
    });
  } else {
    console.log('Invalid choice, please run the program again.');
    rl.close();
  }
});

export  {
 sendRequests , testGlobalRateLimit
}

