let Emailforget = document.getElementById("forget-email");
let forgetEmailError = document.getElementById("forget-email-error");
let btnEmailForget = document.getElementById("btnemailforget");

Emailforget.addEventListener("click", () => {
  forgetEmailError.innerText = "";
});
//validation email Forget
btnEmailForget.addEventListener("click", (e) => {
  e.preventDefault();
  const emailRegex =
    /^(?!.*\.\.)(?!.*\.$)(?!^\.)[a-zA-Z0-9]+([._-]?[a-zA-Z0-9]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;

  const allowedDomains = [
    "gmail.com",
    "yahoo.com",
    "hotmail.com",
    "outlook.com",
  ];

  let EmailForgetVal = Emailforget.value.trim();
  let EmailFor = EmailForgetVal.toLowerCase();
  let Domainforget = EmailFor.split("@")[1];
  // saved local storage
  let SavedEmailFoget = localStorage.getItem("userEmail");
  let Logforget = true;
  if (EmailFor == "") {
    forgetEmailError.innerText = "يرجي ادخال البريد الالكتروني";
    Logforget = false;
  } else if (!allowedDomains.includes(Domainforget) || !emailRegex.test(EmailFor)) {
    forgetEmailError.innerText = "يرجي ادخال البريد الالكتروني صحيح";
    Logforget = false;
  } else if (EmailFor !== SavedEmailFoget) {
    forgetEmailError.innerText = "هذا البريد غير مسجل. الرجاء إنشاء حساب أولاً";
    Logforget = false;
  }
  if (!Logforget) return;
  alert("يك هنا والله");
  window.location.href = "confirmpassword.html"
});
document.getElementById("backpageLogin").onclick = ()=>{
    window.location.href = "login.html"
}
document.getElementById("pageCreateAccount").onclick = ()=>{
    window.location.href = "confirmpassword.html"
}
