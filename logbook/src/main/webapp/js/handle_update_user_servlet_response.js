/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function handle_update_user_servlet_response(response_update_user_servlet) {
        var print_response_in_a_pretty_way = function (obj) {
            var string = '';

            for (var prop in obj) {
                if (typeof obj[prop] == 'string') {
                    string += '<font color="white">' + prop + ': ' + obj[prop] +'</font>'+ ' </br>';
                } 
            } 

            return string;
        };
        //var data = print_response_in_a_pretty_way(response_from_add_user_servlet);
        document.getElementById('all_good_user_created_msg').innerHTML = 
            '<h2>' +
            '<font color="green">' +
            "All done.Profile updated!" +
            '</font>' +
            '</h2>' +
            '<font color="green">' +
            "Here is what we know for you now in our DB: " +
            '</font>' +
            '<br>' +
            print_response_in_a_pretty_way(response_update_user_servlet) +
            '<hr>';
            
        setTimeout(fade_out, 8000);
        function fade_out() {
          document.getElementById('all_good_user_created_msg').innerHTML = " ";
        }
        
        // Reset all inpout fields
        //reset_fields();
}

