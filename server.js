const { app } = require('./app');

// Models
const { User } = require('./models/user.model');
const { Games } = require('./models/game.model');
const { Reviews } = require('./models/review.model');
const { Consoles } = require('./models/console.model');

// Utils
const { db } = require('./utils/database.util');

db.authenticate()
	.then(() => console.log('Db authenticated'))
	.catch(err => console.log(err));

// Establish model's relations

// 1 User <----> M Reviews
User.hasMany(Reviews, { foreignKey: 'userId' });
Reviews.belongsTo(User);

// 1 Game <----> M Reviews
Games.hasMany(Reviews, { foreignKey: 'gameId' });
Reviews.belongsTo(Games);

// M Games <----> M Consoles
Games.belongsToMany(Consoles, { foreignKey: 'gameId', through: 'gameInConsole' });
Consoles.belongsToMany(Games, { foreignKey: 'consoleId', through: 'gameInConsole' });

db.sync()
	.then(() => console.log('Db synced'))
	.catch(err => console.log(err));

app.listen(4000, () => {
	console.log('Express app running!!');
});
