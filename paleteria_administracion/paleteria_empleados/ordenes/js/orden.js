 // Clase para gestionar la orden
  class Orden {
    constructor() {
      this.productos = [];
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

    actualizarVista() {
      ordenDetalle.innerHTML = "";
      this.productos.forEach((producto, index) => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("orden_detalle_articulo");
        productDiv.innerHTML = `
          <p class="articulo_name">${producto.name}</p>
          <p class="articulo_cantidad">x<span>${producto.cantidad}</span></p>
          <p class="articulo_extras activo">${producto.extras}</p>
          <button class="articulo_btn" data-index="${index}"><img src="${
          producto.deleteIconSrc
        }" alt=""></button>
          <p class="articulo_total">$<span>${producto.precio.toFixed(
            2
          )}</span></p>
          <img src="${producto.imgSrc}" alt="">
        `;
        ordenDetalle.appendChild(productDiv);
      });
    }

    actualizarTotal() {
      const total = this.productos.reduce(
        (acc, producto) => acc + producto.precio,
        0
      );
      document.querySelector(".orden_total span").textContent =
        total.toFixed(2);
    }

    obtenerProductos() {
      return this.productos;
    }
  }

