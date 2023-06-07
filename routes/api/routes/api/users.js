import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, addFriend, deleteFriend } from '../../controllers/userController.js';
const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUserById);

router.post('/', createUser);

router.put('/:id', updateUser);

router.delete('/:id', deleteUser);

router.post('/:userId/friends/:friendId', addFriend);

router.delete('/:userId/friends/:friendId', deleteFriend);

export default router;