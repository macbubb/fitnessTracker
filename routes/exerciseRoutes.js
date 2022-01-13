var express = require('express');
const router = express.Router();
const { submitExercise } = require('../controllers/exerciseController');

router.route('/').post(submitExercise);
// You can POST to /api/users/:_id/exercises with form data description, duration, and optionally date. If no date is supplied, the current date will be used.
// The response returned from POST /api/users/:_id/exercises will be the user object with the exercise fields added.

module.exports = router;
