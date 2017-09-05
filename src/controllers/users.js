// Require the adapter so the datastore can be accessed
const Conn = require('../adapters/nedb')
// Require the userModel so data can be validated
const userModel = require('../models/user')
// Require errors
const errors = require('../lib/errors')

// Establish connection to datastore
const userCollection = new Conn('user')

// Users controller object contains all methods which are exported and used 
// by the service to process actions
const users = {
  /**
   * To create a user the `body` of the request must be validated, then
   * (if valid) inserted into the collection
   * @param {Object} req The request object
   * @returns {Promise.<Object>}
   */
  createUser: (req) => {
    return userModel.validate(req.body)
      .catch(errors.validation)
      .then((data) => {
        // Check if user with email address already exists
        return userCollection.find({ email: data.email })
          .then((found) => {
            // If found, throw 409 Conflict error
            if (found.length > 0) errors.conflict(`Email address ${data.email} already exists`)
            // If doesn't throw - returns data to be inserted in DB
            return data
          })
      })
      .then((data) => userCollection.insert(data))
  },
  /**
   * To get all users, the user collection is searched with no params
   * @returns {Promise.<Array>}
   */
  getAllUsers: () => userCollection.find({}),
  /**
   * To get a specific user, the collection is search by the id param passed
   * in the path parameters of the request
   * @param {Object} req The request object
   * @returns {Promise.<Object>}
   */
  getUserbyId: (req) => userCollection.findOne({ _id: req.params.id }),
  /**
   * To update a user account, the `body` must be validated, then an update 
   * call is made to the collection with the query using the `id` from the path
   * parameters and the `body` from the request
   * @param {Object} req The request object
   * @returns {Promise.<Object>}
   */
  updateUser: (req) => {
    return userModel.validate(req.body)
      .catch(errors.validation)
      .then((data) => userCollection.update({ _id: req.params.id }, data))
      .then(() => userCollection.findOne({ _id: req.params.id }))
  },
  /**
   * To delete a user record, the remove method of the collection is used with 
   * the query being the `id` from the request path parameters
   * @param {Object} req The request object
   * @returns {Promise.<String>}
   */
  deleteUser: (req) => {
    return userCollection.remove({ _id: req.params.id })
      .then(() => 'Ok')
  }
}

module.exports = users