const BasePage = require('./base.js');

class HomePage extends BasePage {
	//noinspection JSMethodCanBeStatic
	factory() {
		let page = new tabris.Page({
			title: 'iChef'
		});

		new tabris.TextView({
			centerX: 0,
			text: 'Welcome!',
		}).appendTo(page);

		return page;
	}
}

module.exports = HomePage;