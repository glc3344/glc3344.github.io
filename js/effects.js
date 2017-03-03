var main = function () {


    if ($(window).width() < 960) {
        $('#sidebar').hide(0);
        $('#hideSide').on('click', function () {
            $('#sidebar').slideToggle(1000)
        });
        $('ul').on('click', function () {
            $('#sidebar').slideUp(500)
        });

    }
    else {
        $('#sidebar').hide(0).show(1500);
        $('#hideSide').hide(0).show(1500);

        $('#hideSide').on('click', function () {
            $('#sidebar').slideToggle(1000)
        });
    }


};

$(document).ready(main);


