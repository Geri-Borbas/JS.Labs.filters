debugging = true;
fps = 60.0;

//EPPZScene.
var EPPZScene = Class.extend
({
    construct: function(autoStopFrameLimit)
    {
        log('EPPZScene construct');

        //<canvas> collection.
        this.layers = [];

        //Counter.
        this.autoSuspendFrameLimit = autoStopFrameLimit;
        this.stopped = true;
        this.frame = 0;

        //Catch pointer movement.
        var _this = this;
        this.mousePosition = new Point();
        document.onmousemove = function(event) { _this.mouseMoved(event); }

        //Animation.
        this.timer = null;
        this.fps = 60; //Default.
    },

    mouseMoved: function(event)
    {
        this.mousePosition.x = event.pageX;
        this.mousePosition.y = event.pageY;
    },

    addCanvasLayerWithId: function(canvasId, layerClass)
    {
        log('EPPZScene addCanvasWithId: '+canvasId);

        //Get <canvas> context.
        var canvas = document.getElementById(canvasId);
        if (canvas.getContext)
        {
            //Create EPPZCanvas, collect.
            var layer = new layerClass(canvas.getContext('2d'), this);
            this.layers.push(layer);
        }
    },

    tick: function()
    {
        if (this.stopped) return;

        shouldStop = (this.autoSuspendFrameLimit > 0 && this.frame >= this.autoSuspendFrameLimit);
        if (shouldStop) this.suspendAnimation();

        this.frame++;

        //Frame for each canvas.
        for (var eachCanvasIndex in this.layers)
        {
            eachLayer = this.layers[eachCanvasIndex];

            //update().
            eachLayer.update(this.mousePosition);

            //tick().
            this.layers[eachCanvasIndex].tick();
        }
    },

    //Animation.

        start: function()
        {
            var _this = this;
            log('start at '+this.fps);
            this.timer = setInterval(function(){ _this.tick(); }, 1000.0 / this.fps);
            this.resumeAnimation();
        },

        stop: function()
        {
            clearInterval(this.timer);
            this.suspendAnimation();
        },

        suspendAnimation: function()
        { this.stopped = true; this.frame = 0; },

        resumeAnimation: function()
        { this.stopped = false; }

});


//EPPZLayer.
var EPPZLayer = Class.extend
({
    construct: function(context, scene)
    {
        //Reference to the parent scene.
        this.scene = scene;

        //<canvas> context to draw on.
        this.context = context;

        //States.
        this.sampleWindowSize = 10;
        this.samples = [];
        this.cursor = new Point();
    },

    update: function(cursor)
    {
        this.cursor = cursor;

        if (this.samples.length >= this.sampleWindowSize)
        {
            this.samples.pop();
            this.samples.unshift(cursor);
        }
        else
        {
            this.samples.push(cursor);
        }
    },

    tick: function()
    {
        //Subclass template.
    },

    //Helpers.
    randomColor: function() { return "rgb("+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+","+Math.floor(Math.random()*256)+")"; },

    //Drawing methods.

        //Debug.

        drawTextBox: function(message, left, top, width, height)
        {
            //Defaults.
            width = width || 50;
            height = height || 20;

            //Box.
            this.context.fillStyle = "white";
            this.context.fillRect(left, top, width, height);

            //Text.
            this.context.fillStyle = "black";
            this.context.font = (height - 8) + "px Arial";
            this.context.fillText(message, left + 4, top + 4 + 11, width);
        },

        drawStamp: function()
        {
            //Debug stamps.
            this.drawFrames();
            this.drawSamples();
        },

        drawFrames: function() { this.drawTextBox(this.scene.frame, 5, 5); },

        drawSamples: function()
        {
            //log(this.samplesString());
            this.drawTextBox(this.samplesString, 5, 26, 290, 20);
        },

        samplesString: function()
        {
            sampleString = '';
            for (eachSampleIndex in this.samples)
            {
                eachSample = this.samples[eachSampleIndex];
                eachSampleString = '['+eachSample.x+','+eachSample.y+']';
                sampleString += eachSampleString;
            }
            return sampleString;
        },

    strokeToCurrentCursor: function()
    {
        this.context.lineTo(this.cursor.x, this.cursor.y);
        this.context.stroke();
    },

    redrawCurrentSampleWindow: function()
    {
        //Clear this frame.
        //this.context.clearRect(0, 0, 800, 800);

        //this.context.beginPath();
        this.context.strokeStyle = this.randomColor();

        for (eachSampleIndex in this.samples)
        {
            //Get neighbouring samples.
            eachSample = this.samples[eachSampleIndex];
            previousSample = (eachSampleIndex > 0) ? this.samples[eachSampleIndex - 1] : eachSample;

            //Line them.
            //this.context.moveTo(previousSample.x, previousSample.y);
            this.context.lineTo(eachSample.x, eachSample.y);
            this.context.stroke();
        }

        //Output.
        //this.context.stroke();
    }
});