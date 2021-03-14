// ----------- Imports
import config from './../config/config'
import app from './express'
import mongoose from 'mongoose'

// ---------- DB setup & connection
// setup
mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, dbName: 'users' })
// test conection
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

// ---------- express server setup
app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', config.port)
})
