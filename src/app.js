const Mist = require('mist');
const React = require('react');

const Window = Mist.Window;

var windowJsx = (
	<Window title="Hello World" 
			className="hello-world"
			canResize={true} 
			initialX={undefined} 
			initialY={undefined} 
			initialHeight={600} 
			initialWidth={850} >
		HELLO WORLD
	</Window>
);
Mist.WindowManager.addWindow(windowJsx);

