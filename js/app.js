"use strict";

// GLOBAL INFOWINDOW
var infowindow = new google.maps.InfoWindow();
var currentMarker = null;

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
        latLng: {lat: 41.349989, lng: -72.892873}
    },
    {
        name: 'Two Roads Brewing Company',
        address: '1700 Stratford Ave, Stratford, CT 06615',
        latLng: {lat: 41.186259, lng: -73.142184}
    },
    {
        name: 'SBC Brewery & Restaurant',
        address: '33 New Haven Ave, Milford, CT 06460',
        latLng: {lat: 41.222610, lng: -73.055755}
    }
];


var Brewery = function (data) {
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
        zoom: 10,
        styles: [{"stylers": [{"hue": "#ff1a00"}, {"invert_lightness": true}, {"saturation": -100}, {"lightness": 33}, {"gamma": 0.6}]}, {
            "featureType": "water",
            "elementType": "geometry",
            "stylers": [{"color": "#2D333C"}]
        }]
    });

    // BREWERIES
    self.allBreweries = ko.observableArray([]);
    breweries.forEach(function (brewery) {
        self.allBreweries.push(brewery);
    });

    // MARKERS
    self.allBreweries().forEach(function (brewery) {
        var markerOptions = {
            map: self.googleMap,
            position: brewery.latLng,
            animation: google.maps.Animation.DROP
        };

        brewery.marker = new google.maps.Marker(markerOptions);


        // ON CLICK EVENT LISTENER
        brewery.marker.addListener('click', function () {
            infowindow.open(map, brewery.marker);
            infowindow.setContent('<h3 id="contentH3">' + brewery.name + '</h3>' + brewery.address);
            self.googleMap.panTo(brewery.latLng);
            // Stop bounce on next click
            if (currentMarker) currentMarker.setAnimation(google.maps.Animation.NONE);
            currentMarker = brewery.marker;
            brewery.marker.setAnimation(google.maps.Animation.BOUNCE);
        });

    });

    // Activate the appropriate marker when the user clicks a list item
    self.showInfo = function (brewery) {
        google.maps.event.trigger(brewery.marker, 'click');
    };


    // define filter array
    self.visibleBreweries = ko.observableArray([]);

    // Setup array unfiltered initially
    self.allBreweries().forEach(function (brewery) {
        self.visibleBreweries.push(brewery);
    });

    // KO observable on search box
    self.searchBox = ko.observable('');

    // Filtered Markers
    self.filterMarkers = function () {
        var searchInput = self.searchBox().toLowerCase();

        self.visibleBreweries.removeAll();

        self.allBreweries().forEach(function (brewery) {
            brewery.marker.setVisible(false);

            if (brewery.name.toLowerCase().indexOf(searchInput) !== -1) {
                self.visibleBreweries.push(brewery);
                brewery.marker.setAnimation(google.maps.Animation.BOUNCE);
            }
            else if (brewery.address.toLowerCase().indexOf(searchInput) !== -1) {
                self.visibleBreweries.push(brewery);
                brewery.marker.setAnimation(google.maps.Animation.BOUNCE);
            }
            if (searchInput === '') {
                brewery.marker.setAnimation(google.maps.Animation.DROP);
            }
        });

        self.visibleBreweries().forEach(function (brewery) {
            brewery.marker.setVisible(true);

        });
    };

    function Brewery(dataObj) {
        this.name = dataObj.name;
        this.latLng = dataObj.latLng;

        this.marker = null;
    }
};

ko.applyBindings(new ViewModel());

