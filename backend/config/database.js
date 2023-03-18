const mongoose = require('mongoose');


const connectDatabase = () => {
    mongoose.set("strictQuery", true);
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        autoIndex: true, // Don't build indexes
        maxPoolSize: 20, // Maintain up to 10 socket connections
        serverSelectionTimeoutMS: 50000, // Keep trying to send operations for 5 seconds
        socketTimeoutMS: 95000, // Close sockets after 45 seconds of inactivity
        family: 4 // Use IPv4, skip trying IPv6
    }).then(con => {
        console.log(`MongoDB Database is connected with HOST: ${con.connection.host}`)
    })
}

module.exports = connectDatabase;