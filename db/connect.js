const mongoose = require('mongoose');

const connectDB = (url) =>{
    return mongoose.connect(url)
}
module.exports = connectDB

// mongoose.connect(connectionString).then(()=>{
//     console.log("Connected To the DB");
// }).catch((err)=>{
//     console.log(`Error = ${err}`);
// })