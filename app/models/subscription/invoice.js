const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Invoice = sequelize.define("invoice", {
        invoice_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
          },
          payment_id: {
            type: Sequelize.UUID,
          },
          tenant_id: {
            type: Sequelize.UUID,
          },
          invoice_date: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
          },
          due_date: {
            type: Sequelize.DATE,
          },
          total_amount: {
            type: Sequelize.DECIMAL(10, 2),
          },
          pdf_url: {
            type: Sequelize.STRING(255),
          },
          status: {
            type: Sequelize.ENUM('paid', 'unpaid', 'overdue'),
            defaultValue: 'unpaid',
          },
    });
    Invoice.beforeCreate((data, options) => {
      data.invoice_id = uuidv4();
    });
    
    return Invoice;
  };