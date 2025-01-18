const { v4: uuidv4 } = require("uuid");
module.exports = (sequelize, Sequelize) => {
    const ActivityLogTracker = sequelize.define("activity_log_tracker", {
        log_tracker_id: {
            type: Sequelize.UUID,
            primaryKey: true,
            allowNull: false,
            defaultValue: Sequelize.UUIDV4,
        },
        user_id: {
            type: Sequelize.UUID,
        },
        method: {
            type: Sequelize.STRING,
        },
        url: {
            type: Sequelize.STRING,
        },
        headers: {
            type: Sequelize.JSON,
        },
        query_params: {
            type: Sequelize.JSON,
        },
        body: {
            type: Sequelize.JSON,
        },
        status_code: {
            type: Sequelize.INTEGER,
        },
        response_time: {
            type: Sequelize.INTEGER,
        },
    });
    ActivityLogTracker.beforeCreate((data, options) => {
        data.log_tracker_id = uuidv4();
    });
    return ActivityLogTracker;
};