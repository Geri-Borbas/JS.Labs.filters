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
 Layer that visualizes samples.
 */

var EPPZLayer = Class.extend
({
    construct: function(canvas, scene)
    {
        //<canvas> reference.
        this.canvas = canvas;

        //Get context to draw on.
        if (canvas.getContext)
        { this.context = canvas.getContext('2d'); }

        //Reference to the parent scene.
        this.scene = scene;

        //Samples.
        this.sampleWindowSize = this.scene.sampleWindowSize;
        this.samples = [];

        //Reference the topmost sample.
        this.sample = this.samples[0];
    },

    //Animation frames.

        update: function(mousePositionSample)
        {
            //If window is empty, fill it up with the first sample.
            if (this.sample == null)
            {
                for (var index = 0; index < this.sampleWindowSize; index++)
                { this.samples.push(new Point(mousePositionSample)); }
            }

            //Create a sample copy, stack to the sample window.
            this.samples.unshift(new Point(mousePositionSample));
            this.samples.pop();

            //Reference the topmost sample.
            this.sample = this.samples[0];

            //Filter samples whether implemented.
            this.filter();
        },

        tick: function()
        {
            this.context.strokeStyle = this.color();
            this.context.fillStyle = this.color();
            this.render();
            this.drawStamp();
        },

    //Subclass templates.

        color: function()
        { return 'darkgrey'; },

        filter: function()
        { /* Subclass template. */ },

        render: function()
        {
            //Default implementation.
            this.renderSampleWindow();
            this.drawSampleCircle();
        },

    /*
        Drawing tools.
     */

        lineToSample: function()
        {
            //Simply a line towards the topmost sample.
            this.context.lineTo(this.sample.x, this.sample.y);
            this.context.stroke();
        },

        drawSampleCircle: function()
        {
            this.context.beginPath();
            this.context.arc(this.sample.x, this.sample.y, 5, 0, Math.PI * 2, true);
            this.context.fill();
        },

        renderSampleWindow: function()
        {
            //Clear frame.
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);

            //Create samples path.
            this.context.beginPath();
            this.context.moveTo(this.sample.x, this.sample.y);

            for (eachSampleIndex in this.samples)
            {
                eachSample = this.samples[eachSampleIndex];
                this.context.lineTo(eachSample.x, eachSample.y);
            }

            //Output.
            this.context.stroke();
        },

    /*
        Debug tools.
     */

        drawTextBox: function(message, left, top, width, height)
        {
            //Defaults.
            left = left || 0;
            top = top || 0;
            width = width || this.context.canvas.width;
            height = height || 20;

            //Box.
            this.context.fillStyle = "black";
            this.context.fillRect(left, top, width, height);

            //Text.
            this.context.fillStyle = "white";
            this.context.font = (height - 8) + "px Arial";
            this.context.fillText(message, left + 4, top + 4 + 11, width);
        },

        drawFramesStamp: function()
        { this.drawTextBox(this.scene.frame); },

        drawStamp: function()
        { this.drawFramesStamp(); }

});
