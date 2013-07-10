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

//EPPZHistory (simply display input as it is).
var ViewController = Class.extend
({

    //Creation.
    construct: function()
    {
        //UI outlets.
        this.fpsSlider = document.getElementById('fpsSlider');
        this.fpsLabel = document.getElementById('fpsValueLabel');
        this.filterSlider = document.getElementById('filterSlider');
        this.filterLabel = document.getElementById('filterValueLabel');
        this.windowSizeSlider = document.getElementById('windowSizeSlider');
        this.windowSizeValueLabel = document.getElementById('windowSizeValueLabel');

        this.canvases = document.getElementsByTagName('canvas');

        //Assemble scene.
        this.scene = new EPPZScene(
            {
                'divId' : 'scene',
                'width' : 450,
                'height' : 450,
                'sampleWindowSize' : 100,
                'autoStopAtFrame' : 0,
                'fps' : 60
            });
        this.scene.rootLayer.addSubLayer('history', EPPZHistory, '#CCC');
        this.scene.rootLayer.addSubLayer('samples', EPPZSamples, '#AAA');
        this.onePoleFilterLayer = this.scene.rootLayer.addSubLayer('onePoleFilterHistory', EPPZOnePoleFilter, 'red');
        this.movingAverageLayer = this.scene.rootLayer.addSubLayer('movingAverageHistory', EPPZMovingAverage, 'blue');

    },

    initWithFps: function(fps)
    {
        //Setup.
        this.scene.fps = fps;
        this.fpsSlider.value = fps;
        this.fpsLabel.innerHTML = '<strong>'+this.fpsSlider.value+'</strong> fps';

        //Go.
        this.scene.start();
    },

    //Frame rate control.
    fpsSliderValueChanged: function()
    {
        this.fpsLabel.innerHTML = '<strong>'+this.fpsSlider.value+'</strong> fps';
    },

    fpsSliderReleased: function()
    {
        //Restart scene.
        this.scene.stop();
        this.scene.fps = this.fpsSlider.value;
        this.scene.start();
    },

    //One-pole filter control.
    filterSliderValueChanged: function()
    {
        this.filterLabel.innerHTML = '<strong>'+this.filterSlider.value+'</strong>';
        this.onePoleFilterLayer.filter = this.filterSlider.value;
    },

    //Moving average control.
    windowSizeSliderValueChanged: function()
    {
        this.windowSizeValueLabel.innerHTML = '<strong>'+this.windowSizeSlider.value+'</strong>';
        this.movingAverageLayer.windowSize = this.windowSizeSlider.value;
    },

    //Layer stacking.
    collapseCanvases: function()
    {
        for (var i = 0; i < this.canvases.length; i++)
            if (this.canvases[i].hasClass('collapse') == false)
                this.canvases[i].addClass('collapse');
    },

    expandCanvases: function()
    {
        for (var i = 0; i < this.canvases.length; i++)
            this.canvases[i].removeClass('collapse');
    },

});