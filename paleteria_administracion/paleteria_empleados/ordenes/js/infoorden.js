/*Antiguo codigo que hacia la seleccion de mesa pero no agregaba productos a la lista de la mesa  */

/*var select = document.getElementById("mesas");
var mesaInfo = document.getElementById("mesaInfo");
var selectedMesaSpan = document.getElementById("selectedMesa");
var totalPagarSpan = document.getElementById("totalPagar");
var checkboxParaLlevar = document.getElementById("checkboxParaLlevar");

// Obtén referencias a los botones
var confirmarBtn = document.getElementById("confirmarBtn");
var cancelarBtn = document.getElementById("cancelarBtn");
var imprimirBtn = document.getElementById("imprimirBtn");

select.addEventListener("change", function() {
    var selectedMesa = select.options[select.selectedIndex].text;
    selectedMesaSpan.textContent = selectedMesa;
    mesaInfo.style.display = "block";
});

function confirmar() {
    // Puedes realizar acciones adicionales al confirmar, como calcular el total a pagar.
    var totalPagar = 0; // Calcula el total a pagar según los productos seleccionados.
    totalPagarSpan.textContent = totalPagar;
    alert("Pedido confirmado para la mesa " + selectedMesaSpan.textContent);
}

function cancelar() {
    mesaInfo.style.display = "none";
    select.selectedIndex = 0;
    checkboxParaLlevar.checked = false;
}

function imprimirComanda() {
    alert("Comanda impresa para la mesa " + selectedMesaSpan.textContent);
}
*/

/*Nuevo codigo que hace la seleccion de mesa para agregar productos a cada mesa (cuenta)*/

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
        quitarBtn.textContent = " - Cancelar Producto";
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