/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function call_delete_post_servlet(post_id){
    var data = 'post_id='+post_id;
    send_xmlhttp_request('POST','delete_user_post_servlet?'+data,data,handle_delete_user_post_servlet_response);
}

function handle_delete_user_post_servlet_response(response_from_delete_post_servlet){
    if (response_from_delete_post_servlet.all_good === 'yeap'){
    //Update user wall
    send_xmlhttp_request('GET','get_user_posts_from_db?',null,update_user_post_after_deletion);
    }
}
function update_user_post_after_deletion(user_posts_response){
    console.log("USER TEN POSTS");
    console.log('99999999999999999999999999999999999999999');
    console.log(user_posts_response);
    var user_post_number = user_posts_response.total_posts;
    document.getElementById('title_user_posts').style.color = "green";
    document.getElementById("title_user_posts").innerHTML ="<h3>"+ "My ten most recent posts:"+"</h3>"+"<br>" ;
        document.getElementById('delete_user_post_msg').style.color = "green";
    document.getElementById("delete_user_post_msg").innerHTML ="Post deleted successfully"+"<br>" ;
    init_wall();
    setTimeout(fade_out_deleted_msg, 2000);
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
//        while (document.getElementById(imgid).firstChild) {
//            document.getElementById(imgid).removeChild(document.getElementById(imgid).firstChild);
//
//        }

        document.getElementById(imgid).src = get_post.split(",")[6].replace("edwprepinampikomma", ",");
        }else{
        alert("EMPTY");
        }
        }
        
        
    }

    
}
function fade_out_deleted_msg() {
  document.getElementById("delete_user_post_msg").innerHTML = " ";
}

function init_wall(){
        for(var i =0;i<10;i++){
        var labelid,imgid;
        if(i === 0){
            labelid = "first_user_post";
            imgid = "first_user_post_image_url";
        }
        if(i === 1){
            labelid = "second_user_post";
            imgid = "second_user_post_image_url";
        }
        if(i === 2){
            labelid = "third_user_post";
            imgid = "third_user_post_image_url";
        }
        if(i === 3){
            labelid = "fourth_user_post";
            imgid = "fourth_user_post_image_url";
        }
        if(i === 4){
            labelid = "fifth_user_post";
            imgid = "fifth_user_post_image_url";
        }
        if(i === 5){
            labelid = "sixth_user_post";
            imgid = "sixth_user_post_image_url";
        }
        if(i === 6){
            labelid = "seventh_user_post";
            imgid = "seventh_user_post_image_url";
        }
        if(i === 7){
            labelid = "eighth_user_post";
            imgid = "eighth_user_post_image_url";
        }
        if(i === 8){
            labelid = "ninth_user_post";
            imgid = "ninth_user_post_image_url";
        }
        if(i === 9){
            labelid = "tenth_user_post";
            imgid = "tenth_user_post_image_url";
        }

        document.getElementById(labelid).innerHTML = "";
        document.getElementById(imgid).src = '';
        //document.getElementById(imgid).alt = '';

    }
    
}