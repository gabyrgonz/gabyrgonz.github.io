const HTTP = new XMLHttpRequest();
const URL = ("https://gabyrgonz.github.io/final/ALL-SPURS-DATA.json");
HTTP.open("GET", URL);
HTTP.send();

let dataset;

// error handling
HTTP.onreadystatechange = function(){
    if (this.readyState == 4 && this.status == 200) {
        dataset = JSON.parse(HTTP.responseText);
        // console.log(dataset);
        d3Commands();
    } else {
        console.log("something went wrong");
    }
}

function heatmap() {
    // CONSTANTS
    const PADDING = 100;
    const PADDING_TOP = 50;
    const BAR_HEIGHT = 30;
    const BAR_WIDTH = 5;
    const SEASON = ["1977", "1978", "1979",
        "1980", "1981", "1982", "1983", "1984", "1985",
        "1986", "1987", "1988", "1989", "1990", "1991",
        "1992", "1993", "1994", "1995", "1996", "1997",
        "1998", "1999", "2000", "2001", "2002", "2003",
        "2004", "2005", "2006", "2007", "2008", "2009",
        "2010", "2011", "2012", "2013", "2014", "2015"];
    const WIDTH = PADDING + (Math.ceil(dataset['value'].length / 12) * BAR_WIDTH) + PADDING;
    const HEIGHT = PADDING_TOP + (BAR_HEIGHT * 12) + PADDING;

    // X-AXIS
    const X_MIN = new Date(d3.min(dataset['group'], (d) => d['year']), 0);
    const X_MAX = new Date(d3.max(dataset['group'], (d) => d['year']), 0);
    const TIME_FORMAT = d3.timeFormat("%Y")
    const X_SCALE = d3.scaleTime()
        .domain([X_MIN, X_MAX])
        .range([PADDING, WIDTH-PADDING]);
    const X_AXIS = d3.axisBottom(X_SCALE).tickFormat(TIME_FORMAT).ticks(38);

    // Y-AXIS
    const Y_MIN = new Date(0, d3.min(dataset['value'], (d) => d['month'] - 1));
    const Y_MAX = new Date(0, d3.max(dataset['value'], (d) => d['month'] - 1));
    const MONTH_FORMAT = d3.timeFormat("%B");
    const Y_SCALE = d3.scaleTime()
        .domain([Y_MIN, Y_MAX])
        .range([PADDING_TOP, HEIGHT-PADDING-PADDING_TOP]);
        const Y_AXIS = d3.axisLeft(Y_SCALE).tickFormat(MONTH_FORMAT);

}
