const router = require('express').Router();

const {
    getThoughts,
    createThought,
    getSingleThought,
    deleteThought,
    updateThought,
    addThought,
} = require('../../controllers/thoughtController.js');

// /api/thoughts/
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:userId
router
    .route('/:userId/:thoughtId')
    .post(addThought);

// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);

module.exports = router;