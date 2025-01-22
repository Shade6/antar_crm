const db = require("../../models");
const Deal = db.deal;
const Organization = db.organization;
const Contact = db.contacts;

// Create a new deal
exports.createDeal = async (req, res) => {
    try {
        const {
            salutation,
            first_name,
            last_name,
            email,
            mobile,
            gender,
            organization,
            website,
            employees,
            territory_id,
            revenue,
            industry_id,
            status,
            owner_id
        } = req.body;

        let details_for_adding = {
            salutation:salutation?.value || null,
            first_name:first_name || null,
            last_name:last_name || null,
            email:email || null,
            mobile:mobile || null,
            gender:gender?.value || null,
            organization:organization || null,
            website:website || null,
            employees:employees?.value || null,
            territory_id:territory_id?.value || null,
            status:status?.value || null,
            deal_owner:owner_id?.value || null,
            industry_id:industry_id?.value || null,
            revenue:revenue || null,
            owner_id:owner_id?.value || null,
        }

    if(req.body?.organization_id){
        const find_organization = await Organization.findOne({where:{org_id:req.body.organization_id.value}})
        if(!find_organization){
            return res.json({ message: "Organization not found", statusCode: 400 });
        }
         details_for_adding.organization = find_organization?.organization_name || null
         details_for_adding.employees = find_organization?.no_of_employees || null
         details_for_adding.territory_id = find_organization?.territory_id || null
         details_for_adding.industry_id = find_organization?.industry_id || null
         details_for_adding.website = find_organization?.website || null
         details_for_adding.revenue = find_organization?.annual_revenue || null
    }   
       
    if(req.body?.contact_id){
      const find_contact = await Contact.findOne({where:{contact_id:req.body.contact_id.value}})
       if(!find_contact){
        return res.json({ message: "Contact not found", statusCode: 400 });
       }
       details_for_adding.first_name = find_contact?.first_name
       details_for_adding.last_name = find_contact?.last_name
       details_for_adding.email = find_contact?.email_id
       details_for_adding.mobile = find_contact?.phone
       details_for_adding.gender = find_contact?.gender
       details_for_adding.salutation = find_contact?.salutation
       details_for_adding.company_name = find_contact?.company_name
    }
      console.log(req.body)
        const data = {
            salutation:details_for_adding.salutation || null,
            first_name:details_for_adding.first_name || null,
            last_name:details_for_adding.last_name || null,
            email:details_for_adding.email || null,
            mobile:details_for_adding.mobile || null,
            gender:details_for_adding.gender || null,
            organization:details_for_adding.organization || null,
            website:details_for_adding.website || null,
            no_of_employees:details_for_adding.employees || null,
            territory_id:details_for_adding.territory_id || null,
            revenue:details_for_adding.revenue || null,
            industry_id:details_for_adding.industry_id || null,
            status:details_for_adding.status || null,
            deal_owner:details_for_adding.owner_id || null
        }
        console.log(data)
        const newDeal = await Deal.create(data);
        return res.json({ message: "Deal created successfully", statusCode: 200, data: newDeal });
    } catch (error) {
        return res.json({ message:error.message, statusCode: 400 });
    }
};

// Get all deals by assignee id
exports.getAllDealsByAssignee = async (req, res) => {
    try {
      
        const deals = await Deal.findAll();
        return res.json({ message: "Deals fetched successfully", statusCode: 200, data: deals });
    } catch (error) {
        return res.json({ message: error.message, statusCode: 400 });
    }
};

// Update a deal
exports.updateDeal = async (req, res) => {
    try {
        const dealId = req.params.dealId;
        const updatedData = req.body;
        const [updated] = await Deal.update(updatedData, { where: { deal_id: dealId } });
        if (updated) {
            const updatedDeal = await Deal.findOne({ where: { deal_id: dealId } });
            return res.json({ message: "Deal updated successfully", statusCode: 200, data: updatedDeal });
        }
        return res.json({ message: "Deal not found", statusCode: 400 });
    } catch (error) {
        return res.json({ message: "Error updating deal", statusCode: 400 });
    }
};

// Delete a deal
exports.deleteDeal = async (req, res) => {
    try {
        const dealId = req.query.id
        console.log(dealId)
        if(!dealId){
            return res.json({ message: "Deal id is required", statusCode: 400 });
        }
        const deleted = await Deal.destroy({ where: { deal_id: dealId } });
        if (deleted) {
            return res.json({ message: "Deal deleted successfully", statusCode: 200 });
        }
        return res.json({ message: "Deal not found", statusCode: 400 });
    } catch (error) {
        return res.json({ message: "Error deleting deal", statusCode: 400 });
    }
}
