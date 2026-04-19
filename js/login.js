let emailLogin = document.getElementById("emaillogin");
let Passlogin = document.getElementById("password");
let loginbtn = document.getElementById("loginbtn");
let emailError = document.getElementById("email-error");
let passError = document.getElementById("password-error");
let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//ُError
window.onload = () => {
  emailLogin.focus();
};
emailLogin.addEventListener("click", () => {
  emailError.innerText = "";
});
Passlogin.addEventListener("click", () => {
  passError.innerText = "";
});

loginbtn.addEventListener("click", () => {
  // Email
  let EmailvaL = emailLogin.value.trim();
  let Email = EmailvaL.toLowerCase();
  //Password
  let PassVaL = Passlogin.value.trim();
  //بسم الله
  let Login = true;
  // Local Storage
  let SavedEmail = localStorage.getItem("userEmail");
  let SavedPassword = localStorage.getItem("userPassword");
  //Saved Email Local Storage
  if (Email == "") {
    emailError.innerText = "يرجي ادخال البريد الالكتروني";
    Login = false;
  } else if (Email !== SavedEmail) {
    emailError.innerText = "يرجي ادخال البريد الالكتروني صحيح";
    Login = false;
  } else {
    emailError.innerText = "";
  }
  //Saved Password Local Storage
  if (PassVaL == "") {
    passError.innerText = "يرجي ادخال كلمه المرور";
    Login = false;
  } else if (PassVaL !== SavedPassword) {
    passError.innerText = "يرجي اخال كلمه المرور صحيح";
    Login = false;
  } else {
    passError.innerText = "";
  }
  if (Email == SavedEmail && PassVaL == SavedPassword) {
    emailError.innerText = "";
    passError.innerText = "";
    localStorage.setItem("isLogin", "true");
  }
  if (!Login) return;
  alert("الحقوووووووووووووووووني");
});
let hide = document.getElementById("Lang-icon-hide");
let eye = document.getElementById("Lang-icon-eye");
function Hidepass() {
  hide.addEventListener("click", () => {
    Passlogin.type = "text";
    eye.classList.remove("visibility");
    hide.classList.add("visibility");
  });
  eye.addEventListener("click", () => {
    Passlogin.type = "password";
    eye.classList.add("visibility");
    hide.classList.remove("visibility");
  });
}
Hidepass();
document.getElementById("CreateAccount").onclick = () => {
  window.location.href = "createaccount.html";
};
document.getElementById("pageForgetaccount").onclick = () => {
  window.location.href = "forgetpassword.html";
};
