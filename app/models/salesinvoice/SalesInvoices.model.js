const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const SalesInvoices = sequelize.define("SalesInvoices", {
      sales_invoice_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
      },
      sales_order: {
        type: Sequelize.STRING,
      },
      invoice_date:{
        type:Sequelize.DATE
      },
      total_amount:{
        type:Sequelize.INTEGER
      },
      status: {
        type: Sequelize.ENUM,
        values: ['Draft', 'Paid', 'Unpaid'],
      },
      created_by: {
        type: Sequelize.INTEGER,
      },
      changed_by: {
        type: Sequelize.INTEGER,
      },
      created_at:{
        type:Sequelize.DATE
      }
    });
    SalesInvoices.beforeCreate((data, options) => {
      data.sales_invoice_id = uuidv4();
    });
    return SalesInvoices;
  };