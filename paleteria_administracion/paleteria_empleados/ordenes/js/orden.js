 // Clase para gestionar la orden
  class Orden {
    constructor() {
      this.productos = [];
      this.ordenDetalle = document.querySelector(".orden_detalle");
    
      this.ordenDetalle.addEventListener("click", (event) => {
        if (event.target && event.target.matches(".articulo_btn img")) {
            const button = event.target.closest(".articulo_btn");
            const index = button.dataset.index;
            console.log("Eliminando producto de la orden");
            console.log("INDEX", index);
            this.eliminarProducto(index);
        }
    });
    }

    agregarProducto(producto) {
      this.productos.push(producto);
      this.actualizarVista();
      this.actualizarTotal();
    }

    eliminarProducto(index) {
      this.productos.splice(index, 1);
      this.actualizarVista();
      this.actualizarTotal();
    }

    eliminarTodosProductos() {
      this.productos = [];
      this.actualizarVista();
      this.actualizarTotal();
    }

    actualizarVista() {
      const ordenDetalle = this.ordenDetalle;
      console.log('Entro a la funcion actualizarVista');
      ordenDetalle.innerHTML = "";
      this.productos.forEach((producto, index) => {
        console.log(producto.precio, 'Precio del producto');
        console.log('Entro al foreach');
        const productDiv = document.createElement("div");
        productDiv.classList.add("orden_detalle_articulo");
        productDiv.innerHTML = `
          <p class="articulo_name">${producto.name}</p>
          <p class="articulo_cantidad">x<span>${producto.cantidad}</span></p>
          <p class="articulo_extras activo">${producto.extras}</p>
          <button class="articulo_btn" id="delete_articulo_btn" data-index="${index}"><img src="${
          producto.deleteIconSrc
        }" alt=""></button>
          <img class="articulo_img" src="${producto.imgProducto}" alt="">
          <p class="articulo_total">$<span>${producto.precio.toFixed(
            2
          )}</span></p>
          <img src="${producto.imgSrc}" alt="">
        `;
        ordenDetalle.appendChild(productDiv);
      });
      
    }

    /*
    delete_product = document.getElementById("delete_articulo_btn");
      if (typeof delete_product !== "undefined" && delete_product !== null) {
        delete_product.addEventListener("click", () => {
            console.log("Eliminando producto de la orden");
            console.log("INDEX", delete_product.dataset.index);
        });
    } 
    */

    actualizarTotal() {
      const total = this.productos.reduce(
        (acc, producto) => acc + (producto.precio * producto.cantidad),
        0
      );
      document.querySelector(".orden_total span").textContent =
        total.toFixed(2);
    }

    obtenerProductos() {
      return this.productos;
    }
  }

