const {BASE_URL, USERID} = require('../constants.js');
const {id: userId} = require('./user.js');

class PhotoService {
	/**
	 * Sends a photo
	 * @return {Promise<Object>,<string>}
	 */
	static send(data) {
		return new Promise((resolve, reject) => {
			let url = BASE_URL.replace(USERID, userId) + 'image';
			fetch(url, {
				method: 'POST',
				headers: {
					'Accept': 'application/json, text/plain, */*',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					data: data
				})
			}).then(response => {
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

module.exports = PhotoService;
