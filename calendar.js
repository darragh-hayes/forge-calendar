var series = require('fastseries')();
var moment = require('moment');

module.exports = function(options) {
	var seneca = this;

	seneca.add({role: 'calendar', cmd: 'save'}, save_workout);
	seneca.add({role: 'calendar' , cmd: 'log_exercise'}, log_exercise);
	seneca.add({role: 'calendar' , cmd: 'history'}, history);

	function save_workout(msg, cb) {
		series({}, log_exercise, msg.exercises, done);

		function done(err, results) {
			if (err) {
				seneca.log.error("Error while saving workout logs", results);
			}
			else {
				seneca.log.info("Workout saved", results);
			}
			cb(err, results);
		}
	}

	function history(msg, cb) {
		if (msg.user) {
			var criteria = {user: msg.user}
			if (msg.date) { criteria.date = msg.date }
			seneca.make('sys', 'log').list$(criteria, function(err, results) {
				cb(err, results);
			});
		} 
	}
	/*
	{user: 'id', date: date, exercise: {name: 'pushup', category : 'weight/reps', id: 'pushup_id', sets: [{weight: 15, reps: 10, unit :'lbs'}]}},
	{name: 'running', type: 'distance/time', id: 'running_id', distance_unit: 'Km', time: 1234456, distance: 3}*/

	function log_exercise(e, cb) {
		seneca.make('sys', 'log')
						.data$({
							user: e.user,
							date: e.date || moment().format("MM-DD-YYYY"),
							exercise: {
								id: e.id,
								name: e.name,
								category: e.category,
								sets: e.sets
							}
							//need to determine cardio or resistance
						}).save$(cb);
	}
}