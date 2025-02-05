const db = require("../../models");
const { Op, Sequelize } = require('sequelize');
const Users = db.users;
const Leads = db.leads;
const Opportunity = db.opportunity;
const Organization = db.organization
const Product = db.product;
const Territory = db.territory;
const Industry = db.industry;
const Estimate = db.estimate;
const Lead_activity = db.lead_task

// Helper function to generate intervals based on timeframe
const getTimeIntervals = (timeframe) => {
  const now = new Date();
  let intervals = [];

  switch(timeframe) {
    case '24h':
      intervals = [
        { start: new Date(now - 2 * 3600 * 1000), end: now, label: 'last 2 hours' },
        { start: new Date(now - 4 * 3600 * 1000), end: now, label: 'last 4 hours' },
        { start: new Date(now - 8 * 3600 * 1000), end: now, label: 'last 8 hours' },
        { start: new Date(now - 16 * 3600 * 1000), end: now, label: 'last 16 hours' },
        { start: new Date(now - 24 * 3600 * 1000), end: now, label: 'last 24 hours' },
      ];
      break;
    case '1d':
      for (let i = 0; i < 6; i++) {
        const start = new Date(now - (i + 1) * 4 * 3600 * 1000);
        const end = new Date(now - i * 4 * 3600 * 1000);
        intervals.unshift({ start, end, label: `${i * 4}-${(i + 1) * 4} hours` });
      }
      break;
    case '1w':
      for (let i = 0; i < 7; i++) {
        const start = new Date(now);
        start.setDate(now.getDate() - (i + 1));
        start.setHours(0, 0, 0, 0);
        const end = new Date(start);
        end.setDate(start.getDate() + 1);
        intervals.unshift({ 
          start, 
          end, 
          label: start.toLocaleDateString('en-US', { weekday: 'short' }) 
        });
      }
      break;
    case '1m':
      for (let i = 0; i < 4; i++) {
        const start = new Date(now.getFullYear(), now.getMonth() - 1, (i * 7) + 1);
        const end = new Date(start);
        end.setDate(start.getDate() + 7);
        intervals.push({ start, end, label: `Week ${i + 1}` });
      }
      break;
    case '6m':
      for (let i = 0; i < 6; i++) {
        const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
        intervals.unshift({ 
          start, 
          end, 
          label: start.toLocaleDateString('en-US', { month: 'long' }) 
        });
      }
      break;
    case '1y':
      for (let i = 0; i < 12; i++) {
        const start = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const end = new Date(now.getFullYear(), now.getMonth() - i + 1, 1);
        intervals.unshift({ 
          start, 
          end, 
          label: start.toLocaleDateString('en-US', { month: 'long' }) 
        });
      }
      break;
    default:
      throw new Error('Invalid timeframe');
  }
  return intervals;
};

// Helper to get overall start and end dates for a timeframe
const getOverallStartEnd = (timeframe) => {
  const now = new Date();
  let start;

  switch(timeframe) {
    case '24h':
      start = new Date(now - 24 * 3600 * 1000);
      break;
    case '1d':
      start = new Date(now - 24 * 3600 * 1000);
      break;
    case '1w':
      start = new Date(now - 7 * 24 * 3600 * 1000);
      break;
    case '1m':
      start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
      break;
    case '6m':
      start = new Date(now.getFullYear(), now.getMonth() - 6, 1);
      break;
    case '1y':
      start = new Date(now.getFullYear() - 1, now.getMonth(), 1);
      break;
    default:
      start = new Date(now - 24 * 3600 * 1000);
  }

  return { start, end: now };
};

// New Leads
const find_new_lead_ = async(data,tenant_id) => {
  const timeframe = data.timeframe || '24h';
  const intervals = getTimeIntervals(timeframe);
  const dataPoints = [];
  
  for (const interval of intervals) {
    const count = await Leads.count({
      where: {
        created_at: { [Op.between]: [interval.start, interval.end] }
        ,tenant_id:tenant_id
      }
    });
    dataPoints.push(count);
  }

  return {
    labels: intervals.map(i => i.label),
    datasets: [{
      label: 'New Leads',
      backgroundColor: '#dc7633',
      data: dataPoints
    }]
  };
};

// New Opportunities
const new_opportunity = async(data,tenant_id) => {
  const timeframe = data.timeframe || '24h';
  const intervals = getTimeIntervals(timeframe);
  const dataPoints = [];
  
  for (const interval of intervals) {
    const count = await Opportunity.count({
      where: { created_on: { [Op.between]: [interval.start, interval.end] } ,tenant_id:tenant_id}
    });
    dataPoints.push(count);
  }

  return {
    labels: intervals.map(i => i.label),
    datasets: [{
      label: 'New Opportunities',
      backgroundColor: '#dc7633',
      data: dataPoints
    }]
  };
};

// Project Revenue
const find_project_revenue = async (data,tenant_id) => {
  const timeframe = data.timeframe || '24h';
  const intervals = getTimeIntervals(timeframe);
  const dataPoints = [];

  // Loop through each interval and get sum for that period
  for (const interval of intervals) {
    const result = await Estimate.findOne({
      attributes: [[Sequelize.fn('sum', Sequelize.col('grand_total')), 'total']],
      where: { created_at: { [Op.between]: [interval.start, interval.end] },tenant_id:tenant_id },
      raw: true
    });

    dataPoints.push(result.total || 0);
  }

  // Fetch total sum of all estimates
  const totalSumResult = await Estimate.findOne({
    where:{
      tenant_id:tenant_id
    },
    attributes: [[Sequelize.fn('sum', Sequelize.col('grand_total')), 'total']],
    raw: true
  });
  const totalSum = totalSumResult.total || 0;

  return {
    labels: intervals.map(i => i.label),
    datasets: [
      {
        label: 'Project Revenue',
        backgroundColor: '#dc7633',
        data: dataPoints
      }
    ],
    totalSum // Add total sum of all estimates
  };
};


// Conversion
const conversion = async(data) => {
  const timeframe = data.timeframe || '24h';
  const { start, end } = getOverallStartEnd(timeframe);
  const leadsCount = await Leads.count({ where: { created_at: { [Op.between]: [start, end] } } });
  const opportunitiesCount = await Opportunity.count({ where: { created_on: { [Op.between]: [start, end] } } });
  const conversionRate = leadsCount ? (opportunitiesCount / leadsCount) * 100 : 0;

  return {
    labels: ['Conversion Rate'],
    datasets: [{
      label: 'Conversion Rate (%)',
      backgroundColor: '#dc7633',
      data: [conversionRate.toFixed(2)]
    }]
  };
};

// Revenue Chart
const revenue_chart = async(data,tenant_id) => {
  return await find_project_revenue(data,tenant_id);
};

// Top 5 Sellers
const top_5_sellers = async(data) => {
  const timeframe = data.timeframe || '24h';
  const { start, end } = getOverallStartEnd(timeframe);
  const sellers = await Opportunity.findAll({
    attributes: [
      'opportunity_owner_id',
      [Sequelize.fn('COUNT', Sequelize.col('opportunity_id')), 'count']
    ],
    where: { created_on: { [Op.between]: [start, end] } ,tenant_id:tenant_id},
    group: ['opportunity_owner_id'],
    order: [[Sequelize.literal('count'), 'DESC']],
    limit: 5,
    include: [{ model: Users, as: 'owner', attributes: ['username'] }]
  });

  return {
    labels: sellers.map(s => s.owner.username),
    datasets: [{
      label: 'Top 5 Sellers',
      backgroundColor: '#dc7633',
      data: sellers.map(s => s.get('count'))
    }]
  };
};

// Top 5 Territories
const top_5_territory= async(data,tenant_id) => {
  const timeframe = data.timeframe || '24h';
  const { start, end } = getOverallStartEnd(timeframe);
  const territories = await Organization.findAll({
    attributes: [
      'territory_id',
      [Sequelize.fn('COUNT', Sequelize.col('organization_id')), 'count']
    ],
    where: { created_on: { [Op.between]: [start, end] },tenant_id:tenant_id },
    group: ['territory_id'],
    order: [[Sequelize.literal('count'), 'DESC']],
    limit: 5,
    include: [{ model: Territory,as:'territory', attributes: ['territory_name'] }]
  });
  console.log(territories,'==')
  return {
    labels: territories.map(t => t.territory.territory_name),
    datasets: [{
      label: 'Top 5 Territories',
      backgroundColor: '#dc7633',
      data: territories.map(t => t.get('count'))
    }]
  };
};

// Engagement
const engagement = async(data) => {
  const timeframe = data.timeframe || '24h';
  const intervals = getTimeIntervals(timeframe);
  const dataPoints = [];
  
  for (const interval of intervals) {
    const count = await Leads.count({
      where: {
        created_at: { [Op.between]: [interval.start, interval.end] },
        status: 'Qualified',
        tenant_id:tenant_id
      }
    });
    dataPoints.push(count);
  }

  return {
    labels: intervals.map(i => i.label),
    datasets: [{
      label: 'Engagement (Qualified Leads)',
      backgroundColor: '#dc7633',
      data: dataPoints
    }]
  };
};

// Industry Classification
const industry_classification = async (data,tenant_id) => {
  const timeframe = data.timeframe || '24h';
  const { start, end } = getOverallStartEnd(timeframe);

  const industries = await Leads.findAll({
    attributes: [
      'industry_id', 
      [Sequelize.fn('COUNT', Sequelize.col('lead_id')), 'total']
    ],
    where: { created_at: { [Op.between]: [start, end] } ,tenant_id:tenant_id},
    include: {
      model: Industry,
      as: 'industry',
      attributes: ['industry_name']
    },
    group: ['industry_id'],
    raw: true
  });

  // Sort by total count in descending order and take the top 5
  const topIndustries = industries
    .sort((a, b) => b.total - a.total) // Sort by total count descending
    .slice(0, 5); // Limit to 5



  return {
    labels: topIndustries.map(i => i['industry.industry_name'] || 'Unknown Industry'),
    datasets: [{
      label: 'Industry Classification',
      backgroundColor: ['#FFD700', '#1E90FF', '#90EE90', '#FF8C00', '#808080'],
      data: topIndustries.map(i => i.total)
    }]
  };
};




// Activity Tab (Placeholder)
const activity_tab = async (data,tenant_id) => {
  const find_table = await Lead_activity.findAll({
    where:{
      tenant_id:tenant_id
    },
    order: [
      [Sequelize.literal("task_date >= CURDATE()"), "DESC"], // Upcoming dates first
      ["task_date", "ASC"] // Then sort by earliest date
    ],
    include:{
      model:Users,
      as:'user'
    },
    limit: 5
  });

  return find_table;
};


exports.find_dashboard = async (req, res) => {
  try {
      const data = req.query;
      const tenant_id = req.tenant
      const new_lead = await find_new_lead_(data,tenant_id);
      const new_opportunity_ = await new_opportunity(data,tenant_id);
      const find_project_revenue_ = await find_project_revenue(data,tenant_id);
      // const conversion_ = await conversion(data);
      const revenue_chart_ = await revenue_chart(data,tenant_id);
      // const top_5_sellers_ = await top_5_sellers(data);
      const top_5_territory_ = await top_5_territory(data,tenant_id);
      const activity_tab_ = await activity_tab(data,tenant_id);
      // const engagement_  = await engagement(data);
      const industry_classification_ = await industry_classification(data,tenant_id);

      res.json({
        message: 'Dashboard data fetched',
        statusCode:200,
        data: {
          new_lead,
          new_opportunity: new_opportunity_,
          find_project_revenue: find_project_revenue_,
          // conversion: conversion_,
          revenue_chart: revenue_chart_,
          // top_5_sellers: top_5_sellers_,
          top_5_territory: top_5_territory_,
          activity_tab: activity_tab_,
          // engagement: engagement_,
          industry_classification: industry_classification_
        }
      
      });
  } catch (error) {
    res.status(200).json({ message: error.message });
  }
};



exports.dashboard_header = async (req, res) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const tenant_id = req.tenant
    // Execute all queries in parallel
    const [
      new_leads,
      new_opportunities,
      closed_opportunities,
      won_opportunities
    ] = await Promise.all([
      Leads.findAll({
        where: {
          created_at: { [Op.gte]: twentyFourHoursAgo }
          ,tenant_id:tenant_id
        }
      }),
      Opportunity.findAll({
        where: {
          changed_on: { [Op.gte]: twentyFourHoursAgo }
          ,tenant_id:tenant_id
        }
      }),
      Opportunity.findAll({
        where: {
          status: "UnQualified",
          changed_on: { [Op.gte]: twentyFourHoursAgo }
          ,tenant_id:tenant_id
        }
      }),
      Opportunity.findAll({
        where: {
          status: "Qualified",
          changed_on: { [Op.gte]: twentyFourHoursAgo }
          ,tenant_id:tenant_id
        }
      })
    ]);

    // Get IDs from won opportunities
    const wonOpportunityIds = won_opportunities.map(o => o.opportunity_id);

    // Find related estimates
    const estimates = await Estimate.findAll({
      where: {
        opportunity_id: {
          [Op.in]: wonOpportunityIds.length ? wonOpportunityIds : [null]
        }
        ,tenant_id:tenant_id
      }
    });

    // Calculate totals
    const totals = {
      total_new_lead: new_leads.length,
      total_new_opportunity: new_opportunities.length,
      won_opportunity:wonOpportunityIds?.length ,
      closed_opportunity: closed_opportunities.length,
      project_revenue: estimates.reduce((sum, est) => sum + Number(est.grand_total || 0), 0)
    };

    res.json({
      statusCode: 200,
      message: "24-hour dashboard data fetched successfully",
      data: totals
    });

  } catch (error) {
    console.error("Dashboard error:", error);
    res.status(200).json({ 
      statusCode: 500,
      message: "Internal server error",
      error: error.message 
    });
  }
};

exports.find_dashboard_new_lead=async(req,res)=>{
  try {
    const data = req.query
    const tenant_id = req.tenant
    const new_lead = await find_new_lead_(data,tenant_id);
    return res.json({message:'data found',statusCode:200,data:new_lead})
  } catch (error) {
    res.status(200).json({ 
      statusCode: 500,
      message: "Internal server error",
      error: error.message 
    });
  }
}
exports.find_dashboard_new_opportunity=async(req,res)=>{
  try {
    const data = req.query
    const tenant_id = req.tenant
    const new_opportunity_ = await new_opportunity(data,tenant_id);
    if(new_opportunity_){
      return res.json({message:'data found',statusCode:200,data:new_opportunity_})
    }else{
      return res.json({message:new_opportunity_,statusCode:400})
    }
  } catch (error) {
    res.status(200).json({ 
      statusCode: 500,
      message: "Internal server error",
      error: error.message 
    });
  }
}
exports.find_dashboard_project_revenue=async(req,res)=>{
  try {
    const data = req.query
    const tenant_id = req.tenant
    const find_project_revenue_ = await find_project_revenue(data,tenant_id);
    if(find_project_revenue_){
       return res.json({message:'data found',statusCode:200,data:find_project_revenue_})
    }else{
      return res.json({message:find_project_revenue_,statusCode:400})
    }
  } catch (error) {
    res.status(200).json({ 
      statusCode: 500,
      message: "Internal server error",
      error: error.message 
    });
  }
}
exports.find_dashboard_industry_classification=async(req,res)=>{
  try {
    const data = req.query
    const tenant_id = req.tenant
      const industry_classification_ = await industry_classification(data,tenant_id);

      if(industry_classification_){
        return res.json({message:'data fetched',statusCode:200,data:industry_classification_})
      }else{
        return res.json({message:industry_classification_,statusCode:400})
      }
  } catch (error) {
    res.status(200).json({ 
      statusCode: 500,
      message: "Internal server error",
      error: error.message 
    });
  }
}
exports.find_dashboard_revenue_=async(req,res)=>{
  try {
    const data = req.query
    const tenant_id = req.tenant

         const revenue_chart_ = await revenue_chart(data,tenant_id);
         console.log(revenue_chart_)
         if(revenue_chart_){
             return res.json({message:'data fetched',statusCode:200,data:revenue_chart_})
         }else{
          return res.json({message:revenue_chart_,statusCode:400})
         }
  } catch (error) {
    res.status(200).json({ 
      statusCode: 500,
      message: "Internal server error",
      error: error.message 
    });
  }
}
exports.find_dashboard_top_5_territory=async(req,res)=>{
  try {
       // const top_5_sellers_ = await top_5_sellers(data);
       const data = req.query
       const tenant_id = req.tenant
       const top_5_territory_ = await top_5_territory(data,tenant_id);
       if(top_5_territory_){
        return res.json({message:'Data fetched',statusCode:200,data:top_5_territory_})
       }else{
        return res.json({message:top_5_territory_,statusCode:400})
       }

  } catch (error) {
    res.status(200).json({ 
      statusCode: 500,
      message: "Internal server error",
      error: error.message 
    });
  }
}