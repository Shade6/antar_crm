const db = require("../models");
const user = db.users
const ActivityLog = db.activity_log;
const TrackLog = db.activity_log_tracker;

exports.logs_entry = async (data, options, action, module_name) => {
    const find_tracker = await user.findAll()
    console.log(find_tracker,'============')
};
