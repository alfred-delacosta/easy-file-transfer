const mongoose = require('mongoose');

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URL);
        console.log('Database connected.');
    } catch (error) {
        console.log('There was an error connecting to the database. See below');
        console.log(error);
    }
}

module.exports = connectDb;