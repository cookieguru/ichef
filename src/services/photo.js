const constants = require('../constants.js');

class PhotoService {
	/**
	 * Sends a photo
	 * @return {Promise<undefined>,<string>}
	 */
	static send(data) {
		return new Promise((resolve, reject) => {
			fetch('https://freegeoip.net/json/', {
				method: 'POST',
				body: data
			}).then(function(response) {
				if(!response.ok) {
					reject(`Unable to upload photo: ${response.status} ${response.statusText}`);
				}
				return response.json();
			}).then(function(data) {
				resolve(data);
			});
		});
	}
}

module.exports = PhotoService;
