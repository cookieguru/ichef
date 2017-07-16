const UserService = require('../services/user.js');

class UserPage {
	/**
	 * @param {function} callback Called upon successful registration
	 */
	factory(callback) {
		let page = new tabris.Page({
			title: 'Register for iChef',
		});

		let button = new tabris.Button({
			centerX: 0,
			top: 30,
			text: 'Register',
		}).on('tap', () => {
			indicator.visible = true;
			button.visible = false;
			UserService.register().then(() => {
				page.dispose();
				callback();
			}).catch((err) => {
				statusText.text = err;
				indicator.visible = false;
				button.visible = true;
			});
		}).appendTo(page);

		let indicator = new tabris.ActivityIndicator({
			centerX: 0,
			top: [button, 30],
			visible: false,
		});

		let statusText = new tabris.TextView({
			centerX: 0,
			top: [indicator, 0],
		});

		return page;
	}
}
module.exports = UserPage;
