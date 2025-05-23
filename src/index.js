const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

const encodedPassword = encodeURIComponent(process.env.MONGO_PASS);

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0.dnrabjd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`)
    
    .then(() => {
        console.log('Connect DB success!');
    })
    .catch((err) => {
        console.log(err);
    });
    

app.get('/', (req, res) => {
    res.send('Hello World!, I am a simple Express server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
