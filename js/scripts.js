$(function () {
console.log('Scripts Loaded');

var locUrl = 'http://api.open-notify.org/iss-now.json';
var mapUrl = '';
var urls= [locUrl, mapUrl];
var data = [];
var loc = [];
var html = '';
var lat = '';
var long= '';
var city = '';
var country = '';
var village = '';




getData();
setInterval(getData, 5000);

function getData() {
        $.ajax({
            type: 'GET',
            url: locUrl,
            dataType: 'json',
            data: data,
            success: function (data) {
                console.log(data);
                lat = data.iss_position.latitude;
                long = data.iss_position.longitude;
                console.log(lat + long);
                mapUrl = 'https://nominatim.openstreetmap.org/reverse?format=json' + '&lat=' + lat + '&lon=' + long;
                $.ajax({
                    type: 'GET',
                    url: mapUrl,
                    dataType: 'json',
                    data: loc,
                    success: (function (loc) {
                        console.log(mapUrl);
                        console.log(loc);
                        console.log(loc.error);

                        if(loc.error){
                            html = 'The International Space Station is currently above an ocean.';
                            $('#location').html(html);
                        } else {
                            city = loc.address.town;
                            country = loc.address.country;
                            village = loc.address.village;
                            console.log(city + country);

                            if (city === 'undefined' && village === 'undefined') {
                                html = 'The International Space Station is currently above ' + country;
                            } else if (city === 'undefined') {
                                html = 'The International Space Station is currently above ' + village + ', ' + country;
                            } else {
                                html = 'The International Space Station is currently above ' + city + ', ' + country;
                            }
                            $('#location').html(html);
                        }
                    })


                });

            }

        });
    }




});