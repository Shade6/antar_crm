
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize, Sequelize) => {
    const DocsPermission = sequelize.define("docs_permission", {
      doc_permission_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      doc_perm_name: {
        type: Sequelize.STRING,
      },
      doc_status: {
        type: Sequelize.BOOLEAN,
      },
      if_owner: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING,
      },
      perm_level: {
        type: Sequelize.STRING,
      },
      role_id:{
        type:Sequelize.STRING,
      },
      docs_id:{
        type:Sequelize.STRING,
      },
      read: {
        type: Sequelize.BOOLEAN,
      },
      write: {
        type: Sequelize.BOOLEAN,
      },
      create: {
        type: Sequelize.BOOLEAN,
      }, 
      delete: {
        type: Sequelize.BOOLEAN,
      },
      submit: {
        type: Sequelize.BOOLEAN,
      },
      cancel: {
        type: Sequelize.BOOLEAN,
      },
      amend: {
        type: Sequelize.BOOLEAN,
      },
      report: {
        type: Sequelize.BOOLEAN,
      },
      import: {
        type: Sequelize.BOOLEAN,
      },
      export: {
        type: Sequelize.BOOLEAN,
      },
      share: {
        type: Sequelize.BOOLEAN,
      },
      print: {
        type: Sequelize.BOOLEAN,
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
    DocsPermission.beforeCreate((data, options) => {
        data.doc_permission_id = uuidv4();
      });
    return DocsPermission;
  };