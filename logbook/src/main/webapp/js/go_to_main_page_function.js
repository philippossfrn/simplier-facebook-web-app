"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function go_to_main_page_function(){
    document.getElementById("post_area").style.display = 'block';
    document.getElementById("user_posts_area").style.display = 'none';
    //Update main wall
    send_xmlhttp_request('GET','show_from_all_last_posts?',null,handle_from_all_last_posts_response); 
    document.getElementById("post_on_wall").style.visibility = "hidden";
    document.getElementById("post").style.visibility = "visible";
    document.getElementById("show_post_area").style.visibility = "visible";
    document.getElementById("show_post_area").style.height = "20%";
    document.getElementById("show_post_area").style.width = "50%";
}
