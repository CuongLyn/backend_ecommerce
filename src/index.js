const express = require('express');
const dotenv = require('dotenv');
const { default: mongoose } = require('mongoose');
const routes = require('./routes');
const bodyParser = require('body-parser');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(bodyParser.json())

routes(app);

mongoose.connect(`${process.env.MONGO_DB}`)
    
    .then(() => {
        console.log('Connect DB success!');
    })
    .catch((err) => {
        console.log(err);
    });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
