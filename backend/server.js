const app = require('./app');
const connectDatabase = require('./config/database')
const dotenv = require('dotenv');
const cloudinary = require('cloudinary');

/**
 * Handle Uncaught Exception
 */
process.on('uncaughtException', err => {
    console.log(`Message: ${err.message}`);
    console.log(`Error: ${err.stack}`);
    console.log('Shuting down server due to uncaught Exception');
    process.exit(1);
})
/**
 * setting up config file
 */
dotenv.config({ path: 'backend/config/config.env' });
/**
 * connect Database
 */
connectDatabase();

/**
 * Setting up cloudinary configuration
 */
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true
})


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on the PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
});
/**
 * Handle Unhandled Promise Rejection
 */
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    console.log('Shuting down the server due to Unhandled Promise Rejection');
    server.close(() => {
        process.exit(1);
    })
});