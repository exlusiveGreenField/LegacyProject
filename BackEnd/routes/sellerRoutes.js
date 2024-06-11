const express = require('express');
const router = express.Router();
const Product = require('../database/Product');
const User = require("../database/User");
const { logIn, signUp } = require('../database/Auth');
const { checkSellerRole} = require('../MiddleWares/MiddleWares');

router.get('/products', Product.getOneProduct);
router.put('/products/:productId', Product.modifyProduct);
router.delete('/products/category/:category', Product.removeProduct);

router.get('/:userid', User.getOneUser);
router.put('/:userid',  User.updateUser);
router.post('/add', checkSellerRole,Product.addProduct);
router.post('/signup', signUp);
router.post('/login', logIn);
router.get('/getByuser/:userId',Product.getProductByUserId)
module.exports = router;