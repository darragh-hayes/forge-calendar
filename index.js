var config = require('./config')
var seneca = require('seneca')();

seneca.use('mongo-store', config.mongo);

seneca.use(require('./lib/calendar'));

seneca.listen(config.service);
