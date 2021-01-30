/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function handle_log_out_servlet_response(response_from_log_out_servlet) {
    if(response_from_log_out_servlet.what === 'server_says_goodbye'){
        //reset modal --because will contain user profil
        reset_fields();
        //if user saw his profil then modal will be open so close it
        if (document.getElementById("modal").style.display === "block"){
            document.getElementById("modal").style.display = "none";
        }
            
        document.getElementById('user_is_logged_in_msg').innerHTML = 
            '<h2>' +
            '<font color="green">' +
            "Goodbye " + response_from_log_out_servlet.username + ", hope to see you soon." +
            '</font>' +
            '</h2>' ;
        //errors if user tried to update profil
        document.getElementById("errors_from_validation_servlet_msg").innerHTML ="";
        //From analyze face if user signed in with his face
        document.getElementById("results_from_analyze_msg").innerHTML = "";
        document.getElementById("sign_in_show_buttons_to_upload_photo").style.display = "none";

        // Message will dissapear after 5 sec
        setTimeout(fade_out, 5000);

        document.getElementById("hide_this").style.display = "none";
        //document.getElementById("register_button").style.display = "block";
        // register button appears again --hides when user is signed in
        document.getElementById("register_button").style.visibility = "visible";
        console.log(response_from_log_out_servlet.what);
        document.getElementById("sign_in_username").value = "";
        document.getElementById("sign_in_password").value = "";
        document.getElementById("post_area").style.display = 'none';
        document.getElementById("post_on_wall").style.visibility = "hidden";
        document.getElementById("show_posts_area").style.visibility = "hidden";
        document.getElementById("user_posts_area").style.display = 'none';
        document.getElementById("show_post_area").style.visibility = "hidden";
        document.getElementById("delete_user_area").style.display = "none";
//        document.getElementById("show_post_area").style.height = "20%";
//        document.getElementById("show_post_area").style.width = "50%";
    }
//    }else{
//        document.getElementById('user_is_logged_in_msg').innerHTML =
//                '<h2>' +
//                '<font color="green">' +
//                "Welcome, you are logged in as " + response_from_log_in_servlet.username +
//                '</font>' +
//                '</h2>' +
//                '<hr>';
//    }
}
function reset_fields(){
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
        
}

function fade_out() {
  document.getElementById('user_is_logged_in_msg').innerHTML = " ";
}
