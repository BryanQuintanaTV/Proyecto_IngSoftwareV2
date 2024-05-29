document.addEventListener("DOMContentLoaded", function () {
  window.addEventListener("load", function () {
    sessionStorage.clear();
    const formularioLogin = document.getElementById("login");

    formularioLogin.addEventListener("submit", function (event) {
      event.preventDefault();

      Swal.fire({
        position: "top-end",
        icon: "question",
        title: "Verificando credenciales...",
        showConfirmButton: false,
        timer: 2000,
      });

      const usuario = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      let url_usuario = `http://apicopacabana.com/perfiles?columnas=usuario_perfil,pass_perfil,nombre_tipoperfil&relTablas=tipoperfiles&relCampos=perfil,tipoperfil&linkTo=usuario_perfil&operadorRelTo==&valueTo=${usuario}`;

      let init_usuario = {
        method: "get",
        header: {
          "Content-Type": "application/json",
        },
      };

      solicitarUsuario(url_usuario, init_usuario);

      async function solicitarUsuario(url, init) {
        const objJSdatos = await fetchSynchronousGET(url, init);
        console.log("------------------");
        console.log(objJSdatos);

        let status = objJSdatos.status;
        let datos = objJSdatos.datos;

        if (status == "200") {
          console.log("STATUS 200");

          if (datos.length == 0) {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Usuario no encontrado!",
            });
          } else if (datos.length > 0) {
            let hashedPassword = datos[0].pass_perfil;
            console.log("DATOS !NULL");
            console.log("HASHED PASS", hashedPassword);

            // Enviar la contraseña hasheada al servidor para su verificación
            verificarContraseña(
              hashedPassword,
              password,
              datos[0].nombre_tipoperfil,
              datos[0].usuario_perfil
            );
          }
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Error al iniciar sesión",
            footer: "Por favor inténtelo nuevamente",
          });
        }
      }
    });
  });
});

// Función para enviar la contraseña hasheada al servidor (PHP) para su verificación
function verificarContraseña(
  hashedPassword,
  password,
  nombrePerfil,
  nombreUsuario
) {
  const xhr = new XMLHttpRequest();
  xhr.open("POST", "verificar_password.php", true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      const respuesta = xhr.responseText;
      console.log(respuesta);
      if (respuesta === "true") {
        // La contraseña es correcta
        console.log("Contraseña correcta");
        Swal.fire({
          icon: "success",
          title: "Inicio de sesion exitoso!",
          showConfirmButton: false,
          timer: 1500,
        });
        sessionStorage.setItem("tipoUser", nombrePerfil);
        sessionStorage.setItem("nombreUsuario", nombreUsuario);

        let tipoUsuario = sessionStorage.getItem("tipoUser");

        setTimeout(function() {
            if (tipoUsuario == "cajero") {
            window.location.href ="http://admincopacabana.com/paleteria_administracion/paleteria_empleados/ordenes/pages/index.html";
            } else if (tipoUsuario == "admin") {
              window.location.href ="http://admincopacabana.com/paleteria_administracion/paleteria_admin/pages";
            }
            // window.location.href ="http://admincopacabana.com/paleteria_administracion/paleteria_admin/pages/idea2.html";
        }, 1500);

      } else {
        // La contraseña es incorrecta
        console.log("Contraseña incorrecta");
        Swal.fire({
          icon: "error",
          title: "Contraseña incorrecta!",
          text: "Favor de verificar la contraseña",
        });
      }
    }
  };
  xhr.send("hashedPassword=" + hashedPassword + "&password=" + password);
}
