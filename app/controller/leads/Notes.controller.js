const db = require("../../models")
const LeadNote =  db.lead_note
const Users = db.users;
const Leads = db.leads;
exports.create = async (req, res) => {
    try {
      const { lead_id, title, content, status } = req.body;
      console.log(req.body)
      const user = req.user;
      if (!user) {
        return res.json({ message: "user not found", statusCode: 400 });
      }
      if (!lead_id) {
        return res.json({ message: "lead not found", statusCode: 400 });
      }
      if (!title) {
        return res.json({ message: "title  not added", statusCode: 400 });
      }
    
  
      const creat_ = await LeadNote.create({
        lead_id: lead_id,
        user_id: user,
        title: title ?? "",
        content: content ?? "",
        status: status,
        created_at: new Date(),
      });
  
      if (creat_) {
        return res.json({
          message: "lead notes created successfully",
          statusCode: 200,
          data: creat_,
        });
      } else {
        return res.json({ message: creat_, statusCode: 400 });
      }
    } catch (error) {
      res.json({ message: error.message, statusCode: 500 });
    }
  };
  

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
      const find_by_id = await LeadNote.findAll({
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
        message: "lead notes found",
        statusCode: 200,
        data: find_by_id ?? [],
      });
    } catch (error) {
      res.json({ message: error.message, statusCode: 500 });
    }
  };
  