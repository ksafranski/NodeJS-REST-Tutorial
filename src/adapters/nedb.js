const Datastore = require('nedb-promises')
const path = require('path')

/**
 * Creates a new instance of datastore from collection file
 * @param {String} name The name of the collection
 */
module.exports = function(name) {
  return new Datastore(path.resolve(__dirname, `../../data/${name}`))
} 
