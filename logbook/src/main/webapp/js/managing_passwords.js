"use strict";
/* jshint -W097 */
/* jshint browser: true */

//show input text if id is password (reveal password)
function show_password() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

//show input text if id pass_config (reveal repeat password)
function show_confirm_password() {
  var x = document.getElementById("pass_conf");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

//Check if passwords match, message will appear after user types first char in confirm pass
var check_if_match = function () {

  var password = document.getElementById('password').value;
  var password_conf = document.getElementById('pass_conf').value;

  //while user types tell him --works onkeyup from html page
  if (password == password_conf) {
    document.getElementById('message_pass_match').style.color = 'green';
    document.getElementById('message_pass_match').innerHTML = 'Password matching';
  } else if (password_conf.length >= 1) {
    document.getElementById('message_pass_match').style.color = 'red';
    document.getElementById('message_pass_match').innerHTML = 'Password not matching';
  }

};