require('dotenv').config();

const express = require('express');
const securityConfig = require('./middleware/securityconfig');
const notfound = require('./middleware/notfound');
const logger = require('./middleware/logger');
const socialmedia = require('./routes/socialmedia');


//SERVER SETUP
const server = express();
const port = process.env.PORT || 3000;


//SETUP MIDDLEWARE PRE
	//CORS-SECURITY
	server.use(securityConfig);

    //JSON
    server.use(express.json());

	//LOGGING  
	server.use(logger);


	//ROUTING STATIC
	server.use('/', express.static('./client/dist'));

	//ROUTING API
	server.use('/api/socialmedia', socialmedia);


//SETUP MIDDLEWARE POST
	//NOTFOUND/ERROR
	server.use(notfound);


//BOOT
server.listen(port, console.log(`server is now up and listening on port ${port}`));
