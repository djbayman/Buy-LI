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
      // if the storage empty get an empty array if not get the array
      var productList = JSON.parse(localStorage.getItem("productList") || "[]");
      // check if the user select quantity more than zero
      if (quantProduct.value > 0) {
        // object has the src and the quantity when the user click on the btn push the object in the array
        let newProduct = {
          src: window.localStorage.getItem("src"),
          quantProduct: quantProduct.value,
        };
        // push the info of product into product array
        productList.push(newProduct);
        // store the product array into local
        window.localStorage.setItem("productList", JSON.stringify(productList));
      }
    });
    break;
  case "cart":
    // cart page
    /***************************** */
    // function that control the cart page
    function productCrt() {
      // cart page
      var productList = JSON.parse(localStorage.getItem("productList") || "[]");
      // select all rows
      let rowT = document.querySelectorAll(".cart .container .row");
      // cleat the row
      rowT[1].innerHTML = "";
      //
      for (let i = 0; i < productList.length; i++) {
        //
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
        let quantitySelected = document.createElement("input");
        quantitySelected.setAttribute("type", "number");
        quantitySelected.setAttribute("min", "0");
        quantitySelected.setAttribute("value", product.quantProduct);
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
        // remove the product
        document.querySelectorAll(".fa-ban").forEach((icon, index) => {
          /**** that's the bug
           * *** when i click on remove button
           * **** the array in the local storage delet
           * ***** but when the array stay in it two element (product)
           * ******* they dont deleted
           * ********* so when i reload the page it appears
           * **************************************** */
          icon.onclick = (e) => {
            // remove the ul
            e.target.parentElement.parentElement.remove();
            //delet from the array the info of the product from the local
            productList.splice(index, 1);
            // set on the storge the new array
            window.localStorage.setItem(
              "productList",
              JSON.stringify(productList)
            );
          };
        });
      }
    }
    productCrt();
    // if the storage change call the productCrt function
    window.addEventListener("storage", function (event) {
      if (event.key === "productList") {
        productCrt();
      }
    });
    break;
}
