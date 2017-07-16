/**
 * Shows an alert dialog
 * @param {string} title
 * @param {string} message
 * @param {function} [callback]
 */
module.exports = function(title, message, callback) {
	let dialog = new tabris.AlertDialog({
		title: title,
		message: message,
		buttons: {
			ok: 'OK',
		}
	});
	if(typeof callback === 'function') {
		dialog.on({
			closeOk: () => {
				callback();
			}
		});
	}
	dialog.open();
};
