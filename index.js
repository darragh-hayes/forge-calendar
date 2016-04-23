const Config = require('./config');
const Seneca = require('seneca')();

Seneca.use('mongo-store', Config.mongo);

Seneca.use(require('./lib/calendar'));

Seneca.listen(Config.service);
