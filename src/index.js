const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.get('/', (req, res) => {
    res.send('Hello World!, I am a simple Express server!');
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});