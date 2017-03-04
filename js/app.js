var init = function () {
    "use strict";

// GLOBAL
    var infowindow = new google.maps.InfoWindow;
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
        },
        {
            name: 'Back East Brewing Company' + '<br>',
            address: '1296 Blue Hills Ave, Bloomfield, CT 06002',
            latLng: {lat: 41.855090, lng: -72.705105}
        },
        {
            name: 'Brass Works Brewing Co.' + '<br>',
            address: '2066 Thomaston Ave, Waterbury, CT 06704',
            latLng: {lat: 41.597526, lng: -73.057665}
        },
        {
            name: 'Half Full Brewery' + '<br>',
            address: '43 Homestead Ave, Stamford, CT 06902',
            latLng: {lat: 41.039497, lng: -73.549929}
        },
        {
            name: 'Cold Creek Brewery' + '<br>',
            address: '6 Industrial Dr, Ellington, CT 06029',
            latLng: {lat: 41.920540, lng: -72.453881}
        },
        {
            name: 'Cottrell Brewing Company' + '<br>',
            address: '100 Mechanic St #22, Pawcatuck, CT 06379',
            latLng: {lat: 41.369764, lng: -71.833548}
        },
        {
            name: 'Hanging Hills Brewing Company' + '<br>',
            address: '150 Ledyard St, Hartford, CT 06114',
            latLng: {lat: 41.744485, lng: -72.669612}
        },
        {
            name: 'Powder Hollow Brewery' + '<br>',
            address: '504 Hazard Ave, Enfield, CT 06082',
            latLng: {lat: 41.983913, lng: -72.519547}
        },
        {
            name: 'Overshores Brewing Co' + '<br>',
            address: '250 Bradley St, East Haven, CT 06512',
            latLng: {lat: 41.288994, lng: -72.874348}
        },
        {
            name: 'Relic Brewing' + '<br>',
            address: '95 Whiting StPlainville, CT 06062',
            latLng: {lat: 41.665613, lng: -72.867477}
        },
        {
            name: 'Still Hill Brewery' + '<br>',
            address: '1275 Cromwell Ave, Rocky Hill, CT 06067',
            latLng: {lat: 41.635728, lng: -72.676785}
        },
        {
            name: 'Steady Habit Brewing Company' + '<br>',
            address: '95 Bridge Rd, Haddam, CT 06438',
            latLng: {lat: 41.448331, lng: -72.472449}
        },
        {
            name: 'Stony Creek Brewery' + '<br>',
            address: '5 Indian Neck Ave, Branford, CT 06405',
            latLng: {lat: 41.274843, lng: -72.813437}
        },
        {
            name: 'Stubborn Beauty Brewing' + '<br>',
            address: 'Remington Rand, 180 Johnson St, Middletown, CT 06457',
            latLng: {lat: 41.572053, lng: -72.657754}
        },
        {
            name: "The Beer’d Brewing Company" + '<br>',
            address: '22 Bayview Ave #15, Stonington, CT 06378',
            latLng: {lat: 41.337990, lng: -71.898455}
        },
        {
            name: 'Thimble Island Brewing Company' + '<br>',
            address: '16 Business Park Dr, Branford, CT 06405',
            latLng: {lat: 41.296726, lng: -72.771561}
        },
        {
            name: 'Tidal River Brewing' + '<br>',
            address: '15 Cheryl Dr, Canton, CT 06019',
            latLng: {lat: 41.824311, lng: -72.878519}
        },
        {
            name: 'Top Shelf Brewing Company' + '<br>',
            address: '422 N Main St, Manchester, CT 06042',
            latLng: {lat: 41.795558, lng: -72.529484}
        }

    ];


//////////////////
//  VIEW MODEL  //
//////////////////


    var ViewModel = function () {
        var self = this;

        // GOOGLE MAPS OBJECT
        self.googleMap = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 41.536987, lng: -72.865966},
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

        // CUSTOM MARKER ICON
        var beerIcon = {
            url: "images/beer.svg",
            scaledSize: new google.maps.Size(70, 60)
        };


        // MARKERS
        self.allBreweries().forEach(function (brewery) {
            var markerOptions = {
                map: self.googleMap,
                position: brewery.latLng,
                icon: beerIcon,
                optimized: false,
                animation: google.maps.Animation.DROP
            };

            brewery.marker = new google.maps.Marker(markerOptions);

            // ON CLICK EVENT LISTENER
            brewery.marker.addListener('click', function () {


                infowindow.open(map, brewery.marker);
                // infowindow.setContent('<a id="yelp-url">' + brewery.name + '</a>' +
                //     '<img id="yelp-image" style="float: right; padding: 10px;" >' +
                //     '<p>' + brewery.address + '</p>' +
                //     '<p>' + 'Yelp Rating:' + '</p>' + '<img id="yelp-rating">' +
                //     '<p id="yelp-snippet">' + '</p>' +
                //     '<h3 id="text">' + '</h3>'
                // );

                self.googleMap.panTo(brewery.latLng);
                self.googleMap.panBy(0, -200);
                self.getYelpData(brewery);

                // Stop bounce on next click
                if (currentMarker) currentMarker.setAnimation(google.maps.Animation.NONE);
                currentMarker = brewery.marker;
                brewery.marker.setAnimation(google.maps.Animation.BOUNCE);
            });

            // Stop bounce on closing of infowindow
            google.maps.event.addListener(infowindow, "closeclick", function () {
                brewery.marker.setAnimation(google.maps.Animation.NONE);
            });

            // Stop bounce when clicking anywhere on the map
            google.maps.event.addListener(self.googleMap, "click", function () {
                infowindow.close();
                brewery.marker.setAnimation(google.maps.Animation.NONE);
            });


        });

        // Activate the marker when the user clicks brewery in the sidebar
        self.showInfo = function (brewery) {
            google.maps.event.trigger(brewery.marker, 'click');
        };

        // Define filter array
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

                if (brewery.name.toLowerCase().indexOf(searchInput) !== -1 || brewery.address.toLowerCase().indexOf(searchInput) !== -1) {
                    self.visibleBreweries.push(brewery);
                    brewery.marker.setAnimation(google.maps.Animation.DROP);
                }
                else {
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

        // Struggled with this section, needed help from
        // https://github.com/ToniRib/neighborhood-map/blob/master/src/js/app.js

        self.getYelpData = function (brewery) {
            // Uses the oauth-signature package installed with bower per https://github.com/bettiolo/oauth-signature-js

            // Use the GET method for the request
            var httpMethod = 'GET';

            // Yelp API request url HTTPS
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
                    // Update the infoWindow to display yelp info
                    // $('#yelp-rating').attr("src", response.businesses[0].rating_img_url);
                    // $('#yelp-snippet').html(response.businesses[0].snippet_text);
                    // $('#yelp-url').attr("href", response.businesses[0].url);
                    // $('#yelp-image').attr("src", response.businesses[0].image_url);



                    infowindow.setContent('<a href=' + response.businesses[0].url + '>' + brewery.name + '</a>' +
                        '<img src=' + response.businesses[0].image_url + ' + alt="rating" + id="yelp-image">' +
                        '<h5>' + brewery.address + '</h5>' +
                        '<h5>' + "Yelp Rating" + '</h5>' +
                        '<img src=' + response.businesses[0].rating_img_url + ' + alt="rating">' +
                        '<p>' + response.businesses[0].snippet_text + '</p>'





                    );

                },
                error: function () {
                    $('#text').html('Sorry, Yelp info could not be retrieved.');
                }
            };

            // Ajax request to Yelp
            $.ajax(ajaxSettings);
        };


    };

    function Brewery(dataObj) {
        this.name = dataObj.name;
        this.latLng = dataObj.latLng;

        this.marker = null;
    }

    ko.applyBindings(new ViewModel());

};


