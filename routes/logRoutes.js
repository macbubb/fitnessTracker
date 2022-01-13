var express = require('express');
const router = express.Router();
const { getUserLog } = require('../controllers/logController');
// You can make a GET request to /api/users/:_id/logs to retrieve a full exercise log of any user.
router.route('/').get(getUserLog);
// A request to a user's log GET /api/users/:_id/logs returns a user object with a count property representing the number of exercises that belong to that user.

// A GET request to /api/users/:id/logs will return the user object with a log array of all the exercises added.

// Each item in the log array that is returned from GET /api/users/:id/logs is an object that should have a description, duration, and date properties.

// The description property of any object in the log array that is returned from GET /api/users/:id/logs should be a string.

// The duration property of any object in the log array that is returned from GET /api/users/:id/logs should be a number.

// The date property of any object in the log array that is returned from GET /api/users/:id/logs should be a string.. Use the dateString format of the Date API.

// You can add from, to and limit parameters to a GET /api/users/:_id/logs request to retrieve part of the log of any user. from and to are dates in yyyy-mm-dd format. limit is an integer of how many logs to send back.

module.exports = router;
