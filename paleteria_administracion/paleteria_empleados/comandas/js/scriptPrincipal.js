async function obtenerdatos(url1, url2, init){
    const objJSdatos1 = await fetchSynchronousGET(url1, init);
    const objJSdatos2 = await fetchSynchronousGET(url2, init);
    desplegar(objJSdatos1, objJSdatos2);
}
function desplegar(objJSdatos1, objJSdatos2){
    let estatus1     = objJSdatos1.status;
	//let datos     = objJSdatos['datos']; //Con comillas
	let datos1       = objJSdatos1.datos; //Sin comillas
	let titulo1      = objJSdatos1.titulo;
	let msj_request1 = objJSdatos1.mensaje;
    
    
    let estatus2     = objJSdatos2.status;
	//let datos     = objJSdatos['datos']; //Con comillas
	let datos2       = objJSdatos2.datos; //Sin comillas
	let titulo2      = objJSdatos2.titulo;
	let msj_request2 = objJSdatos2.mensaje; 
    if(estatus1 == 200 && estatus2 == 200){
        let contador = 0
        datos1.forEach(dato1 => {
            console.log(dato1.tipoorden_ordengeneral);
            let tipoOrden = String(dato1.tipoorden_ordengeneral);
            if (tipoOrden === "Recoger") {
            console.log("Recoger")
            let productos = ``;
            datos2.forEach(dato2 => {
            console.log("antes del if")
            let ordengds = dato2.numorden_ordengd;
            let ordengeneral = dato1.numorden_ordengeneral;
            console.log(ordengds + "  " + ordengeneral);
            if(ordengds == ordengeneral){
                productos +=`
                <li>${dato2.nombreproducto_ordengd} $${dato2.precio_ordengd}</li>
                `
                console.log("trayendo datos")
            }
            });
            let pedidos = document.getElementById("PedidosRecoger");
            contador +=1
            pedidos.innerHTML += `
            <div id="Pedido${contador}" class="Pedido">
            <img src="Pedido.png" class="imgP">
            <div class="InfoPedido">
                <h3>Pedido ${contador}</h3>
                <h4>${dato1.estatus_ordengeneral}</h4>
                    <ul>${productos}
                    </ul>
                    Total: ${dato1.total_ordengeneral}
                
            </div>
            <button class="Imprimir" id="btnPedido${contador}" numOrden = "${dato1.numorden_ordengeneral}">
                <img src="btnImprimir.png" class="btnImp">
            </button>
            </div>
            `
            }
            if (tipoOrden === "Domicilio") {
            console.log("Domicilio");
            let productos = ``;
            datos2.forEach(dato2 => {
            console.log("antes del if")
            let ordengds = dato2.numorden_ordengd;
            let ordengeneral = dato1.numorden_ordengeneral;
            console.log(ordengds + "  " + ordengeneral);
            if(ordengds == ordengeneral){
                productos +=`
                <li>${dato2.nombreproducto_ordengd} $${dato2.precio_ordengd}</li>
                `
                console.log("trayendo datos")
            }
            });
            let pedidos = document.getElementById("PedidosDom");
            contador +=1
            pedidos.innerHTML += `
            <div id="Pedido${contador}" class="Pedido">
            <img src="Pedido.png" class="imgP">
            <div class="InfoPedido">
                <h3>Pedido ${contador}</h3>
                <h4>${dato1.estatus_ordengeneral}</h4>
                    <ul>${productos}
                    </ul>
                    Total: ${dato1.total_ordengeneral} <br>
                    Domicilio: ${dato1.direccion_ordengeneral}
                
            </div>
            <button class="Imprimir" id="btnPedido${contador}" numOrden = "${dato1.numorden_ordengeneral}">
                <img src="btnImprimir.png" class="btnImp">
            </button>
            </div>
            `
            }
            }
        );
        document.body.style.overflowY = 'scroll';
    
    }
}
url1 = "http://apicopacabana.com/ordenesgenerales?columnas=*";
url2 = "http://apicopacabana.com/ordengds?columnas=*";
init = {
    method : 'get',
      header : {
          'Content-Type': 'application/json'
      }
};

obtenerdatos(url1, url2, init);
