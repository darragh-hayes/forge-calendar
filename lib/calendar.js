var series = require('fastseries')();
var moment = require('moment');

module.exports = function(options) {
	var seneca = this;

	seneca.add({role: 'calendar', cmd: 'save'}, save_workout);
	seneca.add({role: 'calendar' , cmd: 'log_exercise'}, log_exercise);
	seneca.add({role: 'calendar' , cmd: 'history'}, history);

	function save_workout(msg, cb) {
		seneca.make('sys/workout').data$({user: msg.user, date: msg.workout.date, exercises: msg.workout.exercises}).save$(cb);
	}

	function history(msg, cb) {
		seneca.make('sys', 'log').list$(msg, function(err, results) {
			cb(err, results);
		}); 
	}
}