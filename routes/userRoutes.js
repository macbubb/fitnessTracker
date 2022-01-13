var express = require('express');
const router = express.Router();

const {
  registerUser,
  listUsers,
  deleteAllUsers,
  deleteOneUserById,
  deleteOneUserByUsername,
} = require('../controllers/userController');

router.route('/:username').post(registerUser);
router.route('/').get(listUsers).delete(deleteAllUsers).post(registerUser);
router.route('/delete/id/:id').delete(deleteOneUserById);
router.route('/delete/username/:username').delete(deleteOneUserByUsername);

module.exports = router;
