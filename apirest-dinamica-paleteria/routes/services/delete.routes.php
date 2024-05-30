<?php
	require_once "controllers/delete.controller.php";
	//$table      = explode("?",$routesArray[1])[0];  

	//Agarramos la cadena JSON que nos envia el cliente en el Body
    $postBodyJSON = file_get_contents("php://input");

	//Crearmos un arreglo asociativo con el JSON que llego
	//El true es para que sea un arreglo asociativo
	$datos = json_decode($postBodyJSON, true); 

	$response = new DeleteController();
	
	return $response->eliminarDatos($table, $datos);
	