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
//************************************************* */

// the id of the body
let page = document.body.id;

//
switch (page) {
  // product-detail page
  case "p-d":
    // get the main image
    let mainImg = document.querySelector(".main-product img");
    mainImg.setAttribute("src", window.localStorage.getItem("src"));
    //get secondery image
    let allSeImg = [
      ...document.querySelectorAll(".main-product .secondary .se-img"),
    ];
    // the first image in the secondary is the same in main
    allSeImg[0].src = window.localStorage.getItem("src");

    // go through the images and change the src of the main image
    allSeImg.forEach((img) => {
      // click event on images
      img.addEventListener("click", (e) => {
        // set on the storage the src of the chosen image
        window.localStorage.setItem("src", e.target.getAttribute("src"));
        mainImg.src = window.localStorage.getItem("src");
      });
    });
    /**************************************************** */
    // select the button add to cart
    let btnCart = document.querySelector("#btnCart");
    // select the input number
    let quantProduct = document.querySelector("input[type=number]");

    // click on the button event
    btnCart.addEventListener("click", () => {
      // if the storage empty get an empty array if not get the product array
      var productList = JSON.parse(localStorage.getItem("productList") || "[]");
      // check if the user select quantity more than zero
      if (quantProduct.value > 0) {
        // object has the src and the quantity when the user click on the btn push the object in the array
        let newProduct = {
          src: mainImg.getAttribute("src"),
          quantProduct: quantProduct.value,
        };
        // push the info of product into product array
        productList.push(newProduct);
        // store the product array into local
        window.localStorage.setItem("productList", JSON.stringify(productList));
        //
        // popup section
        // popup div
        let popupUser = document.createElement("div");
        popupUser.className = "popup-user";
        //popup icon
        let popupIcon = document.createElement("i");
        popupIcon.className = "fa-sharp fa-regular fa-circle-check";
        // popup content
        let popupMsg = document.createElement("p");
        popupMsg.className = "popupMsg";
        popupMsg.innerHTML = "You Have Succesfully Add To The Cart";
        // append
        popupUser.appendChild(popupIcon);
        popupUser.appendChild(popupMsg);
        document.body.appendChild(popupUser);
        //
        // setTimeout(() => {
        //   popupUser.style.left = "20px";
        // }, 1500);
        // //
        // setTimeout(() => {
        //   popupUser.style.left = "-442px";
        // }, 3000);
      }
    });
    break;
  case "cart":
    // cart page
    /***************************** */
    // function that control the cart page
    function productCrt() {
      //  if the storage empty get an empty array if not get the product array
      var productList = JSON.parse(localStorage.getItem("productList") || "[]");
      // select all rows
      let rowT = document.querySelectorAll(".cart .container .row");
      // cleat the row
      rowT[1].innerHTML = "";
      //go through the product array
      for (let i = 0; i < productList.length; i++) {
        // each product
        var product = productList[i];
        // create elements
        // column 1
        let iconRemove = document.createElement("i");
        iconRemove.className = "fa-solid fa-ban";
        // column 2
        let imgProduct = document.createElement("img");
        imgProduct.src = product.src;
        // column 3
        let nameProduct = document.createElement("p");
        nameProduct.innerHTML = "Carton Astronout T-shirts";
        // column 4
        let priceProduct = document.createElement("p");
        priceProduct.innerHTML = "$98.00";
        // column 5
        let quantitySelected = document.createElement("p");
        quantitySelected.innerHTML = product.quantProduct;
        // column 6
        let subtotal = document.createElement("p");
        subtotal.innerHTML =
          "$" +
          Number(priceProduct.innerHTML.slice(1)) *
            Number(product.quantProduct) +
          ".00";
        //  create ul
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
        // appand rows in the cart page
        liZero.appendChild(iconRemove);
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

      // call the remove function
      remove();
      //
      // here the message id appear when the user hasn't select yet
      if (rowT[1].innerHTML === "") {
        // create div
        let nothingSelected = document.createElement("div");
        nothingSelected.className = "nothing-selected";
        // create p
        let paragaphNothing = document.createElement("p");
        paragaphNothing.className = "paragaph-selected";
        paragaphNothing.innerHTML = "You Don't Select Any Product Yet";
        // appande to the div then to the row
        nothingSelected.appendChild(paragaphNothing);
        rowT[1].appendChild(nothingSelected);
      }
    }
    productCrt();

    // remove function
    function remove() {
      // select all rows
      let rowT = document.querySelectorAll(".cart .container .row");
      /*************coupon section******** */
      // select the subtotal of the cart
      let cartSubtotal = document.querySelector(
        ".coupon .container .total ul .money"
      );
      // select the total
      let total = document.querySelector(
        ".coupon .container .total ul .fin-tot-mon"
      );
      // create an array to push insid it the quantiti that the user selected
      let cartSubtotalQuant = [];
      /*************the remove function start here******** */
      //  if the storage empty get an empty array if not get the product array
      let productList = JSON.parse(
        window.localStorage.getItem("productList") || "[]"
      );
      // select all the icans remove
      let icons = document.querySelectorAll(".fa-ban");
      // go through the product array
      for (let i = 0; i < productList.length; i++) {
        // catch product one by one
        let product = productList[i];
        // push insid the array the quantity that the user selected
        cartSubtotalQuant.push(parseInt(product.quantProduct));
        // add all the quantity
        let reduceCartSubtotalQuant = cartSubtotalQuant.reduce((el, ne) => {
          return el + ne;
        });
        // display the result in the page
        cartSubtotal.innerHTML = `$${reduceCartSubtotalQuant * 98}.00`;
        total.innerHTML = `$${reduceCartSubtotalQuant * 98}.00`;
        //
        // click event on the icon
        icons[i].addEventListener("click", (e) => {
          // find the index of the product that i have click on it
          let index = productList.indexOf(product);
          // if the product exict removet from the array
          if (index != -1) {
            productList.splice(index, 1);
            // SET in the local the new value of the product array
            window.localStorage.setItem(
              "productList",
              JSON.stringify(productList)
            );
            // remove the ul (the holder of the row)
            e.target.parentNode.parentNode.remove();
            //
            // remove from the array of quantity the number of the product that i have deleted
            cartSubtotalQuant.splice(index, 1);
            // reduce the new array (becaus i delet a product or more)
            if (cartSubtotalQuant.length > 0) {
              reduceCartSubtotalQuant = cartSubtotalQuant.reduce((el, ne) => {
                return el + ne;
              });
              // display again the new resault
              cartSubtotal.innerHTML = `$${reduceCartSubtotalQuant * 98}.00`;
              total.innerHTML = `$${reduceCartSubtotalQuant * 98}.00`;
              // if the length of the array equal to zero display 0
            } else if (cartSubtotalQuant.length == 0) {
              cartSubtotal.innerHTML = "0";
              total.innerHTML = "0";
              //
              // here the message is sent when the user delet all the product in the cart
              if (rowT[1].innerHTML === "") {
                // create div
                let nothingSelected = document.createElement("div");
                nothingSelected.className = "nothing-selected";
                // create p
                let paragaphNothing = document.createElement("p");
                paragaphNothing.className = "paragaph-selected";
                paragaphNothing.innerHTML = "You Don't Select Any Product Yet";
                // appande to the div then to the row
                nothingSelected.appendChild(paragaphNothing);
                rowT[1].appendChild(nothingSelected);
              }
            }
          }
        });
      }
    }

    // if the storage change call the productCrt function
    window.addEventListener("storage", function (event) {
      if (event.key === "productList") {
        productCrt();
      }
    });

    break;
}
