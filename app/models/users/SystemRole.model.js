// const { v4: uuidv4 } = require("uuid");
// module.exports = (sequelize, Sequelize) => {
//     const SystemRole = sequelize.define("system_role", {
//       system_role_id: {
//         type: Sequelize.UUID,
//         primaryKey: true,
//         allowNull: false,
//         defaultValue: Sequelize.UUIDV4,
//       },
//       system_role: {
//         type: Sequelize.STRING,
//       },
//       is_active: {
//         type: Sequelize.BOOLEAN,
//       },
//       CreatedBy: {
//         type: Sequelize.INTEGER,
//       },
//       ChangedBy: {
//         type: Sequelize.INTEGER,
//       },
//     });
//     SystemRole.beforeCreate((data, options) => {
//         data.user_id = uuidv4();
//       });
//     return SystemRole;
//   };