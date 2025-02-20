const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const Contact = sequelize.define("contact", {
     contact_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      first_name: {
        type: Sequelize.STRING,
      },
      tenant_id:{
        type:Sequelize.UUID,
      },
      middle_name: {
        type: Sequelize.STRING,
      },
      last_name: {
        type: Sequelize.STRING,
      },
      full_name: {
        type: Sequelize.STRING,
      },
      email_id: {
        type: Sequelize.UUID,
      },
      user_id: {
        type: Sequelize.UUID,
      },
      address_contact_id: {
        type: Sequelize.UUID,
      },
      status: {
        type: Sequelize.STRING,
      },
      salutation: {
        type: Sequelize.STRING,
      },
      designation: {
        type: Sequelize.STRING,
      },
      gender: {
        type: Sequelize.STRING,
      },
      mobile_no: {
        type: Sequelize.STRING,
        validate: {
          isNumeric: {
            msg: "Please check the mobile number. Only digits are allowed.",
          },
          len: {
            args: [10, 10],
            msg: "Please check the mobile number. It must be exactly 10 digits.",
          },
        },
      },      
      mobile_code:{
        type: Sequelize.STRING,
      },
      company_name: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.STRING,
      },
      department: {
        type: Sequelize.STRING,
      },
      industry_id:{
        type: Sequelize.UUID,
      },
      converted:{
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      source:{
        type:Sequelize.ENUM,
        values:["Trader", "Manufacturer", "Services", "Aggregator"]
      },
      created_by: {
        type: Sequelize.UUID,
      },
      created_on: {
        type: Sequelize.DATE,
        defaultValue:Sequelize.NOW
      },
    });
    Contact.beforeCreate((data, options) => {
      data.contact_id = uuidv4();
    });
    return Contact;
  };