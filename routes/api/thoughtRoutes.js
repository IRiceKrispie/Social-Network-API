const router = require('express').Router();

const {
    getThoughts,
    createThought,
} = require('../../controllers/thoughtController.js');

// /api/thoughts
router.route('/').get(getThoughts).post(createThought);