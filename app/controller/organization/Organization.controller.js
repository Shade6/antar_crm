const db = require("../../models");

const Organization = db.organization;
const Opportunity = db.opportunity;
const Contact = db.contacts;
exports.createOrganization = async (req, res) => {
    try {
   
        const { organization_name, website, annual_revenue, no_of_employee, industry, territory, address } = req.body;
        
        if(!address?.value){
            return res.status(200).json({ message: "Address is required", statusCode: 400 });
        }
        const organizationData = {
            organization_name:organization_name,
            website:website,
            annual_revenue:parseInt(annual_revenue) || null,
            no_of_employees: no_of_employee?.value || null, // Assuming you want the value from the object
            industry_id: industry?.value || null, // Assuming you want the value from the object
            territory_id: territory?.value || null, // Assuming you want the value from the object
            address_id:address?.value || null, // Assuming address is already in the correct forma
            website:website,
            created_by:req.user,
            created_on:new Date()
        };
        console.log(organizationData);
        const newOrganization = await Organization.create(organizationData);
        return res.status(200).json({ message: "Organization created successfully", data: newOrganization, statusCode: 200 });
    } catch (error) {
        return res.status(200).json({ message: error.message, statusCode: 500 });
    }
};

exports.updateOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const organizationData = req.body;
        const [updated] = await Organization.update(organizationData, { where: { org_id: id } });
        if (updated) {
            const updatedOrganization = await Organization.findOne({ where: { org_id: id } });
            return res.status(200).json({ message: "Organization updated successfully", data: updatedOrganization });
        }
        return res.status(404).json({ message: "Organization not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getOrganization = async (req, res) => {
    try {
        const { id } = req.params;
        const organization = await Organization.findOne({ where: { org_id: id } });
        if (organization) {
            return res.status(200).json({ data: organization });
        }
        return res.status(404).json({ message: "Organization not found" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getAllOrganizations = async (req, res) => {
    try {
        const organizations = await Organization.findAll();
        return res.status(200).json({ data: organizations ,statusCode:200 ,message:'Organizations fetched successfully' });
    } catch (error) {
        return res.status(200).json({ message: error.message ,statusCode:400 });
    }
};

exports.deleteOrganization = async (req, res) => {
    const organizationId = req.query.id
    console.log(organizationId)
    if(!organizationId){
        return res.json({ message: "Organization id is required", statusCode: 400 });
    }
    const deleted = await Organization.destroy({ where: { organization_id: organizationId } });
    if (deleted) {
        return res.json({ message: "Organization deleted successfully", statusCode: 200 });
    }
    return res.json({ message: "Organization not found", statusCode: 400 });
}

exports.getOrganizationById = async (req, res) => {
    try {
        const organizationId = req.query.id;
        console.log(organizationId);
        const organization = await Organization.findOne({ where: { organization_id: organizationId } });
        
        if (organization) {
            const opportunities = await Opportunity.findAll({
                where: { organization_id: organizationId },
                include: [{ model: Contact, as: "contact" }]
            });
            return res.json({ data: { organization :organization ??'not found', opportunities:opportunities } ,message:'organization fetched ',statusCode:200});
        }
        return res.json({ message: "Organization not found" ,statusCode:400});
    } catch (error) {
        return res.json({ message: error.message, statusCode: 400 });
    }
}


