/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    //alert(post_id);
    

// Get the modal
var modal2 = document.getElementById("see_full_post_modal");

// Get the <span> element that closes the modal
var span2 = document.getElementsByClassName("close_see_full_post_modal")[0];



 


// When the user clicks on <span> (x), close the modal
span2.onclick = function() {
  modal2.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === modal2) {
    modal2.style.display = "none";
  }
};
