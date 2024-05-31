const mongoose = require("mongoose");
const URI = "mongodb+srv://karthik8:daewoong@atlascluster.qxqoxmn.mongodb.net/?retryWrites=true&w=majority&appName=AtlasCluster";

const connectDB = async () => {
    await mongoose.connect(URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    });
    console.log("database successfully connected");
}

module.exports = connectDB;
