const mongoose = require('mongoose');

const connectDB = () => {
    mongoose
        .connect('mongodb://localhost:27017/factoryDB' || 'mongodb+srv://gamiDB:Yonky5qiV73GRKSA@cluster0.i3tyd7m.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log('Connected to factoryDB!'))
        .catch((error) => console.log(error));
};

module.exports = connectDB;


// 