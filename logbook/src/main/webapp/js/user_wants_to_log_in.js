/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var log_in_btn = document.getElementById("sign_in_button_inside_modal");

// When the user clicks the check_valid_address_btn button do sth..
log_in_btn.onclick = function call_log_in_servlet() {
   
    var username = document.getElementById("sign_in_username").value;
    var password = document.getElementById("sign_in_password").value;
     document.getElementById("name_for_session").value=username;
    // Check if some field is null
    if (username === "" || password === ""){
        document.getElementById('sign_in_null_msg').style.color = 'red';
        document.getElementById('sign_in_null_msg').innerHTML = 'Oops..Looks like you forgot to fill a required field';
        //console.log("Some element is null");
    }else{
        // User gave a username and password
        document.getElementById('sign_in_null_msg').innerHTML = " ";
        // Prepare data to send to servlet
        var data = 'username='+username+'&password='+password;
        send_xmlhttp_request('POST','log_in_servlet?'+data,data,handle_log_in_servlet_response);          
    }
    
};
