"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var post_btn = document.getElementById("post");
var post_on_wall_btn = document.getElementById("post_on_wall");
var base64 = null;

// When the user clicks the check_valid_address_btn button do sth..
post_btn.onclick = function check_post_data() {
    var desc = document.getElementById("description_post").value;
    var lon = document.getElementById("longitude").value;
    var lat = document.getElementById("latitude").value;
    var url = document.getElementById("url").value;
    document.getElementById("description_post").value = "";
    document.getElementById("longitude").value = "";
    document.getElementById("latitude").value = "";
    document.getElementById("url").value = "";
    document.getElementById('imagefile').value = "";
    document.getElementById('show_buttons_to_upload_photo2').style.display = "none";
    
    
    if (desc==="" || lon==="" || lat===""){
        document.getElementById('empty_post_field').style.color = 'red';
        document.getElementById("empty_post_field").innerHTML = "Oops..you forgot a required field" + "<br>";
    }else{
        document.getElementById("empty_post_field").innerHTML = "";
        if (url != ""){
            var data = 'desc='+desc+
            '&lon='+lon+
            '&lat='+lat+
            '&url='+url;
            send_xmlhttp_request('POST','post_servlet?'+data,data,handle_post_servlet_response);
            //send_xmlhttp_request('GET',url,null,check_if_url_exists);
        }else{
            var data = 'desc='+desc+
            '&lon='+lon+
            '&lat='+lat+
            '&url='+"empty_url";
            send_xmlhttp_request('POST','post_servlet?'+data,data,handle_post_servlet_response);
            
        }

    }
    
};
function handle_post_servlet_response(response_from_post_servlet) {
    if (response_from_post_servlet.all_good === 'yes'){
      document.getElementById('user_added_new_post_successfully').style.color = 'white';  
      document.getElementById("user_added_new_post_successfully").innerHTML = '<br>'+"Congrats, you have just added a new post";
      //Update main post wall
      console.log("Update post wall");
      send_xmlhttp_request('GET','show_from_all_last_posts?',null,handle_from_all_last_posts_response); 
        // Message will dissapear after 3 sec
        setTimeout(fade_out, 3000);
    }
//    document.getElementById('empty_post_field').style.color = 'white';
//    document.getElementById("empty_post_field").innerHTML = 
//            response_from_post_servlet.username + "<br>" +
//            response_from_post_servlet.desc + "<br>" +
//            response_from_post_servlet.lon + "<br>" +
//            response_from_post_servlet.lat + "<br>" +
//            response_from_post_servlet.url + "<br>" +
//            response_from_post_servlet.createdat + "<br>" ;
//    document.getElementById("image_url").src = response_from_post_servlet.url;
//    document.getElementById("show_posts_area").style.visibility = "visible";
}
function fade_out() {
  document.getElementById('user_added_new_post_successfully').innerHTML = " ";
}

post_on_wall_btn.onclick = function check_post_data2() {
    console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++");
    var desc = document.getElementById("description_post").value;
    var lon = document.getElementById("longitude").value;
    var lat = document.getElementById("latitude").value;
    var url = document.getElementById("url").value;
    document.getElementById("description_post").value = "";
    document.getElementById("longitude").value = "";
    document.getElementById("latitude").value = "";
    document.getElementById("url").value = "";
    document.getElementById('imagefile').value = "";
    document.getElementById('show_buttons_to_upload_photo2').style.display = "none";
    
    if (desc==="" || lon==="" || lat===""){
        document.getElementById('empty_post_field').style.color = 'red';
        document.getElementById("empty_post_field").innerHTML = "Oops..you forgot a required field" + "<br>";
    }else{
        document.getElementById("empty_post_field").innerHTML = "";
        if (url != ""){
            var data = 'desc='+desc+
            '&lon='+lon+
            '&lat='+lat+
            '&url='+url;
            send_xmlhttp_request('POST','post_servlet?'+data,data,handle_post_on_wall_servlet_response);
            //send_xmlhttp_request('GET',url,null,check_if_url_exists);
        }else{
            var data = 'desc='+desc+
            '&lon='+lon+
            '&lat='+lat+
            '&url='+"empty_url";
            send_xmlhttp_request('POST','post_servlet?'+data,data,handle_post_on_wall_servlet_response);
            
        }

    }
    
};
function handle_post_on_wall_servlet_response(response_from_post_servlet) {
    if (response_from_post_servlet.all_good === 'yes'){
        document.getElementById("post_area").style.display = 'block';
        document.getElementById("user_posts_area").style.display = 'block';
        send_xmlhttp_request('GET','get_user_posts_from_db?',null,handle_get_user_posts_on_wall_from_db_servlet_response);
    }
}
function handle_get_user_posts_on_wall_from_db_servlet_response(user_posts_response){
    console.log("USER TEN POSTS");
    console.log(user_posts_response);
    var user_post_number = user_posts_response.total_posts;
    
    document.getElementById('title_user_posts').style.color = "green";
    document.getElementById("title_user_posts").innerHTML ="<h3>"+ "My ten most recent posts:"+"</h3>"+"<br>" ;
    for(var i =0;i<user_post_number;i++){
        var labelid,imgid,get_post;
        if(i === 0){
            var first = user_posts_response.first.replace("[", "");
            first = first.replace("]", "");
            labelid = "first_user_post";
            imgid = "first_user_post_image_url";
            get_post = first;
        }
        if(i === 1){
                var second = user_posts_response.second.replace("[", "");
    second = second.replace("]", "");
            labelid = "second_user_post";
            imgid = "second_user_post_image_url";
            get_post = second;
        }
        if(i === 2){
                var third = user_posts_response.third.replace("[", "");
    third = third.replace("]", "");
            labelid = "third_user_post";
            imgid = "third_user_post_image_url";
            get_post = third;
        }
        if(i === 3){
                var fourth = user_posts_response.fourth.replace("[", "");
    fourth = fourth.replace("]", "");
            labelid = "fourth_user_post";
            imgid = "fourth_user_post_image_url";
            get_post = fourth;
        }
        if(i === 4){
                var fifth = user_posts_response.fifth.replace("[", "");
    fifth = fifth.replace("]", "");
            labelid = "fifth_user_post";
            imgid = "fifth_user_post_image_url";
            get_post = fifth;
        }
        if(i === 5){
                var sixth = user_posts_response.sixth.replace("[", "");
    sixth = sixth.replace("]", "");
            labelid = "sixth_user_post";
            imgid = "sixth_user_post_image_url";
            get_post = sixth;
        }
        if(i === 6){
                var seventh = user_posts_response.seventh.replace("[", "");
    seventh = seventh.replace("]", "");
            labelid = "seventh_user_post";
            imgid = "seventh_user_post_image_url";
            get_post = seventh;
        }
        if(i === 7){
                var eighth = user_posts_response.eighth.replace("[", "");
    eighth = eighth.replace("]", "");
            labelid = "eighth_user_post";
            imgid = "eighth_user_post_image_url";
            get_post = eighth;
        }
        if(i === 8){
                var ninth = user_posts_response.ninth.replace("[", "");
    ninth = ninth.replace("]", "");
            labelid = "ninth_user_post";
            imgid = "ninth_user_post_image_url";
            get_post = ninth;
        }
        if(i === 9){
                var tenth = user_posts_response.tenth.replace("[", "");
    tenth = tenth.replace("]", "");
            labelid = "tenth_user_post";
            imgid = "tenth_user_post_image_url";
            get_post = tenth;
        }

        document.getElementById(labelid).innerHTML = "<hr>"+
            '<button id='+get_post.split(",")[0]+' onclick="see_full_post(this.id)" class=delete_post_btn>See full post</button>'+'<br>'+ '</p>' +
            '<button id='+get_post.split(",")[0]+' onclick="call_delete_post_servlet(this.id)" class=delete_post_btn>Delete this post</button>'+'<br>'+
            "Post ID: "+get_post.split(",")[0] + "<br>"+
            "Descrription: "+get_post.split(",")[1] + "<br>"+
            "Latitude: "+get_post.split(",")[3] + "<br>"+
            "Longitude: "+get_post.split(",")[4] + "<br>"+
            "CreatedAt: "+get_post.split(",")[5] + "<br>";
        convert_coords_to_address(get_post.split(",")[3],get_post.split(",")[4],labelid);
        document.getElementById(imgid).style.width = "100px";
        document.getElementById(imgid).style.height = "100px";
                if (get_post.split(",")[2] !== ""){
        document.getElementById(imgid).src = get_post.split(",")[2];
        }else{
             if (get_post.split(",")[6] !== ""){
             //alert(get_post.split(",")[6]);
        document.getElementById(imgid).src = get_post.split(",")[6].replace("edwprepinampikomma", ",");
        }else{
        alert("EMPTY");
        }
        }
        
        
    }

    
}
document.getElementById('imagefile').oninput = function () {
  var url = document.getElementById('url').value;
  var can = document.getElementById('image_canvas');
  if (url.length === 0){
      document.getElementById('empty_post_field').innerHTML = "";
      var base_image = new Image();
      var file = document.getElementById('imagefile').files[0];
      var reader = new FileReader();
      
      reader.onloadend = function (){
          base64 = reader.result;
          
          base_image.src = base64;
            var stringLength = base64.length - 'data:image/png;base64,'.length;
            var sizeInBytes = 4 * Math.ceil((stringLength/3)) * 0.5624896334383812;
            var sizeInKb = sizeInBytes / 1000;
            if(sizeInKb < 50){
              //url = base64;  
              //alert(base64);
              document.getElementById('url').value = base64;
            }
      };
      reader.readAsDataURL(file);
  }else{
      document.getElementById('empty_post_field').style.color = 'red';
      document.getElementById('empty_post_field').innerHTML = "Oops..you can't more than one image" + '<br>';
      document.getElementById('imagefile').files = "";
      
  }
};