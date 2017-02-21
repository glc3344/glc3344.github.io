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
    },
    {
        name: 'OEC Brewing',
        address: '7 Fox Hollow Road, Oxford, CT 06478',
        latLng: {lat: 41.473007, lng: -73.121106}
    },
    {
        name: 'Shebeen Brewing Company',
        address: '1 Wolcott Rd, Wolcott, CT 06716',
        latLng: {lat: 41.571034, lng: -73.001884}
    },
    {
        name: 'No Worries Brewing Company',
        address: '2520 State St, Hamden, CT 06517',
        latLng: {lat: 41.349989, lng:  -72.892873}
    },
    {
        name: 'Two Roads Brewing Company',
        address: '1700 Stratford Ave, Stratford, CT 06615',
        latLng: {lat: 41.186259, lng:  -73.142184}
    },
    {
        name: 'SBC Brewery & Restaurant',
        address: '33 New Haven Ave, Milford, CT 06460',
        latLng: {lat: 41.222610, lng:  -73.055755}
    }
];



var Brewery = function(data) {
    "use strict";
    this.name = ko.observable(data.name);
    this.address = ko.observable(data.address);
    this.latLng = ko.observable(data.latLng);
    this.id = ko.observable(data.id);
    this.marker = ko.observable();
};




  //////////////////
 //  VIEW MODEL  //
//////////////////

var ViewModel = function () {
    var self = this;

    // GOOGLE MAPS OBJECT
    self.googleMap = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 41.348209, lng: -73.078189},
        zoom: 11,
        styles: [{"stylers": [{"hue": "#ff1a00"}, {"invert_lightness": true}, {"saturation": -100}, {"lightness": 33}, {"gamma": 0.6}]}, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#2D333C"}]
        }]
    });

    // BREWERIES
    self.allBreweries = ko.observableArray([]);
    breweries.forEach(function(brewery) {
        self.allBreweries.push(new Brewery(brewery));
    });

    // MARKERS
    self.allBreweries().forEach(function(brewery) {
        var markerOptions = {
            map: self.googleMap,
            position: brewery.latLng()
        };

        brewery.marker = new google.maps.Marker(markerOptions);
    });

};

ko.applyBindings(new ViewModel());

