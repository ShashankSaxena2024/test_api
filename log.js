const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'server.log' }),
    new winston.transports.Console() // Optional: log to console as well
  ]
});

// Example usage:
logger.info('Server started');

const http = require('http');

const server = http.createServer((req, res) => {
  logger.info(`Request received: ${req.url}`);
  res.end('Hello World!');
});

server.listen(3000, () => {
  logger.info('Server listening on port 3000');
});