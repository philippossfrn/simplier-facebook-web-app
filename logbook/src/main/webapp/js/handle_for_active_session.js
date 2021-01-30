"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function handle_for_active_session(response_for_active_users){
    
   
    if(response_for_active_users.all_good==="yeap")
    {
          document.getElementById('errors_from_log_in_servlet_msg').innerHTML=" ";
        document.getElementById('user_is_logged_in_msg').innerHTML =
                '<h2>' +
                '<font color="green">' +
            //   "Welcome, you are logged in as " +response_for_active_users.username +
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
    }else if(response_for_active_users.all_good==="error"){
         //reset modal --because will contain user profil
        reset_fields();
        //if user saw his profil then modal will be open so close it
        if (document.getElementById("modal").style.display === "block"){
            document.getElementById("modal").style.display = "none";
        }
            
        document.getElementById('user_is_logged_in_msg').innerHTML = 
            '<h2>' +
            '<font color="green">' +
          //  "Goodbye " + response_from_log_out_servlet.username + ", hope to see you soon." +
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
      //  console.log(response_from_log_out_servlet.what);
        document.getElementById("sign_in_username").value = "";
        document.getElementById("sign_in_password").value = "";
        document.getElementById("post_area").style.display = 'none';
        document.getElementById("post_on_wall").style.visibility = "hidden";
        document.getElementById("show_posts_area").style.visibility = "hidden";
        document.getElementById("user_posts_area").style.display = 'none';
        document.getElementById("show_post_area").style.visibility = "hidden";
//        document.getElementById("show_post_area").style.height = "20%";
//        document.getElementById("show_post_area").style.width = "50%";
    }else if(response_for_active_users.all_good==="notck"){
        
        
    }
}

  var check_for_ck = function() {
send_xmlhttp_request('GET','check_for_active_session?',null,handle_for_active_session);

}

