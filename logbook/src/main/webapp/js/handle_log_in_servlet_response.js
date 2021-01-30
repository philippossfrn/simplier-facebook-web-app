/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function handle_log_in_servlet_response(response_from_log_in_servlet) {
    console.log("ALL GOOD " + response_from_log_in_servlet.username_already_exists);
    if(response_from_log_in_servlet.errors === 'sure'){
        document.getElementById('errors_from_log_in_servlet_msg').innerHTML =
                '<h2>' +
                "400 - Bad Request" +
                '</h2>' +
                "Invalid infos, please correct them and try again to proceed!" +
                '<hr>';
    }else if(response_from_log_in_servlet.errors === 'username_not_found'){
        document.getElementById('errors_from_log_in_servlet_msg').innerHTML =
                '<h2>' +
                "401 - Unauthorized" + 
                '</h2>' +
                '<font color="white">' +
                "Look's like you are not register yet!" +
                '<br>' +
                "Please register and try again to proceed!" +
                '</font>' +
                '<hr>';
    }else if(response_from_log_in_servlet.errors === 'password_not_match'){
        document.getElementById('errors_from_log_in_servlet_msg').innerHTML =
                '<h2>' +
                "401 - Unauthorized" + 
                '</h2>' +
                '<font color="red">' +
                "Wrong password, try again please!" +
                '</font>' +
                '<hr>';
    }else{
        document.getElementById('errors_from_log_in_servlet_msg').innerHTML=" ";
        document.getElementById('user_is_logged_in_msg').innerHTML =
                '<h2>' +
                '<font color="green">' +
                "Welcome, you are logged in as " + response_from_log_in_servlet.username +
                '</font>' +
                '</h2>' +
                '<hr>';
        // Side menu appears --is hidden by default
        document.getElementById("hide_this").style.display = "block";
        // Close sign in modal
        document.getElementById("sign_in_modal").style.display = "none";
        //document.getElementById("register_button").style.display = "none";
        // When user successfully sign in hide register button
        document.getElementById("register_button").style.visibility = "hidden";
        document.getElementById('errors_from_validation_servlet_msg').innerHTML ="";
        document.getElementById("sign_in_show_buttons_to_upload_photo").style.display = "none";
        document.getElementById("post_area").style.display = 'block';
       	send_xmlhttp_request('GET','show_from_all_last_posts?',null,handle_from_all_last_posts_response); 
        document.getElementById("show_post_area").style.visibility = "visible";
        document.getElementById("show_post_area").style.height = "20%";
        document.getElementById("show_post_area").style.width = "50%";
        
        document.getElementById("post").style.visibility = "visible";
        //document.getElementById("post_area").align = "center";


    }

}
