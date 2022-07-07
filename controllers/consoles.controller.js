const dotenv = require('dotenv');

// Models
const { Games } = require('../models/game.model');
const { Consoles } = require('../models/console.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

// Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')

dotenv.config({ path: './config.env' });

const getAllConsoles = catchAsync(async (req, res, next) => {
	const consoles = await Consoles.findAll({ 
        include: Games 
    });

	res.status(200).json({
		status: 'success',
		consoles,
	});
});

const createConsole = catchAsync(async (req, res, next) => {
	const { name, company } = req.body;

	const newConsole = await Consoles.create({
		name,
        company
	});

	res.status(201).json({
		status: 'success',
		newConsole,
	});
});

const updateConsole = catchAsync(async (req, res, next) => {
	const { console } = req;
	const { name } = req.body;

	await console.update({ name });

	res.status(204).json({ status: 'success' });
});

const deleteConsoles = catchAsync(async (req, res, next) => {
	const { console } = req;

	// await user.destroy();
	await console.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});


module.exports = {
	getAllConsoles,
	createConsole,
	updateConsole,
	deleteConsoles
};