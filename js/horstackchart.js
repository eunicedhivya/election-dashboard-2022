votesharedata = [{"party":"CPIM","votes":58,"votes%":41.42857142857143,"status":"lead"},{"party":"INC","votes":22,"votes%":15.714285714285714,"status":"lead"},{"party":"CPI","votes":19,"votes%":13.571428571428571,"status":"lead"},{"party":"IUML","votes":18,"votes%":12.857142857142858,"status":"lead"},{"party":"IND","votes":6,"votes%":4.285714285714286,"status":"lead"},{"party":"Others","votes":17,"votes%":12.142857142857142,"status":"lead"}]


var partycolors={
    "CPIM": "red",
    "INC": "green",
    "CPI": "red",
    "IUML": "blue",
    "IND": "grey",
    "Others": "grey"
}


function drawHorizontalStackChart(selection, stackdata, props) {
    console.log(stackdata);
    
    var hordivcont = d3.select(selection)
    hordivcont.html(null)

    var addContainer = hordivcont.append("div")
        .attr("class", "horbarchart")

    addContainer.selectAll(".block")
        .data(stackdata).enter()
        .append("div").attr("class", "block")
        .style("background-color",  function(d,i){
            return partycolors[d[props["label"]]];

        })
        .style("width", function(d,i){
            return d[props["valueper"]]+"%";
        })
        .html(function(d,i){
            return '<span class="value">'+d[props["value"]]+'</span> <span class="label">'+d[props["label"]]+'</span>';
        })
        .attr("title", function(d){
            return d[props["label"]] +": "+ d[props["value"]];
        }) //Tooltip
        

} // end of horstackchart

drawHorizontalStackChart("#seatshare2017", votesharedata, {
    "type": "seatshare",
    "valueper": "votes%",
    "label": "party",
    "value": "votes"
})