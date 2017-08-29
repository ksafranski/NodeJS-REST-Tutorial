const express = require('express')
const bodyParser = require('body-parser')
const requireDir = require('require-dir')
const cors = require('cors')
const routes = require('../routes.json')

// Set static PORT as env var or default to 9999
const PORT = process.env.PORT || 9999

// Create new express app
const app = express()

// Use JSON body-parser
app.use(bodyParser.json())

// Enable Cross-Origin Resource Sharing for all endpoints
app.use(cors())

// Get all controllers using requireDir to load from ./controllers
const controllers = requireDir('./controllers')

// Build API endpoints dynamically from routes
// ---
// Step 1. Iterate over all routes (root-level)
Object.keys(routes).forEach((path) => {
  // Step 2. Iterate over paths
  Object.keys(routes[path]).forEach((method) => {
    // Step 3. Pull controller and handler properties for each endpoint
    const { controller, handler } = routes[path][method]
    // Step 4. Build endpoint, ex: app.get(/some/path, (req, res) => ...)
    app[method](path, (req, res) => {
      // Step 5. When a route is hit, call the handler method on the controller
      controllers[controller][handler](req)
        // Step 6. When a controller resolves, respond with 200 and data
        .then((data) => {
          res.status(200).send(data)
        })
        // Step 7. If a controller rejects, handle error response
        .catch((err) => {
          res.status(err.statusCode || 500).send(err.message)
        })
    })
  })
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})