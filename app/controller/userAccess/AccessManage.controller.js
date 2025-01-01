const { Op } = require('sequelize'); // Import Op from Sequel
const db = require('../../models')
const Module = db.module

const Users = db.users
const Role = db.role
const ModulePermission = db.module_permission
exports.get_user_page_access = async(req,res)=>{
    try {
        const module_name = req.query.module
        const user_id = req.query.user_id
        console.log(module_name,'ooooooooo')

        const find_module = await Module.findOne({where:{module_id:module_name}})
        if(!find_module){
            return res.json({message:'no access to this page cant find module',statusCode:400})
        }
    
        const find_user = await Users.findOne({where:{user_id:user_id}})
        if(!find_user){
            return res.json({message:'user not found ',statusCode:400})
        }
       
        const page_access_data = await ModulePermission.findOne({where:{role_id:find_user.role_id,module_id:find_module.module_id}})
        if(!page_access_data){
            return res.json({message:'no access to this page cant find doc perm',statusCode:400})
        }
        return res.json({message:"access granted",statusCode:200,data:page_access_data})

    } catch (error) {
        res.json({ message: error.message, statusCode: 500 });
    }
}

exports.get_user_menu = async (req, res) => {
    try {
        const role_id = req.query.role_id;

        if (!role_id) {
            return res.json({ message: 'role_id is required', statusCode: 400 });
        }

        const find_role = await Role.findOne({ where: { role_id: role_id } });

        if (!find_role) {
            return res.json({ message: 'Cannot find role', statusCode: 400 });
        }

        if (find_role.role_name === 'system admin') {
            const find_all_modules = await Module.findAll({ where: { docs_type:{
                [Op.or]: ['crm', 'user'] // Matches 'crm' OR 'user'
              }} });
            const modulesWithAccess = find_all_modules.map(module => ({
                module:{...module.toJSON()},
                module_permission: {
                    read: true,
                    create: true,
                    amend: true,
                    delete: true
                }
            }));

            return res.json({
                message: 'Navbar fetched successfully',
                statusCode: 200,
                data: modulesWithAccess
            });
        }

        const find_all_permission = await ModulePermission.findAll({where:{role_id:role_id}})

    } catch (error) {
        // Handle server errors
        return res.json({ message: error.message, statusCode: 500 });
    }
};
