/**
 * Call our functions on window load event
 */
window.onload = function () {
    setup();
};

const MARGINS = {top: 10, right: 10, bottom: 60, left: 60};

var Heatmap = function() {
    this.margin = {top: 60, right: 60, bottom: 60, left: 60},
    this.data;          // contains our dataset
    this.width = 1000 - margin.left - margin.right,  // default value of 500
    this.height = 900 - margin.top - margin.bottom,
    this.gridSize = Math.floor(width / 24);  // default value of 500

    this.svgContainer;  // the SVG element where we will be drawing our vis
    this.datapoints;    // SVG elements per data point

    // D3 axes
    this.xAxis;
    this.yAxis;

    // D3 scales
    this.xAxisScale;
    this.yAxisScale;

    /**
     * Function setupScales initializes D3 scales for our x and y axes
     * @param xRange (required) array containing the bounds of the interval we are scaling to (e.g., [0,100]) for the x-axis
     * @param xDomain (required) array containing the bounds of the interval from which our input comes from (e.g., [0,1] for the x-axis
     * @param yRange (required) array containing the bounds of the interval we are scaling to (e.g., [0,100]) for the y-axis
     * @param yDomain (required) array containing the bounds of the interval from which our input comes from (e.g., [0,1] for the y-axis
     */
    this.setupScales = function(xRange, xDomain, yRange, yDomain){
        this.xAxisScale = d3.scaleLinear()
            .domain(xDomain)
            .range(xRange);

        this.yAxisScale = d3.scaleLinear()
            .domain(yDomain)
            .range(yRange);
    };

    /**
     * Function setupAxes initializes D3 axes for our Scatterplot
     * @param xLabel the label of the x-axis
     * @param yLabel the label of the y-axis
     */
    this.setupAxes = function(xLabel, yLabel) {
        xLabel = xLabel === undefined ? "Season" : xLabel;
        yLabel = yLabel === undefined ? "Game Number" : yLabel;

        // call d3's axisBottom for the x-axis
        this.xAxis = d3.axisBottom(this.xAxisScale)
        // .tickSize(-this.height + MARGINS.bottom + MARGINS.top)
            .ticks(40)
            .tickPadding(5);
        // call d3's axisLeft for the y-axis
        this.yAxis = d3.axisLeft(this.yAxisScale)
        // .tickSize(-this.width + MARGINS.left*2)
            .ticks(82)
            .tickPadding(5);

        // call our axes inside "group" (<g></g>) objects inside our SVG container
        this.svgContainer.append("g")
            .attr("transform", `translate(0, ${this.height - MARGINS.bottom})`)
            .call(this.xAxis);
        this.svgContainer.append("g")
            .attr("transform", `translate(${MARGINS.left}, 0)`)
            .call(this.yAxis);
    };

        /**
         * function that initializes squares in hear map
         * */
        this.createSquares = function(xAxisSelector, yAxisSelector) {
            // default to Season and game number
            xAxisSelector = xAxisSelector === undefined ? "Season" : xAxisSelector;
            yAxisSelector = yAxisSelector === undefined ? "Game number" : yAxisSelector;
        }


}; // end of heatmap function

// setup page

// load data











