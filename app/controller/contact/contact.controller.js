const db = require("../../models");
const Contact = db.contacts;
const Opportunity = db.opportunity;
exports.createContact = async (req, res) => {
    try {
        const { salutation, first_name, last_name, email, mobile, gender, designation, company_name, address } = req.body;

        // Create a new contact entry
        const details = {
            salutation:salutation.value || null,
            first_name,
            last_name,
            email_id: email, // Assuming email_id corresponds to email
            phone:parseInt(mobile), // Assuming mobile_no corresponds to mobile
            gender:gender.value,
            designation:designation,
            company_name:company_name,
            address: address.value  // Assuming address is an object with a value property
        }
        console.log(details);
        const newContact = await Contact.create(details);

        return res.status(200).json({
            message: 'Contact created successfully',
            contact: newContact,
            statusCode:200
        });
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            message: error.message,
            statusCode:400
        });
    }
}


exports.getContacts = async (req, res) => {
    try {
        const contacts = await Contact.findAll();
        return res.status(200).json({
            data: contacts,
            statusCode: 200
        });
    } catch (error) {
        console.error(error);
        return res.status(200).json({
            message: error.message,
            statusCode: 400
        });
    }
}

exports.deleteContact = async (req, res) => {
    const contactId = req.query.id
    console.log(contactId)
    if(!contactId){
        return res.json({ message: "Contact id is required", statusCode: 400 });
    }
    const deleted = await Contact.destroy({ where: { contact_id: contactId } });
    if (deleted) {
        return res.json({ message: "Contact deleted successfully", statusCode: 200 });
    }
    return res.json({ message: "Contact not found", statusCode: 400 });
}

exports.contact_details_by_id = async (req, res) => {
    try {
        const contactId = req.query.id;
        console.log(contactId);
        
        const contact = await Contact.findOne({ where: { contact_id: contactId } });
        
        if (contact) {
            const opportunities = await Opportunity.findAll({ where: { contact_id: contactId } });
            return res.json({ 
                data: { contact:contact, opportunities:opportunities }, 
                message: "Contact and opportunities fetched successfully", 
                statusCode: 200 
            });
        }
        
        return res.json({ message: "Contact not found", statusCode: 400 });
    } catch (error) {
        return res.json({ message: error.message, statusCode: 400 });
    }
}

