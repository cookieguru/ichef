const constants = require('../constants.js');

class UserService {
	/**
	 * Registers a new user
	 * @return {Promise<undefined>,<string>}
	 */
	static register() {
		return new Promise((resolve, reject) => {
			fetch('https://freegeoip.net/json/').then((response) => {
				if(!response.ok) {
					reject(`Unable to register: ${response.status} ${response.statusText}`);
				}
				return response.json();
			}).then((json) => {
				UserService.id = json.metro_code;
				resolve();
			}).catch((err) => {
				reject(err);
			});
		});
	}

	static get id() {
		return localStorage.getItem(constants.USERID);
	}

	static get isRegistered() {
		let id = localStorage.getItem(constants.USERID);
		return id !== null && id !== '';
	}

	static set id(id) {
		localStorage.setItem(constants.USERID, id);
	}
}

module.exports = UserService;
