# REST API's Using NodeJS and Express

## Representational State Transfer & HTTP

Inherently, HTTP transactions have no "state", e.g. an event is only available during the transaction and exists no longer than the transaction. RESTful API's utilize HTTP request + response transactions to communicate data between services and consumers.

Hyper Text Transfer Protocol (HTTP) is used to communicate these transactions. RESTful services utilize routes, queries, bodies, headers, methods, and status-codes to create a meaningful interface/standard for these transactions.

**The core goal of REST services is to provide Create, Read, Update and Delete (CRUD) mechanisms on a resource. A well-designed REST API utilizes the components of HTTP requests & responses to provide a consistent, meaningful syntax for performing CRUD operations.**

### Methods

HTTP request methods indicate to a service what action should be performed on a resource.

| METHOD   | ACTION                                              |
|----------|-----------------------------------------------------|
| `GET`    | (R) Retrieve from a resource                        |
| `POST`   | (C) Add to a resource                               |
| `PUT`    | (U) Replace an item (full update) in a resource     |
| `PATCH`  | (U) Replace data in an item (partial) in a resource |
| `DELETE` | (D) Remove an item from a resource                  |

### Path Paramaters and Queries

Path parameters and queries are used to indicate the target of an action on a REST API.

```
<protocol>://<domain>/<resource>/<parameter>?<query>
```

**Examples:**

```
>> Use HTTPS protocol to connect to `api.com` and interact with the `users` resource:

https://api.com/users

>> Use HTTPS protocol to connect to `api.com` and interact with the `users` resource, specifically the item with id `12345`

https://api.com/users/12345

>> Use HTTPS protocol to connect to `api.com` and interact with `users` resource, specifically those with property `type` of `admin`

https://api.com/users?type=admin
```

### Headers

Headers provide a method for communicating specifics on an action that cannot be expressed with the method or the path.

Headers can send a variety of information to a REST API, from authentication to resource-specific instructions

**Examples:**

```
{
  Content-Type: 'application/json',
  Authorization: 'Bearer KDIN73dDJi83jk9WKs99djSSSKs',
  x-limit: 10,
  x-start-record: '56789'
}
```

The above headers indiacte the following:

1. Content sent will be in JSON format
2. Authorization will be done with the included `Bearer` token
3. Limit response to 10 items
4. Start pagination at record with id `56789`

There are a myriad of standard HTTP headers (`Content-Type` and `Authorization` in the above example). Non-standard headers are represented with a prefix, typically `x-`.

Response headers are also important. A response header could include information like `x-last-record`. If the above example were used in a situation where results from a search were being paginated, the consumer would utilize `x-last-record` to indicate the next requests `x-start-record` in order to preserve the "state" of the pagination action.

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
