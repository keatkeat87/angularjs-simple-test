

// JavaScript Document
function SendSMSOTP_animate() {
    var x = document.getElementById("otpResendSMSBtnDiv");
        x.style.display = "block";
    var y = document.getElementById("otpSendSMSBtnDiv");
        y.style.display = "none";

    var button = document.getElementById("btn_SMSproceed_yes");
        button.style.display = "block";
    var button = document.getElementById("btn_SMSproceed_no");
        button.style.display = "none";

    var otp_input = document.getElementById("otp_SMSinput");
        otp_input.style.backgroundColor = "#f1f1f1";

    var enter_SMSotp_code_inner = document.getElementById("email-sent");
    var enter_SMSotp_code_inner_choose = document.getElementById("l-inner_choose");
    
        enter_SMSotp_code_inner.style.display = "block";
        enter_SMSotp_code_inner_choose.style.display = "none";
     


}

function SendEmailOTP_animate() {
    var x = document.getElementById("otpResendEmailBtnDiv");
        x.style.display = "block";
    var y = document.getElementById("otpSendEmailBtnDiv");
        y.style.display = "none";

    var button = document.getElementById("btn_Emailproceed_yes");
        button.style.display = "block";
    var button = document.getElementById("btn_Emailproceed_no");
        button.style.display = "none";
    
    var enter_SMSotp_code_inner2 = document.getElementById("email-sent2");
    var enter_SMSotp_code_inner_choose2 = document.getElementById("l-inner_choose2");
    
        enter_SMSotp_code_inner2.style.display = "block";
        enter_SMSotp_code_inner_choose2.style.display = "none";


    var otp_input = document.getElementById("otp_Emailinput");
        otp_input.style.backgroundColor = "#f1f1f1";
}


// var id_OTP_SMS_img = document.getElementById("OTP_SMS_img");
// var id_OTP_Email_img = document.getElementById("OTP_Email_img");


// id_OTP_SMS_img.src = "images/05ViewRequest/icn-SMSdisabled.png";
// id_OTP_Email_img.src = "images/05ViewRequest/icn-Email.png";

// function OTP_SMS_img() {
//     id_OTP_SMS_img.src = "images/05ViewRequest/icn-SMS.png";
//     id_OTP_Email_img.src = "images/05ViewRequest/icn-Emaildisabled.png";
// }
// function OTP_Email_img() {
//     id_OTP_SMS_img.src = "images/05ViewRequest/icn-SMSdisabled.png";
//     id_OTP_Email_img.src = "images/05ViewRequest/icn-Email.png";
// }
// function AddClass(element, name) {
//   var i, arr1, arr2;
//   arr1 = element.className.split(" ");
//   arr2 = name.split(" ");
//   for (i = 0; i < arr2.length; i++) {
//     if (arr1.indexOf(arr2[i]) == -1) {element.className += " " + arr2[i];}
//   }
// }

// function RemoveClass(element, name) {
//   var i, arr1, arr2;
//   arr1 = element.className.split(" ");
//   arr2 = name.split(" ");
//   for (i = 0; i < arr2.length; i++) {
//     while (arr1.indexOf(arr2[i]) > -1) {
//       arr1.splice(arr1.indexOf(arr2[i]), 1);     
//     }
//   }
//   element.className = arr1.join(" ");
// }