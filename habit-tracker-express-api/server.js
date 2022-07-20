const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const PORT = 3001;

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.get('/', (req,res) => {
    res.status(200).json("main habit tracker route works!")
})

app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`)
})