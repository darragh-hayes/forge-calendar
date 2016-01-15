var seneca = require('seneca')()
seneca.client()

var e = {user: 'Dara', name: 'dips', category : 'Resistance', id: 'dips_id', sets: [{weight: 15, reps: 10, unit :'lbs'}, {weight: 10, reps: 12, unit :'lbs'}]}
var e1 = {user: 'Dara', name: 'dips1', category : 'Resistance', id: 'dips_id', sets: [{weight: 15, reps: 10, unit :'lbs'}, {weight: 10, reps: 12, unit :'lbs'}]}
var e2 = {user: 'Dara', name: 'dips2', category : 'Resistance', id: 'dips_id', sets: [{weight: 15, reps: 10, unit :'lbs'}, {weight: 10, reps: 12, unit :'lbs'}]}
var e3 = {user: 'Dara', name: 'dips3', category : 'Resistance', id: 'dips_id', sets: [{weight: 15, reps: 10, unit :'lbs'}, {weight: 10, reps: 12, unit :'lbs'}]}

// seneca.act({role: 'calendar', cmd: 'log_exercise', user: 'Dara', exercise: e}, function(err, response) {
// 	console.log(response)
// });

// seneca.act({role: 'calendar', cmd: 'save', exercises: [e, e1, e2, e3]}, function(err, response) {
// 	console.log(err, response);
// })

seneca.act({role: 'calendar', cmd: 'history', user: 'Dara'}, function(err, response) {
	console.log(err, response);
})
