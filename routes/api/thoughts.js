import express from 'express';
import { getThoughts, getThoughtById, createThought, updateThought, deleteThought, createReaction, deleteReaction } from '../../controllers/thoughtsController.js';
const router = express.Router();

router.get('/', getThoughts);

router.get('/:id', getThoughtById);

router.post('/', createThought);

router.put('/:id', updateThought);

router.delete('/:id', deleteThought);

router.post('/:id/reactions', createReaction);

router.delete('/:id/reactions', deleteReaction);

export default router;