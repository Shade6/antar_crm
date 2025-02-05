const db = require("../../models");

const Product = db.product;
const Opportunities = db.opportunity;

exports.createProduct = async (req, res) => {
  console.log(req.body);

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
    const tenant_id = req.tenant
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
    const existingProduct = await Product.findOne({
      where: { product_name: product_name,tenant_id:tenant_id },
    });
    if (existingProduct) {
      return res.json({
        message: "Product name already exists",
        statusCode: 409,
      });
    }

    const newProduct = await Product.create({
      product_name,
      product_type: product_type.value,
      description: product_description,
      product_image: product_image,
      tenant_id:tenant_id,
      unit_price,
      unit_of_measure,
      currency:currency?.value || '',
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
    const tenant_id = req.tenant
    if (!id) {
      return res.json({ message: "Product ID is required", statusCode: 400 });
    }

    const product = await Product.findOne({ where: { id ,tenant_id:tenant_id} });

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
    const tenant_id = req.tenant
    const products = await Product.findAll({
      where:{
        tenant_id:tenant_id
      },
    });
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
    const tenant_id = req.tenant
    console.log(id, "-------------");

    if (!id) {
      return res.json({ message: "Product ID is required", statusCode: 400 });
    }

    const product = await Product.findOne({ where: { product_id: id,tenant_id:tenant_id } });
    console.log(product);
    if (!product) {
      return res.json({ message: "Product not found", statusCode: 404 });
    }

    await Product.destroy({ where: { product_id: id ,tenant_id:tenant_id} });
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
    const {
      product_id,
      product_name,
      product_image,
      product_type,
      product_description,
      unit_price,
      unit_of_measure,
      tax_rate,
      discountable,
      status,
    } = req.body;
    const tenant_id = req.tenant

    const details = {
      product_name: product_name,
      product_image: product_image,
      product_type: product_type,
      description: product_description,
      unit_price: unit_price,
      unit_of_measure: unit_of_measure,
      tax_rate: tax_rate,
      discountable: discountable,
      status: status,
      tenant_id:tenant_id
    }
    for (const [key, value] of Object.entries(details)) {
      if (value === null || value === undefined) {
        return res.status(200).json({
          message: `The value for '${key}' is not defined.`,
          statusCode: 400,
        });
      }
    }



    const update_product = await Product.update(
      details,
      { where: { product_id: product_id ,tenant_id:tenant_id} }
    );
    return res.json({
      message: "Product updated successfully",
      statusCode: 200,
      data: update_product,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};

exports.d_product_image = async (req, res) => {
  const { id } = req.query;

  return res.json({
    message: "image deleted successfully",
    statusCode: 200,
    data: d,
  });
};

exports.SingleProduct = async (req, res) => {
  try {
    const id = req.query.id;
    const tenant_id = req.tenant
    const find_product = await Product.findOne({
      where: { product_id: id ,tenant_id:tenant_id},
      include: {
        model: Opportunities,
        as: "opportunity",
      },
    });
    if (!find_product) {
      return res.json({ message: "Product not found", statusCode: 404 });
    }
    return res.json({
      message: "Product updated successfully",
      statusCode: 200,
      data: find_product,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
};
