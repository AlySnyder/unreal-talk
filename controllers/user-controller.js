const { Thought, User } = require('../models');

const userController = {
    // add user
    addUser({ params, body }, res) {
        User.create(body)
            .then(dbUserData => {
                console.log(dbUserData);
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },


    getAllUsers(req, res) {
        User.find({})
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },

    getUserById({ params, body }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select("-__v")
            .then(dbUserData => {
                console.log(dbUserData);
                res.json(dbUserData);
            })
            .catch(err => res.status(500).json(err));
    },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body,{ new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
};

module.exports = userController;