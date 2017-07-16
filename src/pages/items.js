const alert = require('../components/alert.js');
const BasePage = require('./base.js');
const BorderedCell = require('../components/bordered_cell.js');
const ImagePage = require('./image.js');
const ItemsService = require('../services/items.js');

class ItemsListPage extends BasePage {
	factory() {
		let page = new tabris.Page({
			title: 'My Ingredients',
		});

		let items = [];

		let view = new tabris.CollectionView({
			left: 0, top: 0, right: 0, bottom: 0,
			cellHeight: 40,
			refreshEnabled: true,
			createCell: () => {
				let cell = new BorderedCell();
				new tabris.TextView({
					top: 8, left: 8, right: 8, bottom: 8,
				}).appendTo(cell);
				cell.on('tap', () => {
					let textView = cell.find('TextView').first();
					new ImagePage(this.navigationView).factory(textView.text, textView.data.url).appendTo(this.navigationView);
				});
				return cell;
			},
			updateCell: (cell, index) => {
				let item = items[index];
				let textView = cell.find('TextView').first();
				textView.text = item.label;
				textView.data.url = item.imageUrl;
			}
		}).on('refresh', loadItems).appendTo(page);

		loadItems();

		function loadItems() {
			view.refreshIndicator = true;
			view.refreshMessage = 'Loading...';
			ItemsService.get().then((itms) => {
				items = itms;
				if(view.itemCount < items.length) {
					view.insert(0, items.length - view.itemCount);
				} else if(view.itemCount > items.length) {
					view.remove(0, view.itemCount - items.length);
				}
				view.refresh();
				view.reveal(0);
			}).catch((error) => {
				alert('Cannot load items', error);
			}).then(() => {
				view.refreshIndicator = false;
				view.refreshMessage = '';
			});
		}

		return page;
	}
}
module.exports = ItemsListPage;
