const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://devNeelesh:mongoDb1998@ac-1kpiwqz-shard-00-00.ufheuol.mongodb.net:27017,ac-1kpiwqz-shard-00-01.ufheuol.mongodb.net:27017,ac-1kpiwqz-shard-00-02.ufheuol.mongodb.net:27017/?ssl=true&replicaSet=atlas-n7qhbi-shard-0&authSource=admin&appName=Cluster0");
    console.log("Connected to DB");
  } catch (error) {
    console.error(error.message);
  }
};

module.exports = connectDb;
