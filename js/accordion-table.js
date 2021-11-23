var tabledata = [
  {"Party":"AIADMK +","id":"AIADMK +","legend":"All India Anna Dravida Munnetra Kazhagam","name":"All India Anna Dravida Munnetra Kazhagam","Seats":75,"Won":75,"Leading":0,"Total":75},
{"Party":"DMK +","id":"DMK +","legend":"Dravida Munetra Kazhagam","name":"Dravida Munetra Kazhagam","Seats":159,"Won":159,"Leading":0,"Total":159}
];

// var tabledata = [
//   {"Party":"AIADMK","Won":134,"Leading":0,"Total":134},
//   {"Party":"DMK","Won":89,"Leading":0,"Total":89},
//   {"Party":"INC","Won":8,"Leading":0,"Total":8},
//   {"Party":"IML","Won":1,"Leading":0,"Total":1}
// ];

function drawAccTable(data, selector, labels, textLabels){
	// console.log("Share data:"+data);
    var table = d3.select(selector).append('table')
    var thead = table.append('thead')
    var	tbody = table.append('tbody')

    // append the header row
		thead.append('tr')
        .selectAll('th')
        .data(labels).enter()
        .append('th')
          .text(function (column) { return textLabels[column]; });

    partyRow = tbody.selectAll('.partyRow')
      .data(data)
      .enter()
      .append('tr')
      .attr("class", "partyRow");

      var partyCell = partyRow.selectAll('td')
          .data(function (row) {
            return labels.map(function (column) {
              // console.log(column)
              return {column: column, value: row[column]};
            });
          })
          .enter()
          .append('td')
          .attr('class', function(d,i){
            // "candName", "party", "votes", "votes%", "status"
            if(d.column === "candName"){
              return "stateRow";
            }else{
              return "districtRow"
            }
          })
          .attr('data-label', function(d,i){
            return textLabels[d.column];
          })
          .html(function (d) { 
              // console.log(d)
              // return d.value;
              if(d.column === "party" ||  d.column === "id"){
                return "<span style='margin-left:18px'>"+d.value+"</span>";
              }if(d.column === "votes%" ){
                return formatNumberPer(d.value);
              }else{
                return d.value;
              }
          });
    
    return table;
    
}






// $(document).ready(function(){

//   $('.alliance-list').click(function(){
//     var selectedparty = $(this).data();
//   })

// });