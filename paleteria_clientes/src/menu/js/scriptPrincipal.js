    async function obtenerdatos(url, init){
    const objJSdatos = await fetchSynchronousGET(url, init);
    desplegarInformacionTendencias(objJSdatos);
    desplegarInformacionBebidas(objJSdatos);
    desplegarInformacionComidas(objJSdatos);
    desplegarInformacionPostres(objJSdatos);
    document.body.style.overflowY = 'scroll';
    }
    function desplegarInformacionTendencias(objJSdatos){ 
    let estatus     = objJSdatos.status;
	//let datos     = objJSdatos['datos']; //Con comillas
	let datos       = objJSdatos.datos; //Sin comillas
	let titulo      = objJSdatos.titulo;
	let msj_request = objJSdatos.mensaje;
    if(estatus == 200){
        let tendencias = document.getElementById("Tendencias");
        let total = datos.length;
        let tendencia = [];
        let ventasDeCadaProducto = [];
        datos.forEach(dato => {
            ventasDeCadaProducto.push(dato.vendidos_producto);
        });
        tendencia = obtenerCincoMasVendidos(ventasDeCadaProducto);
        datos.forEach(dato => {
            for (let index = 0; index < tendencia.length; index++) {
                if(dato.vendidos_producto == tendencia[index]){
                    tendencias.innerHTML += `
                    <article class="card">
                    <div class="product-buttons">
                    <button class="add-to-cart" data-product="${dato.descripcion_producto}" data-price="${dato.precio_producto}" onclick="addToCart(this)">
                    <i class="fas fa-cart-plus">
                    </i></button>
                    </div>
                    <div class="product-image">
                    <img src="${dato.img_producto}" alt="${dato.descripcion_producto}">
                    </div>
                    <div class="product-name">
                        ${dato.descripcion_producto}</div>
                    <div class="product-price">
                        $${dato.precio_producto}</div>
                    </article>
                    `;
                    console.log("Producto añadido correctamente: " + dato);
                    index = tendencia.length;
                }
                else{
                    console.log("Producto no es tendencia " + dato);
                }
                
            }

        });
    }else{
        console.log("Estatus: " + estatus);
    }
}
function desplegarInformacionBebidas(objJSdatos){ 
    let estatus     = objJSdatos.status;
	//let datos     = objJSdatos['datos']; //Con comillas
	let datos       = objJSdatos.datos; //Sin comillas
	let titulo      = objJSdatos.titulo;
	let msj_request = objJSdatos.mensaje; 
    if(estatus == 200){
        let bebidas = document.getElementById("Bebidas");
        let total = datos.length;
        datos.forEach(dato => {
                if(dato.tipo_producto == "Bebida"){
                    bebidas.innerHTML += `
                    <article class="card">
                    <div class="product-buttons">
                    <button class="add-to-cart" data-product="${dato.descripcion_producto}" data-price="${dato.precio_producto}" onclick="addToCart(this)">
                    <i class="fas fa-cart-plus">
                    </i></button>
                    </div>
                    <div class="product-image">
                    <img src="${dato.img_producto}" alt="${dato.descripcion_producto}">
                    </div>
                    <div class="product-name">
                        ${dato.descripcion_producto}</div>
                    <div class="product-price">
                        $${dato.precio_producto}</div>
                    </article>
                    `;
                    console.log("Producto añadido correctamente: " + dato);
                }
                else{
                    console.log("Producto no es Bebida " + dato);
                }
        });
    }else{
        console.log("Estatus: " + estatus);
    }
}
function desplegarInformacionComidas(objJSdatos){ 
    let estatus     = objJSdatos.status;
	//let datos     = objJSdatos['datos']; //Con comillas
	let datos       = objJSdatos.datos; //Sin comillas
	let titulo      = objJSdatos.titulo;
	let msj_request = objJSdatos.mensaje; 
    if(estatus == 200){
        let comida = document.getElementById("Comida");
        let total = datos.length;
        datos.forEach(dato => {
                if(dato.tipo_producto == "Comida"){
                    comida.innerHTML += `
                    <article class="card">
                    <div class="product-buttons">
                    <button class="add-to-cart" data-product="${dato.descripcion_producto}" data-price="${dato.precio_producto}" onclick="addToCart(this)">
                    <i class="fas fa-cart-plus">
                    </i></button>
                    </div>
                    <div class="product-image">
                    <img src="${dato.img_producto}" alt="${dato.descripcion_producto}">
                    </div>
                    <div class="product-name">
                        ${dato.descripcion_producto}</div>
                    <div class="product-price">
                        $${dato.precio_producto}</div>
                    </article>
                    `;
                    console.log("Producto añadido correctamente: " + dato);
                }
                else{
                    console.log("Producto no es tendencia " + dato);
                }
        });
    }else{
        console.log("Estatus: " + estatus);
    }
}
function desplegarInformacionPostres(objJSdatos){ 
    let estatus     = objJSdatos.status;
	//let datos     = objJSdatos['datos']; //Con comillas
	let datos       = objJSdatos.datos; //Sin comillas
	let titulo      = objJSdatos.titulo;
	let msj_request = objJSdatos.mensaje; 
    if(estatus == 200){
        let tendencias = document.getElementById("Postre");
        let total = datos.length;
        datos.forEach(dato => {
                if(dato.tipo_producto == "Postre"){
                    tendencias.innerHTML += `
                    <article class="card">
                    <div class="product-buttons">
                    <button class="add-to-cart" data-product="${dato.descripcion_producto}" data-price="${dato.precio_producto}" onclick="addToCart(this)">
                    <i class="fas fa-cart-plus">
                    </i></button>
                    </div>
                    <div class="product-image">
                    <img src="${dato.img_producto}" alt="${dato.descripcion_producto}">
                    </div>
                    <div class="product-name">
                        ${dato.descripcion_producto}</div>
                    <div class="product-price">
                        $${dato.precio_producto}</div>
                    </article>
                    `;
                    console.log("Producto añadido correctamente: " + dato);
                }
                else{
                    console.log("Producto no es tendencia " + dato);
                }
        });
    }else{
        console.log("Estatus: " + estatus);
    }
}


let url = "http://apicopacabana.com/productos?columnas=*";
let init = {
    method : 'get',
      header : {
          'Content-Type': 'application/json'
      }
}
obtenerdatos(url,init);

    function obtenerCincoMasVendidos(array) {
    // Filtrar los valores únicos y ordenar de mayor a menor
    const ventasOrdenadas = Array.from(new Set(array)).sort((a, b) => b - a);
               
    // Tomar los primeros 5 elementos (los más grandes)
    const cincoMasVendidos = ventasOrdenadas.slice(0, 5);
                  
        return cincoMasVendidos;
    }