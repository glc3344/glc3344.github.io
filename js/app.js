"use strict";

// GLOBAL
var infowindow = new google.maps.InfoWindow();
var currentMarker = null;


///////////////////
//   BREWERIES   //
///////////////////


var breweries = [
    {
        name: 'Black Hog Brewing Co' + '<br>',
        address: '9A, 115 Hurley Rd, Oxford, CT 06478',
        latLng: {lat: 41.476293, lng: -73.151555}
    },
    {
        name: 'New England Brewing Company' + '<br>',
        address: '175 Amity Rd, Woodbridge, CT 06525',
        latLng: {lat: 41.339608, lng: -72.980850}
    },
    {
        name: 'OEC Brewing' + '<br>',
        address: '7 Fox Hollow Road, Oxford, CT 06478',
        latLng: {lat: 41.473007, lng: -73.121106}
    },
    {
        name: 'Shebeen Brewing Company' + '<br>',
        address: '1 Wolcott Rd, Wolcott, CT 06716',
        latLng: {lat: 41.571034, lng: -73.001884}
    },
    {
        name: 'No Worries Brewing Company' + '<br>',
        address: '2520 State St, Hamden, CT 06517',
        latLng: {lat: 41.349989, lng: -72.892873}
    },
    {
        name: 'Two Roads Brewing Company' + '<br>',
        address: '1700 Stratford Ave, Stratford, CT 06615',
        latLng: {lat: 41.186259, lng: -73.142184}
    },
    {
        name: 'SBC Brewery & Restaurant' + '<br>',
        address: '33 New Haven Ave, Milford, CT 06460',
        latLng: {lat: 41.222610, lng: -73.055755}
    },
    {
        name: 'Veracious Brewing Company' + '<br>',
        address: '246 Main St, Monroe, CT 06468',
        latLng: {lat: 41.310499, lng: -73.256018}
    },
    {
        name: 'Thomas Hooker Brewery' + '<br>',
        address: '16 Tobey Rd, Bloomfield, CT 06002',
        latLng: {lat: 41.809184, lng: -72.710753}
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
            infowindow.setContent('<a id="yelp-url">' + brewery.name + '</a>' +
                '<p>' + brewery.address + '</p>' +
                '<p>' + 'Yelp Rating:' + '</p>' + '<img id="yelp-rating">' +
                '<p id="yelp-snippet">' + '</p>'
            );

            self.googleMap.panTo(brewery.latLng);
            self.getYelpData(brewery);

            // Stop bounce on next click
            if (currentMarker) currentMarker.setAnimation(google.maps.Animation.NONE);
            currentMarker = brewery.marker;
            brewery.marker.setAnimation(google.maps.Animation.BOUNCE);
        });

        google.maps.event.addListener(infowindow, "closeclick", function () {
            brewery.marker.setAnimation(google.maps.Animation.NONE);
        });

        google.maps.event.addListener(self.googleMap, "click", function () {
            infowindow.close();
            brewery.marker.setAnimation(google.maps.Animation.NONE);
        });

    });

    // Activate the marker when the user clicks list item
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


//////////////////
// YELP, OAUTH  //
//////////////////

    self.getYelpData = function (brewery) {
        // Uses the oauth-signature package installed with bower per https://github.com/bettiolo/oauth-signature-js

        // Use the GET method for the request
        var httpMethod = 'GET';

        // Yelp API request url
        var yelpURL = 'https://api.yelp.com/v2/search/';

        // nonce generator
        // function credit of: https://blog.nraboy.com/2015/03/create-a-random-nonce-string-using-javascript/
        var nonce = function (length) {
            var text = "";
            var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length));
            }
            return text;
        };

        // Set required parameters for authentication & search
        var parameters = {
            oauth_consumer_key: 'dOyPnZY_mXZTjUUkqzFFjw',
            oauth_token: 'tBUBtvPYtujkQf_KH1TFguMsOyvtDXj7',
            oauth_nonce: nonce(20),
            oauth_timestamp: Math.floor(Date.now() / 1000),
            oauth_signature_method: 'HMAC-SHA1',
            oauth_version: '1.0',
            callback: 'cb',
            term: brewery.name,
            location: brewery.address,
            limit: 1
        };

        // Set other API parameters
        var consumerSecret = 'Eg64L8QZK_txeNxDs-RJ7SfVzpM';
        var tokenSecret = 'cuHdcWEfG71oBHQbWpue4QaeASY';

        var signature = oauthSignature.generate(httpMethod, yelpURL, parameters, consumerSecret, tokenSecret);

        // Add signature to list of parameters
        parameters.oauth_signature = signature;

        // Set up ajax settings
        var ajaxSettings = {
            url: yelpURL,
            data: parameters,
            cache: true,
            dataType: 'jsonp',
            success: function (response) {
                // Update the infoWindow to display the yelp rating image
                $('#yelp-rating').attr("src", response.businesses[0].rating_img_url);
                $('#yelp-snippet').html(response.businesses[0].snippet_text);
                $('#yelp-url').attr("href", response.businesses[0].url);
            },
            error: function () {
                $('#text').html('Data could not be retrieved from yelp.');
            }
        };

        // Send off the ajaz request to Yelp
        $.ajax(ajaxSettings);
    };


    function Brewery(dataObj) {
        this.name = dataObj.name;
        this.latLng = dataObj.latLng;

        this.marker = null;
    }


};


ko.applyBindings(new ViewModel());

