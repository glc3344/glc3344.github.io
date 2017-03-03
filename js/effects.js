var main = function () {

    $('#sidebar').hide(0).show(1500);
    $('#hideSide').hide(0).show(1500);

    $('#hideSide').on('click', function() {
       $('#sidebar').slideToggle(1000)
    });



};

$(document).ready(main);


