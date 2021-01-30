/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function handle_see_all_users_servlet_response(response_from_see_all_users_servlet) {
            var print_response_in_a_pretty_way = function (obj) {
            var string = '';
//<a id="myLink" href="#" onclick="MyFunction();">link text</a>
//  <div id="text" onclick="MyFunction('+username+');">' your text here </div>
//'<a id="myLink" href="#" onclick="MyFunction('+username+');">' + '</a>'+ '+this.id+'



            for (var prop in obj) {
                if (typeof obj[prop] == 'string') {
                    // Do not make button if the username is Total usernames in DB
                    // It's my last entry of table just to show how many users are
                    if(!obj[prop].includes("Total usernames in DB")){
                        var username = obj[prop];
                        //MyFunction(username);
                        var sth = "Details";
                        string +=   '<tr>' + 
                                        '<td>'+ 
                                             '<button style="background:white" id="'+username+'" onClick="call_details_of_user_servlet()">'+sth+'</button>'+ 
                                            '<font color="white">' +"   "+obj[prop]+'</font>' +
                                        '</td>'+ 
                                    '</tr>'  ;
                    }else{
                        
                        string +=   '<tr>' + 
                                        '<td>'+ 
                                            '<font color="white">' +obj[prop]+'</font>' +
                                        '</td>'+ 
                                    '</tr>'  ;
                        
                    }

                } 
            } 
            
            return string;
        };
//        //print_response_in_a_pretty_way(response_from_valid_servlet);
        document.getElementById("close_list_with_all_usernames").style.display = "block";
        document.getElementById("close_list_with_all_usernames").align = "center";
        document.getElementById("table_with_all_users").innerHTML = 
                '<br>'+
                '<table align="center">' +
                  '<tr>' +
                  
            '<th>'+'<font color="green">' +"All usernames in DB"+'</font>'+'</th>' +
                  '</tr>'+
                
                print_response_in_a_pretty_way(response_from_see_all_users_servlet) +
                
              '</table>' ;
    
}

