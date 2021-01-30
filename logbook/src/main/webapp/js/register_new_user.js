/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
"use strict";
/* jshint -W097 */
/* jshint -W119 */
/* jshint -W104 */
/* jshint -W117 */
/* jshint browser: true */
/*jslint vars: true, plusplus: true, devel: true, nomen: true, indent: 4, maxerr: 50 */
/*global define */

// Get sumbit button
var sumbit_btn = document.getElementById("sumbit_button");

// When the user clicks the check_valid_address_btn button do sth..
sumbit_btn.onclick = function call_validate_servlet() {
    //Get user inputs
    var username = document.getElementById("username").value;
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var password_conf = document.getElementById("pass_conf").value;
//    var password = CryptoJS.AES.encrypt(password, "philipposkotsios");
//     var password_conf = document.getElementById("pass_conf").value;
    var first_name = document.getElementById("f_name").value;
    var last_name = document.getElementById("l_name").value;
    //format YYYY-MM-DD
    var bday = document.getElementById("bday").value;
    var gender = document.querySelector('input[name="gender"]:checked').value;
    var country_elem = document.getElementById("select_country");
    var country = country_elem.options[country_elem.selectedIndex].text;
    //var country = document.getElementById("select_country").t;
    var city = document.getElementById("city").value;
    var address = document.getElementById("address").value;
    var profession = document.getElementById("profession").value;
    var hobbies = document.getElementById("hobbies").value;
    var more_infos = document.getElementById("more_infos").value;
    console.log(username+" "+email+" "+password+" "+password_conf+" "+first_name+" "+last_name+" "+bday+gender+" "+country+" "+city+" "+profession);
    if (username === "" ||
        email === "" ||
        password === "" ||
        password_conf === "" ||
        first_name === "" ||
        last_name === "" ||
        bday === "" ||
        gender === null ||
        city === "" ||
        profession === ""){
        document.getElementById('null_element').style.color = 'red';
        document.getElementById('null_element').innerHTML = 'Oops..Looks like you forgot to fill a required field';
        //console.log("Some element is null");
    }else{
        //Json.parse throws error in this symbol --probaly to others too 
        if(password.includes("#") || password_conf.includes("#")){
            document.getElementById('null_element').style.color = 'red';
            document.getElementById('null_element').innerHTML = 'Oops..Looks like your passwords contain a special symbol that is forbidden';
        }else{
            document.getElementById('null_element').innerHTML = " ";
            //User fill all the required field -> proceed to servlet for validation
            //Close register modal first --just because!!!!
            var modal = document.getElementById("modal");
            if (modal.style.display === "block"){
                modal.style.display = "none";
            }
            // Prepare data to send to servlet
            var data = 'username='+username+
                    '&email='+email+
                    '&password='+password+
                    '&password_conf='+password_conf+
                    '&first_name='+first_name+
                    '&last_name='+last_name+
                    '&bday='+bday+
                    '&gender='+gender+
                    '&country='+country+
                    '&city='+city+
                    '&address='+address+
                    '&profession='+profession+
                    '&hobbies='+hobbies+
                    '&more_infos='+more_infos;

            send_xmlhttp_request('POST','validation_servlet?'+data,data,handle_validation_servlet_response);
            //'validation_servlet?username='+username+'&email='+email
        }

    }    
};
//        var data = new FormData();
//        data.append('username', username);
//        data.append('email', email);
//        data.append('password', password);
//        data.append('password_conf', password_conf);
//        data.append('first_name', first_name);
//        data.append('last_name', last_name);
//        data.append('bday', bday);
//        data.append('gender', gender);
//        data.append('country', country);
//        data.append('city', city);
//        data.append('profession', profession);
