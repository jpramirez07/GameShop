const dotenv = require('dotenv');

// Models
const { Games } = require('../models/game.model');
const { Consoles } = require('../models/console.model');
const { Reviews } = require('../models/review.model');

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

	const newGame = await User.create({
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
    const { sessionUser } = req
    const { gameId } = req.params

	const newReview = await Reviews.create({
		comment,
        gameId,
        userId: sessionUser.id
	});

	res.status(201).json({
		status: 'success',
		newReview,
	});
});

module.exports = {
	getAllGames,
	createGames,
	updateGames,
	deleteGames,
    createReviews
};