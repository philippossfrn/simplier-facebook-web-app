"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

 function convert_coords_to_address_for_every_user(lat,lon,label){

    var reverse_url = "https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=" + lat + "&lon=" + lon;
    send_xmlhttp_request('GET',reverse_url,null,handle_convert_coords_to_address_for_every_user);

    function handle_convert_coords_to_address_for_every_user(convert_coords_to_address_response){
        //alert(labelid);
        
        var user_country = convert_coords_to_address_response.features[0].properties.geocoding.country;
        var user_city = convert_coords_to_address_response.features[0].properties.geocoding.city;
        var user_address = convert_coords_to_address_response.features[0].properties.geocoding.label;
           
           //alert("INSIDEEEEEEEE "+user_country);
           label.innerHTML += 
                   "<br>" +"Country: "+ user_country +
                   "<br>" +"City: "+ user_city +
                   "<br>" +"Address: "+ user_address ;

    }

}
