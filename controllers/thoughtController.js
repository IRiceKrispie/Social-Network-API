const {User, Thought} = require('../models');

module.exports = {
    //Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    //createa a user
    createThought(req, res){
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {console.log(err); return res.status(500).json(err);});
    },
};