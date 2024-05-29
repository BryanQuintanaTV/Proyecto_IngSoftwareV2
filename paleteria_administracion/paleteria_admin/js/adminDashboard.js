window.addEventListener("load", async () => {

    // Verificar si el sessionStorage contiene el valor esperado
    if (sessionStorage.getItem('tipoUser') == "admin") {

    let name = document.getElementById("name-user");
    name.innerHTML = sessionStorage.getItem('nombreUsuario');


    
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
          window.location.href = '../../pages/index.php';
          // Limpiar todo el sessionStorage
          sessionStorage.clear();
        }, 8000);
      }
    
    });
