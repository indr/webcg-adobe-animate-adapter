(function (cjs, an) {

var p; // shortcut to reference prototypes
var lib={};var ss={};var img={};
lib.ssMetadata = [];


// symbols:
// helper functions:

function mc_symbol_clone() {
	var clone = this._cloneProps(new this.constructor(this.mode, this.startPosition, this.loop));
	clone.gotoAndStop(this.currentFrame);
	clone.paused = this.paused;
	clone.framerate = this.framerate;
	return clone;
}

function getMCSymbolPrototype(symbol, nominalBounds, frameBounds) {
	var prototype = cjs.extend(symbol, cjs.MovieClip);
	prototype.clone = mc_symbol_clone;
	prototype.nominalBounds = nominalBounds;
	prototype.frameBounds = frameBounds;
	return prototype;
	}


(lib.Symbol1 = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{});

	// Layer_1
	this.subtitle = new cjs.Text("with subtitle", "35px 'Times New Roman'");
	this.subtitle.name = "subtitle";
	this.subtitle.lineHeight = 41;
	this.subtitle.lineWidth = 494;
	this.subtitle.parent = this;
	this.subtitle.setTransform(2,67.55);

	this.shape = new cjs.Shape();
	this.shape.graphics.f("#EEEEEE").s().dr(-250,-20,500,40);
	this.shape.setTransform(250,84.1503,1,1.2075);

	this.f0 = new cjs.Text("Example lower third", "45px 'Times New Roman'", "#FFFFFF");
	this.f0.name = "f0";
	this.f0.lineHeight = 52;
	this.f0.lineWidth = 494;
	this.f0.parent = this;
	this.f0.setTransform(2,7.55);

	this.shape_1 = new cjs.Shape();
	this.shape_1.graphics.f("#0066CC").s().dr(-250,-29.7,500,59.4);
	this.shape_1.setTransform(250,29.675);

	this.timeline.addTween(cjs.Tween.get({}).to({state:[{t:this.shape_1},{t:this.f0},{t:this.shape},{t:this.subtitle}]}).wait(1));

}).prototype = getMCSymbolPrototype(lib.Symbol1, new cjs.Rectangle(0,0,500,108.3), null);


// stage content:
(lib.examplelowerthird = function(mode,startPosition,loop) {
if (loop == null) { loop = false; }	this.initialize(mode,startPosition,loop,{intro:1,label1:10,outro:20});

	// timeline functions:
	this.frame_0 = function() {
		console.log('Actions : Frame 1');
		
		// Keep in mind that actions defined on a frame are executed every time that frame is
		// about the be rendered. Have a look at the actions on the other layers.
		
		// Instead of spreading code on several layers, you could keep an Actions layer and keep
		// all the code here. What you can do is to keep a first frame played only once for example
		// to listen to webcg.on('data', function (data) { }); to update your instances.
		
		// Oh. Have I told you to publish this template and open it in your browser
		// with ?debug=true attached at the end? You will see a nice little interface to
		// test this template. Don't forget to open the browsers console to see all the logs.
		
		// Oh. Also have a look at the Script under Global...
		console.log('Date time : Frame 1');
		
		// The code here updates the dynamic text field in the top left corner. Everytime an
		// update, play, next or stop command is triggered, the text field is updated
		// with the current time and the commands name.
		
		// Keep a reference to the current MovieClip instance so
		// we don't have to bind our functions explicitly. This is some advanced JavaScript thing
		// that you don't really need to know. Just don't mess with the `this` variable.
		const that = this;
		
		// Define a function that takes one argument which will be appended to the current time
		function updateDateTime (text) {
			// dateTime is the instance name of the Dynamic Text element on the Date time layer
			that.dateTime.text = [new Date().toLocaleTimeString(), text].join(' - ');
		}
		
		// Call the function to set an initial value
		updateDateTime('hello');
		
		// Listen to update event and call updateDateTime
		webcg.on('update', function () {
			updateDateTime('update');
		});
		
		// Listen to play event and call updateDateTime
		webcg.on('play', function () {
			updateDateTime('play');
		});
		
		// Listen to next event and call updateDateTime
		webcg.on('next', function () {
			updateDateTime('next');
		});
		
		// Listen to stop event and call updateDateTime
		webcg.on('stop', function () {
			updateDateTime('stop');
		});
		console.log('Lower third : Frame 1');
		
		// Keep a reference to the current MovieClip instance so we don't have to bind our functions
		// explicitly the const that is already defined in "Date time : Frame 1". Adobe Animate
		// just tosses the frame scripts together.
		// const that = this;
		
		// Listen to the play event and log the this and that reference
		webcg.on('play', function () {
			// You will see in the browsers console that this and that is not the same thing!
			console.log('this', this);
			console.log('that', that);
			// this and that is not the same, because this anonymous function is not bound to 
			// the MovieClip instance
			console.log('this === that: ' + (this === that));
		});
		
		// Listen to the data event and update title (f0)
		webcg.on('data', function (data) {
			// If data is sent as template data XML format, f0 is an object with a property text.
			// If data is sent as JSON object, f0 is a string.
			var title = (data.f0.text || data.f0 || '');
			console.log('on data, updating title with: ' + title);
			
			// The adapter has a nice feature which automatically updates instance fields. Since
			// the title text fields' instance name is f0, the text property is automatically
			// updated. So even if you comment the next line, the title (f0) instance is still updated.
			// that.lowerThird.f0.text = title;
			
			// If you don't want webcg to automatically update instance fields such as text,
			// color etc, return true (for handled) here:
			// return true;
		});
	}
	this.frame_1 = function() {
		console.debug('Labels : Frame 2, (intro)');
		
		// Somewhere along the way I have noticed it's a good practice to have a separate layer
		// to keep your labels. The labels "intro" and "outro" are automatically played when you play
		// or stop your template (from CasparCG client via ACMP for example).
	}
	this.frame_10 = function() {
		console.log('Lower third : Frame 11');
		
		// Call this.stop() on the current MovieClip to stop after the outro animation
		// at the current frame.
		this.stop();
		
		// If instead you want to trigger the outro animation somewhere else in your template, you
		// have to tell the webcg-adobe-animate-adapter to stop so the adapter can update its internal
		// state and find the outro label and play it.
		// webcg.stop();
	}
	this.frame_20 = function() {
		console.log('Labels : Frame 21, (outro)');
	}

	// actions tween:
	this.timeline.addTween(cjs.Tween.get(this).call(this.frame_0).wait(1).call(this.frame_1).wait(9).call(this.frame_10).wait(10).call(this.frame_20).wait(11));

	// Date time
	this.dateTime = new cjs.Text("dateTime", "45px 'Times New Roman'");
	this.dateTime.name = "dateTime";
	this.dateTime.lineHeight = 52;
	this.dateTime.lineWidth = 1028;
	this.dateTime.parent = this;
	this.dateTime.setTransform(31.05,31.95);

	this.timeline.addTween(cjs.Tween.get(this.dateTime).wait(31));

	// Lower third
	this.lowerThird = new lib.Symbol1();
	this.lowerThird.name = "lowerThird";
	this.lowerThird.parent = this;
	this.lowerThird.setTransform(330,752.5,1,1,0,0,0,250,32.5);
	this.lowerThird._off = true;

	this.timeline.addTween(cjs.Tween.get(this.lowerThird).wait(1).to({_off:false},0).to({y:632.5},9).wait(10).to({alpha:0},10).wait(1));

}).prototype = p = new cjs.MovieClip();
p.nominalBounds = new cjs.Rectangle(669.1,390,391.9,438.29999999999995);
// library properties:
lib.properties = {
	id: '86FF306FC3E56E4C87286BC5940DBF61',
	width: 1280,
	height: 720,
	fps: 24,
	color: "#000000",
	opacity: 0.00,
	manifest: [],
	preloads: []
};



// bootstrap callback support:

(lib.Stage = function(canvas) {
	createjs.Stage.call(this, canvas);
}).prototype = p = new createjs.Stage();

p.setAutoPlay = function(autoPlay) {
	this.tickEnabled = autoPlay;
}
p.play = function() { this.tickEnabled = true; this.getChildAt(0).gotoAndPlay(this.getTimelinePosition()) }
p.stop = function(ms) { if(ms) this.seek(ms); this.tickEnabled = false; }
p.seek = function(ms) { this.tickEnabled = true; this.getChildAt(0).gotoAndStop(lib.properties.fps * ms / 1000); }
p.getDuration = function() { return this.getChildAt(0).totalFrames / lib.properties.fps * 1000; }

p.getTimelinePosition = function() { return this.getChildAt(0).currentFrame / lib.properties.fps * 1000; }

an.bootcompsLoaded = an.bootcompsLoaded || [];
if(!an.bootstrapListeners) {
	an.bootstrapListeners=[];
}

an.bootstrapCallback=function(fnCallback) {
	an.bootstrapListeners.push(fnCallback);
	if(an.bootcompsLoaded.length > 0) {
		for(var i=0; i<an.bootcompsLoaded.length; ++i) {
			fnCallback(an.bootcompsLoaded[i]);
		}
	}
};

an.compositions = an.compositions || {};
an.compositions['86FF306FC3E56E4C87286BC5940DBF61'] = {
	getStage: function() { return exportRoot.getStage(); },
	getLibrary: function() { return lib; },
	getSpriteSheet: function() { return ss; },
	getImages: function() { return img; }
};

an.compositionLoaded = function(id) {
	an.bootcompsLoaded.push(id);
	for(var j=0; j<an.bootstrapListeners.length; j++) {
		an.bootstrapListeners[j](id);
	}
}

an.getComposition = function(id) {
	return an.compositions[id];
}



})(createjs = createjs||{}, AdobeAn = AdobeAn||{});
var createjs, AdobeAn;