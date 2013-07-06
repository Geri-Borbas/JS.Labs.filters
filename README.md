## ![eppz!tools](http://www.eppz.eu/beacons/eppz!.png) labs!filters

HTML5 <canvas> experiment to visualize signal filtering methods (one-pole filter, moving average).

See a [Live Demo](http://eppz.github.io/labs-filters/versions/current/) on the GitHub Page.

#### More objective JavaScript

As I come from Objective-C world, this draft is also outlines attempts to write JavaScript in an object-oriented MVC manner. Using a tiny little snippet `Class.js` it is relatively easy to define classes, put them in separate files, split up logic into model (`EPPZScene`), view (`EPPZLayer` and subclasses) and controller (`ViewController`) classes.

Having this, I could split up implementations in an efficient way. `EPPZScene` maintains canvas layers, mouse events and animation, `EPPZLayer` holds common features of a generic canvas layer, windowing samples (yet mouse coordinates). Subclasses (`EPPZHistory`, `EPPZSamples`, etc.) implement only the concrete features specific for this draft namely the filtering methods, and some UI specific detail.

I still have no separate interface files, private/protected properties, but this is still a good start.

#### License

> Licensed under the [Open Source MIT license](http://en.wikipedia.org/wiki/MIT_License).

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/2873b2d81bd26e7c0d4ff1053f631cbb "githalytics.com")](http://githalytics.com/eppz/labs-filters)
