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
    construct: function(parent, name, color)
    {
        log('Create Layer <'+name+'> with parent '+parent);

        //Reference to the parent scene (either Scene itself or trough a parent Layer).
        this.parent = parent;
        if (parent instanceof EPPZScene) this.scene = parent;
        if (parent instanceof EPPZLayer) this.scene = parent.scene;

        //Name (for debugging mainly).
        this.name = name;

        //Create wrapping <div> element.
        this.div = document.createElement('div');
        this.div.title = name;
        this.div.className = 'layer';
        this.div.width  = this.parent.width;
        this.div.height = this.parent.height;

        //Add to the <div> of parent element (either Scene or a parent Layer).
        this.scene.addLayer(this);

        //Create, insert <canvas> element.
        this.canvas = document.createElement('canvas');
        this.canvas.width  = this.scene.width;
        this.canvas.height = this.scene.height;
        this.div.appendChild(this.canvas);

        //Get context to draw on.
        if (this.canvas.getContext)
        { this.context = this.canvas.getContext('2d'); }

        //Color.
        this.color = color || 'darkgrey';

        //Samples.
        this.sampleWindowSize = this.scene.sampleWindowSize;
        this.samples = [];

        //Reference the topmost samples.
        this.previousSample = this.samples[1];
        this.sample = this.samples[0];

        //Filtered values.
        this.previousFilteredSample = new Point(0, 0);
        this.filteredSample = new Point(0, 0);

        //EPPZLayer collection.
        this.layers = [];

        //Hook subclass template.
        this.init();
    },

    init: function()
    { /* Subclass template. */ },

    addSubLayer: function(name, layerClass, color)
    {
        //Create, collect layer.
        var layer = new layerClass(this, name, color);
        this.layers.push(layer);
        return layer;
    },

    //Animation frames.

        update: function(mousePositionSample)
        {
           // log('update '+this.canvas.id+' with '+mousePositionSample.stringValue());

            //update() for each sublayer.
            for (var eachLayerIndex in this.layers)
            {
                eachLayer = this.layers[eachLayerIndex];
                this.layers[eachLayerIndex].update(mousePositionSample);
            }

            //If window is empty, fill it up with the first sample.
            if (this.sample == null)
            {
                for (var index = 0; index < this.sampleWindowSize; index++)
                { this.samples.push(new Point(mousePositionSample)); }
            }

            //Create a sample copy, stack to the sample window.
            this.samples.unshift(new Point(mousePositionSample));
            this.samples.pop();

            //Reference the topmost samples.
            this.previousSample = this.samples[1];
            this.sample = this.samples[0];

            //Filter samples whether implemented.
            this.updateFilteredSamples();
        },

        render: function()
        {
            //render() for each sublayer.
            for (var eachLayerIndex in this.layers)
            {
                eachLayer = this.layers[eachLayerIndex];
                this.layers[eachLayerIndex].render();
            }

            this.context.strokeStyle = this.color;
            this.context.fillStyle = this.color;
            this.draw();
            this.drawStamp();
        },

    //Subclass templates (default implementations).

        updateFilteredSamples: function()
        { /* Subclass template. */ },

        draw: function()
        { /* Subclass template */ },

    //3D visualization.

        expand: function()
        {
            //expand() for each sublayer.
            for (var eachLayerIndex in this.layers)
            {
                eachLayer = this.layers[eachLayerIndex];
                this.layers[eachLayerIndex].expand();
            }

            //Values.
            var amount = this.index * 1.5;
            var rotationX = -0.3 * amount;
            var rotationY = 0.3 * amount;
            var rotationZ = 0.05 * amount;
            var rotationDegrees = 10;
            var translateX = 9 * amount;
            var translateY = 12 * amount;
            var translateZ = 58 * amount;

            //Adjust style.
            this.div.style.webkitTransform = this.div.style.MozTransform = this.div.style.msTransform = this.div.style.OTransform = this.div.style.transform =
                'rotate3d('+rotationX+', '+rotationY+', '+rotationZ+', '+rotationDegrees+'deg) '+
                'translate3d('+translateX+'px, '+translateY+'px, '+translateZ+'px)';
        },

        collapse: function()
        {
            //collapse() for each sublayer.
            for (var eachLayerIndex in this.layers)
            {
                eachLayer = this.layers[eachLayerIndex];
                this.layers[eachLayerIndex].collapse();
            }

            //Remove style.
            this.div.style.webkitTransform = this.div.style.MozTransform = this.div.style.msTransform = this.div.style.OTransform = this.div.style.transform =
                'none';
        },

    /*
        Drawing tools.
     */

        clear: function()
        {
            this.context.clearRect(0, 0, this.context.canvas.width, this.context.canvas.height);
        },

        clearAlongSublayers: function()
        {
            //clear() for each sublayer.
            for (var eachLayerIndex in this.layers)
            {
                eachLayer = this.layers[eachLayerIndex];
                this.layers[eachLayerIndex].clear();
            }

            this.clear();
        },

        strokeLatestNeighbouringSamples: function()
        {
            //Simply a line towards the topmost sample.
            this.context.beginPath();
            this.context.moveTo(this.previousSample.x, this.previousSample.y);
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

        strokeFilteredSamples: function()
        {
            //Simply a line towards the topmost sample.
            this.context.beginPath();
            this.context.moveTo(this.previousFilteredSample.x, this.previousFilteredSample.y);
            this.context.lineTo(this.filteredSample.x, this.filteredSample.y);
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

        drawStamp: function()
        {
            this.drawTextBox(this.name+' ('+this.scene.frame+')');
        }

});
