//New Password
let NewPassword = document.getElementById("newPassword");
let Newhide = document.getElementById("hide-new");
let NewShow = document.getElementById("show-new");
let NewPasswordError = document.getElementById("newPassword-error");
// Confirm New Password
let ConNewPassword = document.getElementById("confirmPassword");
let Conhide = document.getElementById("hide-confirm");
let ConShow = document.getElementById("show-confirm");
let ConPasswordError = document.getElementById("confirmPassword-error");
//button password
let BtnConfirmpassword = document.querySelector(".reset-btn");
console.log(BtnConfirmpassword);
function HidePassword() {
  //hide New Password
  Newhide.addEventListener("click", () => {
    NewPassword.type = "text";
    Newhide.classList.add("visibility");
    NewShow.classList.remove("visibility");
  });
  NewShow.addEventListener("click", () => {
    NewPassword.type = "password";
    Newhide.classList.remove("visibility");
    NewShow.classList.add("visibility");
  });
  //hide con password
  Conhide.addEventListener("click", () => {
    ConNewPassword.type = "text";
    Conhide.classList.add("visibility");
    ConShow.classList.remove("visibility");
  });
  ConShow.addEventListener("click", () => {
    ConNewPassword.type = "password";
    ConShow.classList.add("visibility");
    Conhide.classList.remove("visibility");
  });
}
HidePassword();
//Regex Password
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,16}$/;
BtnConfirmpassword.addEventListener("click", () => {
  let PasswordNewVal = NewPassword.value.trim();
  let PasswordConVal = ConNewPassword.value.trim();
  let LogPass = true;
  //New Password
  if (PasswordNewVal == "") {
    NewPasswordError.innerText = "يرجي ادخال كلمه المرور الجديده";
    LogPass = false;
  } else if (!passwordRegex.test(PasswordNewVal) || PasswordNewVal < 6) {
    NewPasswordError.innerText =
      "كلمه المرور لازم تكون من 6 لـ 15 وتحتوي على حروف أو أرقام";
    LogPass = false;
  } else {
    NewPasswordError.innerText = "";
  }
  //Con New Password
  if (PasswordConVal == "") {
    ConPasswordError.innerText = "يرجي ادخال كلمه المرور الجديده";
    LogPass = false;
  } else if (!passwordRegex.test(PasswordConVal) || PasswordConVal < 6) {
    ConPasswordError.innerText =
      "كلمه المرور لازم تكون من 6 لـ 15 وتحتوي على حروف أو أرقام";
    LogPass = false;
  } else if (PasswordNewVal !== PasswordConVal) {
    ConPasswordError.innerText = "كلمه المرور غير مطابقه";
    LogPass = false;
  } else {
    ConPasswordError.innerText = "";
  }
  let SavedEmail = localStorage.getItem("userEmail");
  if (!SavedEmail) {
    alert("لا يوجد ايميل يريس");
    LogPass = false;
  }
  if (!LogPass) return;
  localStorage.setItem("userPassword", PasswordConVal);
  alert("ميييييييييياوو");
});

// none value
[NewPassword, ConNewPassword].forEach((input) => {
  input.addEventListener("input", () => {
    document.getElementById(input.id + "-error").innerText = "";
  });
});
