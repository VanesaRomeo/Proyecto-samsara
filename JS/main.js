const conteinerProduct = document.querySelector(".conteiner-products")
const btnProduct = document.querySelector(".btn-more")
// boton para el carrito
const bootonCart = document.querySelector(".btn-cart")


// boton del conteiner
const cartMenu = document.querySelector(".cart");
// CategoriesContainer
const categoriesContainer = document.querySelector(".categories");
// //HTMLCollection de botones con las categorias
const categoriesList = document.querySelectorAll(".category");
// contenedor productos carrito
const productsCart = document.querySelector(".cart-container");
// Total de precio en el carrito
const total = document.querySelector(".total");
// cart bubble
const cartBubble = document.querySelector(".cart-bubble");
// Modal
const successModal = document.querySelector(".add-modal");
// Boton comprar
const buyBtn = document.querySelector(".btn-buy");
// Boton vaciar carrito
const deleteBtn = document.querySelector(".btn-delete");



// SETEAMOS EL CARRITO, VACIO Y GUARDAMOS EN LOCALSTORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];

const saveCartLocalStorage = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

// para desplegar el menu hamburguesa y carrito
document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.getElementById("menuToggle");
  const sideMenu = document.getElementById("sideMenu");
  const overlay = document.querySelector(".overlay");
  const cartToggle = document.querySelector(".cart-label");
  const cart = document.querySelector(".cart");

  menuToggle.addEventListener("click", function () {
    sideMenu.classList.toggle("open");
    overlay.classList.toggle("active");
  });

  overlay.addEventListener("click", function () {
    sideMenu.classList.remove("open");
    cart.classList.remove("open");
    overlay.classList.remove("active");
  });

  cartToggle.addEventListener("click", function () {
    cart.classList.toggle("open");
    overlay.classList.toggle("active");
  });
});


// mostrar los productos
const mostrarProductos =(Produtos)=>{
    const {id, nombre, precio, imagen} = Produtos
    return `
     <div class="product-conteiner">
          <div class="product">
            <p class="soy-p-product">${nombre}</p>
            <img src="${imagen}" alt="First slide" />
            <div class="product-div">
             <span>$${precio}</span>

            </div>
            <button class="btn-add"
              data-id='${id}'
              data-nombre='${nombre}'
              data-precio='${precio}'
              data-imagen='${imagen}'>Agregar</button>
          </div>
        </div>
    `
}

const cargarProduct = (productos) => {
  conteinerProduct.innerHTML += productos.map(mostrarProductos).join('');
};

//   funcion para el boton de ver mas noticias
const mostrarMas = () => {
  miEstado.comienza += 1;
  const { productos, comienza, limiteDeProduct } = miEstado;
  
  
  if (comienza < limiteDeProduct) {
    cargarProduct(productos[comienza]);
  }
  if (comienza >= limiteDeProduct - 1) {

    btnProduct.classList.add("hidden");
  }
  
}

// CATEGORIASb
// Logica de filtros
const isInactiveFilterBtn = (element) => {
  return (
    element.classList.contains("category") &&
    !element.classList.contains("active")
  );
};

// Cambiar el color de fondo activo
const changeBtnActiveState = (selectedCategory) => {
  const categories = [...categoriesList];
  categoriesList.forEach((categoryBtn) => {
    if (categoryBtn.dataset.category !== selectedCategory) {
      categoryBtn.classList.remove('btnall');
      return;
    }
    categoryBtn.classList.add('btnall');
  });console.log(categoriesList)
};

const changeFilterState = (btn) => {
  miEstado.filtrado = btn.dataset.category;
  changeBtnActiveState(miEstado.filtrado);
  
};

const applyFilter = (e) => {
  if (!isInactiveFilterBtn(e.target)) return;
  changeFilterState(e.target);
  conteinerProduct.innerHTML = "";
  if (miEstado.filtrado) {
    const filteredProducts = productos.filter(
      (product) => product.category === miEstado.filtrado
    );
    cargarProduct(filteredProducts);
    miEstado.comienza= 0;
    return;
  }
  cargarProduct(miEstado.products[0]);
 
}; 



    // armar el carrito
    const createCartProductTemplate = (cartProduct) => {
      const { id, nombre, precio, imagen, quantity } = cartProduct;
      return `
      <div class="cart-item">
              <img src="${imagen}" alt="Nft del carrito" />
              <div class="item-info">
                <h3 class="item-title">${nombre}</h3>
                <span>$${precio}</span>
              
               
              </div>
              <div class="item-handler">
                <span class="quantity-handler down" data-id=${id}>-</span>
                <span class="item-quantity">${quantity}</span>
                <span class="quantity-handler up" data-id=${id}>+</span>
             </div>
       </div>
      `;
    };
    
    const renderCart = () => {
      if (!cart.length) {
        productsCart.innerHTML = `<p class="empty-msg">No hay productos en el carrito</p>`;
        return;
      }
      productsCart.innerHTML = cart.map(createCartProductTemplate).join("");
    };
    
    // Funcion para obtener el total de la compra
    const getCartTotal = () => {
      return cart.reduce((acc, cur) => acc + Number(cur.precio) * cur.quantity, 0);
    };
    
    // Funcion para mostrar el total
    const showCartTotal = () => {
      total.innerHTML = `$${getCartTotal().toFixed(2)}`;
    };
    
    // Funcion para actualizar la burbuja de cantidad
    const renderCartBubble = () => {
      cartBubble.textContent = cart.reduce((acc, cur) => acc + cur.quantity, 0);
    };
    
    // Funcion para habilitar o deshabilitar botones
    const disableBtn = (btn) => {
      if (!cart.length) {
        btn.classList.add("disabled");
      } else {
        btn.classList.remove("disabled");
      }
    };
    
    // Funcion para updatear el estado del carro
    const updateCartState = () => {
      saveCartLocalStorage();
      showCartTotal();
      renderCart();
      renderCartBubble();
      disableBtn(buyBtn)
      disableBtn(deleteBtn)
    };
    
    // Funcion para agregar producto
    const addProduct = ({ target }) => {
      if (!target.classList.contains("btn-add")) return;
      const product = createProductData(target.dataset);
      //Si el producto ya existe en el carrito vamos a agregar una nueva unidad
      if (isExistingProductInCart(product)) {
        addUnitToProduct(product);
        showSuccessModal("Agregaste una nueva unidad");
      } else {
        createCartProduct(product);
        showSuccessModal("Producto agregado");
      }
      updateCartState();
    };
    
    // Funcion para agregar una unidad a un producto que ya tengamos en el carro
    // Recorremos el array del carro y buscamos el producto al que le queremos agregar una unidad
    // Si el producto que le pasamos por parametro es igual al producto que estamos recorriendo, le sumamos uno a la cantidad, si no es igual, devolvemos el producto tal cual
    
    const addUnitToProduct = (product) => {
      cart = cart.map((cartProduct) =>
        cartProduct.id === product.id
          ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
          : cartProduct
      );
    };
    
    // Funcion para crear el objeto del producto
    const createCartProduct = (product) => {
      cart = [...cart, { ...product, quantity: 1 }];
    };
    
    // Funcion para validar si un producto existe en el array de carrito
    const isExistingProductInCart = (product) => {
      return cart.find((item) => item.id === product.id);
    };
    
    const createProductData = (product) => {
      return {
        id: product.id,
        nombre: product.nombre,
        imagen: product.imagen,
        precio: Number(product.precio),
      };
    };
    
    // Funcion para mostrar el modal de compra
    const showSuccessModal = (msg) => {
      successModal.classList.add("active-modal");
      successModal.textContent = msg;
    
      setTimeout(() => {
        successModal.classList.remove("active-modal");
      }, 1500);
    };

// Funcion para manejar el evento + del producto en el carrito
const handlePlusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);
  //  console.log(id)
  //  console.log(existingCartProduct)
  // El find nos va a devolver el OBJETO del id del producto que queremos sumar la cantidad
  addUnitToProduct(existingCartProduct);
};

// Funcion para manejar el evento - del producto en el carrito
const handleMinusBtnEvent = (id) => {
  const existingCartProduct = cart.find((item) => item.id === id);

  if (existingCartProduct.quantity === 1) {
    if (window.confirm("Deseas eliminar el producto?")) {
      removeProductFromCart(existingCartProduct);
    }
    return;
  }

  substractProductUnit(existingCartProduct);
};

// Funcion para restar una unidad al producto
const substractProductUnit = (existingCartProduct) => {
  cart = cart.map((product) => {
    return product.id === existingCartProduct.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

// [1,2,3,4,5]
// 1
// [2,3,4,5]

// Funcion para borar el producto del carro
const removeProductFromCart = (existingCartProduct) => {
  cart = cart.filter((product) => product.id !== existingCartProduct.id);
  updateCartState();
};

// Funcion para manejar la cantidad de los productos en el carro
const handleQuantity = (e) => {
  // console.log(e.target)
  if (e.target.classList.contains("up")) {
    // console.log(e.target.dataset.id)
    handlePlusBtnEvent(e.target.dataset.id);
  } else if (e.target.classList.contains("down")) {
    // console.log(e.target.dataset.id)
    handleMinusBtnEvent(e.target.dataset.id);
  }

  updateCartState();
};

// Funcion para vaciar el carro
const resetCartItems = () => {
  cart = [];
  updateCartState();
};

// Funcion para completar la accion del carrito
const completarCartAction = (confirmMsg, successMsg) => {
  if (!cart.length) return;
  if (window.confirm(confirmMsg)) {
    resetCartItems();
    alert(successMsg);
  }
};

// Funcion para borrar el carro
const deleteCart = () => {
  completarCartAction(
    "Deseas borrar el carrito?",
    "No hay mas productos en el carro"
  );
};

// Funcion para cuando se complete la compra
const completeBuy = () => {
  completarCartAction("Deseas completar tu compra?", "Gracias por tu compra!");
};

// escuchador de eventos
const init = () =>{
  miEstado.comienza = 0; 
  cargarProduct(miEstado.productos[miEstado.comienza]);
    btnProduct.addEventListener("click", mostrarMas)
    categoriesContainer.addEventListener("click", applyFilter);  
document.addEventListener("DOMContentLoaded", renderCart);
document.addEventListener("DOMContentLoaded", showCartTotal);

conteinerProduct.addEventListener("click", addProduct);
productsCart.addEventListener("click", handleQuantity);
deleteBtn.addEventListener("click", deleteCart);
buyBtn.addEventListener("click", completeBuy);
renderCartBubble(cart);
disableBtn(buyBtn)
disableBtn(deleteBtn)
}
init()