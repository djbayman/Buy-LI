// select all image in the page
let allHomePage = document.querySelectorAll(".box-col img");

// go through images and click on them
allHomePage.forEach((img) => {
  img.addEventListener("click", (e) => {
    // put the src of the current img in varibale
    let sourc = e.target.getAttribute("src");
    // set value on local storage
    window.localStorage.setItem("src", sourc);
    // go to product-detail page
    window.open("/products-detail.html", "_blank");
  });
});

/* gallery section*/
// get the main image
let mainImg = document.querySelector(".main-product img");

//get secondery image
let allSeImg = [
  ...document.querySelectorAll(".main-product .secondary .se-img"),
];

// go through the images and change the src of the main image
allSeImg.forEach((img) => {
  img.addEventListener("click", (e) => {
    mainImg.src = e.target.getAttribute("src");
    window.localStorage.setItem("src", e.target.getAttribute("src"));
  });
});
/*********************************** */
// add to the cart
// select the input number
let quantProduct = document.querySelector("input[type=number]");
// select the button add to cart
let btnCart = document.querySelector("#btnCart");
// select all rows
let rowT = document.querySelectorAll(".cart .container .row");
// // column 1
let iconRemove = document.createElement("i");
iconRemove.className = "fa-solid fa-ban";
// get the src value from local storage
let srcMainImage = window.localStorage.getItem("src");
// get id of pages
let page = document.body.id;
// varibale to send him to localstorage
let numClick = 1;
//  control pages
switch (page) {
  /***********p-d page************* */
  case "p-d":
    // set the current image on the page
    mainImg.setAttribute("src", srcMainImage);
    // set the first secondary image
    allSeImg[0].setAttribute("src", srcMainImage);
    // click event on btnCart
    btnCart.onclick = () => {
      // set on the storage the quantity
      window.localStorage.setItem("quantity", quantProduct.value);
      // check if the quantity in the localstorage big or less than zero
      if (window.localStorage.getItem("quantity") <= 0) {
      } else if (window.localStorage.getItem("quantity") > 0) {
        // set on the storage allowed to the cart to display
        window.localStorage.setItem("addOnTheCart", "true");
        // repeat setting the src and the quantity of the selected products in localstorage
        for (let i = 0; i < numClick; i++) {
          window.localStorage.setItem(
            `src${i}`,
            window.localStorage.getItem(`src${i}`) === null
              ? window.localStorage.getItem(`src`)
              : window.localStorage.getItem(`src${i}`)
          );
          window.localStorage.setItem(
            `quantity${i}`,
            window.localStorage.getItem(`quantity${i}`) === null
              ? window.localStorage.getItem(`quantity`)
              : window.localStorage.getItem(`quantity${i}`)
          );
        }
        // set on localstorage the clicks
        window.localStorage.setItem("numClick", numClick++);
      }
    };
    break;
  /***********cart page************* */
  case "cart":
    // get the number of clicks from lS
    let numbClick = window.localStorage.getItem("numClick");
    // check if the butoon clicked and the quantity greater than zero
    if (
      window.localStorage.getItem("addOnTheCart") &&
      window.localStorage.getItem("quantity") > 0
    ) {
      // loop and repeat the operation numbclick times
      for (let i = 0; i < Number(numbClick); i++) {
        //
        // create ul
        let ul = document.createElement("ul");
        ul.className = "row-body";
        // create li
        let liZero = document.createElement("li");
        let liOne = document.createElement("li");
        let liTow = document.createElement("li");
        liTow.className = "name-pr";
        let liThree = document.createElement("li");
        let liFour = document.createElement("li");
        let liFive = document.createElement("li");

        // column 2
        let imgProduct = document.createElement("img");
        // column 3
        let nameProduct = document.createElement("p");
        nameProduct.innerHTML = "Carton Astronout T-shirts";
        // column 4
        let priceProduct = document.createElement("p");
        priceProduct.innerHTML = "$98.00";
        // column 5
        let quantitySelected = document.createElement("input");
        quantitySelected.setAttribute("type", "number");
        quantitySelected.setAttribute("min", "0");
        // column 6
        let subtotal = document.createElement("p");

        // /***************** */
        // set the main img by the img that in ls
        imgProduct.src =
          window.localStorage.getItem(`src${i}`) === null
            ? window.localStorage.getItem(`src`)
            : window.localStorage.getItem(`src${i}`);
        // img alt
        imgProduct.alt = "";
        // set the quantity in cart row by the value in ls
        quantitySelected.setAttribute(
          "value",
          window.localStorage.getItem(`quantity${i}`)
        );
        //  global what you buy
        subtotal.innerHTML =
          "$" +
          Number(priceProduct.innerHTML.slice(1)) *
            Number(window.localStorage.getItem(`quantity${i}`)) +
          ".00";
        // appand rows in the cart page
        liZero.appendChild(iconRemove.cloneNode(true));
        liOne.appendChild(imgProduct);
        liTow.appendChild(nameProduct);
        liThree.appendChild(priceProduct);
        liFour.appendChild(quantitySelected);
        liFive.appendChild(subtotal);
        //appande li to ul
        ul.appendChild(liZero);
        ul.appendChild(liOne);
        ul.appendChild(liTow);
        ul.appendChild(liThree);
        ul.appendChild(liFour);
        ul.appendChild(liFive);
        //appand ul to the div row 2
        rowT[1].appendChild(ul);
      }
      break;
    }
}
/************************************************* */
// let price =
//   event.target.parentElement.parentElement.nextElementSibling
//   .children[0].children[1].textContent;

//         let finalPrice = price.slice(1).trim();
//         item.price = finalPrice;
//         console.log(finalPrice);
//         console.log(item);

//         const cartItem = document.createElement('div')
//         cartItem.classList.add('cart-item', 'd-flex', 'justify-content-between', 'text-capitalize', 'my-3');

//         cartItem.innerHTML =
// `<img src = "${item.img}" class="img-fluid rounded-circle" id="item-img" alt="" />
// <div class="item-text">
//   <p id="cart-item-title" class="font-weight-bold mb-0">${item.name}</p>
//   <span>£ </span>
//   <span id="cart-item-price" class="cart-item-price mb-0">${item.price}</span>
// </div>
// <a href="#" id="cart-item-remove" class="cart-item-remove">
// <i class="fas fa-trash"></i></a>`;

//         //select cart
//         const cart = document.getElementById('cart');
//         const total = document.querySelector('.cart-total-container');
//         cart.insertBefore(cartItem, total);
//         alert('item added to the cart')

// {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta2/css/all.min.css" integrity="sha512-YWzhKL2whUzgiheMoBFwW8CKV4qpHQAEuvilg9FAn5VJUDwKZZxkJNuGM4XkWuk94WCrrwslk8yWNGmY1EduTA==" crossorigin="anonymous" referrerpolicy="no-referrer" /> */}

// {/* <a id="cart-info" href="javascript:;">Toggle Cart</a> */}

// <!--cart-->
