## ![eppz!tools](http://www.eppz.eu/beacons/eppz!.png) labs!filters

HTML5 <canvas> experiment to visualize signal filtering methods (one-pole filter, moving average).

See a [Live Demo](http://eppz.github.io/labs-filters/versions/current/) on the GitHub Page.

#### More objective JavaScript

As I come from Objective-C world, this draft is also outlines attempts to write JavaScript in an object-oriented MVC manner. Using a tiny little snippet `Class.js` it is relatively easy to define classes, put them in separate files, setup inharitance/hierarchy, split up logic into model as `EPPZScene`, view as `EPPZLayer` and subclasses and controller as `ViewController` classes.

Having this, I could split up implementations in an efficient way. `EPPZScene` maintains canvas layers, mouse events and animation, `EPPZLayer` holds common features of a generic canvas layer, windowing samples (yet mouse coordinates). Subclasses `EPPZHistory`, `EPPZSamples`, etc. implement only the concrete features specific for this draft namely the filtering methods, and some UI specific detail.

I still have no separate interface files, private/protected properties, but this is still a good start.

#### Version tracking

+ 1.3.0
    * Refactored layer tree
        * Layers maintains their own layer collection
        * Scene now have a root layer only
        * `<canvas>` tags are wrapped around with a `<div>`
        * `<div>` tree reflects layer hierarchy
        * addSublayer gives back a layer reference (for controllers and parents)
    * Reintroduced `EPPZOnePoleFilter`
        * A layer composite of `EPPZHistory` and `EPPZDot`
    * Tiny UI hooks
        * Slider to `EPPZOnePoleFilter.filter` property

+ 1.1.2
    * Created some Layer subclass
    * CSS adjustments (disable selection, mouse pointer states)

+ 1.0.5
    * Scene now creates `<canvas>` DOM elements on its own
    * Scene constructor parameters exposed to an associative array
    * Layers takes a `<canvas>` element, and a scene reference as constructor input

#### License

> Licensed under the [Open Source MIT license](http://en.wikipedia.org/wiki/MIT_License).

[![githalytics.com alpha](https://cruel-carlota.pagodabox.com/2873b2d81bd26e7c0d4ff1053f631cbb "githalytics.com")](http://githalytics.com/eppz/labs-filters)
