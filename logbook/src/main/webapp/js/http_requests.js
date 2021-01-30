/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

    //Function that supprots all post request i have to make 
    //1st param --method POST or GET
    //2nd param --url to send data
    //3rd param --data to send
    //4rth param --callback function to process response
      function send_xmlhttp_request2(method,where_to, data_to_send,callback) {
        console.log("I am in http request");
        var xhttp = new XMLHttpRequest();
        var response;
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
//                console.log(typeof(xhttp.responseText));
//               console.log(xhttp.responseText);
                response = JSON.parse(xhttp.responseText);
                console.log("111111111111111111" + response);
                callback(response);
            }else if (this.status === 404){
                console.log("6666666666666666");
               response = "url_not_found";
               callback(response); 
            }
        };
        xhttp.open(method, where_to, true);
        xhttp.send(data_to_send);
    }
    function send_xmlhttp_request(method,where_to, data_to_send,callback) {
        console.log("I am in http request");
        var xhttp = new XMLHttpRequest();
        var response;
         var data = 'desc='+document.getElementById("name_for_session");
        send_xmlhttp_request2('POST','active_session?',data,handle_for_active_session); 
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
//                console.log(typeof(xhttp.responseText));
//               console.log(xhttp.responseText);
                response = JSON.parse(xhttp.responseText);
                console.log("111111111111111111" + response);
                callback(response);
            }else if (this.status === 404){
                console.log("6666666666666666");
               response = "url_not_found";
               callback(response); 
            }
        };
        xhttp.open(method, where_to, true);
        xhttp.send(data_to_send);
    }
