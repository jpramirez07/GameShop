const dotenv = require('dotenv');

// Models
const { Games } = require('../models/game.model');
const { Consoles } = require('../models/console.model');
const { Reviews } = require('../models/review.model');
const { gamesInConsoles } = require('../models/gameInConsole.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');

// Gen secrets for JWT, require('crypto').randomBytes(64).toString('hex')

dotenv.config({ path: './config.env' });

const getAllGames = catchAsync(async (req, res, next) => {
	const games = await Games.findAll({ 
        include: [ { model: Consoles }, { model: Reviews }]
    });

	res.status(200).json({
		status: 'success',
		games,
	});
});

const createGames = catchAsync(async (req, res, next) => {
	const { title, genre } = req.body;

	const newGame = await Games.create({
		title,
        genre
	});

	res.status(201).json({
		status: 'success',
		newGame,
	});
});

const updateGames = catchAsync(async (req, res, next) => {
	const { game } = req;
	const { title } = req.body;

	await game.update({ title });

	res.status(204).json({ status: 'success' });
});

const deleteGames = catchAsync(async (req, res, next) => {
	const { game } = req;

	// await user.destroy();
	await game.update({ status: 'deleted' });

	res.status(204).json({ status: 'success' });
});

const createReviews = catchAsync(async (req, res, next) => {
	const { comment } = req.body
    const { sessionUser, game } = req

	const newReview = await Reviews.create({
		comment,
        gameId: game.id,
        userId: sessionUser.id
	});

	res.status(201).json({
		status: 'success',
		newReview,
	});
});

const assignGameToConsole = catchAsync(async (req, res, next) => {
	const { gameId, consoleId } = req.body;

	const gameInConsole = await gamesInConsoles.create({ gameId, consoleId });

	res.status(201).json({
		status: 'success',
		gameInConsole,
	});
});

module.exports = {
	getAllGames,
	createGames,
	updateGames,
	deleteGames,
    createReviews,
	assignGameToConsole
};