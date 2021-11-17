votesharedata = [{"party":"BJP","votes":58,"votes%":41.42857142857143,"status":"lead"},{"party":"BSP","votes":22,"votes%":15.714285714285714,"status":"lead"},{"party":"SP","votes":19,"votes%":13.571428571428571,"status":"lead"},{"party":"DDS","votes":18,"votes%":12.857142857142858,"status":"lead"},{"party":"OTH","votes":23,"votes%":16.4285714286,"status":"lead"}]


var partycolors={
    "BJP": "orange",
    "BSP": "green",
    "SP": "aqua",
    "DDS": "purple",
    "OTH": "grey"
}


function drawHorizontalStackChart(selection, stackdata, props) {
    console.log(stackdata);
    
    var hordivcont = d3.select(selection)
    hordivcont.html(null)

    var addContainer = hordivcont.append("div")
        .attr("class", "horbarchart")

    var addLegend = hordivcont.append("div")
        .attr("class", "horbarchart-legend")

    addContainer.selectAll(".block")
        .data(stackdata).enter()
        .append("div").attr("class", "block")
        .style("background-color",  function(d,i){
            return partycolors[d[props["label"]]];

        })
        .style("width", function(d,i){
            return d[props["valueper"]]+"%";
        })
        // .html(function(d,i){
        //     return '<span class="value">'+d[props["value"]]+'</span> <span class="label">'+d[props["label"]]+'</span>';
        // })
        // .attr("title", function(d){
        //     return d[props["label"]] +": "+ d[props["value"]];
        // }) //Tooltip

    addLegend.selectAll(".legend-block")
        .data(stackdata).enter()
        .append("div").attr("class", "legend-block")
        .style("background-color",  function(d,i){
            return partycolors[d[props["label"]]];

        })
        .html(function(d,i){
            return '<span class="partylabel">'+d[props["label"]]+'</span> <span class="value">'+d[props["value"]]+'</span>';
        })
        

} // end of horstackchart

drawHorizontalStackChart("#seatshare2017", votesharedata, {
    "type": "seatshare",
    "valueper": "votes%",
    "label": "party",
    "value": "votes"
})