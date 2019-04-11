/**
 * Call our functions on window load event
 */
window.onload = function () {
    setup();
};

/**
 * object to keep track of our magic numbers for margins
 * @type {{top: number, left: number, bottom: number, right: number}}
 */
const MARGINS = { top: 10, right: 10, bottom: 60, left: 60 };

// set the dimensions and margins of the graph
var margin = { top: 60, right: 60, bottom: 60, left: 60 },
    width = 1000 - margin.left - margin.right,
    height = 900 - margin.top - margin.bottom,
    gridSize = Math.floor(width / 24),
    legendElementWidth = gridSize * 2;

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
    "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://gabyrgonz.github.io/ALL-SPURS-DATA.csv", function (data) {

    // every game x every season
    // SPURS-DATA.csv
    // week #
    var myGroups = ["1977", "1978", "1979",
        "1980", "1981", "1982", "1983", "1984", "1985",
        "1986", "1987", "1988", "1989", "1990", "1991",
        "1992", "1993", "1994", "1995", "1996", "1997",
        "1998", "1999", "2000", "2001", "2002", "2003",
        "2004", "2005", "2006", "2007", "2008", "2009",
        "2010", "2011", "2012", "2013", "2014", "2015"]
    // game #
    var myVars = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10",
        "11", "12", "13", "14", "15", "16", "17", "18", "19", "20",
        "21", "22", "23", "24", "25", "26", "27", "28", "29", "30",
        "31", "32", "33", "34", "35", "36", "37", "38", "39", "40",
        "41", "42", "43", "44", "45", "46", "47", "48", "49", "50",
        "51", "52", "53", "54", "55", "56", "57", "58", "59", "60",
        "61", "62", "63", "64", "65", "66", "67", "68", "69", "70",
        "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
        "81", "82"]


    // var myGroups = ["Week 1", "Week 2", "Week 3", "Week 4", "Week 5", "Week 6", "Week 7",
    //     "Week 8", "Week 9", "Week 10", "Week 11", "Week 12", "Week 13", "Week 14", "Week 15"]
    // var myVars = ["1", "2", "3", "4", "5", "6", "7"]



    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    // var myGroups = d3.map(data, function(d){return d.group;}).keys()
    // var myVars = d3.map(data, function(d){return d.variable;}).keys()



    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([0, width])
        .domain(myGroups)
        .padding(0.1);
    // draw the axis
    svg.append("g")
        .style("font-size", 36)
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .select(".domain").remove()
        .selectAll("text")
        .attr("transform", "translate(-10,10)rotate(-45)")

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([height, 0])
        .domain(myVars)
        .padding(0.1);
    svg.append("g")
        .style("font-size", 34)
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()

    // add x-axis label
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("x", width - 450)
        .attr("y", height + margin.top - 20)
        .text("Regular Season")


    // add y-axis label:
    svg.append("text")
        .attr("text-anchor", "end")
        .attr("transform", "rotate(-90)")
        .attr("y", -margin.left + 30)
        .attr("x", -margin.top - 270)
        .text("Game number")


    // Build color scale
    var myColor = d3.scaleSequential()
        .interpolator(d3.interpolateBuPu)
        //.domain([1270,1772])
        .domain([1270, 1772])




    // create a tooltip
    var tooltip = d3.select("#my_dataviz")
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        .style("border", "solid")
        .style("border-width", "1px")
        .style("border-radius", "1px")
        .style("padding", "5px")



    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
        tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("opacity", 1)
    }

    var mousemove = function (d) {
        tooltip
            .html("<strong>ELO: </strong> " + d.value +
            "<br/>" + d.game_result + "\t" + d.pts + "-" + d.opp_pts
            + " | " + d.opp_id + "<br/>" + d.date_game)
            .style("right", (d3.mouse(this)[0] + 70) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
    }
    var mouseleave = function (d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }


    // add the squares
    svg.selectAll()
        .data(data, function (d) { return d.group + ':' + d.variable; })
        .enter()
        .append("rect")
        .attr("x", function (d) { return x(d.group) })
        .attr("y", function (d) { return y(d.variable) })
        .attr("rx", 0)
        .attr("ry", 0)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) { return myColor(d.value) })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)
})
