const BasePage = require('./base.js');

class WebViewPage extends BasePage {
	/**
	 * @var {string} title
	 * @var {string} url
	 */
	factory(title, url) {
		let page = new tabris.Page({
			title: title,
		});

		let activityIndicator = new tabris.ActivityIndicator({
			centerX: 0,
			centerY: 0,
		}).appendTo(page);

		new tabris.WebView({
			top: 0, bottom: 0, left: 0, right: 0,
			url: url,
		}).on('load', () => {
			activityIndicator.dispose();
		}).appendTo(page);

		return page;
	}
}
module.exports = WebViewPage;
