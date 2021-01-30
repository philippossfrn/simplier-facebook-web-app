/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function handle_add_user_to_db_servlet_response(response_from_add_user_servlet) {
        var print_response_in_a_pretty_way = function (obj) {
            var string = '';

            for (var prop in obj) {
                if (typeof obj[prop] == 'string') {
                    string += '<font color="white">' + prop + ': ' + obj[prop] + '</font>'+' </br>';
                } 
            } 

            return string;
        };
        //var data = print_response_in_a_pretty_way(response_from_add_user_servlet);
        document.getElementById('all_good_user_created_msg').innerHTML = 
            '<h2>' +
            '<font color="green">' +
            "Congratulations you are now a member on our system! " +
            '</font>' +
            '</h2>' +
            "Log in to proceed: " +
            '<br>' +
            '<font color="white">' +
            "Here is what we store for you in our DB: " +
            '</font>'+
            '<br>' +
            print_response_in_a_pretty_way(response_from_add_user_servlet) +
            '<hr>';
            
        setTimeout(fade_out, 8000);
        function fade_out() {
          document.getElementById('all_good_user_created_msg').innerHTML = " ";
        }
        
        // Reset all inpout fields
        reset_fields();
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
//        vid.pause();
//        vid.src = "";
//        localstream.stop();
        //var mediaConfig = {
            //video: false;  //close camera 
        //};
}
