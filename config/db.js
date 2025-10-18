const mongoose = require('mongoose');
//mongoose is the library of the mongodb and the node which is Object Data Modeling 
//used for the making the schema , handlerelation which the mongodb cannot give

const connectDB = async () => {
    try {
        mongoose.connect(process.env.URI);
        console.log("Database Successfully Connected");
    } catch (error) {
        console.log(`Error :${error.message}`);
    }
}
module.exports = connectDB;
//every file is treated like the module in the node