/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
function handle_servlet_if_email_exists_response(response_from_valid_servlet) {
    console.log("ALL GOOD " + response_from_valid_servlet.username_already_exists);
    if(response_from_valid_servlet.email_already_exists === 'yes'){
        document.getElementById("sumbit_button").disabled = true;
        console.log("PPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPPP");
        document.getElementById('email_exists_msg').style.color = 'red';
        document.getElementById('email_exists_msg').innerHTML='&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;I am sorry this email already exists';
    }else{
        document.getElementById("sumbit_button").disabled = false;
        document.getElementById('email_exists_msg').innerHTML='';
    }
    
}

