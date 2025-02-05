const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define("product", {
        product_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        tenant_id:{
            type:Sequelize.UUID,
          },
        product_image:{
            type: Sequelize.STRING,
        },
        product_name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        product_type: {
            type: Sequelize.ENUM('product', 'service'),
            allowNull: false,
        },
        description: {
            type: Sequelize.TEXT,
            allowNull: true,
        },
        unit_price: {
            type: Sequelize.INTEGER,
            allowNull: false,
            defaultValue: 0.00,
        },
        unit_of_measure: {
            type: Sequelize.STRING,
            allowNull: true,
        },
        currency: {
            type: Sequelize.STRING,
            allowNull: false,
        
        },
        tax_rate: {
            type: Sequelize.INTEGER,
            allowNull: true,
        },
        discountable: {
            type: Sequelize.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
        status: {
            type: Sequelize.ENUM('active', 'inactive'),
            allowNull: false,
            defaultValue: 'active',
        },
        created_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
        },
        updated_at: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            onUpdate: Sequelize.NOW
        },
        organization_id: {
            type: Sequelize.UUID,
        }
    });

    Product.beforeCreate((data, options) => {
        data.product_id = uuidv4();
    });

    return Product;
};
