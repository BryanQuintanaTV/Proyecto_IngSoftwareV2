
    function mostrar() {
        document.getElementById("sidebar").style.width = "300px";
        document.getElementById("contenido").style.marginRight = "50px";
        document.getElementById("abrir").style.display = "none";
        document.getElementById("cerrar").style.display = "inline";
    }
    
    function ocultar() {
        document.getElementById("sidebar").style.width = "0";
        document.getElementById("contenido").style.marginRight = "0";
        document.getElementById("abrir").style.display = "inline";
        document.getElementById("cerrar").style.display = "none";
    }