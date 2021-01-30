/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


// Get sumbit button
var hide_table_with_all_users_btn = document.getElementById("close_list_with_all_usernames");

// When the user clicks the check_valid_address_btn button do sth..
hide_table_with_all_users_btn.onclick = function hide_btn_and_usernames() {
    //table_with_all_users
    document.getElementById("table_with_all_users").innerHTML = "";
    //details of user
    document.getElementById('details_of_user').innerHTML =  "";
    document.getElementById("close_list_with_all_usernames").style.display = "none";
    //document.getElementsByClassName('show_posts_of_another_user').style.display = "none";
    
    document.getElementById('another_user_has_no_posts').innerHTML = "";
    document.getElementById('show_posts_of_another_user').style.display = "none";
};
