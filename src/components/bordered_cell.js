const {BORDER_COLOR} = require('../constants.js');

class BorderedCell extends tabris.Composite {
	constructor() {
		super();
		this.append(new tabris.Composite({
			left: 0, right: 0, bottom: 0, height: 1,
			background: BORDER_COLOR,
		}));
	}
}

module.exports = BorderedCell;