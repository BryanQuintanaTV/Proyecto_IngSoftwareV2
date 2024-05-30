<?php
/* ****************************************
  Requerimientos
*******************************************/
require_once "controllers/routers.controller.php";
/*********************************************************
Distintas formas de utilizar la instrucción anterior 
**********************************************************/
/*
require "controllers/routers.controller.php";
include "controllers/routers.controller.php";
include_once "controllers/routers.controller.php";
*/


/*
$allowOrigin = [
  'http://apirestcliente.com'
];

if(in_array($_REQUEST('origin'), $allowOrigin)){
  header('Access-Control-Allow-Origin: http://apirestcliente.com');  
}
*/

header('Access-Control-Allow-Origin: *');
//header("Access-Control-Allow-Origin: http://bluehour.com,  http://bluehouradmin.com"); 
//header("Access-Control-Allow-Origin: http://bluehouradmin.com ");
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, id, idValor, token, subFijo, tablas-Login');
//Los parametros id e idValor los necesita el PUT
//Los parametros token y subFijo los necesita cuando solicita un recurso no importa por cual metodo y ese recurso 
//esta restringido para usuarios que se han logeado.

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Content-Type: application/json');

$index = new RoutersController();
$index->index();


