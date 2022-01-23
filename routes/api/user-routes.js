const router = require('express').Router();

const {
    addUser,
    getUserById,
    deleteUser,
    getAllUsers
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

module.exports = router;
