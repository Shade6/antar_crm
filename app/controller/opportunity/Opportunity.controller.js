const db = require("../../models");
const Opportunity = db.opportunity;
const Organization = db.organization;
const Contact = db.contacts;
const Industry = db.industry;
const Territory = db.territory;
const User = db.users;
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
    } = req.body;

    let organization_data = {
      organization_name: organization,
      no_of_employees: employees?.value,
      annual_revenue: revenue,
      website: website,
      territory_id: territory_id?.value,
      industry_id: industry_id?.value,
    };
    let contact_data = {
      first_name: first_name,
      last_name: last_name,
      email_id: email,
      phone: mobile,
      gender: gender?.value,
      salutation: salutation?.value,
    };

    let organization_created_id = null;
    let contact_created_id = null;
    console.log(req.body);

    //-------------------------FIND ORGANIZATION----------------------------------
    if (req.body.organization_id) {
      const find_organization = await Organization.findOne({
        where: { organization_id: req.body.organization_id.value },
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
        where: { contact_id: req.body.contact_id.value },
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
      opportunity_name:req.body.opportunity_name,
      opportunity_value:req.body.opportunity_value,
      created_by: req.user.id, // Assuming req.user.id contains the ID of the user creating the deal
      created_on: new Date(), // Adding the current date as the creation date
    };
    const newDeal = await Opportunity.create(complete_details);
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
    const deals = await Opportunity.findAll({
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
    const [updated] = await Opportunity.update(updatedData, {
      where: { opportunity_id: dealId },
    });
    if (updated) {
      const updatedDeal = await Opportunity.findOne({
        where: { opportunity_id: dealId },
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

    if (!dealId) {
      return res.json({ message: "Deal id is required", statusCode: 400 });
    }
    const deleted = await Opportunity.destroy({
      where: { opportunity_id: dealId },
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
    if (!opportunityId) {
      return res.json({
        message: "Opportunity id is required",
        statusCode: 400,
      });
    }
    const opportunity = await Opportunity.findOne({
      where: { opportunity_id: opportunityId },
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
