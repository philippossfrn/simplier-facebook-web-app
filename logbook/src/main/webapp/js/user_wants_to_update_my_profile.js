/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function call_update_my_profile_servlet(){
//    document.getElementById("table_with_all_users").innerHTML = "";
//    document.getElementById("close_list_with_all_usernames").style.display = "none";
//    send_xmlhttp_request('GET','log_out_servlet?what=log_out',null,handle_log_out_servlet_response);
    document.getElementById("modal").style.display = "block";
    document.getElementById("delete_user_area").style.display = "block";
    document.getElementById("reg_title_form").innerHTML = "My profile";
    document.getElementById("update_profil_button").style.display = "block";
    document.getElementById("sumbit_button").style.display = "none";
    reset_fields();
    send_xmlhttp_request('GET','get_user_data_from_db?',null,handle_get_user_data_from_db_servlet_response);

    
    
}
function handle_get_user_data_from_db_servlet_response(response_from_get_user_data_from_db){
        var print_response_in_a_pretty_way = function (obj) {
            var string = '';

            for (var prop in obj) {
                if (typeof obj[prop] === 'string') {
                    string += prop + ': ' + obj[prop] + ' </br>';
                } 
            } 

            return string;
        };
    
    console.log("??????????????????????????????????????????????????????????????????????");
    console.log(print_response_in_a_pretty_way(response_from_get_user_data_from_db));
    document.getElementById("username").value = response_from_get_user_data_from_db.username;
    document.getElementById("email").value = response_from_get_user_data_from_db.email;
    document.getElementById("password").value = response_from_get_user_data_from_db.password;
    document.getElementById("pass_conf").value = response_from_get_user_data_from_db.password;
    document.getElementById("f_name").value = response_from_get_user_data_from_db.first_name;
    document.getElementById("l_name").value = response_from_get_user_data_from_db.last_name;
    //format YYYY-MM-DD
    //document.getElementById("bday").value = response_from_get_user_data_from_db.bday;
    //var d = Date.parse(response_from_get_user_data_from_db.bday);
    
    var year = response_from_get_user_data_from_db.bday.split("-")[0];
    var month = response_from_get_user_data_from_db.bday.split("-")[1];
    var day = response_from_get_user_data_from_db.bday.split("-")[2].split(" ")[0];
    console.log(year+" "+month+" "+day);

    document.getElementById("bday").value = year+"-"+month+"-"+day;
    // Gender
    if(response_from_get_user_data_from_db.gender === 'Male'){
        document.getElementById("male").checked = true;
    }else if(response_from_get_user_data_from_db.gender === 'Female'){
        document.getElementById("female").checked = true;
    }else{
        document.getElementById("other").checked = true;
    }
    // Country
    var select_country = document.getElementById("select_country");
    for (var i = 0; i < select_country.options.length; i++) {
        if (select_country.options[i].text === response_from_get_user_data_from_db.country) {
            select_country.selectedIndex = i;
            break;
        }
    }
    //document.querySelector('input[name="gender"]:checked').value;
    //var country = document.getElementById("select_country").t;
    document.getElementById("city").value = response_from_get_user_data_from_db.city;
    document.getElementById("address").value = response_from_get_user_data_from_db.address;
    document.getElementById("profession").value = response_from_get_user_data_from_db.profession;
    document.getElementById("hobbies").value = response_from_get_user_data_from_db.hobbies;
    document.getElementById("more_infos").value = response_from_get_user_data_from_db.more_infos;
    get_distance_user_travelled();
    
}
function reset_fields(){
        document.getElementById("null_element").innerHTML = "";
        document.getElementById('username').value = "";
        //document.getElementById("username").style.borderColor="#000000"
        document.getElementById('email').value = "";
        //document.getElementById("email").style.borderColor="#000000"
        document.getElementById('password').value = "";
        document.getElementById('pass_conf').value = "";
        document.getElementById('f_name').value = "";
        document.getElementById('l_name').value = "";
        document.getElementById('bday').value = "";
        document.getElementsByName('gender').value = "other";
        document.getElementById('select_country').value = "GRC";
        document.getElementById('city').value = "";
        document.getElementById('address').value = "";
        document.getElementById('profession').value = "";
        document.getElementById('hobbies').value = "";
        document.getElementById('more_infos').value = "";
        document.getElementById('message_pass_match').value = "";
        // Maps
        document.getElementById('print_location_infos').value = "";
        document.getElementById("map_area").style.visibility = "hidden";
        document.getElementById('actual_map').style.width = '5px';
        document.getElementById('actual_map').style.height = '5px';
        document.getElementById('show_user_location_on_map').style.height = '5px';
        document.getElementById('show_user_location_on_map').style.height = '5px';
        
        // Video
        document.getElementById("no_to_upload_photo").checked = true;
        document.getElementById("show_buttons_to_upload_photo").style.display = "none";
//        vid.pause();
//        vid.src = "";
//        localstream.stop();
        //var mediaConfig = {
            //video: false;  //close camera 
        //};
}

function get_distance_user_travelled(){
    document.getElementById('distance').innerHTML = "Hdkhdnjd";
    
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
    
    send_xmlhttp_request('GET',osm_query_url,null,get_user_coords);
    
    
};

function get_user_coords(osm_response){
        var user_lon = osm_response.features[0].geometry.coordinates[0];
        var user_lat = osm_response.features[0].geometry.coordinates[1];
        //alert(user_lon + " " + user_lat) ;
        
        send_xmlhttp_request('GET','get_coords_for_every_user_post?',null,handle_get_coords_for_every_user_post_response);
        function handle_get_coords_for_every_user_post_response(all_coords_for_user_posts){
            console.log(all_coords_for_user_posts);
            console.log("MMMMMMMMMMMMMMMMMM");
//            var i  = 2;
//            console.log(all_coords_for_user_posts.post[i]);
            var begin_url = 'http://router.project-osrm.org/route/v1/driving/';
            var user_coords = user_lon+","+user_lat+";";
            var url_end = '?overview=false';
            
            for(var i=0;i<2*all_coords_for_user_posts.total_posts;i=i+2){
                console.log("here");
                var lon = all_coords_for_user_posts.post[i];
                var lat = all_coords_for_user_posts.post[i+1];
                var router_url = begin_url + user_coords + lon + "," + lat + url_end;
                send_xmlhttp_request('GET',router_url,null,get_distance_from_user_to_post);
                var total_distance = 0;
                function get_distance_from_user_to_post(route_response){
                    console.log("User distance from post");
                    console.log(route_response.routes[0].distance);
                    total_distance += (2 * route_response.routes[0].distance)
//                    var sum_distance;
//                    sum_distance += 
                    document.getElementById('distance').innerHTML = "";
                    document.getElementById('distance').innerHTML += "Distance for post: " + route_response.routes[0].distance;
                    document.getElementById('distance').innerHTML += '<br>'+"Total distance user did: " + total_distance;
                //distance_user_travelled
                }
                
            }


            
            
            
//            alert(user_lon + " " + user_lat+"------"+all_coords_for_user_posts.username);
//
//            alert(post_lon+"???"+post_lat );

            
        };
        
};