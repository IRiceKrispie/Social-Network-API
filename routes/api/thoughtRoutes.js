const router = require('express').Router();

const {
    getThoughts,
    createThought,
    getSingleThought,
    deleteThought,
    updateThought,
    addThought,
    removeThought,
    addReaction,
    deleteReaction,
} = require('../../controllers/thoughtController.js');

// /api/thoughts/
router.route('/').get(getThoughts).post(createThought);

// /api/thoughts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);    
// /api/thoughts/:userId/:thoughtId
router
    .route('/:userId/:thoughtId')
    .post(addThought)
    .delete(removeThought);



    
// /api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getSingleThought)
    .put(updateThought)
    .delete(deleteThought);



module.exports = router;