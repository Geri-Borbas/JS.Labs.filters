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

var EPPZLayer = Class.extend
({
    construct: function(context, scene)
    {
        //<canvas> context to draw on.
        this.context = context;

        //Reference to the parent scene.
        this.scene = scene;

        //Samples.
        this.sampleWindowSize = 10;
        this.samples = [];
        for (var index = 0; index < this.sampleWindowSize; index++) { this.samples.push(new Point(0, 0)); }

        //Reference the topmost sample.
        this.sample = this.samples[0];
    },

    update: function(sample)
    {
        //Create a sample copy, stack to the sample window.
        this.samples.unshift(new Point(sample));
        this.samples.pop();

        //Reference the topmost sample.
        this.sample = this.samples[0];
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
        this.drawTextBox(this.samplesString(), 5, 26, 500, 20);
    },

    samplesString: function()
    {
        sampleString = '';
        this.samples.map(function(eachItem)
        { sampleString += eachItem.stringValue(); });
        return sampleString;
    },

    strokeToCurrentSample: function()
    {
        this.context.lineTo(this.sample.x, this.sample.y);
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
