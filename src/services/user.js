const constants = require('../constants.js');

class UserService {
	/**
	 * Registers a new user
	 * @return {Promise<int>,<string>}
	 */
	static register() {
		return new Promise((resolve) => {
			UserService.id = 1;
			resolve(1);
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
