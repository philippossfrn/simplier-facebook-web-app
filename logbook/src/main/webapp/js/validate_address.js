"use strict";
/* jshint -W097 */
/* jshint -W119 */
/* jshint -W104 */
/* jshint -W117 */
/* jshint browser: true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

// Get  button
var check_valid_address_btn = document.getElementById("ask_user_to_reveal_location");

// When the user clicks the check_valid_address_btn button do sth..
check_valid_address_btn.onclick = function check_address() {


    //console.log("jodlbndkjjn");
    //Could be Hide Map --see below
    document.getElementById("do_not_show_location").value = "No!";

    //Every time that a map has to be created and an old one exists destroy the old one first --only one at a time
    while (document.getElementById('actual_map').firstChild) {
        document.getElementById('actual_map').removeChild(document.getElementById('actual_map').firstChild);
        //Minimize map size so there is no blank in page
        document.getElementById('actual_map').style.width = '5px';
        document.getElementById('actual_map').style.height = '5px';
    }

    //Get country,city,address from html page
    //split and join -- replace every space with + symbol to look like a query form
    var country = document.getElementById('select_country');
    var country_name = country.options[country.selectedIndex].text.split(' ').join('+');
    //if i want the code of the country not the name then replace .text with .value
    var city = document.getElementById('city').value.split(' ').join('+');
    var address = document.getElementById('address').value.split(' ').join('+');
    var address_length = document.getElementById('address').value.length;

    //Concat a proper/correct URL with data i want to find 
    var url_begins = 'https://nominatim.openstreetmap.org/search?q=';
    var user_address = country_name + "+" + city + "+" + address;
    var url_ends = '&format=geocodejson';
    var osm_query_url = url_begins + user_address + url_ends;

    //Send request only if address is not empty
    if (address_length >= 1) {
        /* Works faster
        var osm_response; 
        fetch(osm_query_url) 
            .then(response => response.json()) 
            .then(data => {
                osm_response = data;
                console.log(osm_response);
                handle_response(); 
            }); 
            */

        //Make get http request to OSM service
        var xhttp = new XMLHttpRequest();
        var osm_response;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                //console.log(xhttp.responseText); 
                osm_response = JSON.parse(xhttp.responseText);
                console.log(osm_response);
                //Call a function to process response
                handle_response();
            }
        };
        xhttp.open("GET", osm_query_url, true);
        xhttp.send();

    }


    //document.getElementById("ask_to_show_location").style.display="none";
    //Check if at least one location found
    //Ask user if wants to see it on a map  
    function handle_response() {
        //if length of repsonse is >= 1 means that at least one address found
        if (osm_response.features.length >= 1) {
            //Show option to user to see his location to map
            document.getElementById("map_area").style.visibility = "visible";

            //Get the No button
            var no_button_pressed = document.getElementById("do_not_show_location");
            //If user press the no button then the whole div dissappear
            no_button_pressed.onclick = function hide_element_by_id() {
                document.getElementById("map_area").style.visibility = "hidden";

                //Every time that a map has to be created and an old one exists destroy the old one first --only one at a time
                while (document.getElementById('actual_map').firstChild) {
                    document.getElementById('actual_map').removeChild(document.getElementById('actual_map').firstChild);
                }
                //Make map area too small to see
                document.getElementById('actual_map').style.width = '5px';
                document.getElementById('actual_map').style.height = '5px';
            };

            //Get the Yes button
            var yes_button_pressed = document.getElementById("show_location");

            //User wants to see his location on a map!!
            yes_button_pressed.onclick = function call_show_map() {
                //Just because..
                document.getElementById("do_not_show_location").value = "Hide map";
                //Every time that a map has to be created and an old one exists destroy the old one first --only one at a time
                while (document.getElementById('actual_map').firstChild) {
                    document.getElementById('actual_map').removeChild(document.getElementById('actual_map').firstChild);
                }
                //Call show_map function from show_location_map.js
                //1s param --lon 
                //2nd param --lat
                //3rd param --id of html element to put map in
                show_map(osm_response.features[0].geometry.coordinates[0], osm_response.features[0].geometry.coordinates[1], 'actual_map');
            };
            document.getElementById('print_location_infos').style.color = 'green';
            document.getElementById('print_location_infos').innerHTML = 'Found ' + osm_response.features.length + ' locations with these params: ' + country_name + "," + city + "," + address;
        } else {
            //Hide option from user..because there is no location to see
            document.getElementById("map_area").style.visibility = "hidden";
            document.getElementById('print_location_infos').style.color = 'red';
            document.getElementById('print_location_infos').innerHTML = 'No address found with these params: ' + country_name + "," + city + "," + address;
        }
    }


};