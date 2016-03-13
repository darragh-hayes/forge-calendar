module.exports = function(options) {
	const Seneca = this;

	Seneca.add({role: 'calendar', cmd: 'save'}, save_workout);
	Seneca.add({role: 'calendar' , cmd: 'history'}, history);

	function save_workout(msg, cb) {
		Seneca.make('sys/workout').data$({user: msg.user, date: msg.workout.date, exercises: msg.workout.exercises}).save$(cb);
	}

	function history(msg, cb) {
		Seneca.make('sys', 'log').list$(msg, (err, results) => {
			cb(err, results);
		}); 
	}
}