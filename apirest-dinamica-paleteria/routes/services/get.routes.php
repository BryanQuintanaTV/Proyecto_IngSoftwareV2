<?php

require_once "controllers/get.controller.php";

//$table      = explode("?",$routesArray[1])[0];  //Una sola

//Verificamos si biene el Toke y su timepo de expiración

$tokenValidarValor = 0;

/*
if(isset($_SERVER['HTTP_TOKEN'])){
    //Vamos al controlador para verificar si existe y/o esta activo

}
*/

$columnas      = $_GET['columnas']      ?? "*";
$relTablas     = $_GET['relTablas']     ?? null;
$relCampos     = $_GET['relCampos']     ?? null;

//Where
$linkTo           = $_GET["linkTo"]           ?? null;
$operadorRelTo    = $_GET["operadorRelTo"]    ?? null;
$valueTo          = $_GET["valueTo"]          ?? null;
$operadorLogicoTo = $_GET["operadorLogicoTo"] ?? null;

$orderBy    = $_GET['orderBy']   ?? null;
$orderMode  = $_GET['orderMode'] ?? null;

$startAt    = $_GET['startAt'] ?? null;
$endAt      = $_GET['endAt']   ?? null;



/*************************************************************
Eliminar espacios en blanco al final y al principio de cada elemento
de los arreglos 
**************************************************************/
function eliminarEspacios($arreglo){
    for($i=0; $i<count($arreglo); $i++){
        $arreglo[$i] = trim($arreglo[$i]);
    }
    return $arreglo;
}




/**************************************************************
Pasar todos los parametros que sean necesarios en Arreglos
*************************************************************/
if($relTablas != null){
    $table .= ",$relTablas";
}
$tablesArray = explode(",", $table);
$tablesArray = eliminarEspacios($tablesArray);

/**********************************************************
$columnas No es necesario crear un areglo de las columnas
pues la cadena ya esta lista para la sentencia SQL
************************************************************/

//$columnas . $linkTo . $orderBy
//$relCampos //Este no por que solo biene el post Fijo
if($relCampos != null){
    $relCamposArray = explode(",", $relCampos);
    $relCamposArray = eliminarEspacios($relCamposArray);
}else{
    $relCamposArray = Array();
}

if($linkTo != null){
    $linkToArray = explode(",", $linkTo);
    $linkToArray = eliminarEspacios($linkToArray);
}else{
    $linkToArray = Array();
}
if($operadorRelTo != null){
    $operadorRelToArray = explode(",", $operadorRelTo);
    $operadorRelToArray = eliminarEspacios($operadorRelToArray);
}else{
    $operadorRelToArray = Array();
}
if($valueTo != null){
    $valueToArray = explode("_", $valueTo);
    $valueToArray = eliminarEspacios($valueToArray);
}else{
    $valueToArray = Array();
}
if($operadorLogicoTo != null){
    $operadorLogicoToArray = explode(",", $operadorLogicoTo);
    $operadorLogicoToArray = eliminarEspacios($operadorLogicoToArray);
}else{
    $operadorLogicoToArray = Array();
}

if($orderBy != null){
    $orderByArray = explode(",", $orderBy);
    $orderByArray = eliminarEspacios($orderByArray);
}else{
    $orderByArray = Array();
}
if($orderMode != null){
    $orderModeArray = explode(",", $orderMode);
    $orderModeArray = eliminarEspacios($orderModeArray);
}else{
    $orderModeArray = Array();
}

/*******************************************************
//$startAt y $endAt Nunca debe ser un arreglo
 *********************************************************/

$response = new GetController();

$response->getDatos($tablesArray, $columnas, $relCamposArray, 
                    $linkToArray, $operadorRelToArray,$valueToArray, $operadorLogicoToArray, 
                    $orderByArray, $orderModeArray, 
                    $startAt, $endAt);

return;



