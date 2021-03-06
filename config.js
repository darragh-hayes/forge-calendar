module.exports = {
  'mongo': {
    name: process.env.MONGO_NAME || 'forge',
    host: process.env.MONGO_HOST || '127.0.0.1',
    port: process.env.MONGO_PORT || 27017
  },
  'service': {
    host: process.env.CALENDAR_HOST || '127.0.0.1',
    port : process.env.CALENDAR_PORT || 9001
  }
}