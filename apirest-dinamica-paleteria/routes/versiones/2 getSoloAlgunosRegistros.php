<?php

require_once "controllers/get.controller.php";

//$table = $routesArray[1];
//$table = explode("?", $table);
//$table = $table[0];

/************************************************
 * Las 3 líneas anteriores pueden ser sustituidas por la
 * siguiente linea.
 */
$table = explode("?",$routesArray[1])[0];


/* *******************************************************
//?? Operador de comparacion 
Pregunta que si existe $_GET['columnas']
Si la respuesta es verdadera regresa $_GET['columnas']
Si es false regresa "*"
*********************************************************/
$columnas = $_GET['columnas'] ?? "*";


$response = new GetController();
if(isset($_GET["linkTo"]) && isset($_GET["equalTo"])){
    $response->getDataFilter($table, $columnas, $_GET["linkTo"], $_GET["equalTo"]);
}else{
    $response->getData($table, $columnas);
}


return;




