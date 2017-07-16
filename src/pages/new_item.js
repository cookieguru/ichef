const alert = require('../components/alert.js');
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

			let page = new tabris.Page({
				title: 'Uploading...',
			}).appendTo(navigationView);

			new tabris.ActivityIndicator({
				centerX: 0,
				centerY: 0,
			}).appendTo(page);

			PhotoService.send(imageData).then((data) => {
				if(data.items.length) {
					alert('Uploaded image', 'Image has been uploaded; recognized as ' + data.items.join(', '));
				} else {
					alert('Uploaded image', 'Image has been uploaded but nothing was recognized');
				}
			}).catch((message) => {
				alert('Cannot upload image', message);
			}).then(() => {
				tabris.ui.toolbarVisible = true;
				navigationView.dispose();
			});
		}, /*error*/(message) => {
			if(message === 'Camera cancelled.') {
				return;
			}
			alert('Camera failed', message);
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