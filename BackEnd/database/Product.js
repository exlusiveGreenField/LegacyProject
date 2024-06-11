const { where } = require('sequelize');
const db = require('./config');

module.exports = {
  getTopStockProducts: async (req, res) => {
    try {
      const topProducts = await db.Product.findAll({
        limit: 4,
        order: [['stock', 'DESC']],
      });
      res.json(topProducts);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching top products by stock');
    }
  },
  getAllproducts: async (req, res) => {
    try {
      const products = await db.Product.findAll();
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching products');
    }
  },

  getOneProduct: async (req, res) => {
    const productId = req.params.productId;
    console.log(productId);
    try {
      const product = await db.Product.findByPk(productId);
      if (!product) {
        return res.status(404).send('product not found');
      }
      res.json(product);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching product');
    }
  },

  addProduct: async (req, res) => {
    const newProduct = req.body;
    try {
      const product = await db.Product.create(newProduct);
      res.status(201).send({
        message: 'product created successfully',
        productid: product.id,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send('Error adding product');
    }
  },
  modifyProduct: async (req, res) => {
    const productId = req.params.productId;
    const updatedProduct = req.body;
    try {
      const product = await db.Product.findByPk(productId);
      if (!product) {
        return res.status(404).send('Product not found');
      }
      await product.update(updatedProduct);
      res.status(200).send('Product modified successfully');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error modifying product');
    }
  },
  removeProduct: async (req, res) => {
    const productId = req.params.productId;
    try {
      await db.Product.destroy({ where: { id: productId } });
      res.status(201).send('deleted');
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching product');
    }
  },
  getByCategory: async (req, res) => {
    const category = req.params.category;
    try {
      const response = await db.Product.findAll({
        where: { category: category },
      });
      res.json(response);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching product');
    }
  },
  addRating: async (req, res) => {
    try {
      const productId = req.params.productId;
      const newRate = req.body.rating;

      const product = await db.Product.findByPk(productId);

      if (!product) {
        return res.status(404).send('Product not found');
      }
      const currRating = product.rating 
      const currNumOfRates = product.numOfRating 

      const updatedNumOfRatings = currNumOfRates + 1;
     

      await product.update({
        rating: newRate,
        numOfRating: updatedNumOfRatings,
      });

      res.status(200).json(product);
    } catch (error) {
      console.error(error.message);
      res.status(500).send(error);
    }
  }, getProductByUserId : async (req, res) => {
    const userId = req.params.userId;
    try {
      const products = await db.Product.findAll({
        where: { userId: userId },
      });
      res.json(products);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching products by user ID');
    }
  }
};
