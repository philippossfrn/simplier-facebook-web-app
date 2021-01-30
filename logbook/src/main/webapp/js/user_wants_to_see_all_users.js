/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function call_see_all_users_servlet(){
    document.getElementById('another_user_has_no_posts').innerHTML = "";
    document.getElementById('show_posts_of_another_user').style.display = "none";
    send_xmlhttp_request('GET','see_all_users_servlet?',null,handle_see_all_users_servlet_response);
}
