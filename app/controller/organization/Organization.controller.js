const db = require("../../models");

const Organization = db.organization;
const Opportunity = db.opportunity;
const Territory = db.territory;
const Industry = db.industry;
const Contact = db.contacts;
const Address = db.address;
const AddressOrg = db.address_org;
const AddressContact = db.address_contact;
const ContactMapping = db.contact_mapping;
const Estimate = db.estimate;
const EstimateType = db.estimate_type;
const ProductMapping = db.product_mapping;
const Product = db.product;
exports.createOrganization = async (req, res) => {
  try {
    const {
      organization_name,
      website,
      annual_revenue,
      no_of_employee,
      industry,
      territory,
      address,
      image,
    } = req.body;
    const tenant_id = req.tenant
    console.log(req.body);
    if (address?.length == 0) {
      return res
        .status(200)
        .json({ message: "Address is required", statusCode: 400 });
    }
    const organizationData = {
      organization_name: organization_name,
      website: website,
      annual_revenue: parseInt(annual_revenue) || null,
      no_of_employees: no_of_employee?.value || null, // Assuming you want the value from the object
      industry_id: industry?.value || null, // Assuming you want the value from the object
      territory_id: territory?.value || null, // Assuming you want the value from the object
      website: website,
      created_by: req.user,
      image: image || "",
      created_on: new Date(),
      tenant_id:tenant_id
    };
    console.log(organizationData);
    const newOrganization = await Organization.create(organizationData);
    for (let address_data of address) {
      console.log(address_data, "--------");
      await AddressOrg.update(
        { organization_id: newOrganization.organization_id },
        { where: { address_org_id: address_data.value } }
      );
    }

    return res.status(200).json({
      message: "Organization created successfully",
      data: newOrganization,
      statusCode: 200,
    });
  } catch (error) {
    return res.status(200).json({ message: error.message, statusCode: 500 });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const organizationData = req.body;
    const tenant_id = req.tenant
    const [updated] = await Organization.update(organizationData, {
      where: { org_id: id ,tenant_id:tenant_id},
    });
    if (updated) {
      const updatedOrganization = await Organization.findOne({
        where: { org_id: id ,tenant_id:tenant_id},
      });
      return res.status(200).json({
        message: "Organization updated successfully",
        data: updatedOrganization,
      });
    }
    return res.status(404).json({ message: "Organization not found" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

exports.getOrganization = async (req, res) => {
  try {
    const { id } = req.params;
    const tenant_id = req.tenant
    const organization = await Organization.findOne({ where: { org_id: id ,tenant_id:tenant_id} });
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
    const tenant_id = req.tenant
    const organizations = await Organization.findAll({
      where:{
        tenant_id:tenant_id
      },
    });
    return res.status(200).json({
      data: organizations,
      statusCode: 200,
      message: "Organizations fetched successfully",
    });
  } catch (error) {
    return res.status(200).json({ message: error.message, statusCode: 400 });
  }
};

exports.deleteOrganization = async (req, res) => {
  console.log('================================================')
  const organizationId = req.query.id;
  const tenant_id = req.tenant
  if (!organizationId) {
    return res.json({
      message: "Organization id is required",
      statusCode: 400,
    });
  }
  const find_organization = await Organization.findOne({
    where: { organization_id: organizationId ,tenant_id:tenant_id},
  });
 
  if (!find_organization) {
    return res.json({ message: "Organization not found", statusCode: 400 });
  }
  const find_address = await AddressOrg.findAll({
    where: { organization_id: organizationId },
  });
  for (let address of find_address) {
    await AddressOrg.update(
      { organization_id: null },
      { where: { address_org_id: address.address_org_id } }
    );
  }

  const find_opportunity = await Opportunity.findOne({
    where: { organization_id: find_organization.organization_id ,tenant_id:tenant_id},
  });


  console.log(find_opportunity,'eee')
  if (find_opportunity) {
    find_opportunity.organization_id = null;
    find_opportunity.save();
  }

  const deleted = await Organization.destroy({
    where: { organization_id: organizationId ,tenant_id:tenant_id},
  });
  if (deleted) {
    return res.json({
      message: "Organization deleted successfully",
      statusCode: 200,
    });
  }
  return res.json({ message: "Organization not found", statusCode: 400 });
};

exports.getOrganizationById = async (req, res) => {
  try {
    const organizationId = req.query.id;
    const tenant_id = req.tenant
    console.log(organizationId);
    const organization = await Organization.findOne({
      where: { organization_id: organizationId ,tenant_id:tenant_id},
    });
    let contact = [];
    if (organization) {
      const opportunities = await Opportunity.findAll({
        where: { organization_id: organizationId,tenant_id:tenant_id },
        include: [{ model: Contact, as: "contact" }],
      });
      const map_ids = opportunities.map((val) => val.opportunity_id);
      const find_extra_contacts = await ContactMapping.findAll({
        where: { opportunity_id: map_ids },
        include: {
          model: Contact,
          as: "contact",
        },
      });
      if (find_extra_contacts.length > 0) {
        contact = [
          ...opportunities.map((val) => val.contact),
          ...find_extra_contacts.map((val) => val.contact),
        ];
      } else {
        contact = [...opportunities.map((val) => val.contact)];
      }
      return res.json({
        data: {
          organization: organization ?? "not found",
          opportunities: opportunities,
          contact: contact ?? [],
        },
        message: "organization fetched ",
        statusCode: 200,
      });
    }
    return res.json({ message: "Organization not found", statusCode: 400 });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.get_only_organization_by_id = async (req, res) => {
  try {
    const organizationId = req.query.id;
    const tenant_id = req.tenant
    const organization = await Organization.findOne({
      where: { organization_id: organizationId,tenant_id:tenant_id },
      include: [
        { model: Territory, as: "territory" },
        { model: Industry, as: "industry" },
      ],
    });
    const find_address = await AddressOrg.findAll({
      where: { organization_id: organizationId },
    });
    if (!organization) {
      return res.json({ message: "Organization not found", statusCode: 400 });
    }
    return res.json({
      data: { organization: organization, address: find_address },
      statusCode: 200,
      message: "Organization fetched successfully",
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.updateOrganization = async (req, res) => {
  try {
    const {
      organization_id,
      organization_name,
      website,
      annual_revenue,
      no_of_employee,
      industry,
      territory,
      address,
      image,
    } = req.body;
    console.log(req.body);
    const tenant_id = req.tenant
    const organization = await Organization.findOne({
      where: { organization_id: organization_id ,tenant_id:tenant_id},
    });
    if (!organization) {
      return res.json({ message: "Organization not found", statusCode: 400 });
    }
    const find_address = await AddressOrg.findAll({
      where: { organization_id: organization_id },
    });
    for (let address of find_address) {
      await AddressOrg.update(
        { organization_id: null },
        { where: { address_org_id: address.address_org_id } }
      );
    }
    await Organization.update(
      {
        organization_name: organization_name,
        website: website,
        annual_revenue: parseInt(annual_revenue) || null,
        no_of_employees: no_of_employee.value,
        industry_id: industry.value,
        territory_id: territory.value,
        image: image || organization.image,
        tenant_id:tenant_id
      },
      {
        where: { organization_id: organization_id,tenant_id:tenant_id },
      }
    );
    for (let address_data of address) {
      await AddressOrg.update(
        { organization_id: organization_id },
        { where: { address_org_id: address_data.value } }
      );
    }
    return res.json({
      message: "Organization updated successfully",
      statusCode: 200,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.get_existing_org_estimate = async (req, res) => {
  try {
    console.log(req.body, "---");
    const opportunity_id = req.query.id;
    let contact = [];
    let products = [];
    let organizations = [];
    let opportunities = {};
    const tenant_id = req.tenant
    opportunities = await Opportunity.findOne({
      where: { opportunity_id: opportunity_id ,tenant_id:tenant_id},
      include: [
        {
          model: Contact,
          as: "contact",
        },
        {
          model: Organization,
          as: "organization",
        },
      ],
    });

    if (!opportunities) {
      return res.json({ message: "opportunity not found", statusCode: 400 });
    }

    const find_contact = await ContactMapping.findAll({
      where: { opportunity_id: opportunity_id },
      include: {
        model: Contact,
        as: "contact",
      },
    });
    if (find_contact.length > 0) {
      contact = [
        ...opportunities.contact,
        ...find_contact.map((val) => val.contact),
      ];
    } else {
      contact = opportunities.contact;
    }

    const find_products = await ProductMapping.findAll({
      where: { opportunity_id: opportunity_id },
      include: {
        model: Product,
        as: "product",
      },
    });

    const find_organization = await Organization.findOne({
      where: { organization_id: opportunities.organization_id,tenant_id:tenant_id },
    });
    organizations = find_organization;

    if (find_products.length > 0) {
      products = find_products;
    } else {
      return res.json({
        message: "product not found please add product",
        statusCode: 400,
      });
    }

    if (products.length == 0) {
      return res.json({ message: "product not found", statusCode: 400 });
    }

    if (contact.length == 0) {
      return res.json({ message: "contact not found", statusCode: 400 });
    }

    if (!organizations) {
      return res.json({ message: "organaization not found", statusCode: 400 });
    }

    let sub_total = null;
    let discount_total = null;
    let total_tax = null;
    let grand_total = null;

    for (let product_ of products) {
      sub_total = sub_total + product_.product.unit_price;
      let result =
        (product_.product.tax_rate / 100) * product_.product.unit_price;
      total_tax = total_tax + result;
    }
    grand_total = sub_total + total_tax;
    function generateRandomSixDigitNumber() {
      return Math.floor(100000 + Math.random() * 900000);
    }
    const complete_details = {
      contact: contact,
      products: products,
      organizations: organizations,
      opportunities: opportunities,
      sub_total: sub_total,
      discount_total: 0,
      total_tax: total_tax,
      grand_total: grand_total,
      estimate_code: generateRandomSixDigitNumber(),
    };
    return res.json({
      message: "get details",
      statusCode: 200,
      data: complete_details,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.find_all_estimate = async (req, res) => {
  try {
    const tenant_id = req.tenant
    const find_all_ = await Estimate.findAll({include:{
      model:Organization,
      as:'organization'
    },
    where:{
      tenant_id:tenant_id
    },
  });
    return res.json({
      message: "estimate finded",
      statusCode: 200,
      data: find_all_ ?? [],
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.create_estimate = async (req, res) => {
  try {
    console.log(req.body);
    const tenant_id = req.tenant
    const {
      organization,
      estimate_number,
      issue_data,
      notes,
      products,
      discount_total,
      tax_total,
      sub_total,
      grand_total,
      opportunity_id,
      discount
    } = req.body;
      console.log(req.body)
    if(!discount_total){
       return res.json({message:'discount not provided', statusCode:400})
    }

    const find_opportunity = await Opportunity.findOne({
      where: { opportunity_id: opportunity_id,tenant_id:tenant_id },
    });

    if (!find_opportunity) {
      return res.json({ message: "cannot find opportunity", statusCode: 404 });
    }
    console.log(req.body);
    const find_org = await Organization.findOne({
      where: { organization_id: organization.value ,tenant_id:tenant_id},
    });
    if (!find_org) {
      return res.json({ message: "No organization found", statusCode: 400 });
    }

    if (!issue_data) {
      return res.json({ message: "please enter issue date", statusCode: 400 });
    }

    if (products.length == 0) {
      return res.json({
        message: "product seems empty please add one",
        statusCode: 400,
      });
    }

    if (!discount_total) {
      return res.json({
        message: "discount total seems empty",
        statusCode: 400,
      });
    }

    if (!sub_total) {
      return res.json({ message: "sub total seems empty", statusCode: 400 });
    }

    if (!tax_total) {
      return res.json({ message: "tax total seems empty", statusCode: 400 });
    }

    if (!grand_total) {
      return res.json({ message: "grand total seems empty", statusCode: 400 });
    }
    function generateRandomSixDigitNumber() {
      return Math.floor(100000 + Math.random() * 900000);
    }

   const find_address = await AddressOrg.findOne({where:{organization_id:organization.value}})
    if(!find_address){
      return res.json({ message: "no address found for this organization",statusCode:400})
    }


    const create_estimate = await Estimate.create({
      organization_id: find_org.organization_id,
      estimate_number: "EST" + generateRandomSixDigitNumber(),
      issue_date: issue_data,
      sub_total: parseInt(sub_total),
      discount_total: discount_total,
      tax_total: parseInt(tax_total),
      grand_total: parseInt(grand_total),
      opportunity_id: opportunity_id,
      notes: notes || "",
      tenant_id:tenant_id
    });

    if (create_estimate) {
      for (let pro of products) {
        await EstimateType.create({
          estimate_id: create_estimate.estimate_id,
          product_id: pro.id,
          quantity: parseInt(pro.quantity),
          unit_price: parseInt(pro.unit_price),
          tax_rate: parseInt(pro.tax_rate),
          line_total: parseInt(pro.sub_total),
          description: pro.description || "",
        });
      }
      return res.json({
        message: "estimate created ",
        statusCode: 200,
        data: create_estimate.estimate_id,
      });
    } else {
      return res.json({
        message: "estimate not been created",
        statusCode: 400,
      });
    }
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.pdf_estimate_details = async (req, res) => {
  try {
    const estimate_id = req.query.id;
    const opportunity_id = req.query.opportunity_id;
    const tenant_id = req.tenant
    console.log(req.query);
    if (!opportunity_id) {
      return res.json({ message: "opportunity not found", statusCode: 400 });
    }

    const find_opportunity = await Opportunity.findOne({
      where: { opportunity_id: opportunity_id,tenant_id:tenant_id },
      include: {
        model: Contact,
        as: "contact",
        include: {
          model: AddressContact,
          as: "address_contact",
        },
      },
    });

    const find_estimate_ = await Estimate.findOne({
      where: { estimate_id: estimate_id ,tenant_id:tenant_id},
    });
    if (!find_estimate_) {
      return res.json({
        message: "estimate not found please check estimate is saved ",
        statusCode: 400,
      });
    }

    const find_estimate_type = await EstimateType.findAll({
      where: { estimate_id: estimate_id },
      include: {
        model: Product,
        as: "product",
      },
    });
    if (!find_estimate_type) {
      return res.json({
        message: "product not found please check  ",
        statusCode: 400,
      });
    }

    const find_organization = await Organization.findOne({
      where: { organization_id: find_estimate_.organization_id ,tenant_id:tenant_id},
    });
    if (!find_organization) {
      return res.json({
        message: "organization not found please check  ",
        statusCode: 400,
      });
    }

    const find_address = await AddressOrg.findOne({
      where: { organization_id: find_estimate_.organization_id },
    });
    if (!find_address) {
      return res.json({
        message: "address not found please check  ",
        statusCode: 400,
      });
    }

    const details = {
      organization: find_organization,
      address: {
        line_one: find_address.address_line_1,
        line_two: find_address.address_line_2,
        city: find_address.city,
        state: find_address.state,
        country: find_address.country,
        code: find_address.zip_code,
      },
      contact: find_opportunity.contact,
      estimate_number: find_estimate_.estimate_number,
      issue_date: find_estimate_.issue_date,
      notes: find_estimate_.note || "",
      products: find_estimate_type,
      discount_total: find_estimate_.discount_total,
      tax_total: find_estimate_.tax_total,
      sub_total: find_estimate_.sub_total,
      grand_total: find_estimate_.grand_total,
      estimate_created: find_estimate_.created_at,
     
    };
    return res.json({
      message: "details founded",
      statusCode: 200,
      data: details,
    });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.find_pdf = async (req, res) => {
  try {
    const id = req.query.id;
    const tenant_id = req.tenant
    console.log(id,'==')
    let file = null;
    const find_estimate_ = await Estimate.findOne({
      where: { estimate_id: id ,tenant_id:tenant_id},
    });
    if (find_estimate_) {
      file = find_estimate_.pdf;
    }

    const find_opportunity = await Opportunity.findOne({
      where: { opportunity_id: id,tenant_id:tenant_id },
    });

    if (find_opportunity) {
      file = find_opportunity.pdf;
    }

    if (file == null) {
      return res.json({ message: "file not found", statusCode: 400 });
    }
    res.json({ message: "file retrieved", statusCode: 200, data: file });
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};

exports.fetch_org_estimate = async (req, res) => {
  try {
    const organization_id = req.query.id;
    const tenant_id = req.tenant
    const find_org = await Organization.findOne({
      where: { organization_id: organization_id ,tenant_id:tenant_id},
    });
    if (!find_org) {
      return res.json({ message: "org not found", statusCode: 400 });
    }

    const find_estimate = await Estimate.findAll({
      where: { organization_id: find_org.organization_id ,tenant_id:tenant_id},
      include:{
        model:Organization,
        as:'organization'
      }
    });

   return res.json({message:'founded',statusCode:200,data:find_estimate || []})
  } catch (error) {
    return res.json({ message: error.message, statusCode: 400 });
  }
};
