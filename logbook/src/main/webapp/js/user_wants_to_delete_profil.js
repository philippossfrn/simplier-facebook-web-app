"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function confirm_function(){
      
  var r = confirm("Your profil will be permanetly deleted!");
  if (r == true) {
    user_wants_to_delete_profil();
  }
}
function user_wants_to_delete_profil(){
    //alert('okaaay');
   send_xmlhttp_request('GET','get_all_posts_of_user_servlet?',null,handle_get_all_posts_of_user_response);
    
};

function handle_get_all_posts_of_user_response(all_posts_of_user){
    
    var print_response_in_a_pretty_way = function (obj) {
            var string = '';

            for (var prop in obj) {
                if (typeof obj[prop] === 'string') {
                    string +=  "Post num: "+prop + ' and post id ' + obj[prop] +' </br>';
                } 
            } 

            return string;
        }; 
    
    
    if (all_posts_of_user.total_posts > 0){
        console.log("Deleted user posts: " + all_posts_of_user.total_posts);
        send_xmlhttp_request('GET','delete_user_servlet?',null,handle_delete_user_servlet_response);
//        console.log(print_response_in_a_pretty_way(all_posts_of_user));
//        var list_with_postID_to_delete = [];
//        for (var prop in all_posts_of_user) {
//            if (typeof all_posts_of_user[prop] === 'string') {
//                if(prop !== 'username' && prop !== 'total_posts'){
//                    list_with_postID_to_delete.push(all_posts_of_user[prop]);
//                }
//                //string +=  "Post num: "+prop + ' and post id ' + all_posts_of_user[prop] +' </br>';
//            } 
//        } 
//        console.log("Posts to delete: ");
//        console.log(list_with_postID_to_delete);
    }else{
        //user has no posts to delete
        console.log("User had no posts to delete");
        send_xmlhttp_request('GET','delete_user_servlet?',null,handle_delete_user_servlet_response);
    }
    
    function handle_delete_user_servlet_response(delete_user_response){
        if (delete_user_response.status === 'user_deleted'){
            //Log out
            call_log_out_servlet();
            //alert("User deleted");
//                    document.getElementById('another_user_has_no_posts').innerHTML = "";
//            document.getElementById('show_posts_of_another_user').style.display = "none";
//                document.getElementById("table_with_all_users").innerHTML = "";
//                document.getElementById('details_of_user').innerHTML =  "";
//            document.getElementById("close_list_with_all_usernames").style.display = "none";
//            document.getElementById("reg_title_form").innerHTML = "Registration form";
//            document.getElementById("update_profil_button").style.display = "none";
//            document.getElementById("sumbit_button").style.display = "block";
        }
        
    }
    
};
