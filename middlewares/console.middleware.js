// Models
const { Consoles } = require('../models/console.model');

// Utils
const { catchAsync } = require('../utils/catchAsync.util');
const { AppError } = require('../utils/appError.util');

const consoleExists = catchAsync(async (req, res, next) => {
	const { id } = req.params;

	const console = await Consoles.findOne({ where: { id } });

	if (!console) {
		return next(new AppError('Console not found', 404));
	}

	req.console = console;
	next();
});

module.exports = { consoleExists };
