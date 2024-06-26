window.addEventListener("load", async () => {

  // Verificar si el sessionStorage contiene el valor esperado
  if (sessionStorage.getItem('tipoUser') == "cajero" || sessionStorage.getItem('tipoUser') == "admin") {
    // Si el usuario es un cajero, entonces se le permite el acceso a la página

    /* Se ejecute primero */
  let nuevoProducto;
  let url_productos = `http://apicopacabana.com/vw_getProducts?columnas=*`;

  let init_productos = {
    method: "get",
    header: {
      "Content-Type": "application/json",
    },
  };

  try {
    await solicitarProductos(url_productos, init_productos);
  } catch (error) {
    console.error("Error al solicitar productos:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al solicitar productos",
    });
  }

  async function solicitarProductos(url, init) {
    try {
      const objJSdatos = await fetchSynchronousGET(url, init);
      console.log("------------------");
      console.log(objJSdatos);

      let datoss = objJSdatos.datos;
      var contenedor = document.getElementById("grid");

      datoss.forEach((datos) => {

        let tiposText = datos.tipos;
        console.log("TIPOS A ES", tiposText);

        let agregablesText = datos.agregables;
        console.log("AGREGABLES A ES", agregablesText);

        let quitablesText = datos.quitables;
        console.log("QUITABLES A ES", quitablesText);

        let tamanosText = datos.sizes;
        console.log("TAMANOS A ES", tamanosText);

        let nuevoItem = document.createElement("div");
          nuevoItem.classList.add("item");
          nuevoItem.dataset.categoria = datos.nombre_tipoproducto;
          nuevoItem.dataset.idProducto = datos.id_producto;
          nuevoItem.dataset.tipo = (tiposText === null) ? "" : tiposText.replace(/,,/g, ",");
          nuevoItem.dataset.agregable = (agregablesText === null) ? "" : agregablesText.replace(/,,/g, ",");
          nuevoItem.dataset.quitable = (quitablesText === null) ? "" : quitablesText.replace(/,,/g, ",");
          nuevoItem.dataset.size = (tamanosText === null) ? "" : tamanosText.replace(/,,/g, ",");

          let itemContenido = document.createElement("div");
          itemContenido.classList.add("item-contenido");

          itemContenido.innerHTML = `
            <p class="articulo_name">${datos.nombre_producto}</p>
            <p class="articulo_desc">${datos.descripcion_producto}</p>
            <p class="articulo_precio">$ ${datos.precio_producto}</p>
            <button class="articulo_button" id="articulo_button">+</button>
            <img class="articulo" src="${datos.img_producto}" alt="">
            <img class="fondo" src="../../../../assets/images/menu_container.svg" alt="">
        `;

          nuevoItem.appendChild(itemContenido);
          contenedor.appendChild(nuevoItem);

      });  
    } catch (error) {
      console.error("Error al obtener datos:", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al obtener datos",
      });
    }
  }


  /********************************************************************
   *  Una vez que se han cargado los productos, se procede a cargar el grid
   ********************************************************************/
  
  const grid = new Muuri(".grid", {
    layout: {
      rounding: false,
    },
  });

  /********************************************************************
   *  Cuando se carga el grid, se procede a cargar los productos
   ********************************************************************/
  
  grid.refreshItems().layout();
  console.log("los productos se han cargado");
  let div_loader = document.getElementById("loader-container");
  div_loader.classList.add("loaded");
  document.getElementById("grid").classList.add("imagenes-cargadas");
  
 /********************************************************************
  *  Agregamos los listener de los enlaces para filtrar por categoria.
  ********************************************************************/

  const enlaces = document.querySelectorAll("#categorias a");

  enlaces.forEach((elemento) => {
    elemento.addEventListener("click", (evento) => {
      evento.preventDefault();
      enlaces.forEach((enlace) => enlace.classList.remove("activo"));
      evento.target.classList.add("activo");

      const categoria = evento.target.innerHTML.toLowerCase();
      categoria === "todos"
        ? grid.filter("[data-categoria]")
        : grid.filter(`[data-categoria="${categoria}"]`);
    });
  });

 

  /********************************************************************
   *  Traer los id de los botones, si tienen tipos, agregables, quitables o tamaños
   ********************************************************************/

  const overlay = document.getElementById("overlay");
  let buttons_cantidad = document.getElementById('overlay_cantidades_btn').querySelectorAll('button');
  let overlayPantalla = document.getElementById("overlay_opciones_pantalla");
  let overlayOpcionesTipo = document.getElementById("overlay_opciones_tipo");
  let overlayOpcionesAgregable = document.getElementById("overlay_opciones_add");
  let overlayOpcionesQuitable = document.getElementById("overlay_opciones_no");
  let overlayOpcionesSize = document.getElementById("overlay_opciones_size");

  /********************************************************************
   *  Traer los id de los div donde se mostraran los tipos, agregables, quitables o tamaños
   ********************************************************************/

  let overlayPantalla_tipos = document.getElementById("overlay_opciones_pantalla_tipos");
  let overlayPantalla_agregables = document.getElementById("overlay_opciones_pantalla_add");
  let overlayPantalla_quitables = document.getElementById("overlay_opciones_pantalla_no");
  let overlayPantalla_size = document.getElementById("overlay_opciones_pantalla_size");

  let overlayOpciones = document.querySelectorAll("#overlay_opciones button");

  let nameProduct;
  let valor;

  let ordenCreada = false;
  let id_orden, quantity = 1;
  let cantidad_productos;

  let delete_product;
  let isFirstClick;
  /********************************************************************
   *  Overlay cuando se selecciona un producto del menu
   ********************************************************************/
  const orden = new Orden();
  document.querySelectorAll(".grid .item button").forEach((elemento) => {
    elemento.addEventListener("click", () => {
      let ruta = elemento.parentNode.querySelector("img.articulo").src;
      nameProduct = elemento.parentNode.querySelector("p.articulo_name").textContent;
      console.log(nameProduct, "nameProduct");
      let idProducto = elemento.parentNode.parentNode.dataset.idProducto;
      let productoPrecio = elemento.parentNode.querySelector("p.articulo_precio").textContent;
      productoPrecio = productoPrecio.replace("$ ", "");
      productoPrecio = parseFloat(productoPrecio);
      console.log(productoPrecio, "Precio del productoooo");

      //Se inicializa una nueva instancia de la clase Orden
      
      nuevoProducto = {};
      let btnAdd = document.getElementById("addBtn");
      btnAdd.removeAttribute("disabled");

      overlayOpcionesTipo.style.backgroundColor = "#f4eafd";
      overlayOpcionesTipo.style.color = "#c490f0";
      overlayOpcionesAgregable.style.backgroundColor = "#f4eafd";
      overlayOpcionesAgregable.style.color = "#c490f0";
      overlayOpcionesQuitable.style.backgroundColor = "#f4eafd";
      overlayOpcionesQuitable.style.color = "#c490f0";
      overlayOpcionesSize.style.backgroundColor = "#f4eafd";
      overlayOpcionesSize.style.color = "#c490f0";
      overlayPantalla_tipos.classList.add("noShow");
      overlayPantalla_agregables.classList.add("noShow");
      overlayPantalla_quitables.classList.add("noShow");
      overlayPantalla_size.classList.add("noShow");

      if (elemento.parentNode.parentNode.dataset.tipo) {
        overlayOpcionesTipo.classList.remove("noShow");
        const tipos = elemento.parentNode.parentNode.dataset.tipo.split(",");
        tipos.pop();
        // let tiposAT = tipos[2];
        html = "";
        for (let i = 0; i < tipos.length; i += 2) {
          html += `<button value="${tipos[i + 1]}">${tipos[i]}</button>`;
        }
        overlayPantalla_tipos.innerHTML = html;

        console.log("TIPOS", tipos);
      } else {
        overlayOpcionesTipo.classList.add("noShow");
        overlayPantalla_tipos.innerHTML = "";
      }

      if (elemento.parentNode.parentNode.dataset.agregable) {
        overlayOpcionesAgregable.classList.remove("noShow");
        const agregables =
          elemento.parentNode.parentNode.dataset.agregable.split(",");
        agregables.pop();

        html = "";
        for (let i = 0; i < agregables.length; i += 2) {
          html += `<button value="${agregables[i + 1]}">${
            agregables[i]
          }</button>`;
        }
        overlayPantalla_agregables.innerHTML = html;

        console.log("AGREGABLES", agregables);
      } else {
        overlayOpcionesAgregable.classList.add("noShow");
        overlayPantalla_agregables.innerHTML = "";
      }

      if (elemento.parentNode.parentNode.dataset.quitable) {
        overlayOpcionesQuitable.classList.remove("noShow");
        const quitables =
          elemento.parentNode.parentNode.dataset.quitable.split(",");
        quitables.pop();
        html = "";
        for (let i = 0; i < quitables.length; i += 2) {
          html += `<button value="${quitables[i + 1]}">${
            quitables[i]
          }</button>`;
        }
        overlayPantalla_quitables.innerHTML = html;
        console.log("QUITABLES", quitables);
      } else {
        overlayPantalla_quitables.innerHTML = "";
        overlayOpcionesQuitable.classList.add("noShow");
      }

      if (elemento.parentNode.parentNode.dataset.size) {
        overlayOpcionesSize.classList.remove("noShow");
        const tamanos = elemento.parentNode.parentNode.dataset.size.split(",");
        tamanos.pop();
        html = "";
        for (let i = 0; i < tamanos.length; i += 3) {
          html += `<button value="${tamanos[i + 1]}" data-precio="${tamanos[i+2]}">${tamanos[i]}</button>`;
        }
        overlayPantalla_size.innerHTML = html;
        console.log("TAMANOS", tamanos);
      } else {
        overlayPantalla_size.innerHTML = "";
        overlayOpcionesSize.classList.add("noShow");
      }

      overlayPantalla.addEventListener('click', (evento) => {
        console.log(evento.target.value, "lol", "Valor de boton de tipo", valor);
        

        if (valor == 0) {
          nuevoProducto.id_tipo_ordendetalle = evento.target.value;
          handleHabilitarBotonAdd();
          console.log(nuevoProducto);
        } else if (valor == 1) {
          nuevoProducto.id_agregable_ordendetalle = evento.target.value;
          handleHabilitarBotonAdd();
          console.log(nuevoProducto);
        } else if (valor == 2) {
          nuevoProducto.id_quitable_ordendetalle = evento.target.value;
          handleHabilitarBotonAdd();
          console.log(nuevoProducto);
        } else if (valor == 3) {
          nuevoProducto.id_size_ordendetalle = evento.target.value;
          handleHabilitarBotonAdd();
          console.log(nuevoProducto);
        }
  
    });
      

      // overlayOpcionesTipo.addEventListener('click', (evento) => {
      //     console.log(evento.target.value);
      // });

      overlay.classList.add("activo");
      document.querySelector("#overlay .fondo_overlay").src = ruta;
      // document.querySelector('#overlay .descripcion').innerHTML = idProducto;
      //al hacer click a algun boton de overlay_opciones_pantalla obtener el value de ese boton
  
      
      // newProducto = {
      //   name: "NOMBRE TEST",
      //   idProducto: nameProduct,
      //   cantidad: quantity,
      //   extras: "No extras",
      //   precio: 7.99,
      //   imgSrc: "../../../../assets/images/orden_detail.svg",
      //   deleteIconSrc: "../../../../assets/icons/delete_icon.svg"
      // };

      // Agregar producto a la orden
      nuevoProducto = {
        idProducto: idProducto,
        cantidad: 2,
        name: nameProduct,
        extras: "No extras",
        precio: productoPrecio,
        imgSrc: "../../../../assets/images/orden_detail.svg",
        deleteIconSrc: "../../../../assets/icons/delete_icon.svg",
        imgProducto: ruta
      };

      cantidad_productos = '1';  // Valor por defecto
      isFirstClick = true;  // Bandera para el primer clic


    });

  });

  buttons_cantidad.forEach(button => {
    button.addEventListener('dblclick', (event) => {
      if (event.target.value === '0') {
        cantidad_productos = '1';  // Restablecer a valor por defecto
        nuevoProducto.cantidad = cantidad_productos;
        isFirstClick = true;  // Reiniciar la bandera del primer clic
        console.log('Cantidad de productos restablecida:', cantidad_productos);
      }
    });

    button.addEventListener('click', (event) => {
      console.log('Botón clickeado:', event.target.value);
      const value = event.target.value;
        if (isFirstClick) {
          cantidad_productos = value;
          nuevoProducto.cantidad = cantidad_productos;
          console.log('Cantidad de productos:', cantidad_productos);
          isFirstClick = false;
        } else {
          cantidad_productos += value;
          nuevoProducto.cantidad = cantidad_productos;
          console.log('Cantidad de productos:', cantidad_productos);
        }
          console.log('Cantidad de productos:', cantidad_productos);
    });

    
  });

  let cancelarArticulo = document.getElementById("cancelBtn");
  cancelarArticulo.addEventListener("click", () => {
    overlay.classList.remove("activo");
  });

  let addOrder = document.getElementById("addBtn");
  addOrder.addEventListener("click", () => {
    console.log("Agregando producto a la orden", nuevoProducto);
    quantity++;
    orden.agregarProducto(nuevoProducto);
    overlay.classList.remove("activo");
    
  });

  // overlayOpcionesTipo al hacer click en el boton, imprimir el value de ese boton
  overlayOpciones.forEach((boton) => {
    boton.addEventListener("click", function () {
      // Obtener el valor del botón clickeado
      valor = this.value;
      console.log(valor);
      // Puedes hacer algo con el valor aquí

      // Selecciona la opcion de tipos/sabores
      if (valor == 0) {
        this.style.backgroundColor = "#8333bd";
        this.style.color = "white";
        overlayOpcionesAgregable.style.backgroundColor = "#f4eafd";
        overlayOpcionesAgregable.style.color = "#c490f0";
        overlayOpcionesQuitable.style.backgroundColor = "#f4eafd";
        overlayOpcionesQuitable.style.color = "#c490f0";
        overlayOpcionesSize.style.backgroundColor = "#f4eafd";
        overlayOpcionesSize.style.color = "#c490f0";
        overlayPantalla_tipos.classList.remove("noShow");
        overlayPantalla_agregables.classList.add("noShow");
        overlayPantalla_quitables.classList.add("noShow");
        overlayPantalla_size.classList.add("noShow");
        handleHabilitarBotonAdd();
        // Selecciona la opcion de agregables
      } else if (valor == 1) {
        this.style.backgroundColor = "#8333bd";
        this.style.color = "white";
        overlayOpcionesTipo.style.backgroundColor = "#f4eafd";
        overlayOpcionesTipo.style.color = "#c490f0";
        overlayOpcionesQuitable.style.backgroundColor = "#f4eafd";
        overlayOpcionesQuitable.style.color = "#c490f0";
        overlayOpcionesSize.style.backgroundColor = "#f4eafd";
        overlayOpcionesSize.style.color = "#c490f0";
        overlayPantalla_tipos.classList.add("noShow");
        overlayPantalla_agregables.classList.remove("noShow");
        overlayPantalla_quitables.classList.add("noShow");
        overlayPantalla_size.classList.add("noShow");
        handleHabilitarBotonAdd();
        // Selecciona la opcion de quitables
      } else if (valor == 2) {
        this.style.backgroundColor = "#8333bd";
        this.style.color = "white";
        overlayOpcionesAgregable.style.backgroundColor = "#f4eafd";
        overlayOpcionesAgregable.style.color = "#c490f0";
        overlayOpcionesTipo.style.backgroundColor = "#f4eafd";
        overlayOpcionesTipo.style.color = "#c490f0";
        overlayOpcionesSize.style.backgroundColor = "#f4eafd";
        overlayOpcionesSize.style.color = "#c490f0";
        overlayPantalla_tipos.classList.add("noShow");
        overlayPantalla_agregables.classList.add("noShow");
        overlayPantalla_quitables.classList.remove("noShow");
        overlayPantalla_size.classList.add("noShow");
        handleHabilitarBotonAdd();
        // Selecciona la opcion de tamaños
      } else if (valor == 3) {
        this.style.backgroundColor = "#8333bd";
        this.style.color = "white";
        overlayOpcionesAgregable.style.backgroundColor = "#f4eafd";
        overlayOpcionesAgregable.style.color = "#c490f0";
        overlayOpcionesQuitable.style.backgroundColor = "#f4eafd";
        overlayOpcionesQuitable.style.color = "#c490f0";
        overlayOpcionesTipo.style.backgroundColor = "#f4eafd";
        overlayOpcionesTipo.style.color = "#c490f0";
        overlayPantalla_tipos.classList.add("noShow");
        overlayPantalla_agregables.classList.add("noShow");
        overlayPantalla_quitables.classList.add("noShow");
        overlayPantalla_size.classList.remove("noShow");
        handleHabilitarBotonAdd();
      }
    });

  });

  // Eventlistener del boton de cerrar
  document.querySelector("#btn-cerrar-popup").addEventListener("click", () => {
    overlay.classList.remove("activo");
  });

  // Eventlistener del overlay
  overlay.addEventListener("click", (evento) => {
    evento.target.id === "overlay" ? overlay.classList.remove("activo") : "";
  });

  function handleHabilitarBotonAdd() {
    //button.setAttribute('disabled', 'true');
    // button.removeAttribute("disabled");
    let btnAdd = document.getElementById("addBtn");
  
    if (
      nuevoProducto.id_tipo_ordendetalle != null ||
      nuevoProducto.id_agregable_ordendetalle != null ||
      nuevoProducto.id_quitable_ordendetalle != null ||
      nuevoProducto.id_size_ordendetalle != null
    ) {
      // Itera sobre cada botón y quita el atributo 'disabled'
      btnAdd.removeAttribute("disabled");
    } else {
      btnAdd.setAttribute("disabled", "true");
    }
  }

  let deleteAll = document.getElementById("orden_cancelar");
  deleteAll.addEventListener("click", () => {
    console.log("Eliminando todos los productos de la orden");
    orden.eliminarTodosProductos();
  });


  
  } else {
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Parece ser que no tienes acceso a esta página!",
      footer: 'Regresando al login...',
      showConfirmButton: false,
      backdrop: `rgba(2, 2, 2, 1)`,
      timer: 8000,
      timerProgressBar: true,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    setTimeout(function() {
      window.location.href = '../../../pages/index.php';
      // Limpiar todo el sessionStorage
      sessionStorage.clear();
    }, 8000);
  }

});



