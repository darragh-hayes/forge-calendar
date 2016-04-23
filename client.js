'use strict';

const Seneca = require('seneca')();
const Config = require('./config')

Seneca.client({port: Config.service.port});
console.log('Client')

let workouts = {
    data: 'this is the users workouts'
} 

Seneca.act({role: 'calendar', cmd: 'save_history', workouts: workouts, userId: '12345'}, (err, results) => {
  console.log(err);
  // console.log(JSON.stringify(results, null, 2))
  console.log(JSON.stringify(results.sync_token, null, 2))
  results.history.workouts.data = 'New Updated workouts';
  console.log(JSON.stringify(results.history, null, 2))
  Seneca.act({role: 'calendar', cmd: 'save_history', workouts: results.history.workouts, userId: '12345'}, (err, results) => {
    console.log(err);
    console.log(JSON.stringify(results.sync_token, null, 2))
  })
})

Seneca.act({role: 'calendar', cmd: 'get_sync_token', userId: '12345'}, (err, results) => {
  console.log(err)
  console.log(JSON.stringify(results, null, 2))
})