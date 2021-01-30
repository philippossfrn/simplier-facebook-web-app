"use strict";
/* jshint -W097 */
/* jshint browser: true */

//Just handle the register button and open/close the modal

// Get the modal by id
var modal = document.getElementById("modal");

// Get the button that opens the modal register_button
var btn = document.getElementById("register_button");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal --show(block)
btn.onclick = function () {
  modal.style.display = "block";
  //document.getElementById("delete_user_area").style.display = "none";
};

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};



//// Get the modal by id
//var sign_in_modal = document.getElementById("sign_in_modal");
//
//// Get the button that opens the modal register_button
//var sign_in_button = document.getElementById("sign_in_button");
//
//// Get the <span> element that closes the modal
//var sign_in_close = document.getElementsByClassName("sign_in_close")[0];
//
//// When the user clicks the button, open the modal --show(block)
//sign_in_button.onclick = function () {
//  sign_in_modal.style.display = "block";
//};
//
//// When the user clicks on <span> (x), close the modal
//sign_in_close.onclick = function () {
//  sign_in_modal.style.display = "none";
//};
//
//// When the user clicks anywhere outside of the modal, close it
//window.onclick = function (event) {
//  if (event.target == sign_in_modal) {
//    sign_in_modal.style.display = "none";
//  }
//};
