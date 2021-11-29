// votesharedata = 



function drawHorizontalStackChart(selection, stackdata, props) {
    // console.log(stackdata);
    
    var hordivcont = d3.select(selection)
    hordivcont.html(null)

    var addContainer = hordivcont.append("div")
        .attr("class", "horbarchart")
        .attr("data-label", props.type)

    var addLegend = hordivcont.append("div")
        .attr("class", "horbarchart-legend")
        .style("width", "fit-content")
        .style("margin", "0 auto")

    addContainer.selectAll(".block")
        .data(stackdata).enter()
        .append("div").attr("class", "block")
        .style("display",  "inline-block")
        .style("background-color",  function(d,i){
            console.log(d[props["label"]]);
            console.log(partycolors["DDS"]);
            
            return partycolors[d[props["label"]]];

        })
        .style("width", function(d,i){
            return d[props["valueper"]]+"%";
        })
        .style("height", "28px")
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
        .style("width", "30px")
        .style("height", "8px")
        .style("text-align", "center")
        .style("font-size", "14px")
        .style("display", "inline-block")
        .style("margin", "0 10px")
        .html(function(d,i){
            return '<span class="partylabel" style="display:block;font-weight:bold;margin: 10px 0 0 0;">'+d[props["label"]]+'</span> <span class="value">'+d[props["value"]]+'</span>';
        })
        

} // end of horstackchart

