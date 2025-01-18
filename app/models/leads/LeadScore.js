const { v4: uuidv4 } = require("uuid");
const Activity= require('../../utils/Activity.controller'); // Adjust the path
module.exports = (sequelize, Sequelize) => {
    const LeadScore = sequelize.define("lead_score", {
      lead_score_id: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
      },
      territory: {
        type: Sequelize.STRING,
        allowNull: true
      },
      territory_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      industry: {
        type: Sequelize.STRING,
        allowNull: true
      },
      industry_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      job_title: {
        type: Sequelize.STRING,
        allowNull: true
      },
      job_title_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      annual_revenue: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      annual_revenue_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      budget: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      budget_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      website_visits: {
        type: Sequelize.STRING,
        allowNull: true
      },
      website_visits_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      email_interaction: {
        type: Sequelize.STRING,
        allowNull: true
      },
      email_interaction_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      content_engagement: {
        type: Sequelize.STRING,
        allowNull: true
      },
      content_engagement_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      lead_source: {
        type: Sequelize.STRING,
        allowNull: true
      },
      lead_source_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      number_of_employees: {
        type: Sequelize.STRING,
        allowNull: true
      },
      number_of_employees_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      telephone_conversation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      telephone_conversation_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      response_rate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      response_rate_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      is_there_a_need_currently: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_there_a_need_currently_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      use_case_alignment: {
        type: Sequelize.STRING,
        allowNull: true
      },
      use_case_alignment_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      is_lead_unhappy_with_current_solution: {
        type: Sequelize.STRING,
        allowNull: true
      },
      is_lead_unhappy_with_current_solution_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      did_they_signup_for_trial: {
        type: Sequelize.STRING,
        allowNull: true
      },
      did_they_signup_for_trial_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      feedback_provided: {
        type: Sequelize.STRING,
        allowNull: true
      },
      feedback_provided_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      qualified_or_unqualified_lead: {
        type: Sequelize.STRING,
        allowNull: true
      },
      qualified_or_unqualified_lead_value: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      hot_lead_is_greater_than: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      hot_lead_is_lesser_than: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      warm_lead_is_greater_than: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      warm_lead_is_lesser_than: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      cold_lead_is_greater_than: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      cold_lead_is_lesser_than: {
        type: Sequelize.INTEGER,
        allowNull: true
      }
    });
    LeadScore.beforeCreate((data, options) => {
      data.lead_score_id = uuidv4();
    });
    LeadScore.afterCreate((data, options) => {
      Activity.logs_entry(data.dataValues, options, 'create', 'lead_score',sequelize);
    });
    LeadScore.afterUpdate((data, options) => {
      Activity.logs_entry(data.dataValues, options, 'update', 'lead_score',sequelize);
    });
    LeadScore.beforeDestroy((data, options) => {
      Activity.logs_entry(data.dataValues, options, 'delete', 'lead_score',sequelize);
    });
    return LeadScore;
  };