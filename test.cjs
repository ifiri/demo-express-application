const autocannon = require('autocannon');
const fs = require('fs');

const responses = [];
let count = 0;

const instance = autocannon({
  url: 'http://localhost:3000/users/1/balance',
  connections: 100,
  pipelining: 10,
  amount: 100000,
  method: 'POST',
  body: 'amount=-2',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  setupClient: setupClient
}, console.log);

instance.on('response', () => count++);
instance.on('done', handleResults);

function setupClient (client) {
  client.on('body', response => responses.push('', response.toString()));
};

function handleResults() {
  responses.push('', 'Total responses: ' + count);

  fs.writeFile('./results.log', responses.join("\r\n"), err => {
    if (err) {
      console.error(err);
    }
  });
};
