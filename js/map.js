//format to substitute data with abreviation
var party_abrev = {
    "Bharatiya Janta Party":"BJP", 
    "Suheldev Bhartiya Samaj Party":"SBSP", 
    "Bahujan Samaj Party":"BSP", 
    "Samajwadi Party":"SP", 
    "Independent":"IND", 
    "Indian National Congress":"Congress", 
    "Apna Dal (Soneylal)":"APS", 
    "Rashtriya Lok Dal":"RLD", 
    "Nirbal Indian Shoshit Hamara Aam Dal":"NISHAD"
}

//format to substitute data with color
var partycolors = { 
    "BJP":	"#ff9900",
    "SBSP":	"#ff9900",
    "BSP":	"#ff9900",
    "SP":	"red",
    "IND":	"red",
    "Congress":	"red",
    "APS":	"grey",
    "RLD":	"blue",
    "NISHAD":	"green"
}




function drawAssemblyMap(selector, settings){
    var width = 430, height = 350; 
    var state = settings.statecode;
    var source = settings.mapsource;

    // empty selected container (required for redrawing map)
    d3.select(selector).html(null)

    // create and append svg to selected container with responsive setting
    var svg = d3.select(selector)
        .append("svg")
        .attr("class", settings.vhcode+"map")
        .attr("viewBox", "0 0 " + width + " " + height)
        .attr("preserveAspectRatio", "xMinYMin")
        .append("g")

    var tool_tip = d3.tip()
        .attr("class", "map-tooltip")
        .offset([-15, 0])
        .html(function(d) { 
            var html = "<p>"+d.properties.ac_name+"</p> "
            return html; 
        });
    svg.call(tool_tip);

    var projection = d3.geoMercator()
        .scale(settings.scale)
        .center(settings.center)
        .translate([width / 2, height / 2])

    var geoPath = d3.geoPath()
        .projection(projection)
    
    d3.json(source, function(error, stateShape){
        
        // Converts and extracts topojson to map
        var stateconst = topojson.feature(stateShape, stateShape.objects.collection).features;
        console.log(stateconst);

        svg.selectAll(".state")
            .data(stateconst).enter().append("path")
            .attr("d", geoPath)
            .attr("class", function(d) {
                return "const c" + d.properties.ac;
            })
            .attr('stroke', "#333")
            .attr('stroke-width', "1")
            .on('mouseover', tool_tip.show) // to enable d3tip tooltips
            .on('mouseout', tool_tip.hide) // to disable d3tip tooltips
            // .attr('data-color', function(d,i){
            //     var fdTrendData2017 = constwisetrenddata2017.filter(function(obj){
            //         return obj["constNo"] === d.properties.ac;
            //     })

            //     // console.log(fdTrendData2017[0])

            //     // enter the filtered data in abreviation and colors object
            //     return partycolors[party_abrev[fdTrendData2017[0]["leadingParty"]]];
                
            // })
            .attr('fill', function(d,i){
                return "#ccc";
                // var fdTrendData2017 = constwisetrenddata2017.filter(function(obj){
                //     return obj["constNo"] === d.properties.ac;
                // })

                // // console.log(fdTrendData2017[0])

                // // enter the filtered data in abreviation and colors object
                // return partycolors[party_abrev[fdTrendData2017[0]["leadingParty"]]];
                
            })
            // .on('click', function(d,i){
                
                
            //     d3.selectAll(".const").attr("stroke", "#ccc").attr("stroke-width", "0.2")

            //     d3.select(".c"+d.properties.ac).attr("stroke", "black").attr("stroke-width", "5")

            //     $('#const-list').val(d.properties.ac).trigger('change')


            //     filterNDisplay2017(d.properties.ac);

                
            // })

            // // filter const data by default on load
            // var defaultUPData = constwisetrenddata2017.filter(function(obj){
            //     return obj["constNo"] === settings.defaultconst;
            // })

            // d3.select(".const_name").html(defaultUPData[0]["constituency"])
            // d3.select(".status").html(defaultUPData[0]["status"])
            // d3.select(".leadCandName").html(defaultUPData[0]["leadingCandidate"] + " <span>("+party_abrev[defaultUPData[0]["leadingParty"]]+")</span>")
            // d3.select(".trailingCandName").html(defaultUPData[0]["trailingCandidate"] + " <span>("+party_abrev[defaultUPData[0]["trailingParty"]]+")</span>")
            // d3.select(".margin").html(defaultUPData[0]["margin"].toLocaleString('en-IN'))

            // // Select const path by default on load
            // d3.select(".c"+settings.defaultconst).attr("stroke", "black").attr("stroke-width", "5")

            // var selectDropdown = d3.select("#const-list")

            // selectDropdown.html(null);

            // var options = selectDropdown.selectAll('option')
            //     .data(stateconst).enter()
            //     .append('option')
            //     .attr("value", function (d) { 
            //         return d.properties.ac; 
            //     })
            //     .attr("data-id", function (d) { 
            //         return d.properties.ac; 
            //     })
            //     .text(function (d) {
            //         // console.log(d.properties.ac_name);
            //         return d.properties.ac_name;
            //     }); 

            $('#const-list').val(settings.defaultconst).trigger('change')

    }) // Statelevel Source

    
 

} // end of mapfunction

drawAssemblyMap(".map", {
    statecode: 'U07', // Statecode for map
    vhcode: 'up', // state vehicle code
    defaultconst: 175, // state vehicle code
    mapsource: 'assets/maps/UP.json', // add map topojson
    scale: 2500, // size adjust until it sits well
    center: [80.9462, 27.2] // enter lat long from google of UP
})

function displayConstituency(){

    var chosenOption = $("#const-list").val();

    d3.selectAll(".const").attr("stroke", "#fff").attr("stroke-width", "0.5")
    
    d3.select(".c"+chosenOption).attr("stroke", "black").attr("stroke-width", "5")

    filterNDisplay2017(parseInt(chosenOption));

}


function filterNDisplay2017(acno){
    
    var fdTrendData2017 = constwisetrenddata2017.filter(function(obj){
        return obj["constNo"] === acno;
    })

    d3.select(".const_name").html(fdTrendData2017[0]["constituency"])
    d3.select(".status").html(fdTrendData2017[0]["status"])
    d3.select(".leadCandName").html(fdTrendData2017[0]["leadingCandidate"] + " <span>("+party_abrev[fdTrendData2017[0]["leadingParty"]]+")</span>")
    d3.select(".trailingCandName").html(fdTrendData2017[0]["trailingCandidate"] + " <span>("+party_abrev[fdTrendData2017[0]["trailingParty"]]+")</span>")
    d3.select(".margin").html(fdTrendData2017[0]["margin"].toLocaleString('en-IN'))
}