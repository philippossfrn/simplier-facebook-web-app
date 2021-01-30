/* jshint -W119 */

//Get yes/no autocomplete buttons
var autocomplete_btn = document.getElementById("autocomplete_location");
var do_not_autocomplete_btn = document.getElementById("do_not_autocomplete_location");

//If user press no to autocomplete then focus to city and hide autocomplete options
do_not_autocomplete_btn.onclick = function check_address() {
    document.getElementById("city").focus();
    document.getElementById("autocomplete_area").style.visibility = "hidden";
};

//If user press yes to autocomplete do things..
autocomplete_btn.onclick = function check_address() {
    //focus to profession field --all the others will be autocompleted
    document.getElementById("profession").focus();

    //If true then browser supports autolocation
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            //https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=35.344805099999995&lon=25.1296133

            //Url with lon & lat to send and find city,address
            var reverse_url = "https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=" + position.coords.latitude + "&lon=" + position.coords.longitude;

            /* Works faster
            var reverse_osm_response; 
            fetch(reverse_url) 
                .then(response => response.json()) 
                .then(data => {
                    reverse_osm_response = data;
                    handle_reverse_response(); 
                }); 
                */
            //Make get http request to reverse OSM service --response is lon & lat
            var xhttp = new XMLHttpRequest();
            var reverse_osm_response;
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    //console.log(xhttp.responseText); 
                    //console.log(xhttp.responseText);
                    reverse_osm_response = JSON.parse(xhttp.responseText);
                    console.log(reverse_osm_response);
                    //Call handle_reverse_response function 
                    handle_reverse_response();
                }
            };
            xhttp.open("GET", reverse_url, true);
            xhttp.send();

            //get response from reverse OSM and find location also complete fields in html page
            function handle_reverse_response() {
                //document.getElementById("result").innerHTML = "Country: " + reverse_osm_response.features[0].properties.geocoding.country + "City: " + reverse_osm_response.features[0].properties.geocoding.city + "Address: " + reverse_osm_response.features[0].properties.geocoding.label;
                //Get country,city,address from response
                var user_country = reverse_osm_response.features[0].properties.geocoding.country;
                var user_city = reverse_osm_response.features[0].properties.geocoding.city;
                var user_address = reverse_osm_response.features[0].properties.geocoding.label;

                //Traverse through country select dropdownn menu and 
                //compare every country with country you got from reverse OSM 
                //Once you find the index that matches both make it the selected option
                var select_country = document.getElementById('select_country');
                for (var i = 0; i < select_country.options.length; i++) {
                    if (select_country.options[i].text === user_country) {
                        select_country.selectedIndex = i;
                        break;
                    }
                }

                //Autocomplete city & address fields with what you get from response
                document.getElementById("city").value = user_city;
                document.getElementById("address").value = user_address;
            }

            //Every time that a map has to be created and an old one exists destroy the old one first --only one at a time
            while (document.getElementById('show_user_location_on_map').firstChild) {
                document.getElementById('show_user_location_on_map').removeChild(document.getElementById('show_user_location_on_map').firstChild);
            }
            //Call show_map function from show_location_map.js
            //1s param --lon 
            //2nd param --lat
            //3rd param --id of html element to put map in
            show_map(position.coords.longitude, position.coords.latitude, 'show_user_location_on_map');
        });
    } else {
        //To be here means that your browser does not support location
        document.getElementById("autocomplete_location").disabled = true;
        document.getElementById("do_not_autocomplete_location").disabled = true;
        document.getElementById('not_supported_msg').innerHTML = "Sorry, your browser does not support HTML5 geolocation.";
    }
};