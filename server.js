require('dotenv').config();

const express = require('express');
const FbConnection = require('./persistence/thirdparty/fbConnection');


//SERVER SETUP
const server = express();
const port = process.env.PORT || 3000;

//CONNECTIONS SETUP
const fbConnection = new FbConnection(process.env.ACCESS_TOKEN);


//SETUP MIDDLEWARE PRE
//JSON
//LOGGING

//ROUTING STATIC
//ROUTING API

//SETUP MIDDLEWARE POST
//NOTFOUND/ERROR

server.get('/', (req, res) => {
  res.status(200).send({
    result: 'success',
    route: 'root',
    message: 'GET request to route successful'
  });
});

server.get('/test/:id', (req, res) => {
  res.status(200).send({
    result: 'success',
    route: 'test',
    id: req.params.id,
    message: `GET request to test with id ${req.params.id} successful`
  });
});

server.get('/fbdata/:type', (req, res) => {

  if(req.params.type === 'all') {
    fbConnection.retrieveData()
      .then(data => res.send(data))
      .catch(exc => res.send(exc));
  } 
  else if(req.params.type === 'likes') {
    fbConnection.retrieveLikes()
      .then(data => res.send(data))
      .catch(exc => res.send(exc));
  }
  else {
    res.status(404).send('404 - type not found');
  }
});


server.listen(port, console.log(`server is now up and listening on port ${port}`));