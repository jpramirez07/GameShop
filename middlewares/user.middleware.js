const {User} = require('../models/user.model')

const {AppError} = require('../utils/appError.util')
const {catchAsync} = require('../utils/catchAsync.util')

const userExist = catchAsync(async (req, res, next) => {
    const {id} = req.params

    const user = await User.findOne({ where: {id} })

	if (user === null){
		return next(new AppError('User not found', 404))
	}

    req.user = user

    next()
})

module.exports = {userExist}