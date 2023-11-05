const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const jwtSecret = 'your-secret-key';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const authenticateToken = async (request, response, next) => {

    const authorizationHeader = request.headers.authorization;
    console.log("🚀 ~ file: token.js:17 ~ authenticateToken ~ authorizationHeader:", authorizationHeader)

    if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
      return response.status(401).json({ error: 'Invalid or missing token' });
    }
  
    const token = authorizationHeader.split(' ')[1]; // Get the token from the 'Bearer' token format
    
        try {
          const decoded = jwt.verify(token, 'your-secret-key'); // Replace 'your-secret-key' with your actual secret key
      
          // You can now access the user ID from the decoded token
          const userId = decoded.userId;
          console.log("🚀 ~ file: token.js:32 ~ authenticateToken ~ userId:", userId)
      
          // Set the userId as a property on the request object for use in your route handlers
          request.userId = userId;
      
          return next();
        } catch (error) {
          response.status(401).json({ error: 'Token is invalid or expired' });
        }
    return next();
    }

module.exports = authenticateToken;