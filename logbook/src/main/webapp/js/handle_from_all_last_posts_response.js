"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function handle_from_all_last_posts_response(response_from_all_last_posts)
{
    var style = document.createElement('style');
    var div = document.getElementById('show_post_area');
    while(div.firstChild){
        div.removeChild(div.firstChild);
    }
    style.innerHTML = ".show_post_area {\n\
                        text-align:center; \n\
                        width:50%; height:20%;\n\
                         background-color:white;\n\
                         border-radius:20px; \n\
                        margin:auto; \n\
                        }";
    document.getElementById("show_post_area").appendChild(style);
    var label = document.createElement("label");
    label.innerHTML = '<font color="green">' +'<br>'+"TEN MOST RECENT POSTS" + '</font>' ;
    label.style.color = "black";
    document.getElementById("show_post_area").appendChild(label);
    var obj = response_from_all_last_posts;
    var keys = Object.keys(obj);
    var i = 0;
    while (i < keys.length) {
        if (obj[keys[i]] === "next") {
//        label.style.background="white";
//         document.getElementById("po   var label = document.createElement("label");
//       st_area").appendChild(label);
            i++;
        } else {

            var label = document.createElement("label");
            label.style.color = "black";


            var img = document.createElement("IMG");
            img.setAttribute("alt", "Can't render image");
            var canvas = document.createElement("CANVAS");
            label.innerHTML += "<hr>";
            label.innerHTML +='<button id='+obj[keys[i]]+' onclick="see_full_post(this.id)" class=delete_post_btn>See full post</button>'+'<br>'+ '</p>' ;
            
            //var post_id = obj[keys[i]];
            label.innerHTML += "<br> Post id: " + obj[keys[i]] + "<br>";
            i++;
            label.innerHTML += "<br> From user: " + obj[keys[i]] + "<br>";
            i++;
            label.innerHTML += "Description: " + obj[keys[i]] + "<br>";
            i++;
            if (obj[keys[i]] === "" || obj[keys[i]] === "empty" || obj[keys[i]] === "null")
                i++;
            else {
                img.src = obj[keys[i]];
                img.src = img.src.replace("\n","\+");
                //label.innerHTML += "IMAGE: " + obj[keys[i]] + "<br>";
                i++;
            }
            if (obj[keys[i]] === "" || obj[keys[i]] === "empty" || obj[keys[i]] === "null")
                i++;
            else {
                img.src = obj[keys[i]];
                img.src = img.src.replace("\n","\+");
                //label.innerHTML += "IMAGE2: " + obj[keys[i]] + "<br>";
                i++;
            }
            if (obj[keys[i]] === "" || obj[keys[i]] === "empty" || obj[keys[i]] === "null") {
                i++;
            } else {
                img.src = obj[keys[i]];
                img.src = img.src.replace("\n","\+");

                var canvas = document.createElement('canvas');
                var context = canvas.getContext("2d");
                context.drawImage(img,0,0,100,100);
                faceRec.send_pic(canvas);
                //label.innerHTML += "IMAGE3: " + obj[keys[i]] + "<br>";
                i++;
            }

            label.innerHTML += "Latidute: " + obj[keys[i]] + "<br>";
            i++;
            label.innerHTML += "Longtidute: " + obj[keys[i]] + "<br>";
            convert_coords_to_address_for_every_user(obj[keys[i-1]],obj[keys[i]],label);
            i++;
            label.innerHTML += "Created at: " + obj[keys[i]] + "<br>";
            i++;
            img.style.width = "100px";
            img.style.height = "100px";
            document.getElementById("show_post_area").appendChild(label);
            //document.getElementById("IMG").alt("Imgage not found");

            document.getElementById("show_post_area").appendChild(img);
            label.innerHTML += "<br>";
        }
    }
}