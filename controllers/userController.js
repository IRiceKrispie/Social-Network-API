const {User, Thought} = require('../models');

module.exports = {
    //Get all Users
    getUsers(req, res) {
        User.find()
            .then((users) => res.json(users))
            .catch((err) => res.status(500).json(err));
    },
    //get single user
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
          .select('-__v')
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with that ID' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    //createa a user
    createUser(req, res){
        User.create(req.body)
            .then((user) => res.json(user))
            .catch((err) => {console.log(err); return res.status(500).json(err);});
    },
    //Delete a user
    deleteUser(req, res) {
        User.findOneAndRemove({ _id: req.params.userId })
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No such user exists' })
              : Thought.findOneAndUpdate(
                  { thoughts: req.params.userId },
                  { $pull: { thoughts: req.params.userId } },
                  { new: true }
                )
          )
          .then((user) =>
            !user
              ? res.status(404).json({
                  message: 'User deleted, but no thoughts found',
                })
              : res.json({ message: 'User successfully deleted' })
          )
          .catch((err) => {
            console.log(err);
            res.status(500).json(err);
          });
      },
    //update a user
    updateUser(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $set: req.body },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    
    //add a friend
    addFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $addToSet: {friends: req.params.friendId} },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      },
    //remove friend
    removeFriend(req, res) {
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { $pull: { friends: req.params.friendId } },
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
};