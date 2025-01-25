const db = require("../../models");

const Product = db.product;

exports.createProduct = async (req, res) => {
  
  console.log(req.body)

  try {
    const {
      product_image,
      product_name,
      product_type,
      product_description,
      unit_price,
      unit_of_measure,
      currency,
      tax_rate,
      discountable,
      status,
    } = req.body;

    if (
      !product_name ||
      !product_type ||
      !product_description ||
      !unit_price ||
      !unit_of_measure ||
      !currency ||
      !tax_rate ||
      discountable === undefined ||
      status === undefined
    ) {
      return res.json({ message: "All fields are required", statusCode: 400 });
    }

    // Check if a product with the same name already exists
    const existingProduct = await Product.findOne({ where: { product_name:product_name } });
    if (existingProduct) {
      return res.json({ message: "Product name already exists", statusCode: 409 });
    }

    const newProduct = await Product.create({
      product_name,
      product_type:product_type.value,
      description: product_description,
      product_image:product_image,
      unit_price,
      unit_of_measure,
      currency,
      tax_rate,
      discountable,
      status,
    });
    return res.json({
      message: "Product created successfully",
      statusCode: 200,
      data: newProduct,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.json({ message: "Product ID is required", statusCode: 400 });
    }

    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.json({ message: "Product not found", statusCode: 404 });
    }

    return res.json({
      message: "Product fetched successfully",
      statusCode: 200,
      data: product,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    return res.json({
      message: "Products fetched successfully",
      statusCode: 200,
      data: products,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.query;
    console.log(id,'-------------')

    if (!id) {
      return res.json({ message: "Product ID is required", statusCode: 400 });
    }

    const product = await Product.findOne({ where: { product_id:id } });
    console.log(product)
    if (!product) {
      return res.json({ message: "Product not found", statusCode: 404 });
    }

    await Product.destroy({ where: { product_id:id } });
    return res.json({
      message: "Product deleted successfully",
      statusCode: 200,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id, name, description, price } = req.body;

    if (!id || !name || !description || !price) {
      return res.json({ message: "All fields are required", statusCode: 400 });
    }

    const product = await Product.findOne({ where: { id } });

    if (!product) {
      return res.json({ message: "Product not found", statusCode: 404 });
    }

    product.name = name;
    product.description = description;
    product.price = price;

    await product.save();
    return res.json({
      message: "Product updated successfully",
      statusCode: 200,
      data: product,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.d_product_image = async (req, res) => {
  const { id } = req.query;

  return res.json({message:'image deleted successfully',statusCode:200,data:d})
};