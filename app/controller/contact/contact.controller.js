const db = require("../../models");
const Contact = db.contacts;
const Opportunity = db.opportunity;
const ContactMapping = db.contact_mapping;
const Address = db.address;
const AddressContact = db.address_contact;
const Industry = db.industry
const { Op } = require("sequelize");
exports.createContact = async (req, res) => {
  try {
    const {
      salutation,
      first_name,
      last_name,
      email,
      mobile,
      code,
      gender,
      designation,
      company_name,
      address,
      industry,
      source
    } = req.body;
    const tenant_id = req.tenant;

    if (!first_name || !first_name.trim()) {
      return res.status(200).json({
        message: "Please add a valid name. The name cannot be empty ",
        statusCode: 400,
      });
    }
    if(mobile){
       if(mobile.length != 10){
           return res.json({message:'please provide 10 digit number',statusCode :400})
       }
    }
  
    console.log(req.body);
    // Create a new contact entry
    const details = {
      salutation: salutation?.value ?? null,
      tenant_id: tenant_id,
      first_name: first_name ?? null,
      last_name: last_name ?? '', // or null, depending on your requirement
      email_id: email ?? null,
      mobile_no: mobile ? parseInt(mobile) : null,
      gender: gender?.value ?? null,
      designation: designation ?? null,
      company_name: company_name ?? null,
      address_contact_id: address?.value ?? null,
      industry_id: industry?.value ?? null,
      mobile_code: code ?? null,
      source: source?.value ?? null,
    };
    
    console.log(details);
    const newContact = await Contact.create(details);
    if (address && address.value) {
      await AddressContact.update(
        { status: true },
        { where: { address_contact_id: address.value } }
      );
    }
    return res.status(200).json({
      message: "Contact created successfully",
      contact: newContact,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    // Check if it's a Sequelize validation error
    if (error.name === "SequelizeValidationError") {
      // Map through the errors and return field and error message for each.
      const errors = error.errors.map(err => ({
        field: err.path, // field that caused the error
        message: err.message
      }));
      return res.status(200).json({
        message: "Validation error",
        errors,
        statusCode: 400,
      });
    }
    
    // For other errors, return a generic error response
    return res.status(200).json({
      message: error.message,
      statusCode: 400,
    });
  }
};
exports.update_contact = async (req, res) => {
  try {
    const {
      contact_id,
      salutation,
      first_name,
      last_name,
      email,
      mobile,
      gender,
      designation,
      company_name,
      address,
      industry,
      source,
      code
    } = req.body;
    const tenant_id = req.tenant;

    const contact = await Contact.findOne({
      where: { contact_id: contact_id, tenant_id: tenant_id },
    });
    if (!contact) {
      return res.json({ message: "Contact not found", statusCode: 400 });
    }

    if (!first_name || !first_name.trim()) {
      return res.status(200).json({
        message: "Please add a valid name. The name cannot be empty ",
        statusCode: 400,
      });
    }
   
    if(mobile){
      if(mobile.length != 10){
          return res.json({message:'please provide 10 digit number',statusCode :400})
      }
   }
 
    const details = {
      salutation: salutation?.value ?? salutation ?? null,
      tenant_id: tenant_id,
      first_name: first_name ?? null,
      last_name: last_name ?? '', // or null, depending on your requirement
      email_id: email ?? null,
      mobile_no: mobile ? parseInt(mobile) : null,
      gender: gender?.value ?? gender ?? null,
      designation: designation ?? null,
      company_name: company_name ?? null,
      address_contact_id: address?.value ?? null,
      industry_id: industry?.value ?? industry ?? null,
      mobile_code: code ?? null,
      source:source?.value ?? source ?? null,
      created_by:req.user
    };
    console.log(details,'-----')
    if (address && address.value) {
      if(contact.address_contact_id){
        await AddressContact.update(
          { status: false },
          { where: { address_contact_id: contact.address_contact_id } }
        );
        await AddressContact.update(
          { status: true },
          { where: { address_contact_id: address.value } }
        );
        
      }else{
        await AddressContact.update(
          { status: true },
          { where: { address_contact_id: address.value } }
        );
      }
   
    }

    await Contact.update(
      details,
      { where: { contact_id: contact_id, tenant_id: tenant_id } }
    );
     
    return res.json({
      data: contact,
      statusCode: 200,
      message: "Contact updated successfully",
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const tenant_id = req.tenant;
    const contacts = await Contact.findAll({
      where: {
        tenant_id: tenant_id,
        converted:false
      },
      include:{
        model:Industry,
        as:'industry'
      }
    });
    return res.status(200).json({
      data: contacts,
      statusCode: 200,
    });
  } catch (error) {
    console.error(error);
    return res.status(200).json({
      message: error.message,
      statusCode: 400,
    });
  }
};

exports.deleteContact = async (req, res) => {
  const contactId = req.query.id;
  const tenant_id = req.tenant;
  console.log(contactId);
  if (!contactId) {
    return res.json({ message: "Contact id is required", statusCode: 400 });
  }
  const find_contact = await Contact.findOne({
    where: { contact_id: contactId, tenant_id: tenant_id },
  });
  if (!find_contact) {
    return res.json({ message: "Contact not found", statusCode: 400 });
  }
  await Address.update(
    { status: false },
    { where: { address_id: find_contact.address_id } }
  );
  const find_opportunity = await Opportunity.findOne({
    where: { contact_id: find_contact.contact_id, tenant_id: tenant_id },
  });
  if (find_organization) {
    find_opportunity.contact_id = null;
    find_opportunity.save();
  }
  const deleted = await Contact.destroy({
    where: { contact_id: contactId, tenant_id: tenant_id },
  });
  if (deleted) {
    return res.json({
      message: "Contact deleted successfully",
      statusCode: 200,
    });
  }
  return res.json({ message: "Contact not found", statusCode: 400 });
};

exports.contact_details_by_id = async (req, res) => {
  try {
    const contactId = req.query.id;
    const tenant_id = req.tenant;
    if (!contactId) {
      return res.status(200).json({
        message: "Contact ID is required",
        statusCode: 400,
      });
    }

    // Fetch contact by ID
    const contact = await Contact.findOne({
      where: { contact_id: contactId, tenant_id: tenant_id },
    });

    if (!contact) {
      return res.status(200).json({
        message: "Contact not found",
        statusCode: 404,
      });
    }

    // Fetch opportunities directly linked to the contact
    const opportunities = await Opportunity.findAll({
      where: { contact_id: contactId, tenant_id: tenant_id },
    });

    // Fetch additional opportunities via contact mappings
    const extraContacts = await ContactMapping.findAll({
      where: { contact_id: contactId },
      include: {
        model: Opportunity,
        as: "opportunity",
      },
    });

    // Extract and merge opportunities from mappings
    const mappedOpportunities = extraContacts
      .map((mapping) => mapping.opportunity)
      .filter((opportunity) => opportunity); // Exclude null values, if any

    const allOpportunities = [...opportunities, ...mappedOpportunities];

    // Response
    return res.json({
      data: {
        contact,
        opportunities: allOpportunities,
      },
      message: "Contact and opportunities fetched successfully",
      statusCode: 200,
    });
  } catch (error) {
    console.error("Error fetching contact details:", error.message);
    return res.status(200).json({
      message: "An error occurred while fetching contact details",
      error: error.message,
      statusCode: 500,
    });
  }
};

exports.get_contact_by_id = async (req, res) => {
  try {
    const contactId = req.query.id;
    const tenant_id = req.tenant;
    const contact = await Contact.findOne({
      where: { contact_id: contactId, tenant_id: tenant_id },
      include: [{ model: AddressContact, as: "address_contact" },{model:Industry,as:'industry'}],
    });
    if (!contact) {
      return res.json({ message: "Contact not found", statusCode: 400 });
    }
    return res.json({ data: contact, statusCode: 200 });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};



exports.contact_filter = async (req, res) => {
  try {
    const search = req.query.search || "";
    const field = req.query.field;
    const type = req.query.type;
    const tenant_id = req.tenant

    const validOperators = ["like", "iLike", "eq", "ne"];
    if (!validOperators.includes(type)) {
      return res.json({
        message: `Invalid search type: '${type}'. Allowed types are: ${validOperators.join(
          ", "
        )}`,
        statusCode: 400,
      });
    }

    if (!Contact.rawAttributes[field]) {
      return res.json({
        message: `Invalid field: '${field}'.`,
        statusCode: 400,
      });
    }

    const find_all_lead = await Contact.findAll({
      where: {
        [field]: {
          [Op[type]]:
            type === "like" || type === "iLike" ? `%${search}%` : search,
        },
        tenant_id:tenant_id,
        converted:false
      },
    });

    return res.status(200).json({
      message: "contact found",
      statusCode: 200,
      data: find_all_lead,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};
