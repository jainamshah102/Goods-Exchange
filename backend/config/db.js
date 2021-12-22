const mongoose = require('mongoose')

async function connectDB() {
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,  
  })

  await mongoose.connection
    .on(
      'error',
      console.error.bind(console, '😱 CONNECTION ER:'.red.bold.bgYellow)
    )
    .once('open', () =>
      console.log(
        `🎉 🎉  DATABASE OK @ ${mongoose.connection.host.split('-')[0]} mongoDB`
          .cyan.bold
      )
    )
}

module.exports = connectDB
