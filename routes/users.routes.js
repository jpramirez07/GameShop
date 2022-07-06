const express = require('express');

// Controllers
const {
	getAllUsers,
	createUser,
	updateUser,
	deleteUser,
	login,
} = require('../controllers/users.controllers');

// Middlewares
const {
	createUserValidators
} = require('../middlewares/validator.middleware');
const { userExist } = require('../middlewares/user.middleware');
const {
	protectSession,
	protectUserAccount,
} = require('../middlewares/auth.middleware');

const usersRouter = express.Router();

usersRouter.post('/', createUserValidators, createUser);

usersRouter.post('/login', login);

usersRouter.use(protectSession);

usersRouter.get('/', getAllUsers);

usersRouter
	.use('/:id', userExist).use(protectUserAccount)
	.route('/:id')
	.patch(updateUser)
	.delete(deleteUser);

module.exports = { usersRouter };
