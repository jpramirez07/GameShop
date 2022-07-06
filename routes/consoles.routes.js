const express = require('express');

// Controller
const {
	getAllConsoles,
    createConsole,
    updateConsole,
    deleteConsoles
} = require('../controllers/consoles.controller');

// Middlewares
const { consoleExists } = require('../middlewares/console.middleware')
const { protectSession } = require('../middlewares/auth.middleware');

const consoleRouter = express.Router();

consoleRouter.get('/', getAllConsoles)

consoleRouter.use(protectSession);

consoleRouter.post('/', createConsole);

consoleRouter
	.use('/:id', consoleExists)
	.route('/:id')
	.patch(updateConsole)
	.delete(deleteConsoles);

module.exports = { consoleRouter };