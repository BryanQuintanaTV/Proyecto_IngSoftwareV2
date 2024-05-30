<?php
	require_once "controllers/put.controller.php";
	//$table      = explode("?",$routesArray[1])[0];  

	// ***************************************************************************
	//LA llave primaria debe venir en el JSON del header
	//Esto se realiza en 2 propiedades 
	//	1.  Se debe llamar id y su valor es el nombre del campo llave primaria
	//  2.  Se debe llamar idValor y su valor es el valor de la llava primaria
	//
	//Todos los demas campos aunque no traigna un nuevo valor deberan venir en el body
	// *********************************************************************************

	//Agarramos la cadena JSON que nos envia el cliente en el Body
    $postBodyJSON = file_get_contents("php://input");

	// ****************************************************************************
	// PHP nos ofrece 3 formas de accede a los headerse 
	//$headers = getallheaders();
	//$_SERVER['HTTP_ID']) En donde el nomvre de la llave 'HTTP_ID' se compone de la siguiente forma:
	// 1 Se reempleazan todas las letras minusculas a mayusculas
	// 2 Si trae guiones medios se reemplazan por guiones bajos
	// 3 Al nombre se le antepone la cadean HTTP_
	

	//Verificamos si viene el id y el idValor
	
	if(isset($_SERVER['HTTP_ID']) && isset($_SERVER['HTTP_IDVALOR'])){		
		
		//Crearmos un arreglo asociativo con el JSON que llego
		//El true es para que sea un arreglo asociativo
		$datos = json_decode($postBodyJSON, true); 

		$response = new PutController();

		return $response->modificarDatos($table, $datos);
	}else{
		$json = array(
			'status' => 404,
			'result' => "No envío el ID"
		);
		echo json_encode($json, http_response_code($json["status"]));
		return;

	}
	