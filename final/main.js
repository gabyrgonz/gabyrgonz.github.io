document.addEventListener('DOMContentLoaded',function(){
  req=new XMLHttpRequest();
  req.open("GET",'https://gabyrgonz.github.io/final/ALL-SPURS-DATA.json',true);
  req.send();
  req.onload=function(){
    json=JSON.parse(req.responseText);
    elo = json.season


//1. Define the variables and modify the data array.

    // Parse the month and create a new data array
    const data = []
    const parseMonth = d3.timeParse('%m')
    variance.forEach(function(val){
      data.push([val.year, parseMonth(val.month), val.variance, val.month])
    })
    //Array of intervals for key/colors
    const legend = [2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8, 13.9]

    // X-axis indices based on year
    for (var i=0; i<data.length; i++){
      data[i].push(data[i][0] - 1752)
    }





































}
