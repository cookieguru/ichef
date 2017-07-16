const {BASE_URL, USERID} = require('../constants.js');
const {id: userId} = require('./user.js');

let cache;
let seen = [];

class ItemsService {
	/**
	 * @return {Promise<object>,<string>}
	 */
	static get() {
		return new Promise((resolve, reject) => {
			if(seen.length === 0 || seen.length === cache.length) {
				let url = BASE_URL.replace(USERID, userId) + 'recipe';
				fetch(url).then(response => {
					if(!response.ok) {
						reject(`Unable to fetch recipes: ${response.status} ${response.statusText}`);
					}
					return response.json();
				}).then(data => {
					cache = data;
					resolve(getNextUnseenRecipe());
				}).catch((error) => {
					reject(error);
				});
			} else {
				resolve(getNextUnseenRecipe());
			}
		});
	}
}

function getNextUnseenRecipe() {
	for(let i in cache) {
		let recipe = cache[i].recipe;
		if(seen.includes(recipe.url)) {
			continue;
		}
		seen.push(recipe.url);
		return {
			title: recipe.label,
			image: recipe.image,
			url: recipe.url,
			ingredients: recipe.ingredientLines,
		};
	}
	seen.shift();
	return getNextUnseenRecipe();
}

module.exports = ItemsService;
