"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function see_full_post(post_id){
    //alert(post_id);

    send_xmlhttp_request('GET','get_full_post_servlet?post_id='+post_id,null,handle_see_full_post_response);
}

function handle_see_full_post_response(get_full_post_servlet_response){
        var print_response_in_a_pretty_way = function (obj) {
            var string = '';

            for (var prop in obj) {
                if (typeof obj[prop] === 'string') {
                    string += '<font color="green">' + prop + ': ' + obj[prop] + '</font>'+' <hr>';
                } 
            } 

            return string;
        };
        
        document.getElementById('details_of_post_inside_full_post_modal').innerHTML = print_response_in_a_pretty_way(get_full_post_servlet_response);
        convert_coords_to_address(get_full_post_servlet_response.Latitude,get_full_post_servlet_response.Longitude,'details_of_post_inside_full_post_modal');
        document.getElementById('details_of_post_inside_full_post_modal').style.color = 'green';
        document.getElementById('image_url_inside_full_post_modal').style.width = "100px";
        document.getElementById('image_url_inside_full_post_modal').style.height = "100px";
        document.getElementById('image_url_inside_full_post_modal').src = "";
        if (get_full_post_servlet_response.Image_url !== "" ){
            document.getElementById('image_url_inside_full_post_modal').src = get_full_post_servlet_response.Image_url;
        }else{
            if (get_full_post_servlet_response.image_base_64 !== ""){
               document.getElementById('image_url_inside_full_post_modal').src = get_full_post_servlet_response.image_base_64; 
            }else{
               document.getElementById('image_url_inside_full_post_modal').alt = "Not image found";
            }
        }
        
        //document.getElementById('details_of_post_inside_full_post_modal').innerHTML += '<hr>';
        document.getElementById('actual_map_inside_full_post_modal').align = 'center';
        while (document.getElementById('actual_map_inside_full_post_modal').firstChild) {
            document.getElementById('actual_map_inside_full_post_modal').removeChild(document.getElementById('actual_map_inside_full_post_modal').firstChild);
        }
    
        show_map(get_full_post_servlet_response.Longitude,get_full_post_servlet_response.Latitude,'actual_map_inside_full_post_modal');
        document.getElementById('actual_map_inside_full_post_modal').style.width = '1000px';
        document.getElementById("see_full_post_modal").style.display = "block";
}