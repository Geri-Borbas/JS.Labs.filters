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

var EPPZOnePoleFilter = EPPZLayer.extend
({
    init: function()
    {
        this.filter = 0.05;
        this.dotLayer = this.addSubLayer('onePoleFilterDot', EPPZDot, this.color);
    },

    updateFilteredSamples: function()
    {
        //Save previous updateFilteredSamples value.
        this.previousFilteredSample = new Point(this.filteredSample);

        //Filter.
        this.filteredSample.x = this.sample.x * this.filter + this.previousFilteredSample.x * (1.0 - this.filter);
        this.filteredSample.y = this.sample.y * this.filter + this.previousFilteredSample.y * (1.0 - this.filter);

        //Pass new filtered sample to dot layer.
        this.dotLayer.update(this.filteredSample);
    },

    draw: function()
    {
        this.strokeFilteredSamples();
    }
});