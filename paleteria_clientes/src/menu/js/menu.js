    /*Funciones paara el boton de ordenar*/


 // Registro de productos agregados
 var cartItems = [];

 // Obtener referencias a los elementos del DOM
 var openDialogBtn = document.getElementById("openDialogBtn");
 var closeDialogBtn = document.getElementById("ordenarBtn");
 var cancelBtn = document.getElementById("cancelBtn");
 var orderDialog = document.getElementById("orderDialog");
 var dialogContent = document.getElementById("dialogContent");
 
 // Función para agregar productos al carrito
 function addToCart(button) {
     var product = button.getAttribute("data-product");
     var price = button.getAttribute("data-price");
 
     // Registrar el producto
     cartItems.push({ product, price });
 }
 
 // Función para mostrar el contenido del carrito en el cuadro de diálogo
 function showCart() {
         // Construir el contenido del cuadro de diálogo con la información del carrito
         var content = "";
         cartItems.forEach(item => {
             content += `<p>Producto: ${item.product}</p><p>Precio: ${item.price}</p><hr>`;
         });
 
         // Actualizar el contenido del cuadro de diálogo
         dialogContent.innerHTML = content;
 
         // Mostrar el cuadro de diálogo
         orderDialog.showModal();
     }
 
 
     // Abrir el cuadro de diálogo al hacer clic en el botón "Ordenar"
     openDialogBtn.addEventListener("click", showCart);
 
     // Cerrar el cuadro de diálogo al hacer clic en el botón "Ordenar a domicilio"
     document.getElementById("orderDeliveryBtn").addEventListener("click", function () {
         processOrder("delivery");
     });
 
     // Cerrar el cuadro de diálogo al hacer clic en el botón "Ordenar para recoger"
     document.getElementById("orderPickupBtn").addEventListener("click", function () {
         processOrder("pickup");
     });
 
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
 