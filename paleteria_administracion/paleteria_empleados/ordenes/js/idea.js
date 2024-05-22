window.addEventListener('load', async () => {

/* Se ejecute primero */

    // let url_productos = `http://apicopacabana.com/productos?columnas=id_producto,nombre_producto,descripcion_producto,precio_producto,existencia_producto,img_producto,nombre_tipoproducto&relTablas=tipoproductos&relCampos=producto,tipoproducto`;
    let url_productos = `http://apicopacabana.com/productos?columnas=id_producto,nombre_producto,descripcion_producto,precio_producto,existencia_producto,img_producto,nombre_tipoproducto&relTablas=tipoproductos&relCampos=producto,tipoproducto&linkTo=id_producto&operadorRelTo==&valueTo=1`;

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

    for (let i = 0; i < datoss.length; i++) {
      let tiposA = [];
      let agregablesA = [];
      let quitablesA = [];
      let tamanosA = [];

      const datos = datoss[i];
      try {
        const tiposJSON = await obtenerTipos(datos.id_producto);
        console.log(tiposJSON);
        const tiposText = tiposJSON.map(tipo => `${tipo.nombre_tipo},${tipo.id_tipo},`).join(',')
        console.log("TIPOS A ES", tiposText);

        const agregablesJSON = await obtenerAgregables(datos.id_producto);
        console.log(agregablesJSON);
        const agregablesText = agregablesJSON.map(agregable => `${agregable.nombre_agregable},${agregable.id_agregable},`).join(',')
        console.log("AGREGABLES A ES", agregablesText);

        const quitablesJSON = await obtenerQuitables(datos.id_producto);
        console.log(quitablesJSON);
        const quitablesText = quitablesJSON.map(quitable => `${quitable.nombre_quitable},${quitable.id_quitable},`).join(',')
        console.log("QUITABLES A ES", quitablesText);

        const tamanosJSON = await obtenerTamanos(datos.id_producto);
        console.log("TAMANOS A ES", tamanosA);
        const tamanosText = tamanosJSON.map(tamano => `${tamano.nombre_size},${tamano.id_size},${tamano.precio_size},`).join(',')

        let nuevoItem = document.createElement('div');
        nuevoItem.classList.add('item');
        nuevoItem.dataset.categoria = datos.nombre_tipoproducto;
        nuevoItem.dataset.idProducto = datos.id_producto;
        nuevoItem.dataset.tipo = tiposText.replace(/,,/g, ",");
        nuevoItem.dataset.agregable = agregablesText.replace(/,,/g, ",");
        nuevoItem.dataset.quitable = quitablesText.replace(/,,/g, ",");
        nuevoItem.dataset.size = tamanosText.replace(/,,/g, ",");

        let itemContenido = document.createElement('div');
        itemContenido.classList.add('item-contenido');

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
      } catch (error) {
        console.error("Error al procesar los datos:", error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error Al Procesar los datos",
        });
      }
    }
  } catch (error) {
    console.error("Error al obtener datos:", error);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "Error al obtener datos",
    });
  }
}


 /* Se ejecute despues */

 const grid = new Muuri('.grid', {
    layout: {
        rounding: false
    }
});

    grid.refreshItems().layout();
    console.log("los productos se han cargado")
    let div_loader = document.getElementById('loader-container');
    div_loader.classList.add('loaded');
    document.getElementById('grid').classList.add('imagenes-cargadas');

    // Agregamos los listener de los enlaces para filtrar por categoria.
    const enlaces = document.querySelectorAll('#categorias a');

    enlaces.forEach((elemento) => {
        elemento.addEventListener('click', (evento) => {
            evento.preventDefault();
            enlaces.forEach((enlace) => enlace.classList.remove('activo'));
            evento.target.classList.add('activo');

            const categoria = evento.target.innerHTML.toLowerCase();
            categoria === 'todos' ? grid.filter('[data-categoria]') : grid.filter(`[data-categoria="${categoria}"]`);
        }); 
    });

    //Agregamos listener para las imagenes

    const overlay = document.getElementById('overlay');
    let overlayPantalla = document.getElementById('overlay_opciones_pantalla');
    let overlayOpcionesTipo = document.getElementById('overlay_opciones_tipo');
    let overlayOpcionesAgregable = document.getElementById('overlay_opciones_add');
    let overlayOpcionesQuitable = document.getElementById('overlay_opciones_no');
    let overlayOpcionesSize = document.getElementById('overlay_opciones_size');

    let overlayOpciones =  document.querySelectorAll("#overlay_opciones button");


    document.querySelectorAll('.grid .item button').forEach((elemento) => {
        elemento.addEventListener('click', () => {

            const ruta = elemento.parentNode.querySelector('img.articulo').src;
            const idProducto = elemento.parentNode.parentNode.dataset.idProducto;

        
                if (elemento.parentNode.parentNode.dataset.tipo) {
                    overlayOpcionesTipo.classList.remove("noShow");
                    const tipos = elemento.parentNode.parentNode.dataset.tipo.split(',');
                    tipos.pop();
                    // let tiposAT = tipos[2];
                    html = '';
                    for (let i = 0; i < tipos.length; i+=2) {
                        html += `<button value="${tipos[i+1]}">${tipos[i]}</button>`;
                    }
                    overlayPantalla.innerHTML = html;

                    console.log("TIPOS",tipos);
                }else {
                    overlayOpcionesTipo.classList.add("noShow");
                    overlayPantalla.innerHTML = '';
                }

                if (elemento.parentNode.parentNode.dataset.agregable) {
                    overlayOpcionesAgregable.classList.remove("noShow");
                    const agregables = elemento.parentNode.parentNode.dataset.agregable.split(',');
                    agregables.pop();
                    
                    html = '';
                    for (let i = 0; i < agregables.length; i+=2) {
                        html += `<button value="${agregables[i+1]}">${agregables[i]}</button>`;
                    }
                    overlayPantalla.innerHTML = html;

                    console.log("AGREGABLES",agregables);
                }else{
                    overlayOpcionesAgregable.classList.add("noShow");
                }

                if (elemento.parentNode.parentNode.dataset.quitable) {
                    overlayOpcionesQuitable.classList.remove("noShow");
                    const quitables = elemento.parentNode.parentNode.dataset.quitable.split(',');
                    quitables.pop();
                    html = '';
                    for (let i = 0; i < quitables.length; i+=2) {
                        html += `<button value="${quitables[i+1]}">${quitables[i]}</button>`;
                    }
                    overlayPantalla.innerHTML = html;
                    console.log("QUITABLES",quitables);
                }else {
                    overlayOpcionesQuitable.classList.add("noShow");
                }

                if (elemento.parentNode.parentNode.dataset.size) {
                    overlayOpcionesSize.classList.remove("noShow");
                    const tamanos = elemento.parentNode.parentNode.dataset.size.split(',');
                    tamanos.pop();
                    html = '';
                    for (let i = 0; i < tamanos.length; i+=3) {
                        html += `<button value="${tamanos[i+1]}">${tamanos[i]}</button>`;
                    }
                    overlayPantalla.innerHTML = html;
                    console.log("TAMANOS",tamanos);
                }else {
                    overlayOpcionesSize.classList.add("noShow");
                }
                
                //al hacer click a algun boton de overlay_opciones_pantalla obtener el value de ese boton
                overlayPantalla.addEventListener('click', (evento) => {
                    console.log(evento.target.value);
                });

                overlayOpcionesTipo.addEventListener('click', (evento) => {
                    console.log(evento.target.value);
                });
        
                overlay.classList.add('activo');
                document.querySelector('#overlay .fondo_overlay').src = ruta;
                document.querySelector('#overlay .descripcion').innerHTML = idProducto;
            
        });
    });

                // overlayOpcionesTipo al hacer click en el boton, imprimir el value de ese boton
                overlayOpciones.forEach(boton => {
                    boton.addEventListener('click', function() {
                        // Obtener el valor del botón clickeado
                        const valor = this.value;
                        console.log(valor);
                        // Puedes hacer algo con el valor aquí
    
                        if (valor == 0) {
    
                            this.style.backgroundColor = '#8333bd'; 
                            this.style.color = 'white';
                            overlayOpcionesAgregable.style.backgroundColor = '#f4eafd';
                            overlayOpcionesAgregable.style.color = '#c490f0';
                            overlayOpcionesQuitable.style.backgroundColor = '#f4eafd';
                            overlayOpcionesQuitable.style.color = '#c490f0';
                            overlayOpcionesSize.style.backgroundColor = '#f4eafd';
                            overlayOpcionesSize.style.color = '#c490f0';
                            
                            
                        } else if (valor == 1) {
    
                            this.style.backgroundColor = '#8333bd'; 
                            this.style.color = 'white';
                            overlayOpcionesTipo.style.backgroundColor = '#f4eafd';
                            overlayOpcionesTipo.style.color = '#c490f0';
                            overlayOpcionesQuitable.style.backgroundColor = '#f4eafd';
                            overlayOpcionesQuitable.style.color = '#c490f0';
                            overlayOpcionesSize.style.backgroundColor = '#f4eafd';
                            overlayOpcionesSize.style.color = '#c490f0';
                            
                        } else if (valor == 2) {
    
                            this.style.backgroundColor = '#8333bd'; 
                            this.style.color = 'white';
                            overlayOpcionesAgregable.style.backgroundColor = '#f4eafd';
                            overlayOpcionesAgregable.style.color = '#c490f0';
                            overlayOpcionesTipo.style.backgroundColor = '#f4eafd';
                            overlayOpcionesTipo.style.color = '#c490f0';
                            overlayOpcionesSize.style.backgroundColor = '#f4eafd';
                            overlayOpcionesSize.style.color = '#c490f0';
    
                        } else if (valor == 3) {
    
                            this.style.backgroundColor = '#8333bd'; 
                            this.style.color = 'white';
                            overlayOpcionesAgregable.style.backgroundColor = '#f4eafd';
                            overlayOpcionesAgregable.style.color = '#c490f0';
                            overlayOpcionesQuitable.style.backgroundColor = '#f4eafd';
                            overlayOpcionesQuitable.style.color = '#c490f0';
                            overlayOpcionesTipo.style.backgroundColor = '#f4eafd';
                            overlayOpcionesTipo.style.color = '#c490f0';
                            
                        }
                    });
                });

    // Eventlistener del boton de cerrar
    document.querySelector('#btn-cerrar-popup').addEventListener('click', () => {
        overlay.classList.remove('activo');
    });

    // Eventlistener del overlay
    overlay.addEventListener('click', (evento) => {
        evento.target.id === 'overlay' ? overlay.classList.remove('activo') : '';
    });

});

async function obtenerTipos(idProducto) {
    
    let url_tipos = `http://apicopacabana.com/tipos?columnas=id_tipo,nombre_tipo&relTablas=productos&relCampos=tipo,producto&linkTo=id_producto&operadorRelTo==&valueTo=${idProducto}`;
    let init_tipos = {
        method: "get",
        header: {
            "Content-Type": "application/json",
                },
        };
              
              
        async function solicitarTipos(url, init) {
            const objJSdatos = await fetchSynchronousGET(url, init);
                console.log("------------------");
                console.log(objJSdatos);
              
                let datoss = objJSdatos.datos;
              
                console.log(datoss);
                return datoss;
            };

        return await solicitarTipos(url_tipos, init_tipos);
}

async function obtenerAgregables(idProducto) {
        
        let url_agregables = `http://apicopacabana.com/agregables?columnas=id_agregable,nombre_agregable&relTablas=productos&relCampos=agregable,producto&linkTo=id_producto&operadorRelTo==&valueTo=${idProducto}`;
        let init_agregables = {
            method: "get",
            header: {
                "Content-Type": "application/json",
                    },
            };
                
                
            async function solicitarAgregables(url, init) {
                const objJSdatos = await fetchSynchronousGET(url, init);
                    console.log("------------------");
                    console.log(objJSdatos);
                
                    let datoss = objJSdatos.datos;
                
                    console.log(datoss);
                    return datoss;
                };
    
            return await solicitarAgregables(url_agregables, init_agregables);
    }

async function obtenerQuitables(idProducto) {   
            
            let url_quitables = `http://apicopacabana.com/quitables?columnas=id_quitable,nombre_quitable&relTablas=productos&relCampos=quitable,producto&linkTo=id_producto&operadorRelTo==&valueTo=${idProducto}`;
            let init_quitables = {
                method: "get",
                header: {
                    "Content-Type": "application/json",
                        },
                };
                    
                    
                async function solicitarQuitables(url, init) {
                    const objJSdatos = await fetchSynchronousGET(url, init);
                        console.log("------------------");
                        console.log(objJSdatos);
                    
                        let datoss = objJSdatos.datos;
                    
                        console.log(datoss);
                        return datoss;
                    };
        
                return await solicitarQuitables(url_quitables, init_quitables);
}

async function obtenerTamanos(idProducto) {
                    
                    let url_tamanos = `http://apicopacabana.com/sizes?columnas=id_size,nombre_size,precio_size&relTablas=productos&relCampos=size,producto&linkTo=id_producto&operadorRelTo==&valueTo=${idProducto}`;
                    let init_tamanos = {
                        method: "get",
                        header: {
                            "Content-Type": "application/json",
                                },
                        };
                            
                            
                        async function solicitarTamanos(url, init) {
                            const objJSdatos = await fetchSynchronousGET(url, init);
                                console.log("------------------");
                                console.log(objJSdatos);
                            
                                let datoss = objJSdatos.datos;
                            
                                console.log(datoss);
                                return datoss;
                            };
                
                        return await solicitarTamanos(url_tamanos, init_tamanos);
    }   
