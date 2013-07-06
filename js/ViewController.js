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

//EPPZMonitor (simply display input as it is).
var ViewController = Class.extend
({

    //Creation.
    construct: function()
    {
        //UI outlets.
        this.slider = document.getElementById('fpsSlider');
        this.label = document.getElementById('fpsValueLabel');

        //Assemble scene.
        this.scene = new EPPZScene();
        this.scene.autoSuspendFrameLimit = 300;
        this.scene.addCanvasLayerWithId('signal', EPPZMonitor);
        this.scene.addCanvasLayerWithId('filters', EPPZFilters);
    },

    initWithFps: function(fps)
    {
        //Setup.
        this.scene.fps = fps;
        this.slider.value = fps;
        this.label.innerHTML = '<strong>'+this.slider.value+'</strong> fps';

        //Go.
        this.scene.start();
    },

    //UI.
    fpsSliderValueChanged: function()
    {
        this.label.innerHTML = '<strong>'+this.slider.value+'</strong> fps';
    },

    //UX.
    fpsSliderReleased: function()
    {
        //Restart scene.
        this.scene.stop();
        this.scene.fps = this.slider.value;
        this.scene.start();
    }

});