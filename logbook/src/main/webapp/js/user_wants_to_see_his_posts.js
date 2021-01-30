/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function call_see_my_posts_servlet(){
    
    document.getElementById("post_area").style.display = 'block';
    document.getElementById("user_posts_area").style.display = 'block';
    send_xmlhttp_request('GET','get_user_posts_from_db?',null,handle_get_user_posts_from_db_servlet_response);
    document.getElementById("post_on_wall").style.visibility = "visible";
    document.getElementById("post").style.visibility = "hidden";
    document.getElementById("show_post_area").style.visibility = "hidden";
    document.getElementById("show_post_area").style.height = "1px";
    document.getElementById("show_post_area").style.width = "1px";
    
    
}
function handle_get_user_posts_from_db_servlet_response(user_posts_response){
    console.log("USER TEN POSTS");
    console.log(user_posts_response);
    var user_post_number = user_posts_response.total_posts;
    var post_1 = false;
    var post_2 = false;
    var post_3 = false;
    var post_4 = false;
    document.getElementById('title_user_posts').style.color = "green";
    document.getElementById("title_user_posts").innerHTML ="<h3>"+ "My ten most recent posts:"+"</h3>"+"<br>" ;
    for(var i =0;i<user_post_number;i++){
    //alert(i);
        var labelid,imgid,get_post,userc1,userc2;
        if(i === 0){
            var first = user_posts_response.first.replace("[", "");
            first = first.replace("]", "");
            labelid = "first_user_post";
            imgid = "first_user_post_image_url";
            get_post = first;
            post_1 = true;
            //convert_coords_to_address(get_post.split(",")[0],get_post.split(",")[1],get_post.split(",")[2],get_post.split(",")[3],get_post.split(",")[4],get_post.split(",")[5],labelid,imgid);
            //onvert_coords_to_address(get_post.split(",")[0],get_post.split(",")[1],get_post.split(",")[2],get_post.split(",")[3],get_post.split(",")[4],get_post.split(",")[5],labelid,imgid,i);
        }
        if(i === 1){
        //alert("SJSN");
            var second = user_posts_response.second.replace("[", "");
            second = second.replace("]", "");
            labelid = "second_user_post";
            imgid = "second_user_post_image_url";
            get_post = second;
            post_2 = true;
            //convert_coords_to_address(get_post.split(",")[0],get_post.split(",")[1],get_post.split(",")[2],get_post.split(",")[3],get_post.split(",")[4],get_post.split(",")[5],labelid,imgid);
            //convert_coords_to_address(get_post.split(",")[0],get_post.split(",")[1],get_post.split(",")[2],get_post.split(",")[3],get_post.split(",")[4],get_post.split(",")[5],labelid,imgid,i);
        }
        if(i === 2){
            var third = user_posts_response.third.replace("[", "");
            third = third.replace("]", "");
            labelid = "third_user_post";
            imgid = "third_user_post_image_url";
            get_post = third;
            post_3 = true;
        }
        if(i === 3){
            var fourth = user_posts_response.fourth.replace("[", "");
            fourth = fourth.replace("]", "");
            labelid = "fourth_user_post";
            imgid = "fourth_user_post_image_url";
            get_post = fourth;
            post_4 = true;
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


//        var country_city_address=convert_coords_to_address(get_post.split(",")[4],get_post.split(",")[3]);
//        alert("WORKED?????"+country_city_address);
        //convert_coords_to_address(get_post.split(",")[0],get_post.split(",")[1],get_post.split(",")[2],get_post.split(",")[3],get_post.split(",")[4],get_post.split(",")[5],labelid,imgid);
       document.getElementById(labelid).innerHTML = "";
        document.getElementById(labelid).innerHTML += "<hr>"+ '<p>' +
            '<button id='+get_post.split(",")[0]+' onclick="see_full_post(this.id)" class=delete_post_btn>See full post</button>'+'<br>'+ '</p>' +
            '<button id='+get_post.split(",")[0]+' onclick="call_delete_post_servlet(this.id)" class=delete_post_btn>Delete this post</button>'+'<br>'+
            "Post ID: "+get_post.split(",")[0] + "<br>"+
            "Descrription: "+get_post.split(",")[1] + "<br>"+
            "Latitude: "+get_post.split(",")[3] + "<br>"+
            "Longitude: "+get_post.split(",")[4] + "<br>"+
            "CreatedAt: "+get_post.split(",")[5] + "<br>";
            //'<button id=get_post.split(",")[0] onclick="alert(this.id)">Delete post</button>'+'<br>';
       convert_coords_to_address(get_post.split(",")[3],get_post.split(",")[4],labelid);
        //alert("DDDDDDDDD");
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
//                    var third = user_posts_response.third.replace("[", "");
//            third = third.replace("]", "");
       //convert_coords_to_address(third.split(",")[3],third.split(",")[4],third.split(",")[5],"third_user_post","third_user_post_image_url",2);
    }
//    for(var i=0;i<4;i++){
//          
//    }
//                  var first1 = user_posts_response.first.replace("[", "");
//            first1 = first1.replace("]", "");
//                  var first2 = user_posts_response.third.replace("[", "");
//            first2 = first2.replace("]", "");
//                  var first3 = user_posts_response.second.replace("[", "");
//            first3 = first3.replace("]", "");
//                  var first4 = user_posts_response.fourth.replace("[", "");
//            first4 = first4.replace("]", "");
//            var labelid1 = "first_user_post";
//            var labelid2 = "second_user_post";
//            var labelid3 = "third_user_post";
//            var labelid4 = "fourth_user_post";
//       // convert_coords_to_address(first1.split(",")[3],first1.split(",")[4],labelid2);
////      //if(post_1){convert_coords_to_address(first1.split(",")[3],first1.split(",")[4],labelid1);}
//      if(post_1){convert_coords_to_address(first1.split(",")[3],first1.split(",")[4],labelid1);}
//      if(post_2){convert_coords_to_address(first3.split(",")[3],first3.split(",")[4],labelid2);}
//      if(post_3){convert_coords_to_address(first2.split(",")[3],first2.split(",")[4],labelid3);}
//      if(post_4){convert_coords_to_address(first4.split(",")[3],first4.split(",")[4],labelid4);}
}