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