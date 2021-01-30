/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function handle_validation_servlet_response(response_from_valid_servlet) {
    // How many errors validation servlet detected???
    var size = Object.keys(response_from_valid_servlet).length;
    // Always there will be one field errors: sure or nop at the end
    size = size - 1;
    
    // errors is the last field of response 
    // if it's sure means that at least one error detected
    // else the response is the original_list which contains user's inputs
    // i didn't want to get them again from html using getElement because 
    // user could be changed them until i checked them 
    if (response_from_valid_servlet.errors === 'sure') {
    document.getElementById('all_good_user_created_msg').innerHTML = '';
        var print_response_in_a_pretty_way = function (obj) {
            var string = '';

            for (var prop in obj) {
                if (typeof obj[prop] == 'string') {
                    string += '<font color="red">' +prop + ': ' + obj[prop] + '</font>'+' </br>';
                } 
            } 

            return string;
        };
        //document.getElementById('see_restrictions_msg').innerHTML = "Remember!";
        document.getElementById('errors_from_validation_servlet_msg').innerHTML =
                '<h2>' +
                "400 - Bad Request" +
                '</h2>' +
                '<h3>' +
                "Validation servlet says that " + size + " errors detected" +
                '</h3>' +
                '<font color="red">' +
                "Let's see what went wrong" +
                '</font>' +
                '<br>' +
                print_response_in_a_pretty_way(response_from_valid_servlet) +
                '<br>' +
                '<font color="green">' +
                "Remember restrictions" +
                '</font>' +
                '<br>' +
                '<font color="white">' +
                "Username must be at least 8 latin chars" +
                '<br>' +
                "Email as e.g something@example.something" +
                '<br>' +
                "Passwords must contain at least one letter,number and special symbol and match each other" +
                '<br>' +
                "First and Last names must be at least 3 and maximum 15 latin characters" +
                '<br>' +
                "City must be at least 2 and maximum 20 latin characters" +
                '<br>' +
                "Profession must be at least 3 and maximum 15 latin characters" +
                '<br>' +
                '<br>' +
                '</font>' +
                '<font color="green">' +
                "Please correct your infos and try again to proceed!" +
                '</font>' +
                '<hr>';
    } else {
        // It's time to add user in database
        document.getElementById('errors_from_validation_servlet_msg').innerHTML = '';
        var transform_data_to_proper_format_to_send_with_url = function (obj) {
             var string = '';
             var first_entry = true;
             for (var prop in obj) {
                 if (typeof obj[prop] == 'string') {
                     if(first_entry){
                         string += prop + '=' + obj[prop];  
                         first_entry = false;
                     }else{
                         string += '&' + prop + '=' + obj[prop];  
                     }
                 } 
             }

             return string;
         };
        var data = transform_data_to_proper_format_to_send_with_url(response_from_valid_servlet);
        //document.getElementById('all_good_user_created_msg').innerHTML = "HELLO"+'<br>'+data;
        send_xmlhttp_request('POST','add_user_to_db_servlet?'+data,data,handle_add_user_to_db_servlet_response);
    }
}

// <font color="red">This is some text!</font> 
//  else {
//                    string += prop + ': { </br>' + print(obj[prop]) + '}';
//                }
