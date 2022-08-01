const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { NotFoundError } = require('./utils/error');
const { PORT } = require('./config')
const { extractUserFromJwt } = require('./middleware/security')
const authRoutes = require('./routes/auth')
const habitRoutes = require('./routes/habits')
const statisticRoutes = require('./routes/stats')

const app = express();

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());

app.use(extractUserFromJwt)

app.use('/auth',authRoutes)
app.use('/habits', habitRoutes)
app.use('/stats', statisticRoutes);


app.get('/', (req,res) => {
    res.status(200).json("main habit tracker route works!")
})

//error handling
app.use((req,res,next) => {
    return (new NotFoundError)
})

app.use((err,req,res,next) => {
    const status = err.status || 500
    const message = err.message
  
    return res.status(status).json({
      error: {message,status}
    })
  })

app.listen(PORT, () => {
    console.log(`🚀 Server listening at http://localhost:${PORT}`)
})