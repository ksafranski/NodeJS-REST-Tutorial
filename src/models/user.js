const obey = require('obey')

const user = obey.model({
  _id: { type: 'string', description: 'Unique identifier for user' },
  email: { type: 'email', required: true, description: 'Email address of user' },
  password: { type: 'string', required: true, min: 6, description: 'Password for user' }
})

module.exports = user
