const router = require('express').Router();

const {
    getUsers,
    createUser,
    getSingleUser,
    deleteUser,
    updateUser,
    addFriend,
    removeFriend,
} = require('../../controllers/userController.js');

// /api/users
router.route('/').get(getUsers).post(createUser);

// /api/users/:userId
router
    .route('/:userId')
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);


// /api/users/:userId/friends
router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(removeFriend);
module.exports = router;