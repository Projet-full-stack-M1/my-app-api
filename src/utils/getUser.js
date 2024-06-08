
const jwt = require('jsonwebtoken');

const getUser = (token) => {
  try {
    if (token) {
      const user= jwt.verify(token, process.env.JWT_SECRET);
      console.log('User decoded from token:'); 
      return user;
    }
    return null;
  } catch (error) {
    console.error('Error verifying token:', error); 
    return null;
  }
};

module.exports = getUser;
