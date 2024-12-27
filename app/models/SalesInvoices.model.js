module.exports = (sequelize, Sequelize) => {
    const SalesInvoices = sequelize.define("SalesInvoices", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
      CreatedBy: {
        type: Sequelize.INTEGER,
      },
      ChangedBy: {
        type: Sequelize.INTEGER,
      },
    });
  
    return SalesInvoices;
  };