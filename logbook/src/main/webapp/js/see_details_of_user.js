'use strict';
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function call_details_of_user_servlet(e){
    e = e || window.event;
    e = e.target || e.srcElement;
    if (e.nodeName === 'BUTTON') {
        console.log("You pressed this user: " + e.id);
    }
    var username = e.id;
    // This is my custom last row of table
    send_xmlhttp_request('GET','details_of_user?username='+username,null,handle_details_of_user_servlet_response);
    //document.getElementById('details_of_user')
}

function handle_details_of_user_servlet_response(see_details_of_user_response){
      var print_response_in_a_pretty_way = function (obj) {
            var string = '';

            for (var prop in obj) {
                if (typeof obj[prop] === 'string') {
                    string += '<font color="white">' +prop + ': ' + obj[prop] + '</font>'+' </br>';
                } 
            } 

            return string;
        };  
    document.getElementById('details_of_user').innerHTML =  
            '<h3>' +
            '<font color="green">' +
            'Details for user ' +
            
            see_details_of_user_response.username +
            '</font>'+
            '</h3>' +
            print_response_in_a_pretty_way(see_details_of_user_response) +
            '<br>';
    //alert("Show posts of this user "+see_details_of_user_response.username);
    //document.getElementById('see_another_user_posts').style.display = 'block';
    //if(document.getElementById('see_another_user_posts').clicked === true){
       send_xmlhttp_request('GET','get_another_user_posts_from_db?username='+see_details_of_user_response.username,null,handle_get_another_user_posts_from_db_servlet_response); 
    //}
    
}

function handle_get_another_user_posts_from_db_servlet_response(another_user_posts_response){
    if(another_user_posts_response.total_posts === "0"){
        document.getElementById('show_posts_of_another_user').style.display = 'none';
        document.getElementById('another_user_has_no_posts').style.color = "white";
        document.getElementById('another_user_has_no_posts').innerHTML= "<h3>"+
                                        "I am sorry user "+ another_user_posts_response.username+
                                        " didn't post anything yet."+
                                        "</h3>";
                                        
                
        
    }else{
        
    document.getElementById('another_user_has_no_posts').innerHTML= "";
    document.getElementById('show_posts_of_another_user').style.display = 'block';
    console.log("ANOTHER USERs TEN POSTS");
    console.log(another_user_posts_response);
    var user_post_number = another_user_posts_response.total_posts;
    
    document.getElementById('title_another_user_posts').style.color = "green";
    document.getElementById("title_another_user_posts").innerHTML ="<h3>"+ "Top ten most recent posts of user: "+another_user_posts_response.username+"</h3>"+"<br>" ;
    for(var i =0;i<user_post_number;i++){
        var labelid,imgid,get_post;
        if(i === 0){
            var first = another_user_posts_response.first.replace("[", "");
            first = first.replace("]", "");
            labelid = "first_another_user_post";
            imgid = "first_another_user_post_image_url";
            get_post = first;
        }
        if(i === 1){
                var second = another_user_posts_response.second.replace("[", "");
    second = second.replace("]", "");
            labelid = "second_another_user_post";
            imgid = "second_another_user_post_image_url";
            get_post = second;
        }
        if(i === 2){
                var third = another_user_posts_response.third.replace("[", "");
    third = third.replace("]", "");
            labelid = "third_another_user_post";
            imgid = "third_another_user_post_image_url";
            get_post = third;
        }
        if(i === 3){
                var fourth = another_user_posts_response.fourth.replace("[", "");
    fourth = fourth.replace("]", "");
            labelid = "fourth_another_user_post";
            imgid = "fourth_another_user_post_image_url";
            get_post = fourth;
        }
        if(i === 4){
                var fifth = another_user_posts_response.fifth.replace("[", "");
    fifth = fifth.replace("]", "");
            labelid = "fifth_another_user_post";
            imgid = "fifth_another_user_post_image_url";
            get_post = fifth;
        }
        if(i === 5){
                var sixth = another_user_posts_response.sixth.replace("[", "");
    sixth = sixth.replace("]", "");
            labelid = "sixth_another_user_post";
            imgid = "sixth_another_user_post_image_url";
            get_post = sixth;
        }
        if(i === 6){
                var seventh = another_user_posts_response.seventh.replace("[", "");
    seventh = seventh.replace("]", "");
            labelid = "seventh_another_user_post";
            imgid = "seventh_another_user_post_image_url";
            get_post = seventh;
        }
        if(i === 7){
                var eighth = another_user_posts_response.eighth.replace("[", "");
    eighth = eighth.replace("]", "");
            labelid = "eighth_another_user_post";
            imgid = "eighth_another_user_post_image_url";
            get_post = eighth;
        }
        if(i === 8){
                var ninth = another_user_posts_response.ninth.replace("[", "");
    ninth = ninth.replace("]", "");
            labelid = "ninth_another_user_post";
            imgid = "ninth_another_user_post_image_url";
            get_post = ninth;
        }
        if(i === 9){
                var tenth = another_user_posts_response.tenth.replace("[", "");
    tenth = tenth.replace("]", "");
            labelid = "tenth_another_user_post";
            imgid = "tenth_another_user_post_image_url";
            get_post = tenth;
        }

        document.getElementById(labelid).innerHTML = "<hr>"+
            '<button id='+get_post.split(",")[0]+' onclick="see_full_post(this.id)" class=delete_post_btn>See full post</button>'+'<br>'+ '</p>' +
            "Post ID: "+get_post.split(",")[0] + "<br>"+
            "Descrription: "+get_post.split(",")[1] + "<br>"+
            "Latitude: "+get_post.split(",")[3] + "<br>"+
            "Longitude: "+get_post.split(",")[4] + "<br>"+
            "CreatedAt: "+get_post.split(",")[5] + "<br>";
            //'<button id=get_post.split(",")[0] onclick="alert(this.id)">Delete post</button>'+'<br>';
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
//function print(obj){
//      var print_response_in_a_pretty_way = function (obj) {
//            var string = '';
//
//            for (var prop in obj) {
//                if (typeof obj[prop] == 'string') {
//                    string += '<font color="white">' +prop + ': ' + obj[prop] + '</font>'+' </br>';
//                } 
//            } 
//
//            return string;
//        };  
//};
    }
}
