process.on('uncaughtException', err => {
    console.log('UNHANDLED Exception! Shutting down...')
    console.log(err.name, err.message)
    process.exit(1)
})


const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config({path:'backend/config'})

const DB = process.env.MONGO_URL;

const app = require('./app')

mongoose.connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => console.log("DB connection established"));


const port = process.env.PORT || 5000;
const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

process.on("unhandledRejection", err => {
    console.log('UNHANDLED REJECTION! Shutting down...')
    console.log(err.name, err.message)
    server.close(()=>{
        process.exit(1)
    })
})


