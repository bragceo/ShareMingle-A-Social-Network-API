import User from '../models/User.js';
import Thought from '../models/Thought.js';

// @desc    Get users
// @route   GET /api/users
const getUsers = async (req, res) => {
    try {
        User.find({})
            .populate({
                path: "friends",
                select: "-__v",
            })
            .select("-__v")
            .then((result) => res.json(result))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get user by id
// @route   GET /api/users/:id
const getUserById = async (req, res) => {
    try {
        User.findOne({ _id: req.params.id })
            .populate({
                path: "friends",
                select: "-__v",
            })
            .populate({
                path: "thoughts",
                select: "-__v",
            })
            .select("-__v")
            .then((result) => res.json(result))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create user
// @route   POST /api/users
const createUser = async (req, res) => {
    try {
        User.create(req.body)
            .then((result) => res.json(result))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user
// @route   PUT /api/users/:id
const updateUser = async (req, res) => {
    try {
        User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((result) => res.json(result))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete user
// @route   DELETE /api/users/:id
const deleteUser = async (req, res) => {
    try {
        User.findOneAndDelete({ _id: req.params.id })
            .then((result) => {
                if (!result) {
                    return res.status(404).json({ message: "No user found with this id!" });
                }

                Thought.deleteMany({ username: result.username })
                    .then((result) => res.json(result))
                    .catch((err) => {
                        console.log(err);
                        res.sendStatus(400);
                    });
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Add friend
// @route   POST /api/users/:userId/friends/:friendId
const addFriend = async (req, res) => {
    try {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $addToSet: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then((result) => {
                if (!result) {
                    return res.status(404).json({ message: "No user found with this id!" });
                }

                const user1 = result;
                User.findOneAndUpdate(
                    { _id: req.params.friendId },
                    { $addToSet: { friends: req.params.userId } },
                    { new: true }
                )
                    .then((result) => {
                        if (!result) {
                            return res.status(404).json({ message: "No user found with this id!" });
                        }

                        const user2 = result;

                        res.json({ user1, user2 });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.sendStatus(400);
                    });
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// @desc    Delete friend
// @route   DELETE /api/users/:userId/friends/:friendId
const deleteFriend = async (req, res) => {
    try {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $pull: { friends: req.params.friendId } },
            { new: true, runValidators: true }
        )
            .then((result) => {
                if (!result) {
                    return res.status(404).json({ message: "No user found with this id!" });
                }

                const user1 = result;
                User.findOneAndUpdate(
                    { _id: req.params.friendId },
                    { $pull: { friends: req.params.userId } },
                    { new: true }
                )
                    .then((result) => {
                        if (!result) {
                            return res.status(404).json({ message: "No user found with this id!" });
                        }

                        const user2 = result;

                        res.json({ user1, user2 });
                    })
                    .catch((err) => {
                        console.log(err);
                        res.sendStatus(400);
                    });
            })
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend };