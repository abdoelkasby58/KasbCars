let KasbCars = document.getElementById("KasbCars");
KasbCars.addEventListener("click", () => {
  window.location.assign("index.html");
});
let togglemoodBtn = document.querySelector(".Togglemood");

togglemoodBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  let isDark = document.body.classList.contains("dark");

  localStorage.setItem("theme", isDark ? "dark" : "light");
});
function loadTheme() {
  let theme = localStorage.getItem("theme");

  if (theme === "dark") {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
}

loadTheme();
let CartShopApi = document.querySelector(".cart-shop");

let SidebarCarts = document.querySelector(".side-bar-carts");
let SidebarFav = document.querySelector(".side-bar-fav");
let ConutShop = 20;
let cartItems = [];
let favoriteItems = [];
function loadFromLocal() {
  if (localStorage.itemscart != null) {
    cartItems = JSON.parse(localStorage.itemscart);
  } else {
    cartItems = [];
  }
}
function loadFromLocalFav() {
  if (localStorage.itemsfav != null) {
    favoriteItems = JSON.parse(localStorage.itemsfav);
  } else {
    favoriteItems = [];
  }
}
function SavedLocalStorage() {
  localStorage.setItem("itemscart", JSON.stringify(cartItems));
}
function SavedLocalStorageFav() {
  localStorage.setItem("itemsfav", JSON.stringify(favoriteItems));
}
loadFromLocal();
UpdateSidebar();
loadFromLocalFav();
UpdateFav();

let CartContainerSide = document.querySelector(".side-bar-carts-container");
let FavContainerSide = document.querySelector(".side-bar-fav-container");
let CartShopIcon = document.getElementById("toastcart");
let FavShopIcon = document.getElementById("HeartIcon");
let FavIcon = document.getElementById("HeartIcon");
let CloseRemoveCart = document.querySelector(".tool-icon-remove-carts");
let CloseRemoveFav = document.querySelector(".tool-icon-remove-fav");
console.log(FavContainerSide, CloseRemoveFav);
CloseRemoveCart.addEventListener("click", () => {
  CartContainerSide.classList.remove("active");
});
CloseRemoveFav.addEventListener("click", () => {
  FavContainerSide.classList.remove("active");
});
let MobileCartIcon = document.getElementById("mobile-cart-icon");
let MobileHeartIcon = document.getElementById("mobile-heart-icon");
let MobileUserIcon = document.getElementById("mobile-user-icon");
console.log(CartShopApi);
function MenuToggle() {
  CartShopIcon.addEventListener("click", () => {
    CartContainerSide.classList.toggle("active");
    SidebarFav.classList.remove("active");
  });
  FavShopIcon.addEventListener("click", () => {
    FavContainerSide.classList.toggle("active");
    SidebarCarts.classList.remove("active");
  });
}
MenuToggle();

function addToCart(car) {
  let findItem = cartItems.find((item) => item.id === car.id);
  let isLogin = true;
  let SavedAccount = localStorage.getItem("isLogin");
  if (SavedAccount !== "true") {
    showToast("يرجي انشاء حساب جديد", "error");
    // alert("fgfdg");
    isLogin = false;
  } else {
    showToast("تمت الإضافة إلى السلة", "success");
  }
  if (!isLogin) return;
  if (findItem) {
    findItem.quantity++;
  } else {
    cartItems.push({
      id: car.id,
      brand: car.brand,
      model: car.model,
      type: car.type,
      price: car.price,
      image: car.image,
      quantity: 1,
    });
  }
  updateCartCount();
  SavedLocalStorage();
  UpdateSidebar();
}
function AddToFav(carfav, btn) {
  let findFav = favoriteItems.findIndex((item) => item.id === carfav.id);

  if (findFav !== -1) {
    favoriteItems.splice(findFav, 1);
    showToast("تمت إزالة السيارة من المفضلة", "success");
    btn.style.color = "#fff";
  } else {
    favoriteItems.push(carfav);
    showToast("تمت إضافة السيارة إلى المفضلة", "success");
    btn.style.color = "#ff0000";
  }
  addCartAction();
  SavedLocalStorageFav();
  UpdateFav();
}

function UpdateFav() {
  SidebarFav.innerHTML = "";

  favoriteItems.forEach((item) => {
    let itemElmentFav = document.createElement("div");
    itemElmentFav.classList.add("cart-item");

    itemElmentFav.innerHTML = `
      <img src="${item.image}" alt="${item.brand} ${item.model}" />
      <div class="item-info">
        <h4>${item.brand} ${item.model}</h4>
        <p class="price">$${item.price}</p>
      </div>
      <div class="item-btn>
        <button class="add-to-cart" data-id="${item.id}">Add to Cart</button>
      </div>
    `;

    SidebarFav.appendChild(itemElmentFav);
  });

  syncFavButtons();
}
function AddcartFavButtons() {
  let addcartInfavBtns = document.querySelectorAll(".add-to-cart");
  addcartInfavBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.dataset.id;
      let carToAdd = favoriteItems.find((item) => item.id == id);
      if (carToAdd) {
        addToCart(carToAdd);
      }
    });
  });
}
AddcartFavButtons();
function syncFavButtons() {
  let favBtns = document.querySelectorAll(".fav");
  favBtns.forEach((btn) => {
    let carId = Number(btn.dataset.carId);
    let isFav = favoriteItems.some((item) => item.id === carId);
    btn.style.color = isFav ? "#ff0000" : "#fff";
  });
}
function UpdateSidebar() {
  SidebarCarts.innerHTML = "";
  cartItems.forEach((row) => {
    let itemsElement = document.createElement("div");
    itemsElement.classList.add("cart-item");
    itemsElement.innerHTML += `<img src="${row.image}" alt="${row.brand} ${row.model}" />
     <div class="item-info"> <h4>${row.brand} ${row.model}</h4>
      <p class="price">$${row.price}</p> <div class="quantity-control">
       <button class="decrease" data-id="${row.id}">-</button>
        <span class="quantity">${row.quantity}</span>
         <button class="increase" data-id="${row.id}">+</button>
         </div> </div> <div class="item-total"> $${row.price * row.quantity} </div>
          <button class="remove-btn" data-id="${row.id}">×</button>
    `;

    SidebarCarts.appendChild(itemsElement);
  });

  // footer
  let footerDiv = document.createElement("div");
  footerDiv.classList.add("cart-footer");
  let totAl = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  footerDiv.innerHTML = `
    <div class="total">Total: <span id="cart-total">$${totAl}</span></div>`;
  SidebarCarts.appendChild(footerDiv);

  addCartAction();
  SavedLocalStorage();
  loadFromLocal();
}
//total cart count
let totalCart = document.querySelector(".total-all");
function updateCartCount() {
  let count = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  totalCart.innerText = count;
  localStorage.setItem("cartCount", count);
}
function loadCountCart() {
  let savedCount = localStorage.getItem("cartCount");
  if (savedCount !== null) {
    totalCart.innerText = savedCount;
  }
}
loadCountCart();
// دالة لإضافة event listeners لأزرار الزيادة والنقصان والإزالة
function addCartAction() {
  let decreaseBtn = document.querySelectorAll(".decrease");
  let increaseBtn = document.querySelectorAll(".increase");
  let removeBtn = document.querySelectorAll(".remove-btn");
  decreaseBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.dataset.id;
      let Items = cartItems.find((Items) => Items.id == id);
      if (Items.quantity > 1) {
        Items.quantity--;
      }
      SavedLocalStorage();
      UpdateSidebar();
    });
  });
  increaseBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.dataset.id;
      let Items = cartItems.find((Items) => Items.id == id);

      Items.quantity++;

      SavedLocalStorage();
      UpdateSidebar();
    });
  });
  removeBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      let id = btn.dataset.id;
      cartItems = cartItems.filter((item) => item.id != id);
      SavedLocalStorage();
      UpdateSidebar();
    });
  });
}
// دالة لتحديث إجمالي السعر في السلة
function updateTotal() {
  let items = document.querySelectorAll(".cart-item");
  let total = 0;

  items.forEach((item) => {
    let price = parseFloat(
      item.querySelector(".price").innerText.replace("$", ""),
    );
    let quantity = parseInt(item.querySelector(".quantity").innerText);

    let itemTotal = price * quantity;
    item.querySelector(".item-total").innerText = "$" + itemTotal;

    total += itemTotal;
  });

  let cartTotalElement = document.getElementById("cart-total");
  if (cartTotalElement) {
    cartTotalElement.innerText = "$" + total;
  }
}
// استدعاء دالة تحديث الإجمالي بعد أي تغيير في السلة
function ApiFake() {
  fetch("db/cars.json")
    .then((res) => res.json())
    .then((data) => {
      let cars = data.cars;
      CartShopApi.innerHTML = "";

      for (let i = 0; i < ConutShop; i++) {
        let car = cars[i];
        car.id = i;

        CartShopApi.innerHTML += `
          <div class="car-card" data-car-id="${i}">
            <div class="card-img">
              <img src="${car.image}" />
    
              <span class="fav" data-car-id="${i}">❤</span>
    
            
            </div>
    
            <div class="card-content">
              <h2>${car.brand} ${car.model}</h2>
              <p>${car.type}</p>
    
              <hr />
    
              <div class="card-footer">
                <span class="price">$${car.price}</span>
                <button class="buy-btn" data-car-index="${i}">Add to Cart</button>
              </div>
            </div>
          </div>
        `;
      }

      // إضافة event listeners بعد إنشاء العناصر
      addCartEventListeners(cars);
    });
}
ApiFake();
// دالة إضافة event listeners للأزرار
function addCartEventListeners(cars) {
  let addCartBtns = document.querySelectorAll(".add-cart");
  let buyBtns = document.querySelectorAll(".buy-btn");
  let favBtns = document.querySelectorAll(".fav");

  addCartBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let carIndex = e.target.dataset.carIndex;
      addToCart(cars[carIndex]);
    });
  });

  buyBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let carIndex = e.target.dataset.carIndex;
      addToCart(cars[carIndex]);
    });
  });

  favBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();

      let carId = e.currentTarget.dataset.carId;

      AddToFav(cars[carId], e.currentTarget);
    });
  });

  syncFavButtons();
}
//Language
let LanguageIcon = document.getElementById("Lang-icon");
const translations = {
  en: {
    nav_home: "Home",
    nav_about: "About",
    nav_services: "Services",
    nav_contact: "Contact",
    hero_title: "kasb cars",
    hero_paragraph:
      "Kasb Cars offers distinctive Toyota cars combining quality and high performance",
    hero_button: "learn more",
    about_title: "about toyota",
    about_paragraph: "Kasb Cars offers distinctive Toyota cars",
    about_button: "About to",
    search_placeholder: "search",
    footer_brand: "kasb car",
    footer_tagline: "find your dream car",
    footer_links_title: "Quick Links",
    footer_link_home: "Home",
    footer_link_inventory: "Inventory",
    footer_link_featured: "Featured Cars",
    footer_link_finance: "Finance",
    footer_link_contact: "Contact Us",
    footer_service_title: "Customer Service",
    footer_link_help: "Help & FAQ",
    footer_link_terms: "Terms of Service",
    footer_link_privacy: "Privacy Policy",
    footer_link_support: "Support",
    nav_lang: "Language",
    create_account: "Create Account",
    full_name: "Full Name",
    full_name_placeholder: "Full Name",
    email: "Email",
    email_placeholder: "Email",
    email_login_placeholder: "Enter your email",
    password: "Password",
    confirm_password: "Confirm Password",
    signup_btn: "Sign Up",
    have_account: "Already have an account?",
    login_link: "Login",
    login_title: "Login",
    login_btn: "Login",
    forget_password: "Forgot password?",
    create_new_account: "Create new account",
    forget_title: "Forgot Password?",
    forget_desc: "Enter your email and we’ll send a reset link",
    send_btn: "Send",
    back_login: "Back to login",
    reset_title: "Reset Password",
    new_password: "New Password",
    confirm_btn: "Confirm",
  },
  ar: {
    nav_home: "الرئيسية",
    nav_about: "من نحن",
    nav_services: "الخدمات",
    nav_contact: "تواصل",
    hero_title: "كساب كارز",
    hero_paragraph:
      "كساب كارز تقدم سيارات تويوتا مميزة تجمع بين الجودة والأداء العالي",
    hero_button: "اعرف أكثر",
    about_title: "عن تويوتا",
    about_paragraph: "كساب كارز تقدم سيارات تويوتا مميزة",
    about_button: "تعرف أكثر",
    search_placeholder: "بحث",
    footer_brand: "كساب كار",
    footer_tagline: "اعثر على سيارتك المثالية",
    footer_links_title: "روابط سريعة",
    footer_link_home: "الرئيسية",
    footer_link_inventory: "المخزون",
    footer_link_featured: "سيارات مميزة",
    footer_link_finance: "التمويل",
    footer_link_contact: "تواصل معنا",
    footer_service_title: "خدمة العملاء",
    footer_link_help: "المساعدة والأسئلة",
    footer_link_terms: "شروط الخدمة",
    footer_link_privacy: "سياسة الخصوصية",
    footer_link_support: "الدعم",
    nav_lang: "اللغة",
    create_account: "إنشاء حساب",
    full_name: "الاسم بالكامل",
    full_name_placeholder: "الاسم بالكامل",
    email: "البريد الإلكتروني",
    email_placeholder: "البريد الإلكتروني",
    email_login_placeholder: "أدخل بريدك الإلكتروني",
    password: "كلمة المرور",
    confirm_password: "تأكيد كلمة المرور",
    signup_btn: "إنشاء حساب",
    have_account: "عندك حساب بالفعل؟",
    login_link: "تسجيل الدخول",
    login_title: "تسجيل الدخول",
    login_btn: "دخول",
    forget_password: "هل نسيت كلمة المرور؟",
    create_new_account: "إنشاء حساب جديد",
    forget_title: "نسيت كلمة المرور؟",
    forget_desc: "اكتب بريدك الإلكتروني وهنبعتلك رابط استرجاع",
    send_btn: "إرسال",
    back_login: "رجوع لتسجيل الدخول",
    reset_title: "إعادة تعيين كلمة المرور",
    new_password: "كلمة المرور الجديدة",
    confirm_btn: "تأكيد",
  },
};
let currentLang = localStorage.getItem("lang") || "en";
function setLanguage(lang) {
  currentLang = lang;
  localStorage.setItem("lang", currentLang);
  document.documentElement.lang = currentLang;
  document.documentElement.dir = currentLang === "ar" ? "rtl" : "ltr";
  document.querySelectorAll("[data-lang-key]").forEach((el) => {
    const key = el.dataset.langKey;
    const value = translations[currentLang][key];
    if (!value) return;
    if (
      el.tagName.toLowerCase() === "input" ||
      el.tagName.toLowerCase() === "textarea"
    ) {
      el.placeholder = value;
    } else {
      el.textContent = value;
    }
    if (el.placeholder !== undefined) {
      el.placeholder = translations[currentLang][key];
    } else {
      el.textContent = translations[currentLang][key];
    }
  });
  if (LanguageIcon) {
    const titleText = currentLang === "en" ? "عربي" : "English";
    LanguageIcon.title = titleText;
    LanguageIcon.style.color = currentLang === "en" ? "#222" : "#ff3c3c";
    if (mobileLangIcon) {
      mobileLangIcon.title = titleText;
      mobileLangIcon.style.color = currentLang === "en" ? "#222" : "#ff3c3c";
    }
  }
}
function Togglelang() {
  setLanguage(currentLang === "en" ? "ar" : "en");
}
let mobileLangBtn = document.getElementById("mobile-lang-btn");
let mobileLangIcon = document.getElementById("Lang-icon-res");

if (LanguageIcon) {
  LanguageIcon.addEventListener("click", Togglelang);
}
if (mobileLangBtn) {
  mobileLangBtn.addEventListener("click", Togglelang);
}
if (mobileLangIcon) {
  mobileLangIcon.addEventListener("click", Togglelang);
}

setLanguage(currentLang);

function showToast(massage, type = "success") {
  let toastBox = document.getElementById("toastBox");
  let toast = document.createElement("div");
  toast.classList.add("toastalert");
  toast.innerText = massage;
  toastBox.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
let facebookicon = document.getElementById("facebookicon");
let youtubeicon = document.getElementById("youtubeicon");
let instagramicon = document.getElementById("instagramicon");
let googleicon = document.getElementById("googleicon");
facebookicon.addEventListener("click", () => {
  window.open("https://www.facebook.com/kasbcars", "_blank");
});
youtubeicon.addEventListener("click", () => {
  window.open("https://www.youtube.com/@kasbcars", "_blank");
});
instagramicon.addEventListener("click", () => {
  window.open("https://www.instagram.com/kasbcars/", "_blank");
});
googleicon.addEventListener("click", () => {
  window.open("https://www.google.com/search?q=kasbcars", "_blank");
});

// console.log(PageLoginCreate, PageLoginLogin, PageLoginForget, PageLoginConfirm);
// console.log(LinksForget, LinksCreate, LinksLogin, LinksConfirm);

let PagesLogin = document.querySelector(".login-in-page");
let Loginuser = document.getElementById("icon-userlogin");
let RemoveIconLogin = document.querySelector(".remove-icon-login");
console.log(Loginuser, RemoveIconLogin, PagesLogin);
Loginuser.onclick = () => {
  PagesLogin.classList.remove("activeLog");
};
RemoveIconLogin.onclick = () => {
  PagesLogin.classList.add("activeLog");
};
//Pages Create
//Pages
let PageLoginCreate = document.querySelector(".login-box-create");
let PageLoginLogin = document.querySelector(".login-box-login");
let PageLoginForget = document.querySelector(".login-box-forget");
let PageLoginConfirm = document.querySelector(".login-box-confirm");
//Links
let LinksForget = document.getElementById("pageForgetaccount");
let LinksCreate = document.getElementById("CreateAccount");
let LinksLogin = document.getElementById("pageCreateAccount");
let LinksConfirm = document.getElementById("backpageLogin");
let LinksConfirmLogin = document.getElementById("pageLoginAccount");
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
let hidePassConfirm = document.getElementById("hide-confirm-create");
let eyePassConfirm = document.getElementById("show-confirm-create");
let ConfirmError = document.getElementById("confirmPasswordtwo-error");
// sign up create
let btnCreate = document.getElementById("sign-up-create");
//Links Pages
LinksForget.addEventListener("click", () => {
  PageLoginForget.style.display = "block";
  PageLoginLogin.style.display = "none";
  PageLoginCreate.style.display = "none";
  PageLoginConfirm.style.display = "none";
});
LinksCreate.addEventListener("click", () => {
  PageLoginCreate.style.display = "block";
  PageLoginLogin.style.display = "none";
  PageLoginForget.style.display = "none";
  PageLoginConfirm.style.display = "none";
});
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
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*]{6,16}$/;
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
  PageLoginCreate.style.display = "none";
  PageLoginLogin.style.display = "block";
});
// Login Page
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
  PagesLogin.classList.add("activeLog");
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
// Forget Page
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
  } else if (
    !allowedDomains.includes(Domainforget) ||
    !emailRegex.test(EmailFor)
  ) {
    forgetEmailError.innerText = "يرجي ادخال البريد الالكتروني صحيح";
    Logforget = false;
  } else if (EmailFor !== SavedEmailFoget) {
    forgetEmailError.innerText = "هذا البريد غير مسجل. الرجاء إنشاء حساب أولاً";
    Logforget = false;
  }
  if (!Logforget) return;
  alert("يك هنا والله");
  PageLoginForget.style.display = "none";
  PageLoginConfirm.style.display = "block";
});
// Confirm Page

let NewPassword = document.getElementById("newPassword");
let Newhide = document.getElementById("hide-new");
let NewShow = document.getElementById("show-new");
let NewPasswordError = document.getElementById("newPassword-error");
// Confirm New Password
let ConNewPassword = document.getElementById("confirmPasswordtwo");
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
BtnConfirmpassword.addEventListener("click", () => {
  let PasswordNewValtwo = NewPassword.value.trim();
  let PasswordConVal = ConNewPassword.value.trim();
  let LogPass = true;
  //New Password
  if (PasswordNewValtwo == "") {
    NewPasswordError.innerText = "يرجي ادخال كلمه المرور الجديده";
    LogPass = false;
  } else if (!passwordRegex.test(PasswordNewValtwo) || PasswordNewValtwo < 6) {
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
  } else if (PasswordNewValtwo !== PasswordConVal) {
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
  PageLoginConfirm.style.display = "none";
  PageLoginLogin.style.display = "block";
});

// none value
[NewPassword, ConNewPassword].forEach((input) => {
  input.addEventListener("input", () => {
    document.getElementById(input.id + "-error").innerText = "";
  });
});
//Search
let SearchInput = document.getElementById("SearchCart");
SearchInput.addEventListener("input", () => {
  let query = SearchInput.value.toLowerCase();
  let carCards = document.querySelectorAll(".car-card");
  carCards.forEach((card) => {
    let brand = card.querySelector("h2").innerText.toLowerCase();
    let type = card.querySelector("p").innerText.toLowerCase();
    if (brand.includes(query) || type.includes(query)) {
      card.style.display = "block";
    } else {
      card.style.display = "none";
    }
  });
});
