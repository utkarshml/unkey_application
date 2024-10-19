# **Unkey API Rate Limiter Example**

This project demonstrates how to integrate **Unkey** into an Express.js application to protect your API using **rate limiting** for both user-triggered actions and global rate limits. The project also includes functionality for **API key management** using Unkey.

---

## **Features**

- **Rate Limiting**: Protect your API by limiting the number of requests made by users or globally across the system.
- **API Key Management**: Create, read, and manage API keys with Unkey.
- **Global Rate Limit Testing**: Simulate and test rate limits across the entire system.
- **API Key Specific Rate Limit Testing**: Check rate limiting for individual API keys.

---

## **Prerequisites**

- Node.js (v14+)
- NPM or Yarn
- Unkey account and API Key

---

## **Getting Started**

### **1. Clone the Repository**
```bash
git clone git@github.com:utkarshml/unkey_application.git
cd unkey_application
```

### **2. Install Dependencies**
Install the required dependencies using either NPM or Yarn:

```bash
npm install
```
OR
```bash
yarn install
```
### **3. Configure Environment Variables**
Create a .env file in the root directory and add your Unkey API Key:

```bash
UNKEY_KEY=your_unkey_api_key
```

### **4. Run the Application**
To run the application in development mode:
```bash
npm run dev
```
OR

```bash
yarn dev
```
**To start the app in production mode:**

```bash
npm start
```

### **5. Test Rate Limiting**
To test the rate-limiting functionality, run the predefined test script:

```bash
npm test
```

### **Usage**
This project demonstrates how to manage API keys and apply rate limits to your API using Unkey. Below are the available endpoints:

**Endpoints**
Create an API Key
`POST /create`
Body:
```json
{
  "apiId": "your_api_id",
  "name": "My API Key"
}
```

**Get All API Keys**
`GET /api/keys`
Body:
```json
{
  "apiId": "your_api_id"
}
```
#### Get Information About a Specific Key

`GET /key/info`
Body:

```json
{
  "keyId": "your_key_id"
}
```

**Set Remaining Requests for a Key**
`PUT /remain`
Body:
```json
{
  "keyId": "your_key_id",
  "op": "set",
  "value": 50
}
```

**Rate Limited API Call (Global)**
`GET /api`
Header:

```json
{
  "x-api-key": "your_api_key"
}
```

