
const express = require('express');
const router = express.Router();
const Product = require('../database/Product');
const User = require('../database/User');
const Order = require('../database/Order');
const { logIn, signUp } = require('../database/Auth');
const { checkAdminRole} = require('../MiddleWares/MiddleWares');


router.get('/products',checkAdminRole,Product.getAllproducts);
router.post('/products/add',checkAdminRole,Product.addProduct)
router.get('/products/:productId',checkAdminRole, Product.getOneProduct);
router.get('/products/category/:category',checkAdminRole,Product.getByCategory)
router.put('/products/:productId',checkAdminRole, Product.modifyProduct);
router.delete('/products/:productId',checkAdminRole,Product.removeProduct)

//JWT token

router.get('/orders', Order.getAllorders);
router.get('/orders/:orderId',checkAdminRole, Order.getOrder);
router.put('/orders/:orderId',checkAdminRole, Order.markOrder);
router.post('/orders/add',checkAdminRole, Order.addOrder);

  router.get('/users',checkAdminRole,User.getAllUsers);
  router.delete('/users/:userId',checkAdminRole,User.deleteUser)
  router.get('/users/:role',checkAdminRole, User.getUsersByRole);
  /////
  router.put('/users/switch/:userId',checkAdminRole, User.switchUserRole); 

/// just try 
router.post('/signup',signUp)
router.post('/login',logIn)
module.exports=router