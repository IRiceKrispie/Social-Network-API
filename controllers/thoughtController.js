const {User, Thought} = require('../models');

module.exports = {
    //Get all thoughts
    getThoughts(req, res) {
        Thought.find()
            .then((thought) => res.json(thought))
            .catch((err) => res.status(500).json(err));
    },
    //get single thought
    getSingleThought(req, res){
        Thought.findOne({ _id: req.params.thoughtId })
          .select('-__v')
          .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with that ID' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
    },
    //createa a thought
    createThought(req, res){
        Thought.create(req.body)
            .then((thought) => res.json(thought))
            .catch((err) => {console.log(err); return res.status(500).json(err);});
    },
    //Delete a thought
    deleteThought(req, res){
        Thought.findOneAndRemove({ _id: req.params.thoughtId })
            .then((thought) =>
                !thought
                    ? res.status(404).json({message: 'No thought found'})
                    : res.json({message: 'Thought deleted'})
            )
            .catch((err) => {console.log(err); return res.status(500).json(err);});
        },
    //update a thought
    updateThought(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    
    //add thought to user
    addThought(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: {thoughts: req.params.thoughtId} },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      //remove thought from user
      removeThought(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { thoughts: req.params.thoughtId } },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res
                  .status(404)
                  .json({ message: 'No user found with that ID :(' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
      //add reaction to thought
      addReaction(req, res) {
        console.log('You are adding a reaction');
        console.log(req.body);
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $addToSet: { reactions: req.body } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
      //delete reaction from thought
      deleteReaction(req, res) {
        Thought.findOneAndUpdate(
          { _id: req.params.thoughtId },
          { $pull: { reactions: { reactionId: req.params.reactionId } } },
          { runValidators: true, new: true }
        )
          .then((thought) =>
            !thought
              ? res
                  .status(404)
                  .json({ message: 'No thought found with that ID :(' })
              : res.json(thought)
          )
          .catch((err) => res.status(500).json(err));
      },
};