/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function call_log_out_servlet(){
        document.getElementById('another_user_has_no_posts').innerHTML = "";
    document.getElementById('show_posts_of_another_user').style.display = "none";
        document.getElementById("table_with_all_users").innerHTML = "";
        document.getElementById('details_of_user').innerHTML =  "";
    document.getElementById("close_list_with_all_usernames").style.display = "none";
    document.getElementById("reg_title_form").innerHTML = "Registration form";
    document.getElementById("update_profil_button").style.display = "none";
    document.getElementById("sumbit_button").style.display = "block";
    send_xmlhttp_request('GET','log_out_servlet?what=log_out',null,handle_log_out_servlet_response);
}
