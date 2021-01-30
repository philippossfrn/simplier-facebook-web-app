"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
//        var reverse_url = "https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=" + get_post.split(",")[3] + "&lon=" + get_post.split(",")[4];
//        send_xmlhttp_request('GET',reverse_url,null,handle_convert_coords_to_address);

 function convert_coords_to_address(lat,lon,labelid){

    var reverse_url = "https://nominatim.openstreetmap.org/reverse?format=geocodejson&lat=" + lat + "&lon=" + lon;
    send_xmlhttp_request('GET',reverse_url,null,handle_convert_coords_to_address);

    function handle_convert_coords_to_address(convert_coords_to_address_response){
        //alert(labelid);
        
        var user_country = convert_coords_to_address_response.features[0].properties.geocoding.country;
        var user_city = convert_coords_to_address_response.features[0].properties.geocoding.city;
        var user_address = convert_coords_to_address_response.features[0].properties.geocoding.label;
           
           //alert("INSIDEEEEEEEE "+user_country);
           document.getElementById(labelid).innerHTML += 
                   "<br>" + "Country: "+ user_country +
                   "<br>" + "City: "+ user_city +
                   "<br>" + "Address: " + user_address ;

    }

}


    
    
    
        
//                   var xhttp = new XMLHttpRequest();
//            var reverse_osm_response;
//            xhttp.onreadystatechange = function () {
//                if (this.readyState == 4 && this.status == 200) {
//                    //console.log(xhttp.responseText); 
//                    //console.log(xhttp.responseText);
//                    reverse_osm_response = JSON.parse(xhttp.responseText);
//                    //reverse_osm_response.features[0].properties.geocoding.country;
//                    //Call handle_reverse_response function 
//                    alert( reverse_osm_response.features[0].properties.geocoding.country);
//                    
//                }
//            };
//            xhttp.open("GET", reverse_url, true);
//            xhttp.send();



    //alert("OUTSIDE "+user_country);
//    document.getElementById(labelid).innerHTML = "<hr>"+
//            '<button id='+postid+' onclick="call_delete_post_servlet(this.id)" class=delete_post_btn>Delete this post</button>'+'<br>'+
//            "Post ID: "+postid + "<br>"+
//            "Descrription: "+desc + "<br>"+
//            "Latitude: "+lat+ "<br>"+
//            "Longitude: "+lon + "<br>"+
//            "Country: "+user_country + "<br>"+
//            "City: "+user_city + "<br>"+
//            "Address: "+user_address + "<br>"+
//            "CreatedAt: "+createdat + "<br>";
//        document.getElementById(imgid).style.width = "100px";
//        document.getElementById(imgid).style.height = "100px";
//        document.getElementById(imgid).src = url_src;