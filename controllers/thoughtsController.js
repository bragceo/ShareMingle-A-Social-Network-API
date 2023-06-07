import Thought from '../models/Thought.js';
import User from '../models/User.js';

// @desc    Get thoughts
// @route   GET /api/thoughts
const getThoughts = async (req, res) => {
    try {
        Thought.find({})
            .populate({
                path: "reactions",
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

// @desc    Get thought by id
// @route   GET /api/thoughts/:id
const getThoughtById = async (req, res) => {
    try {
        Thought.findOne({ _id: req.params.id })
            .populate({
                path: "reactions",
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


// @desc    Create thought
// @route   POST /api/thoughts
const createThought = async (req, res) => {
    try {
        Thought.create(req.body)
            .then((result) => {
                User.findOneAndUpdate(
                    { _id: req.body.userId },
                    { $push: { thoughts: result._id } },
                    { new: true, runValidators: true }
                )
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

// @desc    Update thought
// @route   PUT /api/thoughts/:id
const updateThought = async (req, res) => {
    try {
        Thought.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true, runValidators: true })
            .then((result) => res.json(result))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete thought
// @route   DELETE /api/thoughts/:id
const deleteThought = async (req, res) => {
    try {
        Thought.findOneAndDelete({ _id: req.params.id })
            .then((result) => {
                User.findOneAndUpdate(
                    { username: result.username },
                    { $pull: { thoughts: result._id } },
                    { new: true, runValidators: true }
                )
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

// @desc    Create reaction
// @route   POST /api/thoughts/:id/reactions
const createReaction = async (req, res) => {
    try {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $addToSet: { reactions: req.body } },
            { new: true, runValidators: true }
        )
            .then((result) => res.json(result))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete reaction
// @route   DELETE /api/thoughts/:id/reactions
const deleteReaction = async (req, res) => {
    try {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.body.reactionId } } },
            { new: true, runValidators: true }
        )
            .then((result) => res.json(result))
            .catch((err) => {
                console.log(err);
                res.sendStatus(400);
            });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export { getThoughts, getThoughtById, createThought, updateThought, deleteThought, createReaction, deleteReaction };