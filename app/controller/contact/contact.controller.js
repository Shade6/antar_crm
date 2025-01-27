const db = require("../../models");
const Contact = db.contacts;
const Opportunity = db.opportunity;
const ContactMapping = db.contact_mapping;
const Address = db.address;
const AddressContact = db.address_contact;
exports.createContact = async (req, res) => {
  try {
    const {
      salutation,
      first_name,
      last_name,
      email,
      mobile,
      gender,
      designation,
      company_name,
      address,
    } = req.body;
    console.log(req.body, "opopo");
    // Create a new contact entry
    if (!address?.value) {
      return res.json({ message: "Address is required", statusCode: 400 });
    }
    const details = {
      salutation: salutation.value || null,
      first_name,
      last_name,
      email_id: email, // Assuming email_id corresponds to email
      phone: parseInt(mobile), // Assuming mobile_no corresponds to mobile
      gender: gender.value,
      designation: designation,
      company_name: company_name,
      address_contact_id: address?.value, // Assuming address is an object with a value property
    };
    console.log(details);
    const newContact = await Contact.create(details);
    await AddressContact.update(
      { status: true },
      { where: { address_contact_id: address?.value } }
    );
    return res.status(200).json({
      message: "Contact created successfully",
      contact: newContact,
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

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll();
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
  console.log(contactId);
  if (!contactId) {
    return res.json({ message: "Contact id is required", statusCode: 400 });
  }
  const find_contact = await Contact.findOne({
    where: { contact_id: contactId },
  });
  if (!find_contact) {
    return res.json({ message: "Contact not found", statusCode: 400 });
  }
  await Address.update(
    { status: false },
    { where: { address_id: find_contact.address_id } }
  );
  const find_opportunity = await Opportunity.findOne({
    where: { contact_id: find_contact.contact_id },
  });
  if(find_organization){
    find_opportunity.contact_id= null
    find_opportunity.save()
  }
  const deleted = await Contact.destroy({ where: { contact_id: contactId } });
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

    if (!contactId) {
      return res.status(200).json({
        message: "Contact ID is required",
        statusCode: 400,
      });
    }

    // Fetch contact by ID
    const contact = await Contact.findOne({ where: { contact_id: contactId } });

    if (!contact) {
      return res.status(200).json({
        message: "Contact not found",
        statusCode: 404,
      });
    }

    // Fetch opportunities directly linked to the contact
    const opportunities = await Opportunity.findAll({
      where: { contact_id: contactId },
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
    const contact = await Contact.findOne({
      where: { contact_id: contactId },
      include: [{ model: AddressContact, as: "address_contact" }],
    });
    if (!contact) {
      return res.json({ message: "Contact not found", statusCode: 400 });
    }
    return res.json({ data: contact, statusCode: 200 });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
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
    } = req.body;
    console.log(req.body, "opopo");
    const contact = await Contact.findOne({
      where: { contact_id: contact_id },
    });
    if (!contact) {
      return res.json({ message: "Contact not found", statusCode: 400 });
    }
    await AddressContact.update(
      { status: false },
      { where: { address_contact_id: contact.address_contact_id } }
    );
    await Contact.update(
      {
        salutation: salutation.value || null,
        first_name,
        last_name,
        email_id: email,
        phone: parseInt(mobile),
        gender: gender.value,
        designation: designation,
        company_name: company_name,
        address_id: address?.value,
      },
      { where: { contact_id: contact_id } }
    );
    await AddressContact.update(
      { status: true },
      { where: { address_contact_id: address?.value } }
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
