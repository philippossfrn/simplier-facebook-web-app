/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
// Get sumbit button
var see_another_user_posts_btn = document.getElementById("see_another_user_posts");

// When the user clicks the check_valid_address_btn button do sth..
see_another_user_posts_btn.onclick = function hide_btn_and_usernames() {
    //document.getElementById('see_another_user_posts').style.display = "none";
    document.getElementsByClassName('show_posts_of_another_user').style.display = "block";
};

