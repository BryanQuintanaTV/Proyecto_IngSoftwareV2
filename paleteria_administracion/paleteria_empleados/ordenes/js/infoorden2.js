var select = document.getElementById("mesas");
var mesaInfo = document.getElementById("mesaInfo");
var selectedMesaSpan = document.getElementById("selectedMesa");
var totalPagarSpan = document.getElementById("totalPagar");
var listaProductos = document.getElementById("listaProductos");
 
var cuentasPorMesa = {};
 
select.addEventListener("change", function () {
    var selectedMesa = select.options[select.selectedIndex].text;
    selectedMesaSpan.textContent = selectedMesa;
    mesaInfo.style.display = "block";
 
    // Verificar si ya existe una cuenta para la mesa seleccionada
    if (!cuentasPorMesa[selectedMesa]) {
        cuentasPorMesa[selectedMesa] = {
            productos: [],
            totalPagar: 0
        };
    }
 
    // Mostrar los productos y total a pagar de la mesa seleccionada
    mostrarProductosYTotal(selectedMesa);
});
 
function agregarProducto(nombre, precio) {
    var selectedMesa = selectedMesaSpan.textContent;
 
    // Verificar si el producto ya está en la lista para esa mesa
    var productoExistente = cuentasPorMesa[selectedMesa].productos.find(function (producto) {
        return producto.nombre === nombre;
    });
 
    if (productoExistente) {
        // Si el producto ya existe, incrementar la cantidad
        productoExistente.cantidad += 1;
    } else {
        // Si el producto no existe, agregarlo a la cuenta de la mesa seleccionada
        cuentasPorMesa[selectedMesa].productos.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1 // Nueva propiedad para la cantidad del producto
        });
    }
 
    // Actualizar el total a pagar de la mesa
    cuentasPorMesa[selectedMesa].totalPagar += precio;
    totalPagarSpan.textContent = cuentasPorMesa[selectedMesa].totalPagar.toFixed(2);
 
    // Actualizar la lista de productos
    mostrarProductosYTotal(selectedMesa);
}
 
function quitarProducto(index) {
    var selectedMesa = selectedMesaSpan.textContent;
 
    // Obtener el producto que se va a quitar
    var producto = cuentasPorMesa[selectedMesa].productos[index];
 
    // Restar el precio del producto al total a pagar
    cuentasPorMesa[selectedMesa].totalPagar -= producto.precio * producto.cantidad;
 
    // Quitar el producto de la lista
    cuentasPorMesa[selectedMesa].productos.splice(index, 1);
 
    // Actualizar la lista de productos
    mostrarProductosYTotal(selectedMesa);
}
 
function mostrarProductosYTotal(selectedMesa) {
    // Limpiar la lista de productos
    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
    }
 
    // Mostrar los productos en la lista con botones de "menos"
    cuentasPorMesa[selectedMesa].productos.forEach(function (producto, index) {
        var listItem = document.createElement("li");
        var cantidadTexto = producto.cantidad > 1 ? " (" + producto.cantidad + ")" : "";
        listItem.textContent = producto.nombre + cantidadTexto + " - $" + producto.precio.toFixed(2);
 
        // Agregar un botón de "menos" para quitar el producto
        var quitarBtn = document.createElement("span");
        quitarBtn.className = "quitarBtn";
        quitarBtn.textContent = " -   -";
        quitarBtn.onclick = function () {
            quitarProducto(index);
        };
 
        listItem.appendChild(quitarBtn);
        listaProductos.appendChild(listItem);
    });
 
    // Mostrar el total a pagar
    totalPagarSpan.textContent = cuentasPorMesa[selectedMesa].totalPagar.toFixed(2);
}
 
function confirmar() {
    var selectedMesa = selectedMesaSpan.textContent;
 
    // Puedes realizar acciones adicionales al confirmar, como enviar la información al servidor.
    alert("Pedido confirmado para la mesa " + selectedMesa);
}
 
function cerrarMesa() {
    var selectedMesa = selectedMesaSpan.textContent;
    let url = "http://apicopacabana.com/ordenesgenerales?columnas=numorden_ordengeneral";
    let init = {
        method : 'get',
          header : {
              'Content-Type': 'application/json'
          }
    };
    let url1 = "http://apicopacabana.com/productos?columnas=*";
    let init1 = {
        method : 'get',
          header : {
              'Content-Type': 'application/json'
          }
    };
    confirmarpedido(url,init,url1,init1, cuentasPorMesa[selectedMesa].productos,cuentasPorMesa[selectedMesa].totalPagar);
    // Limpiar solo los productos de la mesa seleccionada
    cuentasPorMesa[selectedMesa].productos = [];
 
    // Limpiar la lista de productos
    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
    }
 
    // Actualizar el total a pagar
    cuentasPorMesa[selectedMesa].totalPagar = 0;
    totalPagarSpan.textContent = "0.00";
}
 
function cancelar() {
    var selectedMesa = selectedMesaSpan.textContent;
 
    // Limpiar la interfaz
    mesaInfo.style.display = "none";
    select.selectedIndex = 0;
 
    // Limpiar la lista de productos y el total a pagar al cancelar
    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);
    }
 
    // Limpiar la cuenta de la mesa seleccionada
    cuentasPorMesa[selectedMesa] = {
        productos: [],
        totalPagar: 0
    };
 
    totalPagarSpan.textContent = "0.00";
}
 
function imprimirComanda() {
    var selectedMesa = selectedMesaSpan.textContent;
    // Puedes imprimir la comanda para la mesa seleccionada
    alert("Comanda impresa para la mesa " + selectedMesa);
}
// post mandar pedido --------------------------------------------------------------------------------------------------------------------------------------------
async function confirmarpedido(url,init,url1, init1, cartItems, preciototal){
    console.log("Hola desde confirmarpedido");
    const objJSdatos = await fetchSynchronousGET(url1, init1);
    const objJSdatosods = await fetchSynchronousGET(url,init);
    ordenes = [];
    if(objJSdatosods.status == 200){
        console.log("holadesdeel pirimer if");
        let datosordenes = objJSdatosods.datos;
        let ultimaorden = 0;
        datosordenes.forEach(dato => {
            ordenes.push(parseInt(dato.numorden_ordengeneral));
        });
        ultimaorden = Math.max(...ordenes);
        
        subirordenes(ultimaorden, preciototal, cartItems);
        setTimeout(function() {
            subirproductos(objJSdatos,ultimaorden, cartItems);
        }, 3000);
        
        
    }
}
async function subirproductos(objJSdatos, ultimaorden, cartItems){
    let estatus     = objJSdatos.status;
	//let datos     = objJSdatos['datos']; //Con comillas
	let datos       = objJSdatos.datos; //Sin comillas
	let titulo      = objJSdatos.titulo;
	let msj_request = objJSdatos.mensaje;
    console.log("hola desde antes del if estatus subir pedidos");
    if(estatus == 200){
        console.log("hola desde if estatus subir pedidos");
        datos.forEach(dato => {
            cartItems.forEach(async producto =>{
                if(dato.descripcion_producto == producto.nombre){
                    console.log("hola desde if descripcion producto");
                    /*
                    nombre: nombre,
                    precio: precio,
                    cantidad: 1
                    var cuerpo = {
                        numorden_ordengd: (ultimaorden+1),
                        idproducto_ordengd: dato.id_producto,
                        cantidad_ordengd: producto.quantity,
                        precio_ordengd: producto.price
                    }*/
                    const idProducto = parseInt(dato.id_producto); 
                    const numOrden = ultimaorden+1;
                    console.log(numOrden)
                    const formProducto = document.getElementById("datosProductos");
                    const cantidad = parseInt(producto.cantidad);
                    const precio = parseFloat(producto.precio);
                    const nombre = dato.descripcion_producto
                    formProducto.innerHTML = `
                    <label for="chk" aria-hidden="true">Datos de Productos</label>
					<input type="number" id="numorden_ordengd" name="numorden_ordengd" value="${numOrden}" required>
					<input type="number" id="idproducto_ordengd" name="idproducto_ordengd" value="${idProducto}" required>
                    <input type="text" id="nombreproducto_ordengd" name="nombreproducto_ordengd" value="${nombre}" required>
                    <input type="number" id="cantidad_ordengd" name="cantidad_ordengd" value="${cantidad}" required>
					<input type="number" id="precio_ordengd" name="precio_ordengd" value="${precio}" required>
                    `;
                    const formProductoActualizado = document.getElementById("datosProductos");
                    const datosForm = new FormData(formProductoActualizado);
                    const datosObjJS = Object.fromEntries(datosForm);
                    const objjsoncuerpo = JSON.stringify(datosObjJS);
                    console.log(datosObjJS);
                    fetch("http://apicopacabana.com/ordengds", {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: objjsoncuerpo
                    })
                    .then(response => {
                        // Verificar si la respuesta es exitosa (código de estado 2xx)
                    if (!response.ok) {
                        throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
                    }

                    // Procesar la respuesta JSON
                        return response.json();
                    })
                    .then(data => {
                    // Manejar los datos de la respuesta
                    console.log("Respuesta exitosa:", data);
                    // Puedes realizar acciones adicionales según la respuesta aquí
                    })
                    .catch(error => {
                    // Manejar errores
                    console.error("Error en la solicitud:", error);
                    // Puedes realizar acciones adicionales en caso de error aquí
                    });
                }
            })
        });
    }
    cartItems = [];
}
async function subirordenes(ultimaorden, preciototal, cartItems){
    console.log("hola llegue a subir ordenes");
    let direccion = "  ";
    // Crear un nuevo objeto Date, que representa la fecha y hora actuales
    const fechaActual = new Date();

    // Obtener el año, mes y día de la fecha actual
    const año = fechaActual.getFullYear();
    const mes = fechaActual.getMonth() + 1; // Los meses comienzan desde 0 (enero es 0)
    const dia = fechaActual.getDate();

    // Crear una cadena con el formato 'YYYY-MM-DD'
    const fechaFormateada = `${año}-${mes < 10 ? '0' : ''}${mes}-${dia < 10 ? '0' : ''}${dia}`;
    // Crear un nuevo objeto Date, que representa la fecha y hora actuales
    const horaActual = new Date();

    // Obtener la hora, los minutos y los segundos
    const horas = horaActual.getHours();
    const minutos = horaActual.getMinutes();
    const segundos = horaActual.getSeconds();

    // Crear una cadena con el formato 'HH:MM:SS'
    const horaFormateada = `${horas < 10 ? '0' : ''}${horas}:${minutos < 10 ? '0' : ''}${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;

    console.log(horaFormateada);

    console.log(fechaFormateada);
    /*var cuerpo = {
        numorden_ordengeneral: (ultimaorden+1),
        tipoorden_ordengeneral: "Domicilio",
        total_ordengeneral: preciototal,
        fecha_ordengeneral: fechaActualFormat,
        hora_ordengeneral: horaActual,
        idcliente_ordengeneral: 1,
        mesa_ordengeneral: null,
        idempleado_ordengeneral: null,
        direccion_ordengeneral: direccion,
        estatus_ordengeneral: "en proceso"
    }*/
    const formProducto = document.getElementById("datosProductos");
    const numOrden = ultimaorden+1;
    console.log(numOrden)
    var selectedMesa = selectedMesaSpan.textContent;
    const numMesa = extraerNumero(selectedMesa);
    formProducto.innerHTML = 
    `
    <label for="chk" aria-hidden="true">Datos de Productos</label>
	<input type="number" id="numorden_ordengeneral" name="numorden_ordengeneral" value="${(numOrden)}" required>
	<input type="text" id="tipoorden_ordengeneral" name="tipoorden_ordengeneral" value="En Local" required>
    <input type="number" id="total_ordengeneral" name="total_ordengeneral" value="${preciototal}" required>
	<input type="date" id="fecha_ordengeneral" name="fecha_ordengeneral" value="${fechaFormateada}" required>
	<input type="text" id="hora_ordengeneral" name="hora_ordengeneral" value="${horaFormateada}" required>
	<input type="number" id="idcliente_ordengeneral" name="idcliente_ordengeneral" value="0" required>
	<input type="text" id="mesa_ordengeneral" name="mesa_ordengeneral" value="${numMesa}" required>
	<input type="number" id="idempleado_ordengeneral" name="idempleado_ordengeneral" value="302" required>
	<input type="text" id="direccion_ordengeneral" name="direccion_ordengeneral" value="${direccion}" required>
	<input type="text" id="estatus_ordengeneral" name="estatus_ordengeneral" value="En proceso" required>
    `;
    const formProductoActualizado = document.getElementById("datosProductos");
    const datosForm = new FormData(formProductoActualizado);
    const datosObjJS = Object.fromEntries(datosForm);
    const objjsoncuerpo = JSON.stringify(datosObjJS);
    fetch("http://apicopacabana.com/ordenesgenerales", {
    method: 'post',
    headers: {
        'Content-Type': 'application/json'
    },
    body: objjsoncuerpo
    })
    .then(response => {
        // Verificar si la respuesta es exitosa (código de estado 2xx)
        if (!response.ok) {
            throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        }

        // Procesar la respuesta JSON
        return response.json();
    })
    .then(data => {
        // Manejar los datos de la respuesta
        console.log("Respuesta exitosa:", data);
        // Puedes realizar acciones adicionales según la respuesta aquí
    })
    .catch(error => {
        // Manejar errores
        console.error("Error en la solicitud:", error);
        // Puedes realizar acciones adicionales en caso de error aquí
    });

    console.log("datos", datosObjJS);
}
function extraerNumero(texto) {
    // Utilizamos una expresión regular para encontrar todos los números en el texto
    var numerosEncontrados = texto.match(/\d+/);
 
    // Verificamos si se encontraron números
    if (numerosEncontrados) {
      // Convertimos la cadena de dígitos a un número entero
      var numero = parseInt(numerosEncontrados[0], 10);
      return numero;
    } else {
      // En caso de que no se encuentren números, retornamos null o un valor predeterminado
      return null;
    }
  }