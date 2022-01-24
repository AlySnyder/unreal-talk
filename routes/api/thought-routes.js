const router = require('express').Router();

const {
    getAllThoughts,
    addThought,
    getThoughtById,
    deleteThought,
    updateThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thought-controller');
const { getAllUsers } = require('../../controllers/user-controller');

// /api/thoughts
router
    .route('/')
    .post(addThought)
    .get(getAllThoughts);

// /api/thoughts/:id
router
    .route('/:id')
    .delete(deleteThought)
    .put(updateThought)
    .get(getThoughtById);

router
    .route('/:id/reactions')
    .post(addReaction);

router
    .route('/:id/reactions/:reactionId')
    .delete(deleteReaction)


module.exports = router;