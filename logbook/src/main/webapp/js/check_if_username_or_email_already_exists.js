/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var check_if_username_already_exists = function () {
    var username = document.getElementById('username').value;
    var data = 'username='+username+
        '&what_to_do='+"check_if_username_exists";
    console.log("YOU ARE TYPING "+username);
    send_xmlhttp_request('POST','check_if_username_already_exists?'+data,data,handle_servlet_if_username_exists_response);
};

var check_if_email_already_exists = function () {
    var email = document.getElementById('email').value;
    var data = 'email='+email+
        '&what_to_do='+"check_if_email_exists";
    console.log("YOU ARE TYPING "+email);
    send_xmlhttp_request('POST','check_if_username_already_exists?'+data,data,handle_servlet_if_email_exists_response);
};
