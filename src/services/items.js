const constants = require('../constants.js');

class ItemsService {
	/**
	 * @return {Promise<object>,<string>}
	 */
	static get() {
		return new Promise((resolve, reject) => {
			let temp = [];
			for(let i = 0; i < 4; i++) {
				let text = '';
				let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

				for(let i = 0; i < 16; i++) {
					text += possible.charAt(Math.floor(Math.random() * possible.length));
				}

				temp.push(text);
			}
			resolve(temp);
		});
	}
}

module.exports = ItemsService;
