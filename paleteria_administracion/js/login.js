async function verificar(url, init){
    let objJSdatos = await fetchSynchronousGET(url, init);
    enviar(objJSdatos);
}

async function enviar(objJSdatos){
    let estatus     = objJSdatos.status;
	//let datos     = objJSdatos['datos']; //Con comillas
	let datos       = objJSdatos.datos; //Sin comillas
	let titulo      = objJSdatos.titulo;
	let msj_request = objJSdatos.mensaje;
    if(estatus == 200){
    let entrada = document.getElementById("entrada");
    let usuario = entrada.elements["usuario"].value;
    let contra = entrada.elements["contra"].value; 
        console.log("usuario",usuario);
        console.log("Contraseña",contra);
        datos.forEach(dato => {
            if(dato.usuario_empleado == usuario && dato.contrasena_empleado == contra){
                if(usuario == "blueadmin" && contra == "123"){
                    window.location.href = "http://admincopacabana.com/Proyecto-Paleteria-DG/EstadoGeneralLocal/estadoLocal.html";
                }else if(usuario == "blueemple" && contra == "12345"){
                    window.location.href = "http://admincopacabana.com/Proyecto-Paleteria-Empleados/Ordenes/orden.html";
                }
            }
        });
    }
}
url = "http://apicopacabana.com/empleados?columnas=*";
init = {
    method : 'get',
      header : {
          'Content-Type': 'application/json'
      }
}
document.getElementById("iniciarsesion").addEventListener("click", function() {
    verificar(url, init);
    event.preventDefault(); // Evitar la acción por defecto del formulario
});
//document.getElementById("iniciarsesion").addEventListener("click", () => verificar(url, init));


// Modificación en la función verificar
/*async function verificar(url, init) {
    let usuario = document.getElementById("usuario").value;
    let contra = document.getElementById("contra").value;

    let objJSdatos = await fetchSynchronousGET(url, init);
    enviar(objJSdatos, usuario, contra);
}

// Modificación en la función enviar
async function enviar(objJSdatos, usuario, contra) {
    console.log("Usuario ingresado:", usuario);
    console.log("Contraseña ingresada:", contra);

    let estatus = objJSdatos.status;
    let datos = objJSdatos.datos;
    let titulo = objJSdatos.titulo;
    let msj_request = objJSdatos.mensaje;

    if (estatus == 200) {
        datos.forEach(dato => {
            if (dato.usuario_empleado == usuario && dato.contrasena_empleado == contra) {
                console.log("Credenciales coinciden para el usuario:", usuario);
                if (usuario == "blueadmin" && contra == "123") {
                    console.log("Redirigiendo a la página de administrador...");
                    window.location.href = "http://bluehouradmin.com/Proyecto-Cafeteria-DG/EstadoGeneralLocal/estadoLocal.html";
                } else {
                    console.log("Redirigiendo a otra página...");
                    // Lógica para redireccionar a otra página si no es blueadmin
                }
            }
        });
    }
}

// Resto de tu código...
let url = "http://apibluehour.com/empleados?columnas=*";
let init = {
    method: 'get',
    headers: {
        'Content-Type': 'application/json'
    }
}

// Modificación en el evento de clic
document.getElementById("iniciarsesion").addEventListener("click", () => verificar(url, init));*/