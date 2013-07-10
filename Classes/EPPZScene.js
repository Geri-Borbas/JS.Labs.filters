/**
 *
 * Created by Borbás Geri on 7/6/13
 * Copyright (c) 2013 eppz! development, LLC.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 */

/*
    Scene with sampling mouse coordinates in a sample window.
 */

var EPPZScene = Class.extend
({
    construct: function(parameters)
    {
        //<div> reference.
        this.div = document.getElementById(parameters['divId']);
        this.topLeft = new Point(this.div.offsetLeft, this.div.offsetTop);

        //Dimensions.
        this.width = parameters['width'];
        this.height = parameters['height'];

        //Basic characteristics.
        this.sampleWindowSize = parameters['sampleWindowSize'] || 50;
        this.autoStopAtFrame = parameters['autoStopAtFrame'] || 0;

        //Animation.
        this.stopped = true;
        this.frame = 0;
        this.timer = null;
        this.fps = parameters['fps'] || 60; //Default.

        //Catch latest pointer movement.
        var _this = this;
        this.mousePosition = new Point();
        document.onmousemove = function(event) { _this.mouseMoved(event); }

        //Randomizer.
        this.mouseIsDown = false;
        this.randomRange = 60.0;
        document.onmousedown = function(event) { _this.mouseIsDown = true; }
        document.onmouseup = function(event) { _this.mouseIsDown = false; }

        //Root EPPZLayer.
        log('EPPZScene is this '+this);

        this.rootLayer = new EPPZLayer(this, 'root'); //Construct with scene, name, [color].

        log('EPPZScene created at '+this.topLeft.stringValue()+' with dimensions ['+this.width+','+this.height+'] running at '+this.fps+' fps.');
    },

    mouseMoved: function(event)
    {
        this.mousePosition.x = event.pageX - this.topLeft.x;
        this.mousePosition.y = event.pageY - this.topLeft.y;
    },

    randomizedMouseSampleIfNeeded: function()
    {
        var mousePosition = new Point(this.mousePosition);
        if (this.mouseIsDown)
        {
            var horizontalRandomOffset = this.randomRange / 2.0 - Math.random() * this.randomRange;
            var verticalRandomOffset = this.randomRange / 2.0 - Math.random() * this.randomRange;
            mousePosition.x += horizontalRandomOffset;
            mousePosition.y += verticalRandomOffset;
        }
        return mousePosition;
    },

    tick: function()
    {
        //Auto stop feature.
        shouldStopAtThisFrame = (this.autoStopAtFrame > 0 && this.frame >= this.autoStopAtFrame);
        if (shouldStopAtThisFrame) this.stop();

        this.frame++;

        //update() layer tree.
        this.rootLayer.update(this.randomizedMouseSampleIfNeeded());

        //render() layer tree.
        this.rootLayer.render();
    },

    clearLayers: function()
    {
        this.rootLayer.clearAlongSublayers();
    },

    //Animation.

        start: function()
        {
            var _this = this;
            log('EPPZScene start at '+this.fps+' fps.');
            this.timer = setInterval(function(){ _this.tick(); }, 1000.0 / this.fps);
        },

        stop: function()
        {
            clearInterval(this.timer);
            this.frame = 0;
        }

});