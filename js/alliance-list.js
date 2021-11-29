function allianceList(data){
    console.log(data);

    var selectAllListcont = d3.select(".alliance-list")

    var allList = selectAllListcont.selectAll(".alliance-item")
        .data(data).enter().append("li")
        .attr("class", "alliance-item")
        .html(function(d){
            return d
        })
}