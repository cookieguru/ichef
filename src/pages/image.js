const BasePage = require('./base.js');

class ImagePage extends BasePage {
	/**
	 * @var {string} title
	 * @var {string} url
	 */
	factory(title, url) {
		let titleTextColor = this.navigationView.titleTextColor;
		let toolbarColor = this.navigationView.toolbarColor;
		tabris.ui.navigationBar.displayMode = 'hide';
		tabris.ui.statusBar.displayMode = 'hide';
		this.navigationView.titleTextColor = '#FFF';
		this.navigationView.toolbarColor = '#000';
		let page = new tabris.Page({
			title: title,
			background: '#000',
		}).on('dispose', () => {
			tabris.ui.navigationBar.displayMode = 'default';
			tabris.ui.statusBar.displayMode = 'default';
			this.navigationView.titleTextColor = titleTextColor;
			this.navigationView.toolbarColor = toolbarColor;
		});

		let activityIndicator = new tabris.ActivityIndicator({
			centerX: 0,
			centerY: 0,
		}).appendTo(page);

		new tabris.ImageView({
			top: 0, bottom: 0, left: 0, right: 0,
			scaleMode: 'fit',
			image: url,
		}).on('load', () => {
			activityIndicator.dispose();
		}).appendTo(page);

		return page;
	}
}
module.exports = ImagePage;
