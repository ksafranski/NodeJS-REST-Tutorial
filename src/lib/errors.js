const errors = {
  /**
   * For Obey model validation errors return the error's `collection`
   * array and set statusCode to 400
   * @param {Object} err The validation error object
   */
  validation: (err) => {
    const validationError = new Error(JSON.stringify(err.collection))
    validationError.statusCode = 400
    throw validationError
  },
  /**
   * For 409 Conflict errors
   * @param {String} reason The conflict to resolve
   */
  conflict: (reason) => {
    const conflictError = new Error(reason)
    conflictError.statusCode = 409
    throw conflictError
  }
}

module.exports = errors