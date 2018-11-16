const logger = require('./lib/logger');
logger.info('Starting server');

const express = require('express');

const cookieParser = require('cookie-parser');
// const bodyParser = require('body-parser');
const compression = require('compression');
const config = require('./config');

// global catch alls for errors
// TODO: kill app on error
process.on('uncaughtException', (e) => logger.fatal(e));
process.on('unhandledRejection', (e) => logger.fatal(e));

// create express instance
const app = express();

// setup sessions


// parse cookies and add compression
app.use(cookieParser()); 
app.use(compression());

app.use('/auth', require('./controllers/auth'));
require('./controllers/static')(app);

app.listen(config.server.port, () => {
  logger.info(`Server ready on port ${config.server.port}`);
});