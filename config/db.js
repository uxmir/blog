const mongoose = require('mongoose');
const connectToDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(` Database is connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(' There is something wrong in database connection:');
        console.error(error.message);
        process.exit(1);
    }
};
module.exports = connectToDB;