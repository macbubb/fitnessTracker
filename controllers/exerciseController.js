const asyncHandler = require('express-async-handler');
const Exercise = require('../models/exerciseModel');
const User = require('../models/userModel');
const { parseID } = require('../helpers/helpers');

//API requirements are such that a log must have user _id, and no id from any individual exercise. mongodb needs _id's for each exercise entry. could create a exercise/log schema with user _id and update log with exercise as they are added. however, the log also needs to be searchable by date, and i wish to use mongodb's search methods to \mit returns rather than having mongo return entire exercise/log document and then parsing down the log to user's date query. so submitExercise takes a user's _id, accesses the username, creates an exercise document with the username (which are unique) but returns a JSON with the user's _id and not the exercise's _id per the API requirements. when the log file's are searched, will have to ignore/remove exercises' _id's from the returned documents in response's JSON
const submitExercise = asyncHandler(async (req, res) => {
  let { description, duration, date } = req.body;

  //HTML form, REST.route, and FCC API send the _id in different places so extra checking and manually parsing the id if necessary
  let id = req.body[':_id'];
  if (!id) {
    id = parseID(req.originalUrl);
  }

  let username;
  let dateType;
  let user = await User.findById({ _id: id });

  if (user) {
    username = user.username;
  } else {
    res.status(400);
    throw new Error('user id not found');
  }

  if (!date) {
    dateType = new Date();
    date = dateType.toDateString();
  } else {
    dateType = new Date(date.replace(/-/g, '/'));
    date = dateType.toDateString();
  }

  const exercise = await Exercise.create({
    username,
    description,
    duration,
    date,
    dateType,
  });
  let eID = String(exercise._id);
  const returnExercise = await Exercise.findById(
    { _id: eID },
    { __v: 0, _id: 0, dateType: 0 }
  );
  //per above note, response includes user's _id, not the created exercise document's
  returnExercise._id = String(id);
  if (exercise) {
    console.log(returnExercise);
    res.status(200);
    res.json(returnExercise);
  } else {
    res.status(400);
    throw new Error('exercise creation failed');
  }
});

exports.submitExercise = submitExercise;
