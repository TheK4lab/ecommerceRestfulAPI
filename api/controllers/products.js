const Product = require("../models/product");

exports.getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    if (products.length === 0) {
      console.log("NO PRODUCTS WERE FOUNDED!");
      res.status(404).json({ message: "No products were founded!" });
    } else {
      console.log(products);
      res.status(200).json({
        message: "Products founded!",
        products,
      });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
};

exports.postProduct = async (req, res, next) => {
  try {
    console.log(req.file);
    const product = new Product({
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path,
    });
    const result = await product.save();
    console.log("PRODUCT ADDED", result);
    res.status(201).json({
      message: "Product added!",
      createdProduct: product,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.getSingleProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findById(id);
    if (product) {
      console.log("PRODUCT FOUNDED", product);
      res.status(200).json({
        message: "Product founded!",
        foundedProduct: product,
      });
    } else {
      res.status(404).json({ message: "Product not founded" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const _id = req.params.productId;
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "price"];
    const isValidOperation = updates.every((update) => {
      return allowedUpdates.includes(update);
    });
    if (!isValidOperation) {
      console.log("INVALID UPDATE!");
      return res.status(400).json({ error: "THE UPDATE IS INVALID!" });
    }
    const product = await Product.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).json({ error: "UNABLE TO FIND THE PRODUCT!" });
    }
    console.log("PRODUCT UPDATED!", product);
    res
      .status(200)
      .json({ message: "Product updated!", updatedProduct: product });
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.productId;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      console.log("PRODUCT DELETED", product);
      res.status(200).json({
        message: "Product deleted!",
        deletedProduct: product,
      });
    } else {
      res.status(404).json({ message: "Product not founded" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};
