const db = require('../models')
const Tenant = db.tenant
const Subscription = db.subscription

exports.check_subscription=async(req,res,next)=>{
    try {
      const tenant = req.tenant;
      const find_tenant = await Tenant.findOne({where:{tenant_id:tenant}})
      if(!find_tenant){
        return res.json({message:'not registered user ',statusCode:400})
      }
       
      const find_subscription = await Subscription.findOne({where:{tenant_id:find_tenant.tenant_id}})
     if(!find_subscription){
         return res.json({message:'no subscription found',statusCode:400})
     }
    
     const givenDate = new Date(find_subscription.end_date); // Given date
     const now = new Date(); // Current date and time
     if (now <= givenDate){
        next()
     }else{
        return res.json({message:'subscription seems  ended',statusCode:400})
     }


    } catch (error) {
        return res.status(200).send({message:error.message})
    }
}