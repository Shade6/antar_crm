const db = require("../../models")
const Attachment =  db.lead_attachment
const Users = db.users;
const Leads = db.leads;

exports.create = async(req,res)=>{
    try {
        const {lead_id,title} = req.body;
        const user = req.user
        if(!user){
            return res.json({message:'user not found',statusCode:400})
        }
        if(!lead_id){
            return res.json({message:'lead not found',statusCode:400})
        }
        if(!title){
            return res.json({message:'file not found',statusCode:400})
        }


        const create_ = await Attachment.create({
            lead_id:lead_id,
            title:title,
            user_id:user,
            created_at:new Date()
        })


        if(!create_){
            return res.json({message:create_,statusCode:400})
        }


        res.json({message:'attachment created' ,statusCode:200,data:create_})
    } catch (error) {
        
    }
}

exports.update = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
exports.get_one = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
exports.get_all = async(req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
exports.get_by_lead_id = async (req, res) => {
    try {
      const lead_id = req.query.lead_id;
      const find_by_id = await Attachment.findAll({
        where: { lead_id: lead_id },
        include: [
          {
            model: Leads,
            as: "lead",
          },
          {
            model: Users,
            as: "user",
          },
        ],
      });
      return res.json({
        message: "lead attachment found",
        statusCode: 200,
        data: find_by_id ?? [],
      });
    } catch (error) {
      res.json({ message: error.message, statusCode: 500 });
    }
  };