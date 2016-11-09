var isProduction = process.env.NODE_ENV === 'production';

if (isProduction) {
	module.exports = require('./config/webpack.pro.js');
} else {
	module.exports = require('./config/webpack.dev.js');
}