
export var error_tips = function (res) {
  if(res.code === 300){
    // window.location.href = 'login.html'
  }else if(res.code === 4003){
    Dialog.alert({
      message: "The phone number you're trying to verify was recently used to verify a different account.Please try a different number",
      confirmButtonText: "Ok"
    });
  }else if(res.code === 4002){
    Dialog.alert({
      message: "This phone number is invalid",
      confirmButtonText: "Ok"
    });
  }else if(res.code === 4011){
    Dialog.alert({
      message: "Frequent Operations",
      confirmButtonText: "Ok"
    });
  }else if(res.code === 4000){
    Dialog.alert({
      message: "Incorrect verification code. Enter the code again",
      confirmButtonText: "Ok"
    });
  }else if(res.code === 4001){
    Dialog.alert({
      message: "The verification code is overdue",
      confirmButtonText: "Ok"
    });
  }else if(res.code === 4004){
    Dialog.alert({
      message: "Account or password error. Enter again",
      confirmButtonText: "Ok"
    });
  }else if(res.code === 4006){
    Dialog.alert({
      message: "Currently, it's only available for Safaricom phone numbers",
      confirmButtonText: "Ok"
    });
  }else if(res.code === 4012){
    Dialog.alert({
      message: "You can only send three messages a day",
      confirmButtonText: "Ok"
    });
  } else if(res.code === 4200){
    Dialog.alert({
      message: "Your old password was incorrectly typed",
      confirmButtonText: "Ok"
    });
  }else if(res.code === 4201){
    Dialog.alert({
      message: "The new password cannot be repeated with the old code",
      confirmButtonText: "Ok"
    });
  }else if(res.code === 400){
    Dialog.alert({
      message: "Input format error",
      confirmButtonText: "Ok"
    });
  }else if(res.code === 8005){
    Dialog.alert({
      message: "It’s not Scratcher time yet!",
      confirmButtonText: "Ok"
    });
  }else if(res.code === 8006){
    Dialog.alert({
      message: "You don’t have valid Scratchers!",
      confirmButtonText: "Ok"
    });
  }else{
    Dialog.alert({
      message: "Not found!",
      confirmButtonText: "Ok"
    });
  }
};
