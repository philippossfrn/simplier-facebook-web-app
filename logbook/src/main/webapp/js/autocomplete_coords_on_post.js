"use strict";
/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var autocomplete_coords_btn = document.getElementById("autocomplete_coords");
    autocomplete_coords_btn.onclick = function autocomplete_coords_on_user_post() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            //Autocomplete coordinates of user
            //Keep only 6 decimals and round up the sixth decimal
            document.getElementById("latitude").value = position.coords.latitude.toFixed(6);
            document.getElementById("longitude").value = position.coords.longitude.toFixed(6);
        });
    }  
};


