/*****************************************************
 *        ACCIONES CUANDO SE CARGUE LA PÁGINA        *
 *****************************************************/

window.addEventListener("load", function () {


  /*****************************************************
   *            Traernos Todos los productos           *
   *****************************************************/

  let url_productos = `http://apicopacabana.com/productos?columnas=id_producto,nombre_producto,descripcion_producto,precio_producto,existencia_producto,img_producto,nombre_tipoproducto&relTablas=tipoproductos&relCampos=producto,tipoproducto`;

  let init_productos = {
    method: "get",
    header: {
      "Content-Type": "application/json",
    },
  };

  solicitarProductos(url_productos, init_productos);

  async function solicitarProductos(url, init) {
    const objJSdatos = await fetchSynchronousGET(url, init);

    console.log("------------------");
    console.log(objJSdatos);

    let datoss = objJSdatos.datos;
    var contenedor = document.getElementById("grid");

    console.log(datoss);

    datoss.forEach((datos) => {
        let nuevoItem = document.createElement('div');
        nuevoItem.classList.add('item');
        nuevoItem.dataset.categoria = datos.nombre_tipoproducto;
        nuevoItem.dataset.idProducto = datos.id_producto;
  
        let itemContenido = document.createElement('div');
        itemContenido.classList.add('item-contenido');
  
        itemContenido.innerHTML = `
          <p class="articulo_name">${datos.nombre_producto}</p>
          <p class="articulo_desc">${datos.descripcion_producto}</p>
          <p class="articulo_precio">${datos.precio_producto}</p>
          <button class="articulo_button" id="articulo_button">+</button>
          <img class="articulo" src="${datos.img_producto}" alt="">
          <img class="fondo" src="../../../../assets/images/menu_container.svg" alt="">
        `;
  
        nuevoItem.appendChild(itemContenido);
        contenedor.appendChild(nuevoItem);
    });
  };
  cargarMenu();
});
