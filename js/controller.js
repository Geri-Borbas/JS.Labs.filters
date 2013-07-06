/**
 * Created with JetBrains PhpStorm.
 * User: borbasg
 * Date: 2013.07.05.
 * Time: 14:22
 * To change this template use File | Settings | File Templates.
 */

//EPPZMonitor (simply display input as it is).
var Controller = Class.extend
({

    fpsSliderValueChanged: function()
    {
        //UI.
        slider = document.getElementById('fpsSlider');
        label = document.getElementById('fpsValueLabel');
        label.innerHTML = '<strong>'+slider.value+'</strong> fps';
    },

    fpsSliderReleased: function()
    {
        //Restart scene.
        scene.stop();
        scene.fps = slider.value;
        scene.start();
    }

});


var Controller = new Controller();