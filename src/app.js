const Mist = require('mist');
const React = require('react');

const Window = Mist.Window;

var file = process.argv[0];
var mimeType = Mist.File.getMimeType(file.name);
if (mimeType.indexOf('image/') === 0){
	file.getBinary().then(function(binary){
		var addWindow = function(base64data){
			var windowJsx = (
				<Window title="Image Viewer" 
						className="image-viewer"
						canResize={true} 
						initialX={undefined} 
						initialY={undefined} 
						initialHeight={600} 
						initialWidth={850} >
					<div style={{
						'width': '100%',
						'height': '100%',
						'backgroundImage':
							'url(data:' + file.getType() + ';base64,' + base64data + ')',
					    'backgroundSize': 'contain',
    					'backgroundRepeat': 'no-repeat',
					}} />
				</Window>
			);
			Mist.WindowManager.addWindow(windowJsx);
		};
		var base64promise = Binary.toBase64(binary);
		if (base64promise.then){
			base64promise.then(addWindow);
		} else {
			addWindow(base64promise);
		}
	});
}

