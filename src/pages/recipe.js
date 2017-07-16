const BasePage = require('./base.js');
const BorderedCell = require('../components/bordered_cell.js');
const WebViewPage = require('./webview.js');

const margin = 16;

class RecipePage extends BasePage {
	factory() {
		this.page = new tabris.Page({
			title: 'Loading'
		});

		let imageContainer = new tabris.Composite({
			height: Math.floor(screen.height / 4),
			left: 0,
			right: 0,
		}).appendTo(this.page);

		let activityIndicator = new tabris.ActivityIndicator({
			centerX: 0,
			centerY: 0,
		}).appendTo(imageContainer);

		new tabris.ImageView({
			id: 'image',
			top: 0, bottom: 0, left: 0, right: 0,
			scaleMode: 'fill',
		}).on('load', () => {
			console.log('image loaded');
			activityIndicator.dispose();
		}).appendTo(imageContainer);

		let button = new tabris.Button({
			text: 'Giddy up',
			bottom: margin, left: margin / 2, right: margin / 2,
			visible: false,
		}).on('tap', (evt) => {
			new WebViewPage(this.navigationView).factory(this.page.title, evt.target.data.url).appendTo(this.navigationView);
		}).appendTo(this.page);

		this.ingredientsView = new tabris.CollectionView({
			left: 0, top: [imageContainer, margin], right: 0, bottom: [button, margin],
			itemCount: 0,
			refreshIndicator: true,
			refreshMessage: 'loading...',
			cellHeight: 30,
			createCell: () => {
				let cell = new BorderedCell();
				new tabris.TextView({
					left: margin, centerY: 0, right: margin,
				}).appendTo(cell);
				return cell;
			},
			updateCell: (cell, index) => {
				cell.apply({
					TextView: {text: this.items[index]}
				});
			}
		}).appendTo(this.page);

		this._loadData();

		return this.page;
	}

	_loadData() {
		const data = require('./data.json');
		setTimeout(() => {
			this._setData(data.label, data.image, data.url, data.ingredientLines);
		}, 1234);
	}

	/**
	 * @var {string} title
	 * @var {string} image
	 * @var {string} url
	 * @var {string[]} ingredients
	 */
	_setData(title, image, url, ingredients) {
		this.items = ingredients;
		this.ingredientsView.insert(0, ingredients.length);
		this.page.title = title;
		this.page.apply({
			'#image': {
				image: {
					src: image,
				}
			},
			CollectionView: {
				refreshIndicator: false,
				refreshMessage: '',
			},
			Button: {
				visible: true,
			}
		});
		this.page.find('Button').first().data.url = url;
	}
}
module.exports = RecipePage;
