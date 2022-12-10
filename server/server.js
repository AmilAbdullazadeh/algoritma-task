const http = require('http');
const express = require('express');
const cors = require('cors');

// import `items` from `routes` folder
const itemsRouter = require('../routes/items');

// create new app
const app = express();
// for cors error
app.use(cors());
app.use(express.json());

/* this '/items' URL will have two end-points:
→ localhost:4000/orders/ (this returns array of objects)
→ localhost:4000/orders/:id (this returns single object)
*/
app.use('/orders', itemsRouter);

// default URL to API
app.use('/', function(req, res) {
    res.send('node mock api works !');
});

const server = http.createServer(app);
const port = 4000;
server.listen(port);
console.debug('Server listening on port ' + port);

