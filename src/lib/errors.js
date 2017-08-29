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
  }
}

module.exports = errors