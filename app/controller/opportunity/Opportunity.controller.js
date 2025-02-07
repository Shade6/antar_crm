const { where } = require("sequelize");
const { Op } = require("sequelize");
const db = require("../../models");
const Opportunity = db.opportunity;
const Organization = db.organization;
const Contact = db.contacts;
const Industry = db.industry;
const Territory = db.territory;
const AddressContact = db.address_contact;
const AddressOrg = db.address_org;
const User = db.users;
const Product = db.product;
const ContactMapping = db.contact_mapping;
const ProductMapping = db.product_mapping
exports.createDeal = async (req, res) => {
  try {
    const {
      organization,
      salutation,
      first_name,
      last_name,
      email,
      mobile,
      gender,
      website,
      employees,
      territory_id,
      revenue,
      industry_id,
      status,
      owner_id,
      product,
    } = req.body;
    const tenant_id = req.tenant

    let organization_data = {
      organization_name: organization,
      no_of_employees: employees?.value,
      annual_revenue: revenue,
      website: website,
      territory_id: territory_id?.value,
      industry_id: industry_id?.value,
      tenant_id:tenant_id
    };
    let contact_data = {
      first_name: first_name,
      last_name: last_name,
      email_id: email,
      phone: mobile,
      gender: gender?.value,
      salutation: salutation?.value,
      tenant_id:tenant_id
    };

    let organization_created_id = null;
    let contact_created_id = null;
    console.log(req.body);

    //-------------------------FIND ORGANIZATION----------------------------------
    if (req.body.organization_id) {
      const find_organization = await Organization.findOne({
        where: { organization_id: req.body.organization_id.value ,tenant_id:tenant_id},
      });
      if (!find_organization) {
        return res.json({ message: "Organization not found", statusCode: 400 });
      }
      organization_created_id = find_organization?.organization_id;
    } else {
      const new_organization = await Organization.create(organization_data);
      if (!new_organization) {
        return res.json({
          message: "Organization not created",
          statusCode: 400,
        });
      }
      organization_created_id = new_organization?.organization_id;
    }
    //-------------------------FIND CONTACT----------------------------------
    if (req.body.contact_id) {
      console.log("find contact");
      const find_contact = await Contact.findOne({
        where: { contact_id: req.body.contact_id.value,tenant_id:tenant_id },
      });
      if (!find_contact) {
        return res.json({ message: "Contact not found", statusCode: 400 });
      }
      contact_created_id = find_contact.contact_id;
    } else {
      const new_contact = await Contact.create(contact_data);
      if (!new_contact) {
        return res.json({ message: "Contact not created", statusCode: 400 });
      }
      contact_created_id = new_contact?.contact_id;
    }

    console.log(organization_data, "organization_data");
    console.log(contact_data, "contact_data");

    if (
      !organization_created_id ||
      !contact_created_id ||
      !owner_id?.value ||
      !status?.value
    ) {
      return res.json({
        message: "Incomplete details provided",
        statusCode: 400,
      });
    }
    const complete_details = {
      organization_id: organization_created_id,
      contact_id: contact_created_id,
      opportunity_owner_id: owner_id.value,
      status: status.value,
      opportunity_name: req.body.opportunity_name,
      opportunity_value: req.body.opportunity_value,
      created_by: req.user.id, // Assuming req.user.id contains the ID of the user creating the deal
      created_on: new Date(), // Adding the current date as the creation date
      tenant_id:tenant_id
    };
    const newDeal = await Opportunity.create(complete_details);
    if (product.length >0) {
      for(let product_data of product){
        let details_product ={
          opportunity_id:newDeal.opportunity_id,
          product_id:product_data.value
        }
        await ProductMapping.create(details_product)
      }
   
    }
    return res.json({
      message: "Deal created successfully",
      statusCode: 200,
      data: newDeal,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, statusCode: 400 });
  }
};

// Get all deals by assignee id
exports.getAllOpportunity = async (req, res) => {
  try {
    const tenant_id = req.tenant
    const deals = await Opportunity.findAll({
      where:{
        tenant_id:tenant_id
      },
      include: [
        { model: Organization, as: "organization" },
        { model: Contact, as: "contact" },
      ],
    });
    return res.json({
      message: "Deals fetched successfully",
      statusCode: 200,
      data: deals,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

// Update a deal
exports.updateDeal = async (req, res) => {
  try {
    const dealId = req.params.dealId;
    const updatedData = req.body;
    const tenant_id = req.tenant
    const [updated] = await Opportunity.update(updatedData, {
      where: { opportunity_id: dealId,tenant_id:tenant_id },
    });
    if (updated) {
      const updatedDeal = await Opportunity.findOne({
        where: { opportunity_id: dealId ,tenant_id:tenant_id},
      });
      return res.json({
        message: "Deal updated successfully",
        statusCode: 200,
        data: updatedDeal,
      });
    }
    return res.json({ message: "Deal not found", statusCode: 400 });
  } catch (error) {
    return res.json({ message: "Error updating deal", statusCode: 400 });
  }
};

// Delete a deal
exports.deleteDeal = async (req, res) => {
  try {
    const dealId = req.query.id;
    const tenant_id = req.tenant
    if (!dealId) {
      return res.json({ message: "Deal id is required", statusCode: 400 });
    }
    const deleted = await Opportunity.destroy({
      where: { opportunity_id: dealId ,tenant_id:tenant_id},
    });
    if (deleted) {
      return res.json({
        message: "Deal deleted successfully",
        statusCode: 200,
      });
    }
    return res.json({ message: "Deal not found", statusCode: 400 });
  } catch (error) {
    return res.json({ message: "Error deleting deal", statusCode: 400 });
  }
};

// Get opportunity by id
exports.getOpportunityById = async (req, res) => {
  try {
    const opportunityId = req.query.id;
    const tenant_id = req.tenant
    if (!opportunityId) {
      return res.json({
        message: "Opportunity id is required",
        statusCode: 400,
      });
    }
    const opportunity = await Opportunity.findOne({
      where: { opportunity_id: opportunityId ,tenant_id:tenant_id},
      include: [
        {
          model: Organization,
          as: "organization",
          include: [
            { model: Industry, as: "industry" },
            { model: Territory, as: "territory" },
          ],
        },
        { model: Contact, as: "contact" },
        { model: User, as: "deal_owner" },
      ],
    });
    if (!opportunity) {
      return res.json({ message: "Opportunity not found", statusCode: 400 });
    }
    return res.json({
      message: "Opportunity fetched successfully",
      statusCode: 200,
      data: opportunity,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.createAddressContact = async (req, res) => {
  try {
    const {
      address_title,
      address_type,
      address_line_one, // updated to match the incoming data structure
      address_line_two, // updated to match the incoming data structure
      city_town, // updated to match the incoming data structure
      state_province, // updated to match the incoming data structure
      country,
      postal_code, // updated to match the incoming data structure
      user_id,
    } = req.body;

    console.log(req.body);
    const newAddressContact = await AddressContact.create({
      address_title: address_title,
      address_type: address_type.value,
      address_line_1: address_line_one, // updated to match the incoming data structure
      address_line_2: address_line_two, // updated to match the incoming data structure
      city: city_town, // updated to match the incoming data structure
      state: state_province, // updated to match the incoming data structure
      country: country,
      zip_code: postal_code, // updated to match the incoming data structure
      user_id: req.user,
      created_on: new Date(),
      created_by: req.user,
    });

    return res.json({
      message: "Address contact created successfully",
      statusCode: 200,
      data: newAddressContact,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.createAddressOrg = async (req, res) => {
  console.log(req.body);
  try {
    const {
      address_title,
      address_type,
      address_line_one, // updated to match the incoming data structure
      address_line_two, // updated to match the incoming data structure
      city_town, // updated to match the incoming data structure
      state_province, // updated to match the incoming data structure
      country,
      postal_code, // updated to match the incoming data structure
    } = req.body;

    const newAddressOrg = await AddressOrg.create({
      address_title: address_title,
      address_type: address_type.value,
      address_line_1: address_line_one, // updated to match the incoming data structure
      address_line_2: address_line_two, // updated to match the incoming data structure
      city: city_town, // updated to match the incoming data structure
      state: state_province, // updated to match the incoming data structure
      country: country,
      zip_code: postal_code, // updated to match the incoming data structure
      user_id: req.user,
      created_on: new Date(),
      created_by: req.user,
    });

    return res.json({
      message: "Address organization created successfully",
      statusCode: 200,
      data: newAddressOrg,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.getAllAddressOrg = async (req, res) => {
  try {
    const addressOrgs = await AddressOrg.findAll({
      where: { organization_id: null },
    });
    return res.json({
      message: "Address organizations retrieved successfully",
      statusCode: 200,
      data: addressOrgs,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.getAllAddressContact = async (req, res) => {
  console.log(req.body);
  try {
    const addressContacts = await AddressContact.findAll({
      where: { status: false, user_id: req.user },
    });
    return res.json({
      message: "Address contacts retrieved successfully",
      statusCode: 200,
      data: addressContacts,
    });
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.create_extra_contact = async (req, res) => {
  try {
    const { contact_id, opportunity_id } = req.body;
    const tenant_id = req.tenant
    const find_contact = await Contact.findOne({
      where: { contact_id: contact_id ,tenant_id:tenant_id},
    });
    if (!contact_id) {
      return res.json({ message: "contact not found", statusCode: 400 });
    }
    const find_opportunity = await Opportunity.findOne({
      where: { opportunity_id: opportunity_id ,tenant_id:tenant_id},
    });
    if (!find_opportunity) {
      return res.json({ message: "opportunity not found", statusCode: 400 });
    }

    const find_both_exist = await ContactMapping.findOne({
      where: { contact_id: contact_id, opportunity_id: opportunity_id },
    });
    if (find_both_exist) {
      return res.json({
        message: "already contact added for this opportunity",
        statusCode: 400,
      });
    }

    const create_ = await ContactMapping.create({
      contact_id: contact_id,
      opportunity_id: opportunity_id,
    });
    if (create_) {
      return res.json({
        message: "contact added to the opportunity",
        statusCode: 200,
      });
    } else {
      return res.json({ message: create_, statusCode: 400 });
    }
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.find_extra_contacts = async (req, res) => {
  try {
    const opportunities = req.query.id;
    const tenant_id = req.tenant
    const find_opportunity = await Opportunity.findOne({
      where: { opportunity_id: opportunities ,tenant_id:tenant_id},
    });
    if (!find_opportunity) {
      return res.json({ message: " opportunity not found", statusCode: 200 });
    }

    const find_mapp_ = await ContactMapping.findAll({
      where: { opportunity_id: opportunities },
      include: {
        model:Contact,
        as:'contact'
      }
    });
    return res.json({message:'founded',statusCode:200,data:find_mapp_ || []})
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, statusCode: 400 });
  }
};


exports.handle_remove_extra_contact =async(req,res)=>{
  try {
    const contact_mapping_id =req.query.id
    const find_ = await ContactMapping.findOne({where:{contact_mapping_id:contact_mapping_id}})
    if(!find_){
      return res.json({message:'cannot get contact was connected to this opportunity',statusCode:400})
    }
    const destroy = await ContactMapping.destroy({where:{contact_mapping_id:contact_mapping_id}})
    return res.json({message:'contact removed from this opportunity',statusCode:200})
  } catch (error) {
    console.log(error);
    return res.json({ message: error.message, statusCode: 400 });
  }
}


exports.opportunity_filter = async (req, res) => {
  try {
    const search = req.query.search || "";
    const field = req.query.field;
    const type = req.query.type;
const  tenant_id = req.tenant
    const validOperators = ["like", "iLike", "eq", "ne"];
    if (!validOperators.includes(type)) {
      return res.json({
        message: `Invalid search type: '${type}'. Allowed types are: ${validOperators.join(
          ", "
        )}`,
        statusCode: 400,
      });
    }

    if (!Opportunity.rawAttributes[field]) {
      return res.json({
        message: `Invalid field: '${field}'.`,
        statusCode: 400,
      });
    }

    const find_all_lead = await Opportunity.findAll({
      where: {
        [field]: {
          [Op[type]]:
            type === "like" || type === "iLike" ? `%${search}%` : search,
        },
        tenant_id:tenant_id
      },
      include: [
        { model: Organization, as: "organization" },
        { model: Contact, as: "contact" },
      ],
    });

    return res.status(200).json({
      message: "Opportunity found",
      statusCode: 200,
      data: find_all_lead,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};


exports.find_status_of_opportunity = async(req,res)=>{
  try {
    const id = req.query.id;
    const find_lead  = await Opportunity.findOne({where:{Opportunity_id:id}})
    if(!find_lead){
      return res.json({ message:'Opportunity not found', statusCode: 404})
    }

    return res.json({message:'Opportunity status found', statusCode:200,data:find_lead.status})
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
}

exports.update_opportunity_status = async(req,res)=>{
  try {
    const id = req.query.id;
    const status = req.query.status;

    console.log(id, status,'dfdfdfdf----------------')
    
    const find_leads = await Opportunity.findOne({where:{opportunity_id:id}})
    console.log(find_leads,'----------------------------------------',id)
    if(!find_leads){
      return res.json({ message:'opportunity not found', statusCode: 404})
    }

    if(!status){
      return res.json({ message:"no status entered",statusCode:400})
    }


    find_leads.status = status;
    find_leads.save()

    return res.json({ message:'status was updated', statusCode:200})
  } catch (error) {
    return res.json({ message: error.message, statusCode: 500 });
  }
}