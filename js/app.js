"use strict";

///////////////////
//   BREWERIES   //
///////////////////

var breweries = [
    {
        name: 'Black Hog Brewing Co',
        address: '9A, 115 Hurley Rd, Oxford, CT 06478',
        latLng: {lat: 41.476293, lng: -73.151555}
    },
    {
        name: 'New England Brewing Company',
        address: '175 Amity Rd, Woodbridge, CT 06525',
        latLng: {lat: 41.339608, lng: -72.980850}
    }
];


///////////////////
//  GOOGLE MAPS  //
///////////////////


var ViewModel = function () {
    var self = this;

        self.googleMap = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 41.339608, lng: -72.980850},
            zoom: 12,
            styles: [{"stylers": [{"hue": "#ff1a00"}, {"invert_lightness": true}, {"saturation": -100}, {"lightness": 33}, {"gamma": 0.6}]}, {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{"color": "#2D333C"}]
            }]
        });
};

ko.applyBindings(new ViewModel());

