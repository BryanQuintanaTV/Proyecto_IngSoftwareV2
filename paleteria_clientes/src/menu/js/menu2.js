    /*Funciones paara el boton de ordenar*/


 // Registro de productos agregados
 var cartItems = [];
 var domiciliorecoger = 0;

 // Obtener referencias a los elementos del DOM
 var openDialogBtn = document.getElementById("openDialogBtn");
 var closeDialogBtn = document.getElementById("ordenarBtn");
 var cancelBtn = document.getElementById("cancelBtn");
 var orderDialog = document.getElementById("orderDialog");
 var dialogContent = document.getElementById("dialogContent");
 
 // Función para agregar productos al carrito

function addToCart(button) {
    var product = button.getAttribute("data-product");
    var price = parseFloat(button.getAttribute("data-price"));

    // Verificar si el producto ya está en el carrito
    var existingItem = cartItems.find(item => item.product === product);

    if (existingItem) {
        // Si el producto ya está en el carrito, incrementar el contador
        existingItem.quantity = (existingItem.quantity || 1) + 1;
    } else {
        // Si el producto no está en el carrito, agregarlo con cantidad 1
        cartItems.push({ product, price, quantity: 1 });
    }
}
// Función para mostrar el contenido del carrito en el cuadro de diálogo
function showCart() {
    // Construir el contenido del cuadro de diálogo con la información del carrito
    var content = "";
    cartItems.forEach(item => {
        content += `<p>Producto: ${item.product} (Cantidad: ${item.quantity})</p><p>Precio: ${item.price}</p><hr>`;
    });
    // Actualizar el contenido del cuadro de diálogo
    dialogContent.innerHTML = content;

    // Mostrar el cuadro de diálogo
    orderDialog.showModal();
} 
 
     // Abrir el cuadro de diálogo al hacer clic en el botón "Ordenar"
     openDialogBtn.addEventListener("click", showCart);
 
     // Cerrar el cuadro de diálogo al hacer clic en el botón "Ordenar a domicilio"
    /* document.getElementById("orderDeliveryBtn").addEventListener("click", function () {
         processOrder("delivery");
     });
 
     // Cerrar el cuadro de diálogo al hacer clic en el botón "Ordenar para recoger"
     document.getElementById("orderPickupBtn").addEventListener("click", function () {
         processOrder("pickup");
     });*/
 
     cancelBtn.addEventListener("click", showCancelConfirmationDialog); 
 
 /*Funciones paara el boton de ordenar a domiciolio adentro del dialog*/
 
  // Obtener referencias a los elementos del nuevo dialog de entrega
  var deliveryInfoDialog = document.getElementById("deliveryInfoDialog");
     var confirmDeliveryBtn = document.getElementById("confirmDeliveryBtn");
     var cancelDeliveryBtn = document.getElementById("cancelDeliveryBtn");
 
     // Obtener referencias a los elementos del nuevo dialog de confirmación del pedido a domicilio
     var deliverySuccessDialog = document.getElementById("deliverySuccessDialog");
     var closeDeliverySuccessBtn = document.getElementById("closeDeliverySuccessBtn");
 
     // Obtener referencias a los elementos del nuevo dialog de confirmación de cancelación
     var cancelConfirmationDialog = document.getElementById("cancelConfirmationDialog");
     var confirmCancelBtn = document.getElementById("confirmCancelBtn");
     var denyCancelBtn = document.getElementById("denyCancelBtn");
 
     // Función para mostrar el nuevo dialog de información de entrega
     function showDeliveryInfoDialog() {
         deliveryInfoDialog.showModal();
     }
 
     // Función para mostrar el nuevo dialog de confirmación del pedido a domicilio
     function showDeliverySuccessDialog() {
         deliveryInfoDialog.close();
         deliverySuccessDialog.showModal();
     }
 
     // Función para mostrar el nuevo dialog de confirmación de cancelación
     function showCancelConfirmationDialog() {
         cancelConfirmationDialog.showModal();
     }
 
     // Función para manejar la confirmación de cancelar el pedido
     function confirmCancelOrder() {
         cancelConfirmationDialog.close();
         cartItems = []; // Limpiar el carrito
         orderDialog.close();
     }
 
     // Abrir el cuadro de diálogo de entrega al hacer clic en el botón "Ordenar a domicilio"
     document.getElementById("orderDeliveryBtn").addEventListener("click", showDeliveryInfoDialog);
 
     // Cerrar el cuadro de diálogo de entrega al hacer clic en el botón "Cancelar"
     cancelDeliveryBtn.addEventListener("click", function () {
         deliveryInfoDialog.close();
     });
 
     // Cerrar el cuadro de diálogo de confirmación del pedido a domicilio al hacer clic en el botón "Cerrar"
     closeDeliverySuccessBtn.addEventListener("click", function () {
         deliverySuccessDialog.close();
     });
 
     // Confirmar la entrega y mostrar el cuadro de diálogo de confirmación del pedido a domicilio
     confirmDeliveryBtn.addEventListener("click", showDeliverySuccessDialog);
 
     // Mostrar el cuadro de diálogo de confirmación de cancelación al hacer clic en el botón "Cancelar"
     cancelDeliveryBtn.addEventListener("click", showCancelConfirmationDialog);
 
     // Confirmar la cancelación al hacer clic en el botón "Sí"
     confirmCancelBtn.addEventListener("click", confirmCancelOrder);
 
     // Negar la cancelación al hacer clic en el botón "No"
     denyCancelBtn.addEventListener("click", function () {
         cancelConfirmationDialog.close();
     });
 
     /*Funciones paara el boton de ordenar para recoger adentro del dialog*/
 
      // Obtener referencias a los elementos del nuevo dialog de confirmación para recoger
     var pickupConfirmationDialog = document.getElementById("pickupConfirmationDialog");
     var confirmPickupBtn = document.getElementById("confirmPickupBtn");
     var denyPickupBtn = document.getElementById("denyPickupBtn");
 
     // Obtener referencias a los elementos del nuevo dialog de confirmación del pedido a recoger
     var pickupSuccessDialog = document.getElementById("pickupSuccessDialog");
     var closePickupSuccessBtn = document.getElementById("closePickupSuccessBtn");
 
     // Función para mostrar el nuevo dialog de confirmación para recoger
     function showPickupConfirmationDialog() {
         pickupConfirmationDialog.showModal();
     }
 
     // Función para mostrar el nuevo dialog de confirmación del pedido a recoger
     function showPickupSuccessDialog() {
         pickupConfirmationDialog.close();
         pickupSuccessDialog.showModal();
     }
 
     // Cerrar el cuadro de diálogo de confirmación del pedido a recoger al hacer clic en el botón "Cerrar"
     closePickupSuccessBtn.addEventListener("click", function () {
         pickupSuccessDialog.close();
     });
 
     // Confirmar la recogida y mostrar el cuadro de diálogo de confirmación del pedido a recoger
     confirmPickupBtn.addEventListener("click", showPickupSuccessDialog);
 
     // Negar la recogida y mostrar el cuadro de diálogo de ordenar a domicilio y ordenar para recoger
     denyPickupBtn.addEventListener("click", function () {
         pickupConfirmationDialog.close();
         orderDialog.showModal();
     });
 
     // Abrir el cuadro de diálogo de confirmación para recoger al hacer clic en el botón "Ordenar para recoger"
     document.getElementById("orderPickupBtn").addEventListener("click", showPickupConfirmationDialog);
 
 
     /**********************************/
      // Obtener referencias al botón "Cerrar" dentro de cada diálogo
      var closeButtons = document.querySelectorAll('.close-dialog');
 
 // Función para cerrar todos los diálogos
 function closeAllDialogs() {
     orderDialog.close();
     deliveryInfoDialog.close();
     deliverySuccessDialog.close();
     cancelConfirmationDialog.close();
     pickupConfirmationDialog.close();
     pickupSuccessDialog.close();
 }
 
 // Agregar un manejador de eventos al botón "Cerrar" de cada diálogo
 closeButtons.forEach(function (button) {
     button.addEventListener('click', closeAllDialogs);
 });
// post mandar pedido --------------------------------------------------------------------------------------------------------------------------------------------
async function confirmarpedido(url,init,url1, init1){
    console.log("Hola desde confirmarpedido");
    const objJSdatos = await fetchSynchronousGET(url1, init1);
    const objJSdatosods = await fetchSynchronousGET(url,init);
    ordenes = [];
    if(objJSdatosods.status == 200){
        console.log("holadesdeel pirimer if");
        let datosordenes = objJSdatosods.datos;
        let preciototal = 0;
        cartItems.forEach(dato => {
            preciototal += dato.quantity * dato.price;

        });
        let ultimaorden = 0;
        datosordenes.forEach(dato => {
            ordenes.push(parseInt(dato.numorden_ordengeneral));
        });
        ultimaorden = Math.max(...ordenes);
        
        subirordenes( ultimaorden, preciototal);
        setTimeout(function() {
            subirproductos(objJSdatos,ultimaorden);
        }, 3000);
        
        
    }
}
async function subirproductos(objJSdatos, ultimaorden){
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
                if(dato.descripcion_producto == producto.product){
                    console.log("hola desde if descripcion producto");
                    /*var cuerpo = {
                        numorden_ordengd: (ultimaorden+1),
                        idproducto_ordengd: dato.id_producto,
                        cantidad_ordengd: producto.quantity,
                        precio_ordengd: producto.price
                    }*/
                    const idProducto = parseInt(dato.id_producto); 
                    const numOrden = ultimaorden+1;
                    console.log(numOrden)
                    const formProducto = document.getElementById("datosProductos");
                    const cantidad = parseInt(producto.quantity);
                    const precio = parseFloat(producto.price);
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
async function subirordenes(ultimaorden, preciototal){
    console.log("hola llegue a subir ordenes");
    let colonia = document.getElementById("colonia").value;
    let calle = document.getElementById("calle").value;
    let numero = document.getElementById("numero").value;
    let codigopostal = document.getElementById("codigoPostal").value;
    let direccion = `${colonia} ${calle} ${numero} ${codigopostal}`;
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
    if(domiciliorecoger == 1){
    formProducto.innerHTML = 
    `
    <label for="chk" aria-hidden="true">Datos de Productos</label>
	<input type="number" id="numorden_ordengeneral" name="numorden_ordengeneral" value="${(numOrden)}" required>
	<input type="text" id="tipoorden_ordengeneral" name="tipoorden_ordengeneral" value="Domicilio" required>
    <input type="number" id="total_ordengeneral" name="total_ordengeneral" value="${preciototal}" required>
	<input type="date" id="fecha_ordengeneral" name="fecha_ordengeneral" value="${fechaFormateada}" required>
	<input type="text" id="hora_ordengeneral" name="hora_ordengeneral" value="${horaFormateada}" required>
	<input type="number" id="idcliente_ordengeneral" name="idcliente_ordengeneral" value="${1}" required>
	<input type="text" id="mesa_ordengeneral" name="mesa_ordengeneral" value="0" required>
	<input type="text" id="idempleado_ordengeneral" name="idempleado_ordengeneral" value="0" required>
	<input type="text" id="direccion_ordengeneral" name="direccion_ordengeneral" value="${direccion}" required>
	<input type="text" id="estatus_ordengeneral" name="estatus_ordengeneral" value="en proceso" required>
    `;
    }
    if(domiciliorecoger == 0){
        formProducto.innerHTML = 
        `
        <label for="chk" aria-hidden="true">Datos de Productos</label>
        <input type="number" id="numorden_ordengeneral" name="numorden_ordengeneral" value="${(numOrden)}" required>
        <input type="text" id="tipoorden_ordengeneral" name="tipoorden_ordengeneral" value="Recoger" required>
        <input type="number" id="total_ordengeneral" name="total_ordengeneral" value="${preciototal}" required>
        <input type="date" id="fecha_ordengeneral" name="fecha_ordengeneral" value="${fechaFormateada}" required>
        <input type="text" id="hora_ordengeneral" name="hora_ordengeneral" value="${horaFormateada}" required>
        <input type="number" id="idcliente_ordengeneral" name="idcliente_ordengeneral" value="${1}" required>
        <input type="text" id="mesa_ordengeneral" name="mesa_ordengeneral" value="0" required>
        <input type="text" id="idempleado_ordengeneral" name="idempleado_ordengeneral" value="0" required>
        <input type="text" id="direccion_ordengeneral" name="direccion_ordengeneral" value="${direccion}" required>
        <input type="text" id="estatus_ordengeneral" name="estatus_ordengeneral" value="En proceso" required>
        `;
        }
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


let btnconfirmar = document.getElementById("confirmDeliveryBtn");
btnconfirmar.addEventListener("click",function(){
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
    domiciliorecoger = 1;
    confirmarpedido(url,init,url1,init1);
})
let btnrecoger = document.getElementById("confirmPickupBtn");
btnrecoger.addEventListener("click",function(){
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
    domiciliorecoger = 0;
    confirmarpedido(url,init,url1,init1);
})
