function formatNumberInd(num) {
    return num.toLocaleString('en-IN');
}
function formatNumberPer(num) {
    return parseFloat(num).toFixed(2) + "%";
}

$(window).load(function() {
  if($(this).width() < 480){
    $(".districtRow").hide()
    }
});



$(window).resize(function() {

    if( $(this).width() < 480 ) {
       $(".districtRow").hide().css("display","none")
       
    }else{
        $(".districtRow").css("display","table-cell")
    }

});


$('body').on('click', '.stateRow', function () {
    $(this).siblings().toggle("fade").css("display","block")
    $(this).toggleClass("active");
});