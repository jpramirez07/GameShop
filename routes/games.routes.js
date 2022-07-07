const express = require('express');

// Controller
const {
	getAllGames,
    createGames,
    updateGames,
    deleteGames,
    createReviews
} = require('../controllers/games.controller');

// Middlewares
const { gameExists } = require('../middlewares/game.middleware')
const { protectSession } = require('../middlewares/auth.middleware');

const gameRouter = express.Router();

gameRouter.get('/', getAllGames)

gameRouter.use(protectSession);

gameRouter.post('/', createGames);

gameRouter.post('/reviews/:id', gameExists, createReviews)

gameRouter
	.use('/:id', gameExists)
	.route('/:id')
	.patch(updateGames)
	.delete(deleteGames);

module.exports = { gameRouter };