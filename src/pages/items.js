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
					new ImagePage(this.navigationView).factory(cell.find('TextView').first().text, 'https://cdn.pixabay.com/photo/2016/12/04/23/36/eggs-1882837_960_720.jpg').appendTo(this.navigationView);
				});
				return cell;
			},
			updateCell: (cell, index) => {
				cell.find('TextView').first().text = items[index];
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
				new tabris.AlertDialog({
					title: 'It broke',
					message: error,
					buttons: {
						ok: 'OK',
					}
				}).open();
			}).then(() => {
				view.refreshIndicator = false;
				view.refreshMessage = '';
			});
		}

		return page;
	}
}
module.exports = ItemsListPage;
