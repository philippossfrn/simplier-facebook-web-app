'use strict';
/* jshint -W097 */
/* jshint -W117 */
/* jshint -W030 */

/*
    Author: Panagiotis Papadakos papadako@csd.uoc.gr

    Try to read this file and understand what the code does...
    Then try to complete the missing functionality

    For the needs of the hy359 2019 course
    University of Crete

    At the end of the file there are some comments about our trips

*/

/*  face recognition that is based on faceplusplus service */
var faceRec = (function () {



    // Object that holds anything related with the facetPlusPlus REST API Service
    var faceAPI = {
        apiKey: 'l2jNgKbk1HXSR4vMzNygHXx2g8c_xT9c',
        apiSecret: '2T6XdZt4EYw-I7OhmZ6g1wtECl81e_Ip',
        app: 'hy359',
        // Detect
        // https://console.faceplusplus.com/documents/5679127
        detect: 'https://api-us.faceplusplus.com/facepp/v3/detect',  // POST
        // Set User ID
        // https://console.faceplusplus.com/documents/6329500
        setuserId: 'https://api-us.faceplusplus.com/facepp/v3/face/setuserid', // POST
        // Get User ID
        // https://console.faceplusplus.com/documents/6329496
        getDetail: 'https://api-us.faceplusplus.com/facepp/v3/face/getdetail', // POST
        // addFace
        // https://console.faceplusplus.com/documents/6329371
        addFace: 'https://api-us.faceplusplus.com/facepp/v3/faceset/addface', // POST
        // Search
        // https://console.faceplusplus.com/documents/5681455
        search: 'https://api-us.faceplusplus.com/facepp/v3/search', // POST
        // Create set of faces
        // https://console.faceplusplus.com/documents/6329329
        create: 'https://api-us.faceplusplus.com/facepp/v3/faceset/create', // POST
        // update
        // https://console.faceplusplus.com/documents/6329383
        update: 'https://api-us.faceplusplus.com/facepp/v3/faceset/update', // POST
        // removeface
        // https://console.faceplusplus.com/documents/6329376
        removeFace: 'https://api-us.faceplusplus.com/facepp/v3/faceset/removeface', // POST
        // I added this!
        // analyze
        // https://console.faceplusplus.com/documents/6329465
        analyze: 'https://api-us.faceplusplus.com/facepp/v3/face/analyze', //POST
    };

    // Object that holds anything related with the state of our app
    // Currently it only holds if the snap button has been pressed
    var state = {
        photoSnapped: false,
    };

    // function that returns a binary representation of the canvas
    function getImageAsBlobFromCanvas(canvas) {

        // function that converts the dataURL to a binary blob object
        function dataURLtoBlob(dataUrl) {
            // Decode the dataURL
            var binary = atob(dataUrl.split(',')[1]);

            // Create 8-bit unsigned array
            var array = [];
            for (var i = 0; i < binary.length; i++) {
                array.push(binary.charCodeAt(i));
            }

            // Return our Blob object
            return new Blob([new Uint8Array(array)], {
                type: 'image/jpg',
            });
        }

        var fullQuality = canvas.toDataURL('image/jpeg', 1.0);
        return dataURLtoBlob(fullQuality);

    }

    // function that returns a base64 representation of the canvas
    function getImageAsBase64FromCanvas(canvas) {
        // return only the base64 image not the header as reported in issue #2
        return canvas.toDataURL('image/jpeg', 1.0).split(',')[1];
    }
    function getImageAsBase64FromCanvas_for_post(canvas) {
        // return only the base64 image not the header as reported in issue #2
        return canvas.toDataURL('image/jpeg', 1.0);
    }

    //Function that supprots all post request i have to make 
    //1st param --url to send data
    //2nd param --data to send
    //3rd param --callback function to process response
    function send_xmlhttp_post_request(where_to, data_to_send, callback) {
        var xhttp = new XMLHttpRequest();
        var faceplusplus_response;
        xhttp.open('POST', where_to, true);
        xhttp.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                console.log(typeof (xhttp.responseText));
                faceplusplus_response = JSON.parse(xhttp.responseText);
                callback(faceplusplus_response);
            }
        };
        xhttp.send(data_to_send);
    }

    //Got response form Face Detect service
    //Also call function to make post request to Face SetUserID service
    //Continue to callback_for_set_user_id function
    function callback_for_detect(detect_response) {
        //console.log("DETECT: "+Object.values(detect_response));
        //Response was an array and at position 1 there is an array with our face data
        var face_data = Object.values(detect_response)[1];
        //check that at least one face detected
        if (Object.values(detect_response)[1].length >= 1) {
            var face_token;
            //Get face token from face data array
            face_token = face_data[0].face_token;
            //Get username from page --user provide this
            var user_id = document.getElementById("username").value;
            //Construct data that i will send to setuserID 
            var data_for_set_userid = new FormData();
            data_for_set_userid.append('api_key', faceAPI.apiKey);
            data_for_set_userid.append('api_secret', faceAPI.apiSecret);
            data_for_set_userid.append('face_token', face_token);
            data_for_set_userid.append('user_id', user_id);
            //Make the request and continue to callback_for_set_user_id function
            send_xmlhttp_post_request(faceAPI.setuserId, data_for_set_userid, callback_for_set_user_id);
        } else {
            document.getElementById("no_face_detected_msg").innerHTML = "No face detected in the picture.Try,again.";
            document.getElementById('no_face_detected_msg').style.color = 'red';
        }
    }

    //Got response form Face SetUserID service
    //Also call function to make post request to FaceSet:AddFace service
    //Continue to callback_for_addface function
    function callback_for_set_user_id(detect_response) {
        console.log("I got this response from set userID");
        //Response is array with 3 or 4 elements
        console.log(Object.values(detect_response));
        //If there are 4 elements then there is an error
        //Element with index 3 is face token
        var face_token = Object.values(detect_response)[3];
        console.log("Face token to addFace is: " + face_token);
        //Construct data that i will send to Addface service
        var data_for_addface = new FormData();
        data_for_addface.append('api_key', faceAPI.apiKey);
        data_for_addface.append('api_secret', faceAPI.apiSecret);
        data_for_addface.append('outer_id', faceAPI.app);
        data_for_addface.append('face_tokens', face_token);
        //Make the request and continue to callback_for_addface function
        send_xmlhttp_post_request(faceAPI.addFace, data_for_addface, callback_for_addface);
    }

    //Got response from FaceSet:AddFace service
    function callback_for_addface(detect_response) {
        console.log("I got this response from add face:");
        //There are 7 elements in response array
        //last is also an array with failure details
        //Success, face was added to face_set hy359
        //Continue to sign_up.html
        console.log(Object.values(detect_response));

    }

    //Got response from FaceSet:Search in hy_359 outer_id service
    function callback_for_search(detect_response) {
        console.log("I got this response from search service:");
        //There are 7 elements in response array
        //last is also an array with failure details
        //Success, face was added to face_set hy359
        //Continue to sign_up.html
        console.log(Object.values(detect_response));
        //Element with index 5 is array with detected faces
        var array_with_detected_faces = Object.values(detect_response)[5];
        var how_many_faces_detected = array_with_detected_faces.length;

        // At least one face detected
        if (how_many_faces_detected > 0) {
            //find face with the highest confidence rate
            var max = 0;
            for (var i = 0; i < how_many_faces_detected; i++) {
                if (array_with_detected_faces[i].confidence > max) {
                    max = i; //now i know the index of the face with the highest confidence rate
                }
            }
            //get user_id from the index with max confidence
            var username_from_face = array_with_detected_faces[max].user_id;
            var face_token_of_user = array_with_detected_faces[max].face_token;
            //Autocomplete username
            document.getElementById("sign_in_username").value = username_from_face;
            //Data analyze service needs
            var data_for_analyze = new FormData();
            data_for_analyze.append('api_key', faceAPI.apiKey);
            data_for_analyze.append('api_secret', faceAPI.apiSecret);
            data_for_analyze.append('face_tokens', face_token_of_user);
            var some_details = 'gender,age,emotion';
            data_for_analyze.append('return_attributes', some_details);
            //Request to find details about the user e.g gender...
            send_xmlhttp_post_request(faceAPI.analyze, data_for_analyze, callback_for_analyze);
            //document.getElementById("username").focus;
        } else {
            document.getElementById('sign_in_no_face_detected_msg').innerHTML = "No face match.Sorry, for that!";
            document.getElementById('sign_in_no_face_detected_msg').style.color = 'red';
        }

    }

    //Got response from Analyze service
    function callback_for_analyze(detect_response) {
        console.log("I got this response from analyze service:");
        console.log(Object.values(detect_response));
        var array_about_user = Object.values(detect_response)[2];
        var array_with_details_about_user = array_about_user[0];
        var age = array_with_details_about_user.attributes.age.value;
        var gender = array_with_details_about_user.attributes.gender.value;
        //Emotions
        var anger = array_with_details_about_user.attributes.emotion.anger;
        var disgust = array_with_details_about_user.attributes.emotion.disgust;
        var fear = array_with_details_about_user.attributes.emotion.fear;
        var happiness = array_with_details_about_user.attributes.emotion.happiness;
        var neutral = array_with_details_about_user.attributes.emotion.neutral;
        var sadness = array_with_details_about_user.attributes.emotion.sadness;
        var surprise = array_with_details_about_user.attributes.emotion.surprise;
        document.getElementById("results_from_analyze_msg").innerHTML = "<pre>" +
            "Let me quess!" +
            "\n" + " You are " + gender + " and approximately " + age + " years old!" +
            "\n" + "Also i think your feelings are:" +
            "\n" + "anger: " + anger + "%" +
            "\n" + "disgust: " + disgust + "%" +
            "\n" + "fear: " + fear + "%" +
            "\n" + "happiness: " + happiness + "%" +
            "\n" + "neutral: " + neutral + "%" +
            "\n" + "sadness: " + sadness + "%" +
            "\n" + "surprise: " + surprise + "%" + "</pre>";

    }

    // Function called when we upload an image
    function uploadImage() {
        console.log("i am in upload image fuction in regiser page");
        if (state.photoSnapped) {
            console.log("ready to send ajax");
            var canvas = document.getElementById('canvas');
            var image = getImageAsBlobFromCanvas(canvas);

            // Create Form Data. Here you should put all data
            // requested by the face plus plus services and
            // pass it to ajaxRequest
            var data = new FormData();
            data.append('api_key', faceAPI.apiKey);
            data.append('api_secret', faceAPI.apiSecret);
            data.append('image_file', image);

            //Call my function to send Detect xmlhttprequest
            //Make the request and continue to callback_for_detect
            send_xmlhttp_post_request(faceAPI.detect, data, callback_for_detect);

        } else {
            alert('No image has been taken!');
        }
    }

    //-------------------------------Sign in page-----------------------------------------------
    // Function called when we upload an image
    function uploadImage_caller_is_sign_in_page() {
        console.log("i am in upload image fuction in sign in page");
        if (state.photoSnapped) {
            console.log("ready to send ajax");
            var canvas = document.getElementById('sign_in_canvas');
            var image = getImageAsBlobFromCanvas(canvas);

            // Create Form Data. Here you should put all data
            // requested by the face plus plus services and
            // pass it to ajaxRequest
            var search_data = new FormData();
            search_data.append('api_key', faceAPI.apiKey);
            search_data.append('api_secret', faceAPI.apiSecret);
            search_data.append('image_file', image);
            search_data.append('outer_id', faceAPI.app);

            //Call my function to send search xmlhttprequest
            //Make the request and continue to callback_for_search
            send_xmlhttp_post_request(faceAPI.search, search_data, callback_for_search);
        } else {
            alert('No image has been taken!');
        }
    }
 
    function callback_for_find(response){
                console.log("I got this response from search service:");
        //There are 7 elements in response array
        //last is also an array with failure details
        //Success, face was added to face_set hy359
        //Continue to sign_up.html
        console.log(Object.values(response));
        if(Object.values(response).length > 4){
                        //Element with index 5 is array with detected faces
            var array_with_detected_faces = Object.values(response)[5];
            var how_many_faces_detected = array_with_detected_faces.length;

            // At least one face detected
            if (how_many_faces_detected > 0) {
                //find face with the highest confidence rate
                var max = 0;
                for (var i = 0; i < how_many_faces_detected; i++) {
                    if (array_with_detected_faces[i].confidence > max) {
                        max = i; //now i know the index of the face with the highest confidence rate
                    }
                }
                //get user_id from the index with max confidence
                var username_from_face = array_with_detected_faces[max].user_id;

                //Autocomplete username
                //document.getElementById("sign_in_username").value = username_from_face;
                //Data analyze service needs
                alert(username_from_face);
                //document.getElementById("username").focus;
            } else {
                    alert("Not found");
            }
        }else {
                    alert("Not found");
            }

        
    }
    // Function for initializing things (event handlers, etc...)
    function init() {
        console.log("I am in init function in register page");
        
        var canvas = document.getElementById("canvas");
        var context = canvas.getContext("2d");
        var video = document.getElementById("video");
        var mediaConfig = {
            video: true,  //Open camera --ask permission first
        };
        var errBack = function (e) {
            console.log('An error has occurred!', e);
        };

        // Put video listeners into place
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
                video.srcObject = stream;
                video.onloadedmetadata = function (e) {
                    video.play(); //show camera
                };
            });
        }

        // Trigger photo take
        //Take photo pressed
        document.getElementById('snap').addEventListener('click', function () {
            console.log("Take photo button pressed");
            //0,0 --> dx,dy starter points
            //640,480 --> width,height
            //video is the actual img
            context.drawImage(video, 0, 0, 600, 460);
            state.photoSnapped = true; // photo has been taken
        });

        // Trigger when upload button is pressed
        document.getElementById('upload').addEventListener('click', uploadImage);
    }
    //-------------------------------Sign in page-----------------------------------------------

    // Function for initializing things (event handlers, etc...)
    // Caller is radio_button_from_sign_in function which is caleed by sign_in.html page
    function init_caller_is_sign_in_page() {
        console.log("I am in init function in sign in page");
        var canvas = document.getElementById("sign_in_canvas");
        var context = canvas.getContext("2d");
        var video = document.getElementById("sign_in_video");
        var mediaConfig = {
            video: true,  //Open camera --ask permission first
        };
        var errBack = function (e) {
            console.log('An error has occurred!', e);
        };

        // Put video listeners into place
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
                video.srcObject = stream;
                video.onloadedmetadata = function (e) {
                    video.play(); //show camera
                };
            });
        }

        // Trigger photo take
        //Take photo pressed
        document.getElementById('sign_in_snap').addEventListener('click', function () {
            console.log("Take photo button pressed");
            //0,0 --> dx,dy starter points
            //640,480 --> width,height
            //video is the actual img
            context.drawImage(video, 0, 0, 600, 460);
            state.photoSnapped = true; // photo has been taken
        });

        // Trigger when upload button is pressed
        document.getElementById('sign_in_upload').addEventListener('click', uploadImage_caller_is_sign_in_page);
    }
    function init_caller_in_post_page() {
        console.log("I am in init function in sign in page");
        var canvas = document.getElementById("image_canvas");
        var context = canvas.getContext("2d");
        var video = document.getElementById("image_video");
        var mediaConfig = {
            video: true,  //Open camera --ask permission first
        };
        var errBack = function (e) {
            console.log('An error has occurred!', e);
        };

        // Put video listeners into place
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia(mediaConfig).then(function (stream) {
                video.srcObject = stream;
                video.onloadedmetadata = function (e) {
                    video.play(); //show camera
                };
            });
        }

        // Trigger photo take
        //Take photo pressed
        document.getElementById('image_snap').addEventListener('click', function () {
            console.log("Take photo button pressed");
            //0,0 --> dx,dy starter points
            //640,480 --> width,height
            //video is the actual img
            context.drawImage(video, 0, 0, 100, 100);
            state.photoSnapped = true; // photo has been taken
            var base64 = getImageAsBase64FromCanvas_for_post(canvas);
            var stringLength = base64.length - 'data:image/png;base64,'.length;
            var sizeInBytes = 4 * Math.ceil((stringLength/3)) * 0.5624896334383812;
            var sizeInKb = sizeInBytes / 1000;
            if (sizeInKb < 50){
                document.getElementById('url').value = base64;
            }
        });

        // Trigger when upload button is pressed
        document.getElementById('sign_in_upload').addEventListener('click', uploadImage_caller_is_sign_in_page);
    }
    
       function send_pic(img){
                console.log("i am in upload image fuction in sign in page");
        
            console.log("ready to send ajax");
            var canvas = document.getElementById('sign_in_canvas');
            var image = getImageAsBlobFromCanvas(img);

            // Create Form Data. Here you should put all data
            // requested by the face plus plus services and
            // pass it to ajaxRequest
            var search_data = new FormData();
            search_data.append('api_key', faceAPI.apiKey);
            search_data.append('api_secret', faceAPI.apiSecret);
            search_data.append('image_file', image);
            search_data.append('outer_id', faceAPI.app);

            //Call my function to send search xmlhttprequest
            //Make the request and continue to callback_for_search
            send_xmlhttp_post_request(faceAPI.search, search_data, callback_for_find);

    }

    return {
       send_pic:send_pic, init: init, init_caller_is_sign_in_page: init_caller_is_sign_in_page, init_caller_in_post_page: init_caller_in_post_page
    };

})();



/* See who the caller is using strict mode --how it works?
var stackTrace = (new Error()).stack; // Only tested in latest FF and Chrome
var callerName = stackTrace.replace(/^Error\s+/, ''); // Sanitize Chrome
callerName = callerName.split("\n")[1]; // 1st item is this, 2nd item is caller
callerName = callerName.replace(/^\s+at Object./, ''); // Sanitize Chrome
callerName = callerName.replace(/ \(.+\)$/, ''); // Sanitize Chrome
callerName = callerName.replace(/\@.+/, ''); // Sanitize Firefox
alert(callerName);
*/