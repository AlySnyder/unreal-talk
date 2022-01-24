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

    addFriend({ params }, res) {
        User.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({message: 'No User found with this id!'});
                return;
            }
        res.json(dbUserData);
        })
        .catch(err => res.status(500).json(err));
    },
   
    // delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({_id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        // .populate({path: 'friends', select: '-__v'})
        // .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No User found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
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

    // updateUser({ params, body }, res) {
    //     User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
    //         .then(dbUserData => {
    //             if (!dbUserData) {
    //                 res.status(404).json({ message: 'No user found with this id!' });
    //                 return;
    //             }
    //             res.json(dbUserData);
    //         })
    //         .catch(err => res.json(err));
    // },

    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true })
          .then(dbPizzaData => {
            if (!dbPizzaData) {
              res.status(404).json({ message: 'No pizza found with this id!' });
              return;
            }
            res.json(dbPizzaData);
          })
          .catch(err => res.status(400).json(err));
      },

    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },
};

module.exports = userController;