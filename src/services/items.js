const {BASE_URL, USERID} = require('../constants.js');
const {id: userId} = require('./user.js');

class ItemsService {
	/**
	 * @return {Promise<object>,<string>}
	 */
	static get() {
		return new Promise((resolve, reject) => {
			let url = BASE_URL.replace(USERID, userId) + 'item';
			fetch(url).then(response => {
				if(!response.ok) {
					reject(`Unable to upload photo: ${response.status} ${response.statusText}`);
				}
				return response.json();
			}).then(data => {
				resolve(data);
			}).catch((error) => {
				reject(error);
			});
		});
	}
}

module.exports = ItemsService;
