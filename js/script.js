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

let CartShopIcon = document.getElementById("toast");
let FavIcon = document.getElementById("HeartIcon");
console.log(CartShopApi);
CartShopIcon.addEventListener("click", () => {
  SidebarCarts.classList.toggle("active");
});
FavIcon.addEventListener("click", () => {
  SidebarFav.classList.toggle("active");
});

// document.addEventListener("click", (e) => {
//   if (!SidebarCarts.contains(e.target) && !CartShopIcon.contains(e.target)) {
//     SidebarCarts.classList.remove("active");
//   }
// });
document.addEventListener("click", (e) => {
  if (!SidebarFav.contains(e.target) && !FavIcon.contains(e.target)) {
    SidebarFav.classList.remove("active");
  }
});
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
  SavedLocalStorageFav(); // 👈 هنا بس
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
    `;

    SidebarFav.appendChild(itemElmentFav);
  });

  syncFavButtons();
}

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
      let id = btn.target.dataset.id;
      let Items = cartItems.find((Items) => Items.id == id);
      if (Items.quantity < 1) {
        Items.quantity++;
      }

      SavedLocalStorage();
      UpdateFav();
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
let mobilApp = document.getElementById("mobile-app");
let Menuicon = document.getElementById("tool-icon-menu");
let Removeicon = document.getElementById("tool-icon-remove");
Menuicon.addEventListener("click", () => {
  mobilApp.classList.add("active");
  Menuicon.style.display = "none";
  Removeicon.style.display = "block";
});
Removeicon.addEventListener("click", () => {
  mobilApp.classList.remove("active");
  Removeicon.style.display = "none";
  Menuicon.style.display = "block";
});
Removeicon.style.display = "none";
Menuicon.style.display = "block";
//Language
let LanguageIcon = document.getElementById("Lang-icon");
const Lang = {
  en: {
    text_one: "Abdo Elkasby",
  },
  ar: {
    text_one: "غبدو القصبي",
  },
};
let currentLang = "en";
function Togglelang() {
  currentLang = currentLang === "en" ? "ar" : "en";
  let Langdata = Lang[currentLang];
  Langdata = Lang[key];
}
let SeeAll = document.getElementById("seeAll");
let Loginuser = document.getElementById("icon-userlogin");
// SeeAll.onclick = () => {
//   window.location.href = "cartshop.html";
// };
Loginuser.onclick = () => {
  window.location.href = "login.html";
};
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
