<?php
/* ****************************************
  Mostrar Errores
*******************************************/
//Desplegar errores desde el navegador o desde postman 

ini_set('display_errors', 1);
//Crear el archivo
ini_set('log_errors', 1);
//Ruta donde va a aparcer el archivo de errores
ini_set('error_log', 'c:/xamp/htdocs/apirest-dinamica/php_error_log');



/* ****************************************
  Requerimientos
*******************************************/
require_once "controllers/routers.controller.php";

$index = new RoutersController();
$index->index();