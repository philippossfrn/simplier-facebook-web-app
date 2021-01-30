"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
document.getElementById('camera_image').onclick = function() {
  var imageurl = document.getElementById('url').value;
  var imagefile = document.getElementById('imagefile').files;
  
  if (imagefile.length === 0 && imageurl.length === 0 ){
      document.getElementById('empty_post_field').innerHTML = "";
      document.getElementById('show_buttons_to_upload_photo2').style.display = "block";
      
      faceRec.init_caller_in_post_page();    
  }else{
      document.getElementById('empty_post_field').innerHTML = "Oops..you can't post more than one image"+'<br>'; 
      document.getElementById('empty_post_field').style.color = 'red';
  }
};

