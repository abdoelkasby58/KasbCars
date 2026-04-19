// input name
let Namecreate = document.getElementById("fullname");
let Nameerror = document.getElementById("fullname-error");
// input email
let Emailcreate = document.getElementById("email-create");
let Emailerror = document.getElementById("email-create-error");
// input password
let Passwordinp = document.getElementById("password-create");
let hidePass = document.getElementById("hide-pass");
let eyePass = document.getElementById("show-pass");
let PasswordError = document.getElementById("password-create-error");
// input password create
let Passwordinpconfirm = document.getElementById("confirmPassword");
let hidePassConfirm = document.getElementById("hide-confirm");
let eyePassConfirm = document.getElementById("show-confirm");
let ConfirmError = document.getElementById("confirmPassword-error");
// sign up create
let btnCreate = document.getElementById("sign-up-create");

// hide password
hidePass.addEventListener("click", () => {
  Passwordinp.type = "text";
  hidePass.classList.add("visibility");
  eyePass.classList.remove("visibility");
});
eyePass.addEventListener("click", () => {
  Passwordinp.type = "password";
  hidePass.classList.remove("visibility");
  eyePass.classList.add("visibility");
});
hidePassConfirm.addEventListener("click", () => {
  Passwordinpconfirm.type = "text";
  hidePassConfirm.classList.add("visibility");
  eyePassConfirm.classList.remove("visibility");
});
eyePassConfirm.addEventListener("click", () => {
  Passwordinpconfirm.type = "password";
  hidePassConfirm.classList.remove("visibility");
  eyePassConfirm.classList.add("visibility");
});
// validation
const emailRegex =
  /^(?!.*\.\.)(?!.*\.$)(?!^\.)[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

const allowedDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,16}$/;
//none input
[Namecreate, Emailcreate, Passwordinp, Passwordinpconfirm].forEach((input) => {
  input.addEventListener("input", () => {
    document.getElementById(input.id + "-error").innerText = "";
  });
});
btnCreate.addEventListener("click", (e) => {
  e.preventDefault();
  //val Name
  let NameVal = Namecreate.value.trim();
  //val email
  let Emailval = Emailcreate.value.trim();
  let emailCreateVal = Emailval.toLowerCase();
  let domainCreate = emailCreateVal.split("@")[1];
  console.log(emailCreateVal);
  //val password
  let PasswordVal = Passwordinp.value.trim();
  let logCreate = false;
  //val confirm password
  let confirmPasswordVal = Passwordinpconfirm.value.trim();
  // Name val
  if (NameVal.length < 4) {
    Nameerror.innerText = "لازم الاسم يكون 4 حروف على الأقل";
    logCreate = true;
  } else {
    Nameerror.innerText = "";
    logCreate = false;
  }
  // Email val
  if (Emailval == "") {
    Emailerror.innerText = "يرجي ادخال البريد الالكتروني";
    logCreate = true;
  } else if (
    !allowedDomains.includes(domainCreate) ||
    !emailRegex.test(emailCreateVal)
  ) {
    Emailerror.innerText = "البريد الالكتروني غير صحيح";
  } else {
    Emailerror.innerText = "";
  }
  // Password Val
  if (PasswordVal == "") {
    PasswordError.innerText = "يرجي ادخال كلمه المرور";
    logCreate = true;
  } else if (!passwordRegex.test(PasswordVal)) {
    PasswordError.innerText =
      "كلمه المرور لازم تكون من 6 لـ 15 وتحتوي على حروف أو أرقام";
    logCreate = true;
  } else {
    PasswordError.innerText = "";
  }
  // Confirm password
  if (confirmPasswordVal == "") {
    ConfirmError.innerText = "يرجي ادخال كلمه المرور";
    logCreate = true;
  } else if (confirmPasswordVal !== PasswordVal) {
    ConfirmError.innerText = "كلمه المرور غير مطابقه";
    logCreate = true;
  } else {
    ConfirmError.innerText = "";
  }
  if (logCreate) return;
  localStorage.setItem("userName", NameVal);
  localStorage.setItem("userEmail", emailCreateVal);
  localStorage.setItem("userPassword", confirmPasswordVal);
  localStorage.setItem("isLogin", "false");
  alert("تم انشاء الحساب ب نجاح");
});
document.getElementById("pageloginAccount").onclick = () => {
  window.location.href = "login.html";
};
