'use strict';
/* jshint -W097 */
/* jshint -W117 */
//console.log(/^([a-z0-9]{5,})$/.test('abc12'));

//Gets called by "Yes" radio button by default from register.html --onclick
// Only difference is which init function gets called in face.js
function radio_button() {

    if (document.getElementById("yes_to_upload_photo").checked) {
        //Get username from html
        var username = document.getElementById("username");

        //valid_username gets true if username matches regex --means valid
        var valid_username = /[A-Za-z]{8,}$/.test(username.value);

        //Username is valid to procceed
        if (valid_username) {
            document.getElementById("empty_username_msg").innerHTML = "";
            //Show take/upload buttons
            document.getElementById("show_buttons_to_upload_photo").style.display = "block";
            //Function is at face.js file
            faceRec.init();
            //username was either empty or invalid
        } else {
            //Username field was empty --message appears
            if (username.value.length == "") {
                document.getElementById("empty_username_msg").innerHTML = "I am sorry username is empty.";
                document.getElementById('empty_username_msg').style.color = 'red';
                document.getElementById("no_to_upload_photo").checked = true;
                //Username was invalid --message appears    
            } else {
                document.getElementById("empty_username_msg").innerHTML = "I am sorry username is invalid. Try again";
                document.getElementById('empty_username_msg').style.color = 'red';
                document.getElementById("no_to_upload_photo").checked = true;

            }
        }

    }
}

//Gets called by "Yes" radio button by default from sign_in.html --onclick
// Only difference is which init function gets called in face.js
function radio_button_from_sign_in() {

    if (document.getElementById("sign_in_yes_to_upload_photo").checked) {
        //Get username from html
        var username = document.getElementById("sign_in_username");

        //Show take/upload buttons
        document.getElementById("sign_in_show_buttons_to_upload_photo").style.display = "block";

        //Function is at face.js file
        faceRec.init_caller_is_sign_in_page();
    }
}