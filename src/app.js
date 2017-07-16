const BorderedCell = require('./components/bordered_cell.js');
const HomePage = require('./pages/home.js');
const ItemsListPage = require('./pages/items.js');
const NewItemPage = require('./pages/new_item.js');
const RecipePage = require('./pages/recipe.js');
const UserPage = require('./pages/user.js');
const UserService = require('./services/user.js');
const alert = require('./components/alert.js');

let navigationView = new tabris.NavigationView({
	left: 0, top: 0, right: 0, bottom: 0,
	drawerActionVisible: true,
}).appendTo(tabris.ui.contentView);


let pageNames = [
	'Add Ingredient',
	'My Ingredients',
	'Get Recipe',
];

new tabris.CollectionView({
	left: 0, top: 'prev()', right: 0, bottom: 0,
	itemCount: pageNames.length,
	createCell: () =>{
		let cell = new BorderedCell();
		new tabris.TextView({
			left: 17, centerY: 0,
			font: '14px Roboto Medium',
			textColor: '#212121',
		}).appendTo(cell);
		return cell;
	},
	updateCell: (cell, index) => {
		let page = pageNames[index];
		/** @type {BorderedCell} */
		cell.apply({
			TextView: {text: page},
		});
	},
	cellHeight: 48,
}).on('select', ({index}) => {
	tabris.ui.drawer.close();
	let name = pageNames[index];
	let page;
	if(name === 'My Ingredients') {
		page = new ItemsListPage(navigationView).factory();
	} else if(name === 'Add Ingredient') {
		page = new NewItemPage().factory();
	} else if(name === 'Get Recipe') {
		page = new RecipePage(navigationView).factory();
	}
	if(page) {
		page.appendTo(navigationView);
	}
}).appendTo(tabris.ui.drawer);

function registeredView() {
	navigationView.drawerActionVisible = true;
	tabris.ui.drawer.enabled = true;
	new HomePage(navigationView).factory().appendTo(navigationView);
}

if(UserService.isRegistered) {
	registeredView();
} else {
	navigationView.drawerActionVisible = false;
	tabris.ui.drawer.enabled = false;
	let page = new UserPage().factory(registeredView);
	page.appendTo(navigationView);
}