/**
 * Call our functions on window load event
 */
window.onload = function(){
    setup();
};

/**
 * object to keep track of our magic numbers for margins
 * @type {{top: number, left: number, bottom: number, right: number}}
 */
const MARGINS = {top: 10, right: 10, bottom: 60, left: 60};

var Scatterplot = function(){
    this.data;          // contains our dataset
    this.width = 500;   // default value of 500
    this.height = 500;  // default value of 500

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
    this.setupAxes = function(xLabel, yLabel){
        xLabel = xLabel === undefined ? "Life Satisfaction" : xLabel;
        yLabel = yLabel === undefined ? "Employment Rate" : yLabel;

        // call d3's axisBottom for the x-axis
        this.xAxis = d3.axisBottom(this.xAxisScale)
            // .tickSize(-this.height + MARGINS.bottom + MARGINS.top)
            .ticks(10)
            .tickPadding(10);
        // call d3's axisLeft for the y-axis
        this.yAxis = d3.axisLeft(this.yAxisScale)
            // .tickSize(-this.width + MARGINS.left*2)
            .ticks(10)
            .tickPadding(10);

        // call our axes inside "group" (<g></g>) objects inside our SVG container
        this.svgContainer.append("g")
            .attr("transform", `translate(0, ${this.height - MARGINS.bottom })`)
            .call(this.xAxis);
        this.svgContainer.append("g")
            .attr("transform", `translate(${MARGINS.left}, 0)`)
            .call(this.yAxis);

        // add text labels
        this.svgContainer.append("text")
            .attr("x", MARGINS.left)
            .attr("y", (this.height)/2)
            .attr("transform", `rotate(-90, ${MARGINS.left / 3}, ${this.height/2})`)
            .style("text-anchor", "middle")
            .text(yLabel);
        this.svgContainer.append("text")
            .attr("x", (this.width)/2)
            .attr("y", (this.height - MARGINS.top))
            .style("text-anchor", "middle")
            .text(xLabel);

    };

    /**
     * Function createCircles initializes the datapoints in our scatterplot
     * @param xAxisSelector the data property for values to appear in x-axis
     * @param yAxisSelector the data property for values to appear in y-axis
     */
    this.createCircles = function(xAxisSelector, yAxisSelector){
        // default to Life Satisfaction and Employment Rate
        xAxisSelector = xAxisSelector === undefined ? "Life satisfaction" : xAxisSelector;
        yAxisSelector = yAxisSelector === undefined ? "Employment rate" : yAxisSelector;

        // Use D3's selectAll function to create instances of SVG:circle virtually
        // per item in our data array
        this.datapoints = this.svgContainer.selectAll("circle")
            .data(this.data)    // use the data we loaded from CSV
            .enter()            // access the data item (e.g., this.data[0])
            .append("circle")   // add the circle element into our SVG container
            .attr("r", 8)       // change some of the attributes of our circles
            // function(d){ return d; } -> allows us to access the data we entered
            .attr("cx", function(d){
                // use the D3 scales we created earlier to map our data values to pixels on screen
                return _vis_scatterplot.xAxisScale(d[xAxisSelector]);
            })
            .attr("cy", function(d){
                return _vis_scatterplot.yAxisScale(d[yAxisSelector]);
            })
            // change some styling
            .style("fill", "coral")
            .style("stroke", "white")
            // add a text to show up on hover
            .append("svg:title")
            .text(function(d){
                return d.Country;
            });
    }
};














var Barchart =  function(){
    this.data;
    this.width;
    this.height;

    this.data;          // contains our dataset
    this.width = 500;   // default value of 500
    this.height = 500;  // default value of 500

    this.svgContainer;  // the SVG element where we will be drawing our vis
    this.datapoints;    // SVG elements per data point

    // D3 axes
    this.xAxis;
    this.yAxis;
    // D3 scale
    this.xAxisScale;
    this.yAxisScale;

    /**
     * Function setupScales initializes a D3 scale for our y axis
     * @param xBins (required) the array of categories for the x-axis
     * @param yRange (required) array containing the bounds of the interval we are scaling to (e.g., [0,100]) for the y-axis
     * @param yDomain (required) array containing the bounds of the interval from which our input comes from (e.g., [0,1] for the y-axis
     */
this.setupScales = function(xBins, yRange, yDomain){
        this.xAxisScale = d3.scaleBand()
            .domain(xBins)
            .rangeRound([0, this.width - MARGINS.left])
            .padding(0.2);
        this.yAxisScale = d3.scaleLinear()
            .domain(yDomain)
            .range(yRange);
    };


    /**
     * Function setupAxes initializes D3 axes for our bar chart
     * @param xNum the number of datapoints in the x-axis
     * @param yLabel the label of the y-axis
     */
    this.setupAxes = function(xNum, yLabel){
        yLabel = yLabel === undefined ? "Life expectancy" : yLabel;

        this.xAxis = d3.axisBottom(this.xAxisScale)
            .ticks(xNum)
        this.yAxis = d3.axisLeft(this.yAxisScale)
            .ticks(10)
            .tickPadding(10);

        // call our axes inside "group" (<g></g>) objects inside our SVG container
        this.svgContainer.append("g")
            .attr("transform", `translate(${MARGINS.left+20}, ${this.height - MARGINS.bottom })`)
            .call(this.xAxis)
            .selectAll("text")
            .attr("x", 10)
            .attr("transform", "rotate(90)")
            .attr("text-anchor", "start")
            .style("alignment-baseline", "middle");
        this.svgContainer.append("g")
            .attr("transform", `translate(${MARGINS.left}, 0)`)
            .call(this.yAxis);

        // add text labels
        this.svgContainer.append("text")
            .attr("x", MARGINS.left)
            .attr("y", (this.height)/2)
            .attr("transform", `rotate(-90, ${MARGINS.left / 3}, ${this.height/2})`)
            .style("text-anchor", "middle")
            .text(yLabel);
    };

    this.createBars = function(xAxisSelector, yAxisSelector){
        // default to Life Satisfaction and Employment Rate
        xAxisSelector = xAxisSelector === undefined ? "Country" : xAxisSelector;
        yAxisSelector = yAxisSelector === undefined ? "Life expectancy" : yAxisSelector;

        // Use D3's selectAll function to create instances of SVG:circle virtually
        // per item in our data array
        this.datapoints = this.svgContainer.selectAll("rect")
            .data(this.data)    // use the data we loaded from CSV
            .enter()            // access the data item (e.g., this.data[0])
            .append("rect")     // add the rect element into our SVG container
            .attr("x", function(d){
                return MARGINS.left + 5 + _vis_barchart.xAxisScale(d[xAxisSelector]);
            })
            .attr("y", function(d){
                return _vis_barchart.yAxisScale(d[yAxisSelector]);
            })
            .attr("width", _vis_barchart.xAxisScale.bandwidth())
            .attr("height", function(d){
                return (_vis_barchart.height - MARGINS.bottom) - _vis_barchart.yAxisScale(d[yAxisSelector]);
            })
            // change some styling
            .style("fill", "coral")
            .style("stroke", "none")
            // .style("stroke-width", 1)
            // add a text to show up on hover
            .append("svg:title")
            .text(function(d){
                return d[yAxisSelector];
            });
    }
};

/**
 * Global variables
 */
var _vis_scatterplot;   // our scatterplot visualization
var _vis_barchart;      // our barchart visualization

/**
 * Function setup: sets up our visualization environment.
 * You can change the code to not have static paths and elementID's
 */
function setup(){
    _vis_scatterplot = new Scatterplot();
    _vis_scatterplot.svgContainer = d3.select("#vis1");
    _vis_scatterplot.width = $("#" + _vis_scatterplot.svgContainer.attr("id")).width();
    _vis_scatterplot.height = $("#" + _vis_scatterplot.svgContainer.attr("id")).height();

    _vis_barchart = new Barchart();
    _vis_barchart.svgContainer = d3.select("#vis2");
    _vis_barchart.width = $("#" + _vis_scatterplot.svgContainer.attr("id")).width();
    _vis_barchart.height = $("#" + _vis_scatterplot.svgContainer.attr("id")).height();

    loadData("betterlifeindex.csv");

    _dispatch = d3.dispatch("hover");
    _dispatch.on("hover.", function(d){

    })
}

/**
 * Function loadData: loads data from a given CSV file path/url
 * @param path string location of the CSV data file
 */
function loadData(path){
    // call D3's loading function for CSV and load the data to our global variable _data
    d3.csv(path).then(function(data){
        _vis_scatterplot.data = data;
        // let's use the scales and domain from Life Satisfaction and Employment Rate
        _vis_scatterplot.setupScales([MARGINS.left, _vis_scatterplot.width-MARGINS.left], [4, 8],
            [_vis_scatterplot.height-MARGINS.bottom, MARGINS.top], [40, 100]);
        _vis_scatterplot.setupAxes();
        _vis_scatterplot.createCircles();

        _vis_barchart.data = data;
        let country_names = getCountries(data);
        _vis_barchart.setupScales(country_names, [_vis_barchart.height-MARGINS.bottom, MARGINS.top], [0, 100]);
        _vis_barchart.setupAxes(country_names.length, "Life expectancy");
        _vis_barchart.createBars();
    });
}

function getCountries(data){
    var countries = [];
    data.forEach(function(e){
        countries.push(e.Country);
    });
    return countries;
}