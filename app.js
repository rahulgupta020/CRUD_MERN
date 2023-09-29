const express = require('express');
const app = express();
const tasks = require('./routes/tasks')
const connectDB = require('./db/connect')
require('dotenv').config()
const notfound = require('./middleware/notfound');
const errorhandle = require('./middleware/errorhandle');

// app.get('/home', (req, res)=>{
//     res.send("Home Page")
// })

app.use(express.json())
app.use('/api/v1/tasks', tasks)
app.use(notfound)
app.use(errorhandle)

const port = 5000
// app.listen(port, console.log(`Server is Listening on port ${port}`))
const startApp = async () =>{
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server is Listening on port ${port}`))
    } catch (error) {
        console.log("Something Went Wrong");
    }
}
startApp()