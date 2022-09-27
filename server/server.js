const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = express()
const port = process.env.PORT || 4000
//const uri = process.env.MONGODB_URI;
const markerRoute = require('./routes/markers')
const userRoute = require('./routes/users')

dotenv.config()

app.use(express.json())

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    // useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB is connected')
  })
  .catch((err) => console.log(err))

app.use('/api/users', userRoute)
app.use('/api/markers', markerRoute)

app.listen(port, () => {
  console.log(`Server is listening on port: ${port}`)
})
