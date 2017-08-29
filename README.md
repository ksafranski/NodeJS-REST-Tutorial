# REST API's Using NodeJS and Express

1. Representational State Transfer & HTTP
2. Express - Basic Concepts
3. Middleware
4. Endpoints and Routing
5. Abstractions - Avoiding Repetition (DRY Code)
6. Request and Response Expectations
7. Adapters - Connecting to a Datasource
8. Models - Ensuring Data Consistency
9. Controllers - Processing Events
10. Implementation

## Representational State Transfer & HTTP

Inherently, HTTP transactions have no "state", e.g. an event is only available during the transaction and exists no longer than the transaction. As such, RESTful API's utilize HTTP request + response transactions to communicate data between services and consumers.

Hyper Text Transfer Protocol (HTTP) is used to communicate these transactions. RESTful services utilize routes, queries, bodies, headers, methods, and status-codes to create a meaningful interface/standard for these transactions.

### Example REST HTTP Requests & Responses

#### GET (Read All)

Get all items from resource `users`

**Request:**
```
Method:   GET
URL:      http://api.com/users
```

**Response:**
```
[
  {
    id: '1234567890'
    email: 'someone@email.com'
  }
  ...
]
```

#### GET (Read Item)

Get a specific item from resource `users`

**Request:**
```
Method:   GET
URL:      http://api.com/users/1234567890
```

**Response:**
```
{
  id: '1234567890',
  email: 'someone@email.com'
}
```

#### GET (Read via Query)

Get items from resource `users` based on query

**Request:**
```
Method:   GET
URL:      http://api.com/users?email=someone@email.com
```

**Response:**
```
[
  {
    id: '1234567890',
    email: 'someone@email.com'
  }
]
```

#### POST (Create Item)

Create a new item in resource `users`

**Request**
```
Method:   POST
URL:      http://api.com/users
Payload:
  {
    email: 'newuser@email.com'
  }
```

**Response:**
```
{
  id: '2345678901',
  email: 'newuser@email.com'
}
```

#### PUT (Update Item)

Updates an existing item in resource `users`

**Request:**
```
Method:   PUT
URL:      http://api.com/users/2345678901
Payload:
  {
    id: '2345678901',
    email: 'updateduser@email.com'
  }
```

**Response:**
```
{
  id: '2345678901',
  email: 'updateduser@email.com'
}
```

#### DELETE (Delete Item)

Removes an existing item in resource `users`


**Request:**
```
Method:   DELETE
URL:      http://api.com/users/1234567890
```

**Response:**
```
Ok
```

### Status Codes

It is imperative for consuming services of n API to understand context of a response immediately as this indicates to the consuming service how to process the response.

For example, a success (`200`) for a `POST` could indicate to the consumer that the record should be shown in an interface, whereas an invalid request (`400`) could indicate that the user interface should display verbiage to instruct a resolution to the error (e.g. validation error on an input).

#### Status Codes

**1×× Informational**
```
100 Continue
101 Switching Protocols
102 Processing
```

**2×× Success**
```
200 OK
201 Created
202 Accepted
203 Non-authoritative Information
204 No Content
205 Reset Content
206 Partial Content
207 Multi-Status
208 Already Reported
226 IM Used
```

**3×× Redirection**
```
300 Multiple Choices
301 Moved Permanently
302 Found
303 See Other
304 Not Modified
305 Use Proxy
307 Temporary Redirect
308 Permanent Redirect
```


**4×× Client Error**
```
400 Bad Request
401 Unauthorized
402 Payment Required
403 Forbidden
404 Not Found
405 Method Not Allowed
406 Not Acceptable
407 Proxy Authentication Required
408 Request Timeout
409 Conflict
410 Gone
411 Length Required
412 Precondition Failed
413 Payload Too Large
414 Request-URI Too Long
415 Unsupported Media Type
416 Requested Range Not Satisfiable
417 Expectation Failed
418 I'm a teapot
421 Misdirected Request
422 Unprocessable Entity
423 Locked
424 Failed Dependency
426 Upgrade Required
428 Precondition Required
429 Too Many Requests
431 Request Header Fields Too Large
444 Connection Closed Without Response
451 Unavailable For Legal Reasons
499 Client Closed Request
```


**5×× Server Error**
```
500 Internal Server Error
501 Not Implemented
502 Bad Gateway
503 Service Unavailable
504 Gateway Timeout
505 HTTP Version Not Supported
506 Variant Also Negotiates
507 Insufficient Storage
508 Loop Detected
510 Not Extended
511 Network Authentication Required
599 Network Connect Timeout Error
```
