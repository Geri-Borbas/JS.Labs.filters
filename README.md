## ![eppz!tools](http://www.eppz.eu/beacons/eppz!.png) labs!filters
HTML5 <canvas> experiment to visualize signal filtering methods (one-pole filter, moving average).

#### More objective JavaScript
As I come from Objective-C world, this draft is also outlines attempts to write JavaScript in an object-oriented MVC manner. Using a tiny little snippet `Class.js` it is relatively easy to define classes, put them in separate files, split up logic into model (thoug, there is not persistent model in this draft), view (`EPPZScene`, `EPPZLayer`) and controller (`ViewController`) classes.
Having this, I could split up implementations in an efficient way, as `EPPZLayer` holds common features of a generic canvas layer (with mouse coordinates a signals/samples), while `EPPZMonitor` and `EPPZFilters` implements only the concrete features specific for this draft.

#### License
> Licensed under the [Open Source MIT license](http://en.wikipedia.org/wiki/MIT_License).

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/2873b2d81bd26e7c0d4ff1053f631cbb "githalytics.com")](http://githalytics.com/eppz/labs-filters)
