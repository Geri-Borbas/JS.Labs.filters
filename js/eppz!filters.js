//EPPZMonitor (simply display input as it is).
var EPPZMonitor = EPPZLayer.extend
({
    tick: function()
    {
        this.redrawCurrentSampleWindow();

        //Debug.
        this.drawStamp();
    }
});

//EPPZLayer (filter input in a way).
var EPPZFilters = EPPZLayer.extend
({
    tick: function()
    {
        this.context.strokeStyle = 'darkgrey';
        this.strokeToCurrentCursor();

        //Debug.
        this.drawStamp();
    }
});