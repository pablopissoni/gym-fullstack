var express = require('express');
const router = express.Router();
const { getUsers, postUsers, deleteUserId, putUser } = require('../controllers/users.controllers')

//* GET users listing.
router.get('/', getUsers); 

//* POST users listing.
router.post('/', postUsers);

//*PUT user listing
router.put('/:user_id', putUser)

//* DELETE users listing.
router.delete('/:user_id', deleteUserId);

// router.get('/', function(req, res, next) {
//   res.send('respond with a resource');
// });

module.exports = router;
