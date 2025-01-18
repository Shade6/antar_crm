const jwt = require('jsonwebtoken');
const db = require("../models");
const { verifyToken } = require('../utils/jwt.util.js');
const ApiTrack = db.activity_log_tracker;

// Middleware to track API requests
async function ActivityLog(req, res, next) {
    const start = Date.now();
    let user_id = null;

    // Extract user_id from token
    const token = req.headers.authorization;
    if (token) {
        try {
            const decode = verifyToken(token);
            user_id = decode?.user_id;
        } catch (err) {
            console.error('Invalid token:', err.message);
        }
    }

    let tracker_id = null;

    try {
        // Save tracking data to the database
        const create_id = await ApiTrack.create({
            user_id: user_id,
            method: req.method,
            url: req.originalUrl,
            headers: JSON.stringify(req.headers),
            query_params: JSON.stringify(req.query),
            body: JSON.stringify(req.body),
            status_code: 200, // Default status code, can be updated later in `res.send`
            response_time: 0, // Default response time, to be updated later in `res.send`
        });

        tracker_id = create_id.log_tracker_id;
        req.tracker_id = tracker_id; // Set tracker_id on the request object
    } catch (err) {
        console.error('Error saving API tracking data:', err);
    }

    const originalSend = res.send.bind(res);
    res.send = async function (body) {
        const duration = Date.now() - start;
        try {
            if (tracker_id) {
                await ApiTrack.update(
                    { response_time: duration, status_code: res.statusCode },
                    { where: { log_tracker_id: tracker_id } }
                );
            }
        } catch (err) {
            console.error('Error updating API tracking data:', err);
        }
        return originalSend(body);
    };

    next(); 
}

module.exports = ActivityLog;
