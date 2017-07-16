const PhotoService = require('../services/photo.js');
const {IMAGE_SIZE} = require('../constants.js');

class NewItemPage {
	factory() {
		navigator.camera.getPicture(/*success*/(imageData) => {
			tabris.ui.toolbarVisible = false;

			let navigationView = new tabris.NavigationView({
				left: 0, top: 0, right: 0, bottom: 0,
				drawerActionVisible: false,
			}).appendTo(tabris.ui.contentView);

			let page = new tabris.Page();

			new tabris.ActivityIndicator({
				centerX: 0,
				centerY: 0,
			}).appendTo(page);

			PhotoService.send(imageData).then(() => {
				//stub
			}).catch((message) => {
				new tabris.AlertDialog({
					title: 'It broke',
					message: message,
					buttons: {
						ok: 'OK',
					}
				}).on({
					closeOk: () => {
						page.dispose();
					}
				}).open();
			}).then(() => {
				tabris.ui.toolbarVisible = false;
				navigationView.dispose();
			})

		}, /*error*/(message) => {
			if(message === 'Camera cancelled.') {
				return;
			}
			new tabris.AlertDialog({
				title: 'It broke',
				message: message,
				buttons: {
					ok: 'OK',
				}
			}).on({
				closeOk: () => {
					page.dispose();
				}
			}).open();
		}, {
			destinationType: window.Camera.DestinationType.DATA_URL,
			quality: 70,
			allowEdit: false,
			sourceType: Camera.PictureSourceType.CAMERA,
			targetHeight: IMAGE_SIZE,
			targetWidth: IMAGE_SIZE,
			correctOrientation: true,
			saveToPhotoAlbum: false,
		});
	}
}

module.exports = NewItemPage;