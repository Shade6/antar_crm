// const { v4: uuidv4 } = require("uuid");
// module.exports = (sequelize, Sequelize) => {
//   const RolePermission = sequelize.define("role_permission", {
//     role_permission_id: {
//         type: Sequelize.UUID,
//         primaryKey: true,
//         allowNull: false,
//         defaultValue: Sequelize.UUIDV4,
//     },
//     permission: {
//       type: Sequelize.STRING,
//     },

//     is_active: {
//       type: Sequelize.BOOLEAN,
//     },
//     read: {
//       type: Sequelize.BOOLEAN,
//     },
//     write: {
//       type: Sequelize.BOOLEAN,
//     },
//     create: {
//       type: Sequelize.BOOLEAN,
//     },
//     delete: {
//       type: Sequelize.BOOLEAN,
//     },
//     submit: {
//       type: Sequelize.BOOLEAN,
//     },
//     CreatedBy: {
//       type: Sequelize.INTEGER,
//     },
//     ChangedBy: {
//       type: Sequelize.INTEGER,
//     },
//     created_at: {
//       type: Sequelize.DATE,
//     },
//   });
//   RolePermission.beforeCreate((data, options) => {
//     data.role_id = uuidv4();
//   });
//   return RolePermission;
// };
