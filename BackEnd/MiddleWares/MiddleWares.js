const crypto = require('crypto');
const db = require('../database/config');
const jwt = require("jsonwebtoken")

const handleErrors = (res, error) => {
  console.error('Error :',error);
  res.status(500).json({ error: error.message });
};
const checkAdminRole = async (req, res, next) => {
  const token = req.headers.authorization;
console.log(token);
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'your-jwt-secrets'); 
    console.log(decoded);
    const userId = decoded.id;
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(403).json({ error: 'Invalid user' });
    }
if(decoded.role!=='admin'){
  return res.status(403).json({ error: 'Access denied, admin only' });
}
    next();
  } catch (err) {
    return res.status(403).json(err);
  }
};

const checkSellerRole = async (req, res, next) => {
  const token = req.headers.authorization;
console.log(token);
  if (!token) {
    return res.status(403).json({ error: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'your-jwt-secrets'); 
    console.log(decoded);
    const userId = decoded.id;
    const user = await db.User.findByPk(userId);
    if (!user) {
      return res.status(403).json({ error: 'Invalid user' });
    }
if(decoded.role!=='seller'){
  return res.status(403).json({ error: 'Access denied, seller only' });
}
    next();
  } catch (err) {
    return res.status(403).json(err);
  }
};

module.exports = { handleErrors, checkAdminRole,checkSellerRole }; 