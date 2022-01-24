const router = require('express').Router();

const {
    addUser,
    getUserById,
    deleteUser,
    getAllUsers,
    addFriend,
    deleteFriend,
    updateUser,
} = require('../../controllers/user-controller');

// /api/user
router
    .route('/')
    .post(addUser)
    .get(getAllUsers);

router
    .route('/:id')
    .get(getUserById)
    .delete(deleteUser)
    .put(updateUser)

    router
    .route('/:id/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)

module.exports = router;
