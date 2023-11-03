const autocannon = require('autocannon')

autocannon({
  url: 'http://localhost:3000/users/1/balance',
  connections: 100,
  pipelining: 100,
  duration: 5,
  method: 'POST',
  body: 'amount=-2',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  }
}, console.log)
