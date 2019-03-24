/**
 * Call our functions on window load event
 */
window.onload = function(){
    setupVis1();
};


function setupVis1(){
    chart = {
        const root = partition(data);

    root.each(d => d.current = d);

    const svg = d3.select(DOM.svg(width, width))
        .style("width", "100%")
        .style("height", "auto")
        .style("font", "10px sans-serif");

    const g = svg.append("g")
        .attr("transform", `translate(${width / 2},${width / 2})`);

    const path = g.append("g")
        .selectAll("path")
        .data(root.descendants().slice(1))
        .join("path")
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return color(d.data.name); })
        .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 0.6 : 0.4) : 0)
        .attr("d", d => arc(d.current));

    path.filter(d => d.children)
        .style("cursor", "pointer")
        .on("click", clicked);

    path.append("title")
        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);

    const label = g.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
        .selectAll("text")
        .data(root.descendants().slice(1))
        .join("text")
        .attr("dy", "0.35em")
        .attr("fill-opacity", d => +labelVisible(d.current))
        .attr("transform", d => labelTransform(d.current))
        .text(d => d.data.name);

    const parent = g.append("circle")
        .datum(root)
        .attr("r", radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked);

    function clicked(p) {
        parent.datum(p.parent || root);

        root.each(d => d.target = {
            x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
            y0: Math.max(0, d.y0 - p.depth),
            y1: Math.max(0, d.y1 - p.depth)
        });

        const t = g.transition().duration(750);

        // Transition the data on all arcs, even the ones that aren’t visible,
        // so that if this transition is interrupted, entering arcs will start
        // the next transition from the desired position.
        path.transition(t)
            .tween("data", d => {
                const i = d3.interpolate(d.current, d.target);
                return t => d.current = i(t);
            })
            .filter(function(d) {
                return +this.getAttribute("fill-opacity") || arcVisible(d.target);
            })
            .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 0.6 : 0.4) : 0)
            .attrTween("d", d => () => arc(d.current));

        label.filter(function(d) {
            return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        }).transition(t)
            .attr("fill-opacity", d => +labelVisible(d.target))
            .attrTween("transform", d => () => labelTransform(d.current));
    }

    function arcVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }

    function labelVisible(d) {
        return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }

    function labelTransform(d) {
        const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
        const y = (d.y0 + d.y1) / 2 * radius;
        return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }

    return svg.node();
    }

    data = Object {
        name: "San Antonio Spurs"
        children: Array(52) [Object, Object, Object, Object, Object, Object, Object, Object, Object, Object,
                                        Object, Object, Object, Object, Object, Object, Object, Object, Object, Object,
                                        Object, Object, Object, Object, Object, Object, Object, Object, Object, Object,
                                        Object, Object, Object, Object, Object, Object, Object, Object, Object, Object,
                                        Object, Object, Object, Object, Object, Object, Object, Object, Object, Object,
                                        Object, Object]
    }
    data = d3.json("https://gabyrgonz.github.io/spurs-allstats.json");
    partition = ƒ(data)
    partition = data => {
        const root = d3.hierarchy(data)
            .sum(d => d.value)
            .sort((a, b) => b.value - a.value);
        return d3.partition()
            .size([2 * Math.PI, root.height + 1])
            (root);
    }

    color = ƒ(i)
    color = d3.scaleOrdinal(d3.quantize(d3.interpolateRainbow, data.children.length + 1))
    format = ƒ(t)
    format = d3.format(",d")
    width = 932
    width = 932
    radius = 155.33333333333334
    radius = width / 6
    arc = ƒ()
    arc = d3.arc()
        .startAngle(d => d.x0)
        .endAngle(d => d.x1)
        .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
        .padRadius(radius * 1.5)
        .innerRadius(d => d.y0 * radius)
        .outerRadius(d => Math.max(d.y0 * radius, d.y1 * radius - 1))

    d3 = Object {
        event: null
        format: ƒ(t)
        formatPrefix: ƒ(t, n)
        timeFormat: ƒ(t)
        timeParse: ƒ(t)
        utcFormat: ƒ(t)
        utcParse: ƒ(t)
        version: "5.9.2"
        bisect: ƒ(n, e, r, i)
        bisectRight: ƒ(n, e, r, i)
        bisectLeft: ƒ(n, e, r, i)
        ascending: ƒ(t, n)
        bisector: ƒ(t)
        cross: ƒ(t, n, e)
        descending: ƒ(t, n)
        deviation: ƒ(t, n)
        extent: ƒ(t, n)
        histogram: ƒ()
        thresholdFreedmanDiaconis: ƒ(t, e, r)
        thresholdScott: ƒ(t, n, e)
        thresholdSturges: ƒ(t)
        max: ƒ(t, n)
        mean: ƒ(t, n)
        median: ƒ(t, e)
        merge: ƒ(t)
        min: ƒ(t, n)
        pairs: ƒ(t, n)
        permute: ƒ(t, n)
        quantile: ƒ(t, n, e)
        range: ƒ(t, n, e)
        scan: ƒ(t, e)
        shuffle: ƒ(t, n, e)
        sum: ƒ(t, n)
        ticks: ƒ(t, n, e)
        tickIncrement: ƒ(t, n, e)
        tickStep: ƒ(t, n, e)
        transpose: ƒ(t)
        variance: ƒ(t, n)
        zip: ƒ()
        axisTop: ƒ(t)
        axisRight: ƒ(t)
        axisBottom: ƒ(t)
        axisLeft: ƒ(t)
        brush: ƒ()
        brushX: ƒ()
        brushY: ƒ()
        brushSelection: ƒ(t)
        chord: ƒ()
        ribbon: ƒ()
        nest: ƒ()
        set: ƒ(t, n)
        map: ƒ(t, n)
        keys: ƒ(t)
        values: ƒ(t)
        entries: ƒ(t)
        color: ƒ(t)
        rgb: ƒ(t, n, e, r)
        hsl: ƒ(t, n, e, r)
        lab: ƒ(t, n, e, r)
        hcl: ƒ(t, n, e, r)
        lch: ƒ(t, n, e, r)
        gray: ƒ(t, n)
        cubehelix: ƒ(t, n, e, r)
        contours: ƒ()
        contourDensity: ƒ()
        dispatch: ƒ()
        drag: ƒ()
        dragDisable: ƒ(t)
        dragEnable: ƒ(t, n)
        dsvFormat: ƒ(t)
        csvParse: ƒ(t, n)
        csvParseRows: ƒ(t, n)
        csvFormat: ƒ(n, e)
        csvFormatBody: ƒ(t, n)
        csvFormatRows: ƒ(t)
        tsvParse: ƒ(t, n)
        tsvParseRows: ƒ(t, n)
        tsvFormat: ƒ(n, e)
        tsvFormatBody: ƒ(t, n)
        tsvFormatRows: ƒ(t)
        autoType: ƒ(t)
        easeLinear: ƒ(t)
        easeQuad: ƒ(t)
        easeQuadIn: ƒ(t)
        easeQuadOut: ƒ(t)
        easeQuadInOut: ƒ(t)
        easeCubic: ƒ(t)
        easeCubicIn: ƒ(t)
        easeCubicOut: ƒ(t)
        easeCubicInOut: ƒ(t)
        easePoly: ƒ(t)
        easePolyIn: ƒ(t)
        easePolyOut: ƒ(t)
        easePolyInOut: ƒ(t)
        easeSin: ƒ(t)
        easeSinIn: ƒ(t)
        easeSinOut: ƒ(t)
        easeSinInOut: ƒ(t)
        easeExp: ƒ(t)
        easeExpIn: ƒ(t)
        easeExpOut: ƒ(t)
        easeExpInOut: ƒ(t)
        easeCircle: ƒ(t)
        easeCircleIn: ƒ(t)
        easeCircleOut: ƒ(t)
        easeCircleInOut: ƒ(t)
        easeBounce: ƒ(t)
        easeBounceIn: ƒ(t)
        easeBounceOut: ƒ(t)
        easeBounceInOut: ƒ(t)
        easeBack: ƒ(t)
        easeBackIn: ƒ(t)
        easeBackOut: ƒ(t)
        easeBackInOut: ƒ(t)
        easeElastic: ƒ(t)
        easeElasticIn: ƒ(t)
        easeElasticOut: ƒ(t)
        easeElasticInOut: ƒ(t)
        blob: ƒ(t, n)
        buffer: ƒ(t, n)
        dsv: ƒ(t, n, e, r)
        csv: ƒ(n, e, r)
        tsv: ƒ(n, e, r)
        image: ƒ(t, n)
        json: ƒ(t, n)
        text: ƒ(t, n)
        xml: ƒ(n, e)
        html: ƒ(n, e)
        svg: ƒ(n, e)
        forceCenter: ƒ(t, n)
        forceCollide: ƒ(t)
        forceLink: ƒ(t)
        forceManyBody: ƒ()
        forceRadial: ƒ(t, n, e)
        forceSimulation: ƒ(t)
        forceX: ƒ(t)
        forceY: ƒ(t)
        formatDefaultLocale: ƒ(n)
        formatLocale: ƒ(t)
        formatSpecifier: ƒ(t)
        precisionFixed: ƒ(t)
        precisionPrefix: ƒ(t, n)
        precisionRound: ƒ(t, n)
        geoArea: ƒ(t)
        geoBounds: ƒ(t)
        geoCentroid: ƒ(t)
        geoCircle: ƒ()
        geoClipAntimeridian: ƒ(i)
        geoClipCircle: ƒ(t)
        geoClipExtent: ƒ()
        geoClipRectangle: ƒ(t, n, e, r)
        geoContains: ƒ(t, n)
        geoDistance: ƒ(t, n)
        geoGraticule: ƒ()
        geoGraticule10: ƒ()
        geoInterpolate: ƒ(t, n)
        geoLength: ƒ(t)
        geoPath: ƒ(t, n)
        geoAlbers: ƒ()
        geoAlbersUsa: ƒ()
        geoAzimuthalEqualArea: ƒ()
        geoAzimuthalEqualAreaRaw: ƒ(n, e)
        geoAzimuthalEquidistant: ƒ()
        geoAzimuthalEquidistantRaw: ƒ(n, e)
        geoConicConformal: ƒ()
        geoConicConformalRaw: ƒ(t, n)
        geoConicEqualArea: ƒ()
        geoConicEqualAreaRaw: ƒ(t, n)
        geoConicEquidistant: ƒ()
        geoConicEquidistantRaw: ƒ(…)
        geoEqualEarth: ƒ()
        geoEqualEarthRaw: ƒ(t, n)
        geoEquirectangular: ƒ()
        geoEquirectangularRaw: ƒ(t, n)
        geoGnomonic: ƒ()
        geoGnomonicRaw: ƒ(t, n)
        geoIdentity: ƒ()
        geoProjection: ƒ(t)
        geoProjectionMutator: ƒ(t)
        geoMercator: ƒ()
        geoMercatorRaw: ƒ(t, n)
        geoNaturalEarth1: ƒ()
        geoNaturalEarth1Raw: ƒ(t, n)
        geoOrthographic: ƒ()
        geoOrthographicRaw: ƒ(t, n)
        geoStereographic: ƒ()
        geoStereographicRaw: ƒ(t, n)
        geoTransverseMercator: ƒ()
        geoTransverseMercatorRaw: ƒ(t, n)
        geoRotation: ƒ(t)
        geoStream: ƒ(t, n)
        geoTransform: ƒ(t)
        cluster: ƒ()
        hierarchy: ƒ(t, n)
        pack: ƒ()
        packSiblings: ƒ(t)
        packEnclose: ƒ(t)
        partition: ƒ()
        stratify: ƒ()
        tree: ƒ()
        treemap: ƒ()
        treemapBinary: ƒ(t, n, e, r, i)
        treemapDice: ƒ(t, n, e, r, i)
        treemapSlice: ƒ(t, n, e, r, i)
        treemapSliceDice: ƒ(t, n, e, r, i)
        treemapSquarify: ƒ(t, e, r, i, o)
        treemapResquarify: ƒ(t, e, r, i, o)
        interpolate: ƒ(t, n)
        interpolateArray: ƒ(t, n)
        interpolateBasis: ƒ(t)
        interpolateBasisClosed: ƒ(t)
        interpolateDate: ƒ(t, n)
        interpolateDiscrete: ƒ(t)
        interpolateHue: ƒ(t, n)
        interpolateNumber: ƒ(t, n)
        interpolateObject: ƒ(t, n)
        interpolateRound: ƒ(t, n)
        interpolateString: ƒ(t, n)
        interpolateTransformCss: ƒ(o, a)
        interpolateTransformSvg: ƒ(o, a)
        interpolateZoom: ƒ(t, n)
        interpolateRgb: ƒ(t, n)
        interpolateRgbBasis: ƒ(n)
        interpolateRgbBasisClosed: ƒ(n)
        interpolateHsl: ƒ(n, e)
        interpolateHslLong: ƒ(n, e)
        interpolateLab: ƒ(t, n)
        interpolateHcl: ƒ(n, e)
        interpolateHclLong: ƒ(n, e)
        interpolateCubehelix: ƒ(n, r)
        interpolateCubehelixLong: ƒ(n, r)
        piecewise: ƒ(t, n)
        quantize: ƒ(t, n)
        path: ƒ()
        polygonArea: ƒ(t)
        polygonCentroid: ƒ(t)
        polygonHull: ƒ(t)
        polygonContains: ƒ(t, n)
        polygonLength: ƒ(t)
        quadtree: ƒ(t, n, e)
        randomUniform: ƒ(t, e)
        randomNormal: ƒ(t, e)
        randomLogNormal: ƒ()
        randomBates: ƒ(t)
        randomIrwinHall: ƒ(t)
        randomExponential: ƒ(t)
        scaleBand: ƒ()
        scalePoint: ƒ()
        scaleIdentity: ƒ(n)
        scaleLinear: ƒ()
        scaleLog: ƒ()
        scaleSymlog: ƒ()
        scaleOrdinal: ƒ()
        scaleImplicit: Object {name: "implicit"}
        scalePow: ƒ()
        scaleSqrt: ƒ()
        scaleQuantile: ƒ()
        scaleQuantize: ƒ()
        scaleThreshold: ƒ()
        scaleTime: ƒ()
        scaleUtc: ƒ()
        scaleSequential: ƒ()
        scaleSequentialLog: ƒ()
        scaleSequentialPow: ƒ()
        scaleSequentialSqrt: ƒ()
        scaleSequentialSymlog: ƒ()
        scaleSequentialQuantile: ƒ()
        scaleDiverging: ƒ()
        scaleDivergingLog: ƒ()
        scaleDivergingPow: ƒ()
        scaleDivergingSqrt: ƒ()
        scaleDivergingSymlog: ƒ()
        tickFormat: ƒ(n, e, r, i)
        schemeCategory10: Array(10) ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"]
        schemeAccent: Array(8) ["#7fc97f", "#beaed4", "#fdc086", "#ffff99", "#386cb0", "#f0027f", "#bf5b17", "#666666"]
        schemeDark2: Array(8) ["#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"]
        schemePaired: Array(12) ["#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928"]
        schemePastel1: Array(9) ["#fbb4ae", "#b3cde3", "#ccebc5", "#decbe4", "#fed9a6", "#ffffcc", "#e5d8bd", "#fddaec", "#f2f2f2"]
        schemePastel2: Array(8) ["#b3e2cd", "#fdcdac", "#cbd5e8", "#f4cae4", "#e6f5c9", "#fff2ae", "#f1e2cc", "#cccccc"]
        schemeSet1: Array(9) ["#e41a1c", "#377eb8", "#4daf4a", "#984ea3", "#ff7f00", "#ffff33", "#a65628", "#f781bf", "#999999"]
        schemeSet2: Array(8) ["#66c2a5", "#fc8d62", "#8da0cb", "#e78ac3", "#a6d854", "#ffd92f", "#e5c494", "#b3b3b3"]
        schemeSet3: Array(12) ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#80b1d3", "#fdb462", "#b3de69", "#fccde5", "#d9d9d9", "#bc80bd", "#ccebc5", "#ffed6f"]
        interpolateBrBG: ƒ(t)
        schemeBrBG: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
        interpolatePRGn: ƒ(t)
        schemePRGn: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
        interpolatePiYG: ƒ(t)
        schemePiYG: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
        interpolatePuOr: ƒ(t)
        schemePuOr: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
        interpolateRdBu: ƒ(t)
        schemeRdBu: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
        interpolateRdGy: ƒ(t)
        schemeRdGy: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
        interpolateRdYlBu: ƒ(t)
        schemeRdYlBu: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
        interpolateRdYlGn: ƒ(t)
        schemeRdYlGn: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
        interpolateSpectral: ƒ(t)
        schemeSpectral: Array(12) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9), Array(10), Array(11)]
        interpolateBuGn: ƒ(t)
        schemeBuGn: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateBuPu: ƒ(t)
        schemeBuPu: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateGnBu: ƒ(t)
        schemeGnBu: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateOrRd: ƒ(t)
        schemeOrRd: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolatePuBuGn: ƒ(t)
        schemePuBuGn: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolatePuBu: ƒ(t)
        schemePuBu: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolatePuRd: ƒ(t)
        schemePuRd: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateRdPu: ƒ(t)
        schemeRdPu: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateYlGnBu: ƒ(t)
        schemeYlGnBu: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateYlGn: ƒ(t)
        schemeYlGn: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateYlOrBr: ƒ(t)
        schemeYlOrBr: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateYlOrRd: ƒ(t)
        schemeYlOrRd: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateBlues: ƒ(t)
        schemeBlues: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateGreens: ƒ(t)
        schemeGreens: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateGreys: ƒ(t)
        schemeGreys: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolatePurples: ƒ(t)
        schemePurples: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateReds: ƒ(t)
        schemeReds: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateOranges: ƒ(t)
        schemeOranges: Array(10) [empty × 3, Array(3), Array(4), Array(5), Array(6), Array(7), Array(8), Array(9)]
        interpolateCubehelixDefault: ƒ(t)
        interpolateRainbow: ƒ(t)
        interpolateWarm: ƒ(t)
        interpolateCool: ƒ(t)
        interpolateSinebow: ƒ(t)
        interpolateViridis: ƒ(e)
        interpolateMagma: ƒ(e)
        interpolateInferno: ƒ(e)
        interpolatePlasma: ƒ(e)
        create: ƒ(t)
        creator: ƒ(t)
        local: ƒ()
        matcher: ƒ(t)
        mouse: ƒ(t)
        namespace: ƒ(…)
        namespaces: Object {svg: "http://www.w3.org/2000/svg", xhtml: "http://www.w3.org/1999/xhtml", xlink: "http://www.w3.org/1999/xlink", xml: "http://www.w3.org/XML/1998/namespace", xmlns: "http://www.w3.org/2000/xmlns/"}
        clientPoint: ƒ(t, n)
        select: ƒ(t)
        selectAll: ƒ(t)
        selection: ƒ()
        selector: ƒ(t)
        selectorAll: ƒ(t)
        style: ƒ(t, n)
        touch: ƒ(t, n, e)
        touches: ƒ(t, n)
        window: ƒ(t)
        customEvent: ƒ(n, e, r, i)
        arc: ƒ()
        area: ƒ()
        line: ƒ()
        pie: ƒ()
        areaRadial: ƒ()
        radialArea: ƒ()
        lineRadial: ƒ()
        radialLine: ƒ()
        pointRadial: ƒ(t, n)
        linkHorizontal: ƒ()
        linkVertical: ƒ()
        linkRadial: ƒ()
        symbol: ƒ()
        symbols: Array(7) [Object, Object, Object, Object, Object, Object, Object]
        symbolCircle: Object {draw: ƒ(t, n)}
        symbolCross: Object {draw: ƒ(t, n)}
        symbolDiamond: Object {draw: ƒ(t, n)}
        symbolSquare: Object {draw: ƒ(t, n)}
        symbolStar: Object {draw: ƒ(t, n)}
        symbolTriangle: Object {draw: ƒ(t, n)}
        symbolWye: Object {draw: ƒ(t, n)}
        curveBasisClosed: ƒ(t)
        curveBasisOpen: ƒ(t)
        curveBasis: ƒ(t)
        curveBundle: ƒ(t)
        curveCardinalClosed: ƒ(t)
        curveCardinalOpen: ƒ(t)
        curveCardinal: ƒ(t)
        curveCatmullRomClosed: ƒ(t)
        curveCatmullRomOpen: ƒ(t)
        curveCatmullRom: ƒ(t)
        curveLinearClosed: ƒ(t)
        curveLinear: ƒ(t)
        curveMonotoneX: ƒ(t)
        curveMonotoneY: ƒ(t)
        curveNatural: ƒ(t)
        curveStep: ƒ(t)
        curveStepAfter: ƒ(t)
        curveStepBefore: ƒ(t)
        stack: ƒ()
        stackOffsetExpand: ƒ(t, n)
        stackOffsetDiverging: ƒ(t, n)
        stackOffsetNone: ƒ(t, n)
        stackOffsetSilhouette: ƒ(t, n)
        stackOffsetWiggle: ƒ(t, n)
        stackOrderAppearance: ƒ(t)
        stackOrderAscending: ƒ(t)
        stackOrderDescending: ƒ(t)
        stackOrderInsideOut: ƒ(t)
        stackOrderNone: ƒ(t)
        stackOrderReverse: ƒ(t)
        timeInterval: ƒ(…)
        timeMillisecond: ƒ(n)
        timeMilliseconds: ƒ(e, r, o)
        utcMillisecond: ƒ(n)
        utcMilliseconds: ƒ(e, r, o)
        timeSecond: ƒ(n)
        timeSeconds: ƒ(e, r, o)
        utcSecond: ƒ(n)
        utcSeconds: ƒ(e, r, o)
        timeMinute: ƒ(n)
        timeMinutes: ƒ(e, r, o)
        timeHour: ƒ(n)
        timeHours: ƒ(e, r, o)
        timeDay: ƒ(n)
        timeDays: ƒ(e, r, o)
        timeWeek: ƒ(n)
        timeWeeks: ƒ(e, r, o)
        timeSunday: ƒ(n)
        timeSundays: ƒ(e, r, o)
        timeMonday: ƒ(n)
        timeMondays: ƒ(e, r, o)
        timeTuesday: ƒ(n)
        timeTuesdays: ƒ(e, r, o)
        timeWednesday: ƒ(n)
        timeWednesdays: ƒ(e, r, o)
        timeThursday: ƒ(n)
        timeThursdays: ƒ(e, r, o)
        timeFriday: ƒ(n)
        timeFridays: ƒ(e, r, o)
        timeSaturday: ƒ(n)
        timeSaturdays: ƒ(e, r, o)
        timeMonth: ƒ(n)
        timeMonths: ƒ(e, r, o)
        timeYear: ƒ(n)
        timeYears: ƒ(e, r, o)
        utcMinute: ƒ(n)
        utcMinutes: ƒ(e, r, o)
        utcHour: ƒ(n)
        utcHours: ƒ(e, r, o)
        utcDay: ƒ(n)
        utcDays: ƒ(e, r, o)
        utcWeek: ƒ(n)
        utcWeeks: ƒ(e, r, o)
        utcSunday: ƒ(n)
        utcSundays: ƒ(e, r, o)
        utcMonday: ƒ(n)
        utcMondays: ƒ(e, r, o)
        utcTuesday: ƒ(n)
        utcTuesdays: ƒ(e, r, o)
        utcWednesday: ƒ(n)
        utcWednesdays: ƒ(e, r, o)
        utcThursday: ƒ(n)
        utcThursdays: ƒ(e, r, o)
        utcFriday: ƒ(n)
        utcFridays: ƒ(e, r, o)
        utcSaturday: ƒ(n)
        utcSaturdays: ƒ(e, r, o)
        utcMonth: ƒ(n)
        utcMonths: ƒ(e, r, o)
        utcYear: ƒ(n)
        utcYears: ƒ(e, r, o)
        timeFormatDefaultLocale: ƒ(n)
        timeFormatLocale: ƒ(t)
        isoFormat: ƒ(t)
        isoParse: ƒ(t)
        now: ƒ()
        timer: ƒ(t, n, e)
        timerFlush: ƒ()
        timeout: ƒ(t, n, e)
        interval: ƒ(t, n, e)
        transition: ƒ(t)
        active: ƒ(t, n)
        interrupt: ƒ(t, n)
        voronoi: ƒ()
        zoom: ƒ()
        zoomTransform: ƒ(t)
        zoomIdentity: Sb {k: 1, x: 0, y: 0}
    }
    d3 = require("d3@5")

}


