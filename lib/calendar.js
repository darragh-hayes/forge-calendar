'use strict';

module.exports = function(options) {
	const Seneca = this;

	Seneca.add({role: 'calendar', cmd: 'save_history'}, save_history);
	Seneca.add({role: 'calendar' , cmd: 'get_history'}, get_history);
	Seneca.add({role: 'calendar', cmd: 'get_sync_token'}, get_sync_token);

	function save_history(msg, cb) {
		//get the history
		get_history(msg, (err, response) => {
			if (err) {
				return cb(err); 
			}
			let history = response.history
			//create a new entity if there isn't one
			if (history) {
				console.log('Retreieved Existing Hisory', JSON.stringify(history, null, 2))
			}
			history = history || Seneca.make('sys', 'history');
			history.data$(
				{
					userId: msg.userId,
					workouts: msg.workouts
				}).save$((err, saved) => {
					//save it and update the token
					if (err) {
						console.log('ERROR SAVING HISTORY')
						return cb(err);
					}
					update_token(saved.data$().userId, (err, token) => {
						cb(err, {sync_token: token, history: history})
					});
				});
		})
	}

	function update_token(userId, cb) {
		//get token
		get_sync_token({userId: userId}, (err, token) => {
			if (err) {
				return cb(err);
			}
			//create a new entity if there isn't one
			token = token || Seneca.make('sys', 'sync_token');
			token.data$(
				{
					userId: userId,
					timestamp: Date.now()
				}).save$((err, saved) => {
					console.log('saved token', JSON.stringify(saved.data$(false), null, 2));
					cb(err, saved);
				});
		})
	}

	function get_sync_token(msg, cb) {
		console.log('Get Sync Token');
		Seneca.make('sys', 'sync_token').load$({userId: msg.userId}, (err, entity) => {
			console.log('Get Sync Token');
			console.log(err);
			console.log(entity)
			cb(err, entity);
		});
	}

	function get_history(msg, cb) {
		Seneca.make('sys', 'history').load$({userId: msg.userId}, (err, history) => {
			if (err) {
				return cb(err);
			}
			get_sync_token(msg, (err, token) => {
				cb(err, {history: history, sync_token: token});
			});
		}); 
	}
}