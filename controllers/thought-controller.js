const { Thought, User } = require('../models');
const { param } = require('../routes');

const thoughtController = {
    // add thought to user
    addThought({ params, body }, res) {
        Thought.create(body)
            .then(({ dbThoughtData_id }) => {
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $push: { thoughts: dbThoughtData_id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                console.log(dbThoughtData);
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    getAllThoughts(req, res) {
        Thought.find({})
        .populate({
            path: 'reactions',
            select:'-__v'
        })
        .select('-__v')
        .sort({_id: -1 })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

      updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body,{ new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No thought found with this id!'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

      getThoughtById({ params}, res) {
          User.findOne({ _id: params.id })
          .populate({
              path: 'reactions',
              select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    // add reaction to thought
    addReaction({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $push: { reactions: body } },
            { new: true, runValidators: true }
        )
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // remove comment
    deleteThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
            .then(deletedThought => {
                if (!deletedThought) {
                    return res.status(404).json({ message: 'No thought with this id!' });
                }
                return User.findOneAndUpdate(
                    { _id: params.userId },
                    { $pull: { thoughts: params.thoughtId } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },
    // remove reaction
    deleteReaction({ params }, res) {
        Thought.findOneAndUpdate(
            { _id: params.reactionId },
            { $pull: { reactions: { reactionId: params.reactionId } } },
            { new: true }
        )
            .then(dbPizzaData => res.json(dbPizzaData))
            .catch(err => res.json(err));
    }
};

module.exports = thoughtController;